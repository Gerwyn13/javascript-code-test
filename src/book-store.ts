export type ValidApiFormats = "json" | "xml";

export interface IBookStore {
    format: ValidApiFormats;
    convertRawDataToBooks: (rawBooks: any[]) => Book[];
}

export interface Book {
    title: string,
    author: string,
    isbn: string,
    quantity: number,
    price: string,
}
