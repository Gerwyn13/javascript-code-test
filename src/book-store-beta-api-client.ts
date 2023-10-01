import axios from "axios";
import * as xmlToJs from "xml-js";
import { Book, ValidApiFormats } from "./book-store";

interface BookStoreBetaBook {
    bookTitle: string;
    bookAuthor: string;
    bookIsbn: string;
    stockQuantity: number;
    stockPrice: string;
}

export default class BookStoreBetaApiClient {
    private baseUrl: string = "http://api.book-store-beta-example.com/";
    private booksByAuthorUrl: string = `${this.baseUrl}author`;

    constructor(private format: ValidApiFormats = "json") {}

    public async getBooksByAuthor(authorName: string, limit = 100): Promise<Book[]> {
        try {
            return await this.getBooks(this.booksByAuthorUrl, {
                authorName,
                limit,
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    private async getBooks(url: string, params: any): Promise<Book[]> {
        try {
            const response = await axios.get(url, {
                params,
                headers: { "Content-Type": `application/${this.format}` },
            });

            let data = response.data;

            if (this.format === "xml") {
                data = xmlToJs.xml2js(data, { compact: true });
            }

            return this.convertRawDataToBooks(data);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    private convertRawDataToBooks(rawBooks: BookStoreBetaBook[]): Book[] {
        return rawBooks.map((item: BookStoreBetaBook): Book => {
            return {
                title: item.bookTitle,
                author: item.bookAuthor,
                isbn: item.bookIsbn,
                quantity: item.stockQuantity,
                price: item.stockPrice,
            };
        });
    }
}
