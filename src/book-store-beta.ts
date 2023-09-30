import { ValidApiFormats } from "./book-search-api-client";
import { Book, IBookStore } from "./book-store";

export interface BookStoreBetaByAuthorParams {
    authorName: string,
    limit: number,
    format: ValidApiFormats,
}

export interface BookStoreBetaBook {
    bookTitle: string,
    bookAuthor: string,
    bookIsbn: string,
    stockQuantity: number,
    stockPrice: string,
}

export default class BookStoreBeta implements IBookStore {
    private _baseUrl: string = "http://api.book-store-beta-example.com/";
    private _booksByAuthorUrl: string = `${this._baseUrl}author`;

    public get booksByAuthorUrl() {
        return this._booksByAuthorUrl;
    }

    public getBooksByAuthorParams(authorName: string, limit: number = 100, format: ValidApiFormats = "json"): BookStoreBetaByAuthorParams {
        return {
            authorName,
            limit,
            format,
        }
    }

    public convertRawDataToBooks(rawBooks: BookStoreBetaBook[]): Book[] {
        return rawBooks.map((item: BookStoreBetaBook): Book => {
            return {
                title: item.bookTitle,
                author: item.bookAuthor,
                isbn: item.bookIsbn,
                quantity: item.stockQuantity,
                price: item.stockPrice,
            }
        });
    }
}