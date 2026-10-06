import React from 'react'

const Flex = ({children,style}) => {
  return <div className={`flex ${style}`}>{children}</div>
}

export default Flex