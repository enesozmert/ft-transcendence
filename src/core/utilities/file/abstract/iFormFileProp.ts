import { IFileProp } from './IFileProp';

export interface IFormFileProp extends IFileProp {
    formFiles: Express.Multer.File[];
    formFile: Express.Multer.File;
}