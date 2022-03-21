import React from "react";

import Image from "./image";

type GalleryProps = {
  urlList: string[]
}

const Gallery: React.VFC<GalleryProps> = ({urlList}) => {

  return (
    <div className="columns is-vcentered is-multiline">
      {urlList.map((url) => {
        return(
          <div key={url} className="column is-3">
            <Image url={url} />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
