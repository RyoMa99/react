import React, { useState, useEffect } from "react";
import BookSearchItem  from "./BookSearchItem";
import { fetchBooks } from "../api/BookSearch";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
}

type BookSearchDialogState = {
  books: BookDescription[];
  title: string;
  author: string;
  isSearching: boolean;
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const [state, setState] = useState<BookSearchDialogState>({
    books: [],
    title: "",
    author: "",
    isSearching: false,
  });

  useEffect(() => {
    if(state.isSearching) {
      (async () => {
        const books = await fetchBooks(state.title, state.author, props.maxResults);
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
  },[state.isSearching]);

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return({
        ...prev,
        title: e.target.value,
      });
    });
  };

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return({
        ...prev,
        author: e.target.value,
      });
    });
  };

  const handleSearchClick = () => {
    if(!state.title && !state.author){
      alert("条件を入力してください。")
    }
    setState((prev) => {
      return({
        ...prev,
        isSearching: true,
      });
    }); 
  }

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = state.books.map((b, idx) => {
    return(
      <BookSearchItem
        description={b}
        onBookAdd={(b) => handleBookAdd(b)}
        key={idx}
      />
    );
  });

  return(
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input
            type="text"
            onChange={handleTitleInputChange}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            onChange={handleAuthorInputChange}
            placeholder="著者名で検索"
          />
          <div className="button-like" onClick={handleSearchClick}>
            検索
          </div>
        </div>
        <div className="search-results">
          {bookItems}
        </div>
      </div>
    </div>
  );
};

export default BookSearchDialog;