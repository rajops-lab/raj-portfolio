import Tesseract from 'tesseract.js';

export class OCRService {
  /**
   * Extract text from image file
   */
  async extractTextFromImage(file: File): Promise<{ text: string; confidence: number; error: string | null }> {
    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      return {
        text: result.data.text,
        confidence: result.data.confidence,
        error: null,
      };
    } catch (error) {
      console.error('OCR error:', error);
      return {
        text: '',
        confidence: 0,
        error: 'Failed to extract text from image',
      };
    }
  }

  /**
   * Extract text from PDF (basic implementation)
   */
  async extractTextFromPDF(file: File): Promise<{ text: string; error: string | null }> {
    try {
      // For a complete implementation, you'd use pdf-parse or similar
      // This is a placeholder that returns the filename
      return {
        text: `PDF file: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
        error: null,
      };
    } catch (error) {
      console.error('PDF extraction error:', error);
      return {
        text: '',
        error: 'Failed to extract text from PDF',
      };
    }
  }

  /**
   * Process uploaded file and extract text
   */
  async processFile(file: File): Promise<{ text: string; confidence?: number; error: string | null }> {
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      return await this.extractTextFromImage(file);
    } else if (fileType === 'application/pdf') {
      return await this.extractTextFromPDF(file);
    } else {
      return {
        text: '',
        error: 'Unsupported file type. Please upload an image or PDF.',
      };
    }
  }
}

export const ocrService = new OCRService();