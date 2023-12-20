import { NextResponse } from 'next/server.js'
import dbConnect from '@/libs/dbConnect.js'
import User from '@/models/UserModel.js'

// register user
export async function POST(req, res) {
    try {
        await dbConnect()
        const { profileImage, fullname, username, email, password, privateAccount } = await req.json()
        const newUser = new User({
            profileImage,
            fullname,
            username,
            email,
            password,
            followers: [],
            following: [],
            blocked: [],
            saved: [],
            likes: [],
            starredPeople: [],
            privateAccount,
        });
        const savedUser = await newUser.save();
        return NextResponse.json(savedUser, { status: 201 });
    } catch (error) {
        console.log(error)
    }
}

export async function GET(req, res) {
    try {
        await dbConnect()
        const users = await User.find()
        if (!users) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }
        // retornar usuarios
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error)
    }
}

