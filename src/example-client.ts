import BookStoreAlphaApiClient from "./book-store-alpha-api-client";
import BookStoreBetaApiClient from "./book-store-beta-api-client";

// Note: You would need additional error handling in here because the API clients throw when an error occurs. Omitting for simplicity.

// Book Store Alpha Example
const bookStoreAlphaClient = new BookStoreAlphaApiClient();
const bookStoreAlphaBooksByAuthor = await bookStoreAlphaClient.getBooksByAuthor("Shakespeare");
const bookStoreAlphaBooksByPublisher = await bookStoreAlphaClient.getBooksByPublisher("Puffin", 10);

// Example of additional book store and requesting a different content type
const bookStoreBetaClient = new BookStoreBetaApiClient("xml");
const bookStoreBetaBooksByAuthor = await bookStoreBetaClient.getBooksByAuthor("Shakespeare", 1);
