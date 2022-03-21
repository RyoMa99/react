import { useState, useRef } from "react";
import BookSearchItem  from "./BookSearchItem";
import useBookData from "../hooks/useBookData";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
}

type BookSearchDialogState = {
  title: string;
  author: string;
}

const BookSearchDialog = (props: BookSearchDialogProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<BookSearchDialogState>({
    title: "",
    author: "",
  })

  const [bookData, setBookDataState] = useBookData(state.title, state.author, props.maxResults);

  const handleSearchClick = () => {
    if(!titleRef.current!.value && !authorRef.current!.value){
      alert("条件を入力してください。");
      return;
    }

    setState({
      title: titleRef.current!.value,
      author: authorRef.current!.value,
    });
  };

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = bookData.books.map((b, idx) => {
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
      </div>
      <div className="search-results">
        {bookItems}
      </div>
    </div>
  );
};

export default BookSearchDialog;