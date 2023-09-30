import BookSearchApiClient from "./book-search-api-client";
import BookStoreAlpha, { BookStoreAlphaByAuthorParams } from "./book-store-alpha";
import BookStoreBeta, { BookStoreBetaByAuthorParams, BookStoreBetaByPublisherParams } from "./book-store-beta";

// Book Store Alpha
const bookStoreAlpha = new BookStoreAlpha();
const bookStoreAlphaClient = new BookSearchApiClient(bookStoreAlpha);

const bookStoreAlphaBooksByAuthor = await bookStoreAlphaClient.getBooks<BookStoreAlphaByAuthorParams>(
    bookStoreAlpha.booksByAuthorUrl,
    bookStoreAlpha.getBooksByAuthorParams("Shakespeare"),
);

// Book Store Beta
const bookStoreBeta = new BookStoreBeta();
const bookStoreBetaClient = new BookSearchApiClient(bookStoreBeta);

const bookStoreBetaBooksByAuthor = await bookStoreBetaClient.getBooks<BookStoreBetaByAuthorParams>(
    bookStoreBeta.booksByAuthorUrl,
    bookStoreBeta.getBooksByAuthorParams("Brandon Sanderson", 10, "xml"),
);

const bookStoreBetaBooksByPublisher = await bookStoreBetaClient.getBooks<BookStoreBetaByPublisherParams>(
    bookStoreBeta.booksByPublisherUrl,
    bookStoreBeta.getBooksByPublisherParams("Puffin", 50),
);


// TODO: Add tests
