import React from 'react';

const CarouselEdit = ({ photoURLs }) => {
  console.log('photoURLs', photoURLs);
  return (
    <div>
      <div className="carousel max-w-xs max-h-xs">
        {/* <div id="item1" className="carousel-item w-full">
          <img src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
        </div> */}
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
            <a href={`#item${index + 1}`} key={index} className="btn btn-xs">{index + 1}</a>
            );
          })
          : null}
      </div>
    </div>
  );
};

export default CarouselEdit;
