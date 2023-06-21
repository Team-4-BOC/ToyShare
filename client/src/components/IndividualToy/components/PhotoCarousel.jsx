import React from 'react';

const PhotoCarousel = ({toy}) => {
  return (
    <div>
      <div className="carousel w-full">
      {toy.photos.map((curUrl, idx) => {
        const prevPhoto = idx - 1 > -1 ? '#slide' + (idx - 1) : '#slide' + (toy.photos.length - 1);
        const nextPhoto = idx + 1 < toy.photos.length ? '#slide' + (idx + 1) : '#slide0';
        return (
          <div id={'slide' + idx} className="carousel-item relative w-full" key={idx / 10}>
            <img src={curUrl} className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={prevPhoto} className="btn btn-circle">❮</a>
              <a href={nextPhoto} className="btn btn-circle">❯</a>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default PhotoCarousel;
