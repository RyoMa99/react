const APP_KEY = "book-live";

export const setItems = (books: BookToRead[]) => {
  localStorage.setItem(APP_KEY,JSON.stringify(books));
}

export const getItems = () => {
  const storedBooks = localStorage.getItem(APP_KEY);
  if (storedBooks) return JSON.parse(storedBooks) as BookToRead[];
  else return null;
  
}