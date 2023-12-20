import { NextResponse } from 'next/server.js'
import dbConnect from '@/libs/dbConnect'
import Post from '@/models/PostModel.js'
// import multer from 'multer'
// const upload = multer({ dest: 'public/uploads/' })


export async function GET() {
    try {
        await dbConnect()
        const posts = await Post.find()
        return NextResponse.json(posts, { status: 200 })
    } catch (error) {
        console.log(error)
    }
}


// new post
function generatePostId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let postId;

    postId = '';

    for (let i = 0; i < 11; i++) {
        postId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return postId;
}



export const config = {
    api: {
        bodyParser: false,
    },
}


export async function POST(req, res) {
    try {
        await dbConnect()

        const { userID, description, files } = await req.json()

        let postId;
        let existingPost;

        do {
            postId = generatePostId();
            existingPost = await Post.findById(postId);
        } while (existingPost);

        const newPost = new Post({
            _id: postId,
            userID,
            description,
            files,
        })

        const savedPost = await newPost.save();
        return NextResponse.json(savedPost, { status: 201 });
    } catch (error) {
        console.log(error)
    }
}