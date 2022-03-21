import React from "react";

import Image from "./image";
import Loading from "./loading";

type GalleryProps = {
  urlList: string[] | null
}

const Gallery: React.VFC<GalleryProps> = ({urlList}) => {
  if(!urlList?.length){
    return(
      <Loading />
    );
  }

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
