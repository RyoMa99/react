import React from "react";

import Gallery from "./gallery";

const Main: React.VFC = () => {

  return (
    <main>
      <section className="section">
        <div className="container">
          <Gallery />
        </div>
      </section>
    </main>
  );
};

export default Main;
