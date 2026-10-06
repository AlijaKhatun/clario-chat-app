import React from 'react'

const SubHeadline = ({text,style}) => {
  return <h3 className={`font-DMSans font-bold text-gray-600 text-sm md:text-base  ${style}`}>{text}</h3>
}

export default SubHeadline