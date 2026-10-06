import React from 'react'

const HeadLine = ({text,style}) => {
  return <h1 className={`font-roboto font-bold text-2xl md:text-2xl ${style}`}>{text}</h1>
}

export default HeadLine