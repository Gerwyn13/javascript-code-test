import axios from "axios";
import * as xml2js from "xml-js";
import { logger } from "./logger";
import { Book, ValidApiFormats } from "./book-store";

export interface BookStoreAlphaBook {
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

            if (this.format === "xml") {
                return this.convertXmlToBooks(response.data);
            }
            return this.convertJsonToBooks(response.data);
        } catch (error) {
            if (error.response) {
                // Server responded with status code not in 2xx range
                logger.error(error.response);
                throw new Error(error.response);
            } else if (error.request) {
                // Request made, no response received
                logger.error(error.request);
                throw new Error(error.request);
            }
            // All other errors
            logger.error(error.message);
            throw new Error(error.message);
        }
    }

    private convertJsonToBooks(rawBooks: BookStoreAlphaBook[]): Book[] {
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

    private convertXmlToBooks(rawXmlBooks: any): Book[] {
        // Without knowing the exact data structure, it's difficult to write an XML parser
        const booksAsJs = xml2js.xml2js(rawXmlBooks, { compact: true }) as any;

        if (booksAsJs.books.book[0]) {
            return booksAsJs.books.book.map((item: any): Book => {
                return {
                    title: item.book.title._text,
                    author: item.book.author._text,
                    isbn: item.book.isbn._text,
                    quantity: item.stock.quantity._text,
                    price: item.stock.price._text,
                };
            });
        }

        // When there's only 1 item the XML parser doesn't create an array
        return [
            {
                title: booksAsJs.books.book.book.title._text,
                author: booksAsJs.books.book.book.author._text,
                isbn: booksAsJs.books.book.book.isbn._text,
                quantity: booksAsJs.books.book.stock.quantity._text,
                price: booksAsJs.books.book.stock.price._text,
            },
        ];
    }
}
