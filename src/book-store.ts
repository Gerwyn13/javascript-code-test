export interface IBookStore {
    convertRawDataToBooks: (rawBooks: any[]) => Book[];
}

export interface Book {
    title: string,
    author: string,
    isbn: string,
    quantity: number,
    price: string,
}
