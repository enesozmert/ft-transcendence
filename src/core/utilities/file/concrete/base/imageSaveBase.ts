import { IFormFileProp } from "../../abstract/iFormFileProp";
import { IImageSaveBase } from "../../abstract/iImageSaveBase";

export abstract class ImageSaveBase implements IImageSaveBase {
    abstract save(formFileProp: IFormFileProp): Iterable<string>;
}

