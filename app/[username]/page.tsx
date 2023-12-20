'use client'

import Loader from '@/components/Loader';
import TimestampToDate from '@/components/TimestampToDate';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface User {
    dateJoined: Number;
    profileImage: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    followers: string[];
    following: string[];
    blocked: string[];
    saved: string[];
    likes: string[];
    starredPeople: string[];
    privateAccount: Boolean;
}

const page = () => {
    const { username } = useParams()

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch(`/api/users/${username}`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => setUser(data[0]))
            .catch(err => console.log(err))
    }, [])

    const renderPublicUserInfo = () => (
        <>
            <p>{user?.fullname}</p>
            <p>{user?.username}</p>
            <p><TimestampToDate timestamp={user?.dateJoined} /></p>
            <p>Following: {user?.following.length}</p>
            <p>Followers: {user?.followers.length}</p>
        </>
    );

    const renderPrivateAccountMessage = () => (
        <>This account is private</>
    );

    const renderContent = () => {
        if (!user) {
            return <Loader />;
        }

        return user?.privateAccount
            ? renderPrivateAccountMessage()
            : renderPublicUserInfo();
    };

    return (
        <div>
            <div>{renderContent()}</div>
            <Link href={"/"}>Back</Link>
        </div>
    )

}

export default page