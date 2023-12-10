export function GetFileName(path: string): string {
    const pathParts = path.split(/[\\/]/);
    const fileName = pathParts[pathParts.length - 1];
    const dotIndex = fileName.lastIndexOf('.');
    
    return dotIndex !== -1 ? fileName.substring(0, dotIndex) : fileName;
}