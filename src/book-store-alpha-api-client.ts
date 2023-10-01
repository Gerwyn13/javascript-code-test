import axios from "axios";
import * as xmlToJs from "xml-js";
import { logger } from "./logger";
import { Book, ValidApiFormats } from "./book-store";

interface BookStoreAlphaBook {
    book: {
        title: string;
        author: string;
        isbn: string;
    };
    stock: {
        quantity: number;
        price: string;
    };
}

export default class BookStoreAlphaApiClient {
    private baseUrl: string = "http://api.book-store-alpha-example.com/";
    private booksByAuthorUrl: string = `${this.baseUrl}by-author`;
    private booksByPublisherUrl: string = `${this.baseUrl}by-publisher`;

    constructor(private format: ValidApiFormats = "json") {}

    public async getBooksByAuthor(authorName: string, limit = 100): Promise<Book[]> {
        return await this.getBooks(this.booksByAuthorUrl, {
            q: authorName,
            limit,
            format: this.format,
        });
    }

    public async getBooksByPublisher(publisher: string, limit = 100): Promise<Book[]> {
        return await this.getBooks(this.booksByPublisherUrl, {
            q: publisher,
            limit,
            format: this.format,
        });
    }

    private async getBooks(url: string, params: any): Promise<Book[]> {
        try {
            const response = await axios.get(url, { params });

            let data = response.data;

            if (this.format === "xml") {
                data = xmlToJs.xml2js(data, { compact: true });
            }

            return this.convertRawDataToBooks(data);
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    private convertRawDataToBooks(rawBooks: BookStoreAlphaBook[]): Book[] {
        return rawBooks.map((item: BookStoreAlphaBook): Book => {
            return {
                title: item.book.title,
                author: item.book.author,
                isbn: item.book.isbn,
                quantity: item.stock.quantity,
                price: item.stock.price,
            };
        });
    }
}
