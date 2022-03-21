import React from "react";

import Image from "./image";

const Gallery: React.VFC = () => {

  return (
    <div className="columns is-vcentered is-multiline">
      <div className="column is-3">
        <Image url="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"/>
      </div>
    </div>
  );
};

export default Gallery;
