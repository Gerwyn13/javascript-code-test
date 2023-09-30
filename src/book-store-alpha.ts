import { ValidApiFormats } from "./book-search-api-client";
import { Book, IBookStore } from "./book-store";

export interface BookStoreAlphaByAuthorParams {
    q: string,
    limit: number,
    format: ValidApiFormats,
}

export interface BookStoreAlphaBook {
    book: {
        title: string,
        author: string,
        isbn: string,
    },
    stock: {
        quantity: number,
        price: string,
    }
}

export default class BookStoreAlpha implements IBookStore {
    private _baseUrl: string = "http://api.book-store-alpha-example.com/";
    private _booksByAuthorUrl: string = `${this._baseUrl}by-author`;

    public get booksByAuthorUrl() {
        return this._booksByAuthorUrl;
    }

    public getBooksByAuthorParams(authorName: string, limit: number = 100, format: ValidApiFormats = "json"): BookStoreAlphaByAuthorParams {
        return {
            q: authorName,
            limit,
            format,
        }
    }

    public convertRawDataToBooks(rawBooks: BookStoreAlphaBook[]): Book[] {
        return rawBooks.map((item: BookStoreAlphaBook): Book => {
            return {
                title: item.book.title,
                author: item.book.author,
                isbn: item.book.isbn,
                quantity: item.stock.quantity,
                price: item.stock.price,
            }
        });
    }
}