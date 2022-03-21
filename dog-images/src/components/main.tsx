import React from "react";

import Gallery from "./gallery";

import { urlList } from "../dummyData";

const Main: React.VFC = () => {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Gallery urlList={urlList} />
        </div>
      </section>
    </main>
  );
};

export default Main;
