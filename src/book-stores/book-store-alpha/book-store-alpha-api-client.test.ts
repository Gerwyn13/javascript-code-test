import axios from "axios";
import * as xml2js from "xml-js";
import { Book } from "../book-store";
import BookStoreAlphaApiClient, { BookStoreAlphaBook } from "./book-store-alpha-api-client";

jest.mock("axios");

describe("Testing book-store-alpha-api-client.ts", () => {
    const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
    const testRawDataBooks: BookStoreAlphaBook[] = [
        {
            book: {
                author: "Brandon Sanderson",
                isbn: "978-0-9767736-6-5",
                title: "The Way of Kings",
            },
            stock: {
                price: "12.99",
                quantity: 10,
            },
        },
    ];
    const testRawDataBooksXml = `<books><book>${xml2js.js2xml(testRawDataBooks[0], { compact: true })}</book></books>`;

    test("getBooksByAuthor returns the expected books in the correct format with 'json' request", async () => {
        // Arrange
        const expectedBooks: Book[] = [
            {
                author: "Brandon Sanderson",
                isbn: "978-0-9767736-6-5",
                price: "12.99",
                quantity: 10,
                title: "The Way of Kings",
            },
        ];

        // Mock the axios GET call
        mockAxiosGet.mockResolvedValue({ data: testRawDataBooks });

        // Act
        const bookStoreAlphaClient = new BookStoreAlphaApiClient();
        const actualBooks = await bookStoreAlphaClient.getBooksByAuthor("Brandon Sanderson");

        // Assert
        expect(actualBooks).toEqual(expectedBooks);
    });

    test("getBooksByAuthor returns the expected books in the correct format with 'xml' request", async () => {
        // Arrange
        const expectedBooks: Book[] = [
            {
                author: "Brandon Sanderson",
                isbn: "978-0-9767736-6-5",
                price: "12.99",
                quantity: "10",
                title: "The Way of Kings",
            },
        ];

        // Mock the axios GET call
        mockAxiosGet.mockResolvedValue({ data: testRawDataBooksXml });

        // Act
        const bookStoreAlphaClient = new BookStoreAlphaApiClient("xml");
        const actualBooks = await bookStoreAlphaClient.getBooksByAuthor("Brandon Sanderson");

        // Assert
        expect(actualBooks).toEqual(expectedBooks);
    });

    // More tests to implement:
    //   - Test other query endpoints e.g. get by publisher etc.
    //   - Test what happens when axios requests throw different errors.
    //   - Test different XML formats.
    //   - Test what happens when the get returns 0 items (both xml and json).
});
