const buildSearchUrl = (title: string, author: string, maxResults: number) => {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = [];

  if (title) conditions.push(`intitle:${title}`);
  if (author) conditions.push(`inauthor:${author}`);

  return baseUrl + conditions.join("+") + `&maxResults=${maxResults}`;
};

const extractBooks = (json: any) => {
  const items: any[] = json.items;
  
  return items.map((item: any) => {
    const volumeInfo: any = item.volumeInfo;
    return({
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(", ") : "",
      thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
    } as BookDescription);
  });
}

export const fetchBooks = async (title: string, author: string, maxResults: number) => {
  const url = buildSearchUrl(title, author, maxResults);
  const res = await fetch(url)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.error(err);
  })

  return extractBooks(res);
}