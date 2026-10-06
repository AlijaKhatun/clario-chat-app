import React from 'react';
import Flex from '../styles/Flex';

const Or = () => {
  return (
    <Flex style='justify-center items-center py-1'>
      <div className="h-px w-5/12 bg-ct-green opacity-50"></div>
      <div className='px-1 md:px-2 text-ct-green'>Or</div>
      <div className="h-px w-5/12 bg-ct-green opacity-50"></div>
    </Flex>
  );
}

export default Or