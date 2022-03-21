import { useState, useEffect, useRef } from "react";
import BookSearchItem  from "./BookSearchItem";
import { fetchBooks } from "../api/BookSearch";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
}

type BookSearchDialogState = {
  books: BookDescription[];
  isSearching: boolean;
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const [state, setState] = useState<BookSearchDialogState>({
    books: [],
    isSearching: false,
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(state.isSearching) {
      (async () => {
        const books = await fetchBooks(titleRef.current!.value, authorRef.current!.value, props.maxResults);
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

  const handleSearchClick = () => {
    if(!titleRef.current!.value && !authorRef.current!.value){
      alert("条件を入力してください。");
      return;
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
            ref={titleRef}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            ref={authorRef}
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