'use client'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { BsArrowLeftShort } from "react-icons/bs";

type Props = {}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <div className='sticky z-50 w-full top-0 left-0 right-0 h-16 bg-white/90 flex justify-start items-center gap-3 border-b'>
                <div className='h-16 p-3 flex justify-start items-center gap-2'>
                    <button onClick={() => window.history.back()} className="w-10 h-10 hover:bg-gray-200 active:bg-gray-300 text-3xl rounded-full duration-200 flex justify-center items-center"><BsArrowLeftShort /></button>

                    <span className='font-medium text-lg'>Post</span>
                </div>
            </div>
            {children}
        </main>
    )
}

export default layout