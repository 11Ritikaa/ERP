export function generateOrderedId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    // Convert the timestamp to a custom base (A-Z, 0-9)
    const timestamp = Date.now().toString(36).toUpperCase().padStart(15, '0'); // Ensure 15 characters long
    const randomPart = Array.from({ length: 5 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');

   return `${timestamp}-${randomPart}`; // Combine with a hyphen
}  

export const generateVariantId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const idLength = 13;
  
    const id = Array.from({ length: idLength }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  
    return `VAR-${id}`;
  };