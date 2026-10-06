import React from 'react';

const Img = ({ src, alt, style }) => {
  return <img src={src} alt={alt} className={`${style}`} />;
};

export default Img;
