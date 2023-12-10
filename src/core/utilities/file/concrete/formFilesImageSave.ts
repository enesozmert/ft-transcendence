import { ImageSaveBase } from "./base/imageSaveBase";
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { IFormFileProp } from "../abstract/iFormFileProp";
import { GetExtension } from "./utils/getExtension";
import { GetFileName } from "./utils/getFileName";

export class FormFilesImageSave implements ImageSaveBase{
    public save(formFileProp: IFormFileProp): string[] {
        const result: string[] = [];

        for (let i = 0; i < formFileProp.formFiles.length; i++) {
            if (!formFileProp.name) {
                formFileProp.name = GetFileName(formFileProp.oldPath);
            }

            formFileProp.name = uuidv4();
            const imagePathAndName = `${formFileProp.newPath}${formFileProp.name}${GetExtension(formFileProp.formFiles[i].filename)}`;

            if (formFileProp.formFiles[i].filename) {
                const sourceStream = fs.createReadStream(formFileProp.formFiles[i].filename);
                const destinationStream = fs.createWriteStream(imagePathAndName);

                sourceStream.pipe(destinationStream);

                sourceStream.on('end', () => {
                    console.log('File copied successfully.');
                });

                sourceStream.on('error', (err) => {
                    console.error('Error copying file:', err);
                });
            }

            result[i] = `${formFileProp.name}${GetExtension(formFileProp.formFiles[i].filename)}`;
        }

        return result;
    }
}