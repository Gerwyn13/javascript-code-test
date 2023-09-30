import axios from 'axios';
import { IBookStore } from './book-store';

export type ValidApiFormats = "json" | "xml";

export default class BookSearchApiClient {
  private bookStore: IBookStore;

  constructor(bookStore: IBookStore) {
    this.bookStore = bookStore;
  }

  public async getBooksByAuthor<T>(params: T) {
    // TODO:
    const byAuthorResponse = await axios.get(
      this.bookStore.booksByAuthorUrl,
      { params }
    );
  }
}

