import React from "react";

import Image from "./image";

const Gallery: React.VFC = () => {

  return (
    <div className="columns is-vcentered is-multiline">
      <div className="column is-3">
        <Image />
      </div>
    </div>
  );
};

export default Gallery;
