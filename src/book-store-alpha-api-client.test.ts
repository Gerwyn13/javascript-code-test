import axios from "axios";
import { Book } from "./book-store";
import BookStoreAlphaApiClient, { BookStoreAlphaBook } from "./book-store-alpha-api-client";

jest.mock("axios");

describe("Testing book-store-alpha-api-client.ts", () => {
    const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
    const mockRawDataBooks: BookStoreAlphaBook[] = [
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
        mockAxiosGet.mockResolvedValue({ data: mockRawDataBooks });

        // Act
        const bookStoreAlphaClient = new BookStoreAlphaApiClient();
        const actualBooks = await bookStoreAlphaClient.getBooksByAuthor("Brandon Sanderson");

        // Assert
        expect(actualBooks).toEqual(expectedBooks);
    });
});
