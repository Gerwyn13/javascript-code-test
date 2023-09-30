import axios from 'axios';
import * as xmlToJs from 'xml-js';
import { Book, IBookStore } from './book-store';

export default class BookSearchApiClient {
    constructor(private bookStore: IBookStore) { }

    public async getBooks<T>(url: string, params: T): Promise<Book[]> {
        try {
            const response = await axios.get(
                url,
                { params }
            );

            let data = response.data;

            if (this.bookStore.format === "xml") {
                data = xmlToJs.xml2js(data, { compact: true });
            }

            return this.bookStore.convertRawDataToBooks(data);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

