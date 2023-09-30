import { ValidApiFormats } from "./book-search-api-client";
import { IBookStore } from "./book-store";

export interface BookStoreAlphaParams {
    q: string,
    limit: number,
    format: ValidApiFormats,
}

export default class BookStoreAlpha implements IBookStore {
    private _baseUrl: string = "http://api.book-store-alpha-example.com/";
    private _booksByAuthorUrl: string = `${this._baseUrl}by-author`;
    
    public get booksByAuthorUrl() {
        return this._booksByAuthorUrl;
    }
}