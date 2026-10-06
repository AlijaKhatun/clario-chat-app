import React from 'react'

const Button = ({text,href,style}) => {
  return (
    <button className={`font-roboto font-semibold cursor-pointer ${style}`}>
      <a href={href}>{text}</a>
    </button>
  );
}

export default Button