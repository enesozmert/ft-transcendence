import { IFileProp } from './IFileProp';

export interface IFormFileProp extends IFileProp {
    formFiles: File[];
    formFile: File;
}