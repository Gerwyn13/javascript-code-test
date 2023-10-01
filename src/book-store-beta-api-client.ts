import axios from "axios";
import { Book, ValidApiFormats } from "./book-store";
import { handleAxiosError } from "./axios-helper";

interface BookStoreBetaBook {
    bookTitle: string;
    bookAuthor: string;
    bookIsbn: string;
    stockQuantity: number;
    stockPrice: string;
}

/**
 * API Client for accessing the Book Store Beta API.
 * Defaults to 'json' request.
 * Throws error if request fails for any reason.
 */
export default class BookStoreBetaApiClient {
    private baseUrl: string = "http://api.book-store-beta-example.com/";
    private booksByAuthorUrl: string = `${this.baseUrl}author`;

    constructor(private format: ValidApiFormats = "json") {}

    /**
     * Gets books from the Book Store Beta API by author name.
     * @param authorName The name of the author to query by.
     * @param limit Maximum number of books to return. Defaults to 50.
     * @returns A list of Books filtered by author name.
     */
    public async getBooksByAuthor(authorName: string, limit = 50): Promise<Book[]> {
        return await this.getBooks(this.booksByAuthorUrl, {
            authorName,
            limit,
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
            const response = await axios.get(url, {
                params,
                headers: { "Content-Type": `application/${this.format}` },
            });

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
    private convertDataToBooks(rawBooks: BookStoreBetaBook[]): Book[] {
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

    /**
     * Takes the raw xml book data from the API and converts into our specified Book format.
     * @param rawXmlBooks The XML to convert.
     * @returns The Books as a list in the expected format.
     */
    private convertXmlToBooks(rawXmlBooks: any): Book[] {
        // Note: Without knowing the exact data structure, it's difficult to write an XML parser
        throw new Error("Function not implemented on purpose");
    }
}
