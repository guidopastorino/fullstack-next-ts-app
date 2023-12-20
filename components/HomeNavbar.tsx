import Link from 'next/link'
import React from 'react'

export default function HomeNavbar() {
    return (
        <header className='sticky z-50 mx-auto max-w-screen-xl w-full top-0 left-0 right-0 h-16 bg-white/90 flex justify-between items-center gap-3 p-4 border-b shrink-0'>
            <Link href={"/"}>
                <img className='w-8 h-8 object-cover' src="/logo.png" alt="logo" />
            </Link>

            <form action={"/results"}>
                <input type="search" name="query" placeholder='Search' className='p-2' />
                <button className='py-3 px-5 w-max text-xs text-white bg-neutral-800 rounded-full hover:bg-neutral-700 duration-100' type="submit">Search</button>
            </form>

            <Link href={"/register"}>Register</Link>
        </header>
    )
}