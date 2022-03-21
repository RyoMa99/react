import { useState ,useEffect } from "react";
import { fetchBooks } from "../api/BookSearch";

type BookDataState = {
  books: BookDescription[];
}

const useBookData = (title: string, author: string, maxResults: number) => {
  const [state, setState] = useState<BookDataState>({
    books: [],
  });

  useEffect(() => {
    if(title || author) {
      (async () => {
        const books = await fetchBooks(title, author, maxResults);
        setState((prev) => {
          return({
            ...prev,
            books: books,
          });
        });
      })();
    }
    setState((prev) => {
      return({
        ...prev,
        isSearching: false,
      });
    });
  },[title,author,maxResults]);

  return [state, setState] as const;
};

export default useBookData;