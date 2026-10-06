import React from 'react'

const Container = ({children ,style}) => {
  return <div className={`w-1/2 mx-auto ${style}`}>{children}</div>
}

export default Container