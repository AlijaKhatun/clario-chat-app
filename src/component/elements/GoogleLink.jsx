import React from 'react'
import google from '../../assets/google.png'
import Flex from '../styles/Flex'
import Img from './Img'

const GoogleLink = ({onClick}) => {
  return (
    <div onClick={onClick}>
      <Flex style="justify-center items-center gap-1 cursor-pointer">
        <Img src={google} alt="goggle" />
        <p>continue with goggle</p>
      </Flex>
    </div>
  );
}

export default GoogleLink