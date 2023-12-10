import * as fs from 'fs';
import * as path from 'path';

import { IFormFileProp } from "../abstract/iFormFileProp";
import { ImageSaveBase } from "./base/imageSaveBase";
import { GetExtension } from "./utils/getExtension";
import { GetFileName } from "./utils/getFileName";

class NormalImageSave implements ImageSaveBase {
    public save(formFileProp: IFormFileProp): string[] {
        const result: string[] = [];

        if (!formFileProp.name) {
            formFileProp.name = GetFileName(formFileProp.oldPath);
        }

        const imagePathAndName = path.join(formFileProp.newPath, formFileProp.name + GetExtension(formFileProp.oldPath));

        if (formFileProp.oldPath && fs.existsSync(formFileProp.oldPath)) {
            const sourceStream = fs.createReadStream(formFileProp.oldPath);
            const destinationStream = fs.createWriteStream(imagePathAndName);

            sourceStream.pipe(destinationStream);

            sourceStream.on('end', () => {
                console.log('File copied successfully.');
            });

            sourceStream.on('error', (err) => {
                console.error('Error copying file:', err);
            });

            result[0] = formFileProp.name + GetExtension(formFileProp.oldPath);
        }

        return result;
    }
}