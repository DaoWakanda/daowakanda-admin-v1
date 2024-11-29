import DOMPurify from 'dompurify';

export function createSanitizedMarkup(html: string) {
  function generateSanitized() {
    try {
      const sanitized = DOMPurify.sanitize(html);
      return sanitized;
    } catch (error) {
      return html;
    }
  }
  return {
    __html: generateSanitized(),
  };
}
