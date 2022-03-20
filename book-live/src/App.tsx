import { useState } from "react";

import "./App.css";
import BookRow from "./BookRow";
import { dummyBooks } from "./dummyData";

const App = () => {
  const [books, setBooks] = useState(dummyBooks);
  
  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id);
    setBooks(newBooks);
  }

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id
        ? {...b, memo: memo}
        : b;
    })

    setBooks(newBooks);
  }

  const bookRows = books.map(b => {
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
        <div className="button-like">本を追加</div>
      </section>
      <section className="main">
        <section>{bookRows}</section>
      </section>
    </div>
  );
};

export default App;
