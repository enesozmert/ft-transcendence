import { IFormFileProp } from "../abstract/iFormFileProp";
import { ImageSaveBase } from "./base/imageSaveBase";
import * as fs from 'fs';
import { Injectable } from "@nestjs/common";

import { GetExtension } from "./utils/getExtension";
import { GetFileName } from "./utils/getFileName";

@Injectable()
export class FormFileImageSave implements ImageSaveBase {
    public save(formFileProp: IFormFileProp): string[] {
        const result: string[] = [];

        if (!formFileProp.name) {
            formFileProp.name = GetFileName(formFileProp.oldPath);
        }

        const imagePathAndName = `${formFileProp.newPath}${formFileProp.name}${GetExtension(formFileProp.formFile.filename)}`;

        if (formFileProp.formFile.filename) {
            const sourceStream = fs.createReadStream(formFileProp.formFile.filename);
            const destinationStream = fs.createWriteStream(imagePathAndName);

            sourceStream.pipe(destinationStream);

            sourceStream.on('end', () => {
                console.log('File copied successfully.');
            });

            sourceStream.on('error', (err) => {
                console.error('Error copying file:', err);
            });
        }

        result[0] = `${formFileProp.name}${GetExtension(formFileProp.formFile.filename)}`;
        return result;
    }
}