'use client'
import React, { useEffect, useState, useContext } from 'react';
import Post from '@/components/Post';
import Loader from '@/components/Loader';


interface PostObj {
    _id: string;
    userID: string;
    description: string;
    files: Object[];
    created: number;
}


// Renderizar los posts
const PostList: React.FC<{ posts: PostObj[] }> = ({ posts }) => {
    if (posts.length === 0) {
        return <Loader />;
    }

    return (
        <div>
            {posts.map((post, index) => (
                <Post key={index} {...post} />
            ))}
        </div>
    );
};

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<PostObj[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <PostList posts={posts} />
    );
};

export default Posts;
