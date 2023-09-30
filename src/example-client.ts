import BookSearchApiClient from "./book-search-api-client";
import BookStoreAlpha, { BookStoreAlphaByAuthorParams } from "./book-store-alpha";

// Book Store Alpha

const bookStoreAlpha = new BookStoreAlpha();
const bookStoreAlphaClient = new BookSearchApiClient(bookStoreAlpha);

const bookStoreAlphaBooksByAuthor = await bookStoreAlphaClient.getBooks<BookStoreAlphaByAuthorParams>(
    bookStoreAlpha.booksByAuthorUrl,
    bookStoreAlpha.getBooksByAuthorParams("Shakespeare")
);

console.log(bookStoreAlphaBooksByAuthor);

// Book Store Beta

// TODO
