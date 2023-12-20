'use client'

import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader';
import { BiSolidLockAlt } from 'react-icons/bi';
import Link from 'next/link';
import MakePost from '@/components/MakePost';

interface Users {
    _id: string;
    dateJoined: Number;
    profileImage: string;
    fullname: string;
    username: string;
    followers: [];
    following: [];
    blocked: [];
    privateAccount: boolean;
}

const AsideRight = () => {
    const [data, setData] = useState<Array<Users>>([]);

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((data) => {
                setData(data)
            })
    }, [])


    return (
        <div className='hidden lg:block sticky top-0 overflow-x-hidden overflow-y-auto h-[100dvh]'>
            <div className="w-full p-3 flex justify-center items-center">
                {!data?.length && <Loader />}
            </div>
            <span className='text-lg block font-medium py-3'>Recommendations</span>
            <div className='flex flex-col items-start justify-stretch'>
                {!!data?.length && data.map((el, i) => (
                    <UserCard key={i} {...el} />
                ))}
            </div>
            <MakePost />
        </div>
    )
}

export default AsideRight

const UserCard: React.FC<Users> = ({ dateJoined, profileImage, fullname, username, followers, following, blocked, privateAccount }) => {

    const UnfollowButton = () => {
        const [unfollow, setUnfollow] = useState<boolean>(false)

        return (
            <button
                className={`${unfollow ? "bg-red-600" : "bg-neutral-800"} text-white py-2 px-3 w-max font-medium text-xs rounded-full duration-100`}
                onMouseOver={() => setUnfollow(true)}
                onMouseLeave={() => setUnfollow(false)}
            >
                {unfollow ? "Unfollow" : "Follow"}
            </button>
        )
    }

    return (
        <Link href={`/${username}`} className='flex w-full p-2 justify-between items-center gap-2 hover:bg-gray-200 active:bg-gray-300 duration-200'>
            <div className='flex justify-start items-center gap-2'>
                <img className='w-10 h-10 object-cover rounded-full' src={profileImage} alt={username} />

                <div className='flex flex-col justify-center items-start'>
                    <div className='flex justify-start items-center gap-1'>
                        <span className='font-medium'>{fullname}</span>
                        {privateAccount && <BiSolidLockAlt />}
                    </div>

                    <span className='text-slate-600 text-sm'>@{username}</span>
                </div>
            </div>

            <UnfollowButton />
        </Link>
    );
};