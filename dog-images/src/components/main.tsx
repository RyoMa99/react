import React, { useState, useEffect } from "react";

import { fetchImages } from "../api/fetch";

import Form from "./form";
import Gallery from "./gallery";

const Main: React.VFC = () => {
  const [urlList, setUrlList] = useState(null);

  useEffect(() => {
    fetchImages("shiba")
      .then((urls) => {
        setUrlList(urls);
      });
  },[]);

  const reloadImages = (breed: string) => {
    fetchImages(breed)
      .then((urls) => {
        setUrlList(urls);
      });
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages}/>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urlList={urlList} />
        </div>
      </section>
    </main>
  );
};

export default Main;
