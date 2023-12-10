import { GenerateGuid } from "../../guid/generateGuid";
import { IFileUtilities } from "../abstract/iFileUtilities";

import { GetExtension } from "./utils/getExtension";
import { GetFileName } from "./utils/getFileName";

export class FileUtilities implements IFileUtilities {
    fileExtension(path: string): string {
        const fileExtension = path.substring(path.lastIndexOf('.'), path.length - path.lastIndexOf('.'));
        return fileExtension;
    }

    getFileName(path: string): string | null {
        if (path.indexOf('/') > -1) {
            return path.substring(path.lastIndexOf('/'), path.length - path.lastIndexOf('/'));
        } else if (path.indexOf('\\') > -1) {
            return path.substring(path.lastIndexOf('\\'), path.length - path.lastIndexOf('\\'));
        }
        return null;
    }

    checkIfImageFilePath(imagePath: string): boolean {
        const extension = imagePath.substring(imagePath.lastIndexOf('.'), imagePath.length - imagePath.lastIndexOf('.'));

        const result = extension === '.jpg' || extension === '.jpeg' || extension === '.png';
        return result;
    }

    checkIfImageFiles(files: File[]): boolean {
        for (const file of files) {
            const extension = GetExtension(file.name);

            const result = extension === '.jpg' || extension === '.jpeg' || extension === '.png';
            if (!result) return false;
        }
        return true;
    }

    checkIfImageFile(file: File): boolean {
        const extension = GetExtension(file.name);

        const result = extension === '.jpg' || extension === '.jpeg' || extension === '.png';
        return result;
    }

    nameGuid(): string {
        return GenerateGuid().toString();
    }
}
