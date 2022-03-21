import { useState } from "react";
import Modal from "react-modal";

import "./App.css";
import BookRow from "./components/BookRow";
import BookSearchDialog from "./components/BookSearchDialog";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)"
  },
};

type state = {
  books: BookToRead[];
  modalIsOpen: boolean;
}

const App = () => {
  const [state, setState] = useState<state>({
    books: [],
    modalIsOpen: false,
  });
  
  const handleBookDelete = (id: number) => {
    const newBooks = state.books.filter((b) => b.id !== id);
    setState((prev) => {
      return({
        ...prev,
        books: newBooks,
      });
    });
  }

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = state.books.map((b) => {
      return b.id === id
        ? {...b, memo: memo}
        : b;
    });

    setState((prev) => {
      return({
        ...prev,
        books: newBooks,
      });
    });
  }

  const handleAddClick = () => {
    setState((prev) => {
      return({
        ...prev,
        modalIsOpen: true,
      });
    });
  };

  const handleModalClose = () => {
    setState((prev) => {
      return({
        ...prev,
        modalIsOpen: false,
      });
    });
  };

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: ""};
    const newBooks = [...state.books, newBook];
    setState((prev) => {
      return({
        ...prev,
        books: newBooks,
        modalIsOpen: false,
      })
    })
  }

  const bookRows = state.books.map(b => {
    return(
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    );
  });


  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>本を追加</div>
      </section>
      <section className="main">
        {bookRows}
      </section>
      <Modal
        isOpen={state.modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={(b) => handleBookAdd(b)} />
      </Modal>
    </div>
  );
};

export default App;
