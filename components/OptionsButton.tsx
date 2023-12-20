'use client'
import React, { useState, useEffect, useRef, ReactNode, cloneElement, ReactElement, CSSProperties } from 'react'
import { BsThreeDots } from 'react-icons/bs';


interface Props {
    children: React.ReactNode;
}

const OptionsButton: React.FC<Props> = ({ children }) => {
    const MenuRef = useRef<HTMLDivElement>(null);
    const ButtonRef = useRef<HTMLButtonElement>(null);

    const [menu, setMenu] = useState<boolean>(false);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target === ButtonRef.current) return;
            if (menu && MenuRef.current) {
                if (!MenuRef.current.contains(e.target as Node)) {
                    setMenu(false);
                }
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    }, [menu]);


    const handleMenu = () => {
        setMenu(!menu);
    }


    return (
        <>
            <div className='relative'>
                <button className="w-7 h-7 hover:bg-gray-200 active:bg-gray-300 rounded-full duration-200 flex justify-center items-center" ref={ButtonRef} onClick={handleMenu}><BsThreeDots /></button>

                {menu && <div className='w-max z-40 absolute right-0 top-full select-none shadow-lg bg-white border rounded-lg py-2' ref={MenuRef}>
                    {children}
                </div>}
            </div>
        </>
    )
}

export default OptionsButton;
