import { NextResponse } from 'next/server.js'
import dbConnect from '@/libs/dbConnect.js'
import User from '@/models/UserModel.js'
import { ObjectId } from 'bson';

export async function DELETE(req, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return NextResponse.json({ message: "No user found" }, { status: 404 })
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        console.log(id);

        let user;

        // Intenta convertir el id a ObjectId
        const isValidObjectId = ObjectId.isValid(id);

        if (isValidObjectId) {
            user = await User.findById(id);
        } else {
            // Si no es un ObjectId, intenta buscar por username
            user = await User.findOne({ username: id });

            // Si no encuentra por username, intenta buscar por email
            if (!user) {
                user = await User.findOne({ email: id });
            }
        }

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}