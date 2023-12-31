"use client";

import Image from 'next/image'
import Menu from './Menu'
import { useScreenSize } from '@/hooks';

function Navbar() {

  const {screenType} = useScreenSize();

  return (
        <nav 
          className={`${(screenType == 'Desktop') ? 'py-6 px-4 flex justify-between items-center' : 'p-4 flex justify-between items-center'}`}
          style={{minWidth: (screenType == 'Desktop') ? '1300px' : '90%', maxWidth: (screenType == 'Desktop') ? '1550px' : '90%'}}>
          <figure>
            <Image
              src='https://res.cloudinary.com/dpjk1eyh0/image/upload/v1694824934/ms-logo_torgzu.png'
              width={(screenType == 'SmartPhone' ? 150 : 200)}
              height={(screenType == 'SmartPhone' ? 150 : 200)}
              alt="MerkSalud Logo"
            />
          </figure>
          
            <Menu/>
          
        </nav>
  )
}

export default Navbar