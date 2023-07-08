import React from 'react';

const PhotoCarousel = ({ toy, handleSave, setPage, desktopMode }) => {
  return (
    <div className={`relative ${desktopMode ? 'max-w-[140px] mx-auto' : ''}`}>
      {!desktopMode ? <div className='btn rounded-md btn-sm text-xs btn-square bg-gray-900 text-white top-2 left-4 z-10 absolute' onClick={() => setPage(0)}>❮</div> : null}
      <button className="btn rounded-md btn-sm btn-square bg-gray-900 top-2 right-4 z-10 absolute" onClick={handleSave}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={toy.saved ? 'red' : 'none'} viewBox="0 0 24 24" stroke="red"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </button>
      <div className="carousel relative">
      {toy.photos
        ? toy.photos.map((curUrl, idx) => {
          const prevPhoto = idx - 1 > -1 ? '#slide' + (idx - 1) : '#slide' + (toy.photos.length - 1);
          const nextPhoto = idx + 1 < toy.photos.length ? '#slide' + (idx + 1) : '#slide0';
          return (
          <div id={'slide' + idx} className="carousel-item relative w-full" key={idx / 10}>
            <div className='absolute bg-white/75 rounded p-1 bottom-1 right-1'>{idx + 1}/{toy.photos.length}</div>
            <img data-testid='it-photo' src={curUrl} className="w-full object-cover" />
            {desktopMode
              ? <div className="absolute flex gap-x-16 transform -translate-y-1/2 top-1/2" style={{ transform: 'translateX(10%)' }}>
                <a href={prevPhoto} className="btn-xs btn-circle bg-gray-800/80 text-white text-center">❮</a>
                <a href={nextPhoto} className="btn-xs btn-circle text-white  bg-gray-800/80 text-center">❯</a>
            </div>
              : null}
          </div>
          );
        })
        : null}
      </div>
    </div>
  );
};

export default PhotoCarousel;
