import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    
    // Cleanup function to restore previous title if needed
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useDocumentTitle;