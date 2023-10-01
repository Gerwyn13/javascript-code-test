export type ValidApiFormats = "json" | "xml";

export interface Book {
    title: string,
    author: string,
    isbn: string,
    quantity: number,
    price: string,
}
