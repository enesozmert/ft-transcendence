export interface FormFileProp {
    formFiles: Express.Multer.File[];
    formFile: Express.Multer.File;
    name: string;
    oldPath: string;
    newPath: string;
}