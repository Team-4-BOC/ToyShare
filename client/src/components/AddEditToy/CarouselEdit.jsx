import React, { useEffect } from 'react';

const CarouselEdit = ({ photoURLs, setSelectedPhoto, deletePhoto }) => {
  console.log('photoURLs', photoURLs);

  useEffect(() => {
    setSelectedPhoto(photoURLs[0]);
  }, []);
  return (
    <div>
      <div className="carousel max-w-xs max-h-xs">
        {photoURLs
          ? photoURLs.map((url, index) => {
            return (
            <div id={`item${index + 1}`} key={index} className="carousel-item w-full">
            <img src={url} />
          </div>
            );
          })
          : null}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {photoURLs
          ? photoURLs.map((url, index) => {
            return (
            <a href={`#item${index + 1}`} key={index} className="btn btn-xs" onClick={(event) => { setSelectedPhoto(url); }}>{index + 1}</a>
            );
          })
          : null}
      </div>
      <div className="flex justify-center">
      <button className="btn btn-outline btn-warning" onClick={deletePhoto}>Delete Image</button>
      </div>
    </div>
  );
};

export default CarouselEdit;
