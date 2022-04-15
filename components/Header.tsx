import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import {HiSearch} from 'react-icons/hi'
import {IoNotificationsOutline} from 'react-icons/io5'

const Header = () => { 
  const [isScollded , setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0){
        setIsScrolled(true)
      }else{
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll' , handleScroll)

    return () => {
      window.removeEventListener('scroll' , handleScroll)
    }
  } , [])
  return (
    <header className={`${isScollded && 'bg-[#141414]'} transition duration-500`}>
      <div className="flex items-center justify-between w-full space-x-2 md:space-x-10">
        <img src="https://rb.gy/ulxxee" alt="Logo" width={100} height={100} className="cursor-pointer object-contain" />
        <ul className="hidden space-x-6 md:flex ">
          <li className="headerLink">
            <a href="/">Home</a>
          </li>
          <li className="headerLink">
              <a>Tv Shows</a>
          </li>
          <li className="headerLink">
              <a>Movies</a>
          </li>
          <li className="headerLink">
              <a>New & Popular</a>
          </li>
          
          <li className="headerLink">
              <a>My List</a>
          </li>
        </ul>
        <div className='flex items-center space-x-4 text-sm'>
          <HiSearch className="h-6 w-6" />
          <IoNotificationsOutline className="h-6 w-6" />
          <Link href="/account">
            <img src='https://randomuser.me/api/portraits/women/44.jpg' className='cursor-pointer rounded w-8 h-8' />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header