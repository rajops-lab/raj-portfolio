import CryptoJS from 'crypto-js';
import { supabase } from './supabase';
import { Note, BlockchainBlock } from '../types/pkm';

export class PKMBlockchain {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Create a new blockchain block for a note
   */
  async createBlock(note: Note, encryptionKey: string): Promise<BlockchainBlock> {
    try {
      // Get the previous block hash
      const previousHash = await this.getLatestBlockHash();
      
      // Encrypt the note content
      const encryptedData = this.encryptData(JSON.stringify(note), encryptionKey);
      
      // Create block data
      const blockData = {
        user_id: this.userId,
        note_id: note.id,
        encrypted_data: encryptedData,
        previous_hash: previousHash,
        timestamp: Date.now(),
      };

      // Generate hash for this block
      const hash = this.generateHash(blockData);
      
      // Create signature
      const signature = this.createSignature(hash, encryptionKey);

      const block: BlockchainBlock = {
        id: crypto.randomUUID(),
        ...blockData,
        hash,
        signature,
      };

      // Store in database
      const { data, error } = await supabase
        .from('blockchain_blocks')
        .insert(block)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating blockchain block:', error);
      throw new Error('Failed to create blockchain block');
    }
  }

  /**
   * Verify the integrity of the blockchain
   */
  async verifyChain(): Promise<{ isValid: boolean; errors: string[] }> {
    try {
      const { data: blocks, error } = await supabase
        .from('blockchain_blocks')
        .select('*')
        .eq('user_id', this.userId)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      const errors: string[] = [];

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        
        // Verify hash
        const expectedHash = this.generateHash({
          user_id: block.user_id,
          note_id: block.note_id,
          encrypted_data: block.encrypted_data,
          previous_hash: block.previous_hash,
          timestamp: block.timestamp,
        });

        if (block.hash !== expectedHash) {
          errors.push(`Block ${block.id} has invalid hash`);
        }

        // Verify chain linkage
        if (i > 0) {
          const previousBlock = blocks[i - 1];
          if (block.previous_hash !== previousBlock.hash) {
            errors.push(`Block ${block.id} has invalid previous hash`);
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      return {
        isValid: false,
        errors: ['Failed to verify blockchain'],
      };
    }
  }

  /**
   * Decrypt and retrieve a note from blockchain
   */
  async getDecryptedNote(blockId: string, encryptionKey: string): Promise<Note | null> {
    try {
      const { data: block, error } = await supabase
        .from('blockchain_blocks')
        .select('*')
        .eq('id', blockId)
        .eq('user_id', this.userId)
        .single();

      if (error || !block) return null;

      // Decrypt the data
      const decryptedData = this.decryptData(block.encrypted_data, encryptionKey);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error decrypting note:', error);
      return null;
    }
  }

  /**
   * Get the latest block hash for chaining
   */
  private async getLatestBlockHash(): Promise<string> {
    const { data: latestBlock } = await supabase
      .from('blockchain_blocks')
      .select('hash')
      .eq('user_id', this.userId)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    return latestBlock?.hash || 'genesis';
  }

  /**
   * Generate hash for block data
   */
  private generateHash(data: any): string {
    const dataString = JSON.stringify(data);
    return CryptoJS.SHA256(dataString).toString();
  }

  /**
   * Encrypt data using AES
   */
  private encryptData(data: string, key: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  /**
   * Decrypt data using AES
   */
  private decryptData(encryptedData: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Create digital signature for block
   */
  private createSignature(hash: string, key: string): string {
    return CryptoJS.HmacSHA256(hash, key).toString();
  }

  /**
   * Get user's complete blockchain
   */
  async getUserChain(): Promise<BlockchainBlock[]> {
    const { data: blocks, error } = await supabase
      .from('blockchain_blocks')
      .select('*')
      .eq('user_id', this.userId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return blocks || [];
  }
}