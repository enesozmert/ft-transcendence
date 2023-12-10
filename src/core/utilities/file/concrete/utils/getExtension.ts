export function GetExtension(path) {
    let baseName = path.split(/[\\/]/).pop(),
        pos = baseName.lastIndexOf(".");
    if (baseName === "" || pos < 1)
        return "";
    return baseName.slice(pos + 1);
}