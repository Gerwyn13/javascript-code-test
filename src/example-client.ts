import { logger } from "./logger";
import BookStoreAlphaApiClient from "./book-store-alpha-api-client";
import BookStoreBetaApiClient from "./book-store-beta-api-client";

// Book Store Alpha Example
const bookStoreAlphaClient = new BookStoreAlphaApiClient();
const bookStoreAlphaBooksByAuthor = await bookStoreAlphaClient.getBooksByAuthor("Shakespeare");
const bookStoreAlphaBooksByPublisher = await bookStoreAlphaClient.getBooksByPublisher("Puffin", 10);
logger.info(bookStoreAlphaBooksByAuthor);
logger.info(bookStoreAlphaBooksByPublisher);

// Example of additional book store and requesting a different content type
const bookStoreBetaClient = new BookStoreBetaApiClient("xml");
const bookStoreBetaBooksByAuthor = await bookStoreBetaClient.getBooksByAuthor("Shakespeare", 1);
logger.info(bookStoreBetaBooksByAuthor);

// TODO: Add tests
