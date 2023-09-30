import BookSearchApiClient from "./book-search-api-client";
import BookStoreAlpha, { BookStoreAlphaParams } from "./book-store-alpha";

const bookStoreAlphaClient = new BookSearchApiClient(new BookStoreAlpha());
const booksByAuthor = await bookStoreAlphaClient.getBooksByAuthor<BookStoreAlphaParams>(
    { q: "Shakespeare", format: "json", limit: 100 }
);
