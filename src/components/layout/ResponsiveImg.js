import React from 'react';

const ResponsiveImg = ({ src }) => {
  return (
    <div className='responsive-image'>
      <img src={src} className='responsive-image__image' />
    </div>
  );
};

export default ResponsiveImg;
