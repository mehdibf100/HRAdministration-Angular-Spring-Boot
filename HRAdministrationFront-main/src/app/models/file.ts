export interface File {
    id: number;
    filename: string;
    contentType: string;
    data: string | ArrayBuffer | null;  
}