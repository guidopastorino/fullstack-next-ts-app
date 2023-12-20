'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BiSolidLockAlt } from 'react-icons/bi';
import Loader from '@/components/Loader';



// tipos del post
interface PostProperties {
    _id: string;
    userID: string;
    description: string;
    files: Object[];
    created: number;
}

// tipos del usuario
interface UserProperties {
    _id: string;
    dateJoined: number;
    profileImage: string;
    fullname: string;
    username: string;
    followers: string[];
    following: string[];
    blocked: string[];
    privateAccount: boolean;
}

const Page = () => {
    // post details
    const [post, setPost] = useState<PostProperties | null>(null);
    // user details 
    const [user, setUser] = useState<UserProperties | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchPostAndUser = async () => {
            try {
                const postResponse = await fetch(`/api/posts/${id}`);
                if (!postResponse.ok) {
                    throw new Error('Failed to fetch post');
                }

                const postData = await postResponse.json();
                setPost(postData);

                if (postData.userID) {
                    const userResponse = await fetch(`/api/users/${postData.userID}`);
                    if (!userResponse.ok) {
                        throw new Error("Failed to fetch user");
                    }

                    const userData = await userResponse.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPostAndUser();
    }, [id]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            {
                (post && user)
                    ? (
                        <div>
                            <div>
                                <div>
                                    {user.fullname}
                                    {user.username} {user.privateAccount && <BiSolidLockAlt />}
                                </div>
                                {/* button */}
                            </div>
                        </div>
                    )
                    : (
                        <Loader />
                    )
            }
        </>
    );
}

export default Page;