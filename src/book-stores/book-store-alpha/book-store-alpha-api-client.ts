import axios from "axios";
import * as xml2js from "xml-js";
import { Book, ValidApiFormats } from "../book-store";
import { handleAxiosError } from "../../helpers/axios-helper";

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

/**
 * API Client for accessing the Book Store Alpha API.
 * Defaults to 'json' request.
 * Throws error if request fails for any reason.
 */
export default class BookStoreAlphaApiClient {
    private baseUrl: string = "http://api.book-store-alpha-example.com/";
    private booksByAuthorUrl: string = `${this.baseUrl}by-author`;
    private booksByPublisherUrl: string = `${this.baseUrl}by-publisher`;

    constructor(private format: ValidApiFormats = "json") {}

    /**
     * Gets books from the Book Store Alpha API by author name.
     * @param authorName The name of the author to query by.
     * @param limit Maximum number of books to return. Defaults to 100.
     * @returns A list of Books filtered by author name.
     */
    public async getBooksByAuthor(authorName: string, limit = 100): Promise<Book[]> {
        return await this.getBooks(this.booksByAuthorUrl, {
            q: authorName,
            limit,
            format: this.format,
        });
    }

    /**
     * Gets books from the Book Store Alpha API by publisher name.
     * @param publisherName The name of the publisher to query by.
     * @param limit Maximum number of books to return. Defaults to 100.
     * @returns A list of Books filtered by publisher name.
     */
    public async getBooksByPublisher(publisherName: string, limit = 100): Promise<Book[]> {
        return await this.getBooks(this.booksByPublisherUrl, {
            q: publisherName,
            limit,
            format: this.format,
        });
    }

    /**
     * Gets books from a specified URL endpoint using the specified params.
     * @param url The url of the GET request
     * @param params The params for the GET request
     * @returns A list of Books
     */
    private async getBooks(url: string, params: any): Promise<Book[]> {
        try {
            const response = await axios.get(url, { params });

            if (this.format === "xml") {
                return this.convertXmlToBooks(response.data);
            }
            return this.convertDataToBooks(response.data);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    /**
     * Takes the raw book data from the API and converts into our specified Book format.
     * @param rawBooks The books in a format returned by the API.
     * @returns The Books as a list in the expected format.
     */
    private convertDataToBooks(rawBooks: BookStoreAlphaBook[]): Book[] {
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

    /**
     * Takes the raw xml book data from the API and converts into our specified Book format.
     * @param rawXmlBooks The XML to convert.
     * @returns The Books as a list in the expected format.
     */
    private convertXmlToBooks(rawXmlBooks: any): Book[] {
        // Note: Without knowing the exact data structure, it's difficult to write an XML parser
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
