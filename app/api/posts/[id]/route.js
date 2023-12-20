import { NextResponse } from 'next/server.js'
import dbConnect from '@/libs/dbConnect'
import PostModel from '@/models/PostModel'

export async function GET(req, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const post = await PostModel.findById(id);
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }
        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}