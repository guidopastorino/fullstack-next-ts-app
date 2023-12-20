'use client'

import React from 'react'
import { GoHome, GoHomeFill } from "react-icons/go";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { BsGear, BsGearFill } from "react-icons/bs";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface navigations {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  text: string;
  route: string;
}

const AsideLeft = () => {
  const pathname = usePathname()

  const navigations: navigations[] = [
    {
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
      text: "Home",
      route: "/"
    },
    {
      icon: <BsPeople />,
      activeIcon: <BsPeopleFill />,
      text: "Friends",
      route: "/friends"
    },
    {
      icon: <BiMoviePlay />,
      activeIcon: <BiSolidMoviePlay />,
      text: "Shorts",
      route: "/shorts"
    },
    {
      icon: <BsGear />,
      activeIcon: <BsGearFill />,
      text: "Settings",
      route: "/settings"
    },
    {
      icon: <BsPerson />,
      activeIcon: <BsPersonFill />,
      text: "Profile",
      route: "/profile"
    }
  ]

  return (
    <aside className='py-3 hidden md:flex justify-between flex-col sticky top-0 overflow-x-hidden overflow-y-auto h-[100dvh]'>
      <div>
        <ul>
          {navigations.map((el, i) => (
            <li key={i}>
              <Link href={el.route} className={`${pathname == el.route && "bg-gray-200 active:bg-gray-300 font-medium hover:bg-gray-300"} hover:bg-gray-200 active:bg-gray-300 p-3 flex justify-start items-center gap-2 text-md rounded-full duration-150`}>
                <div className='shrink-0 w-6 h-6 border overflow-hidden [&>svg]:w-full [&>svg]:h-full'>
                  {pathname == el.route ? el.activeIcon : el.icon}
                </div>
                <span>{el.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link href={"/logout"} className='hover:bg-gray-200 active:bg-gray-300 p-3 flex justify-start items-center gap-2 text-md rounded-full duration-150'>
        <div className='shrink-0 w-6 h-6 border overflow-hidden [&>svg]:w-full [&>svg]:h-full'>
          <RiLogoutCircleLine />
        </div>
        <span>Log out</span>
      </Link>
    </aside>
  )
}

export default AsideLeft