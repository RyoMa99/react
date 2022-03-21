import React from "react";

type ImageProps = {
  url: string;
}

const Image: React.VFC<ImageProps> = ({url}) => {

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={url}
            alt="cute dog"
          />
        </figure>
      </div>
    </div>
  );
};

export default Image;
