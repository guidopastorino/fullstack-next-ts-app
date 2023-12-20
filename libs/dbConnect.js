import mongoose from "mongoose";

const dbConnect = async () => {
    const uri = "mongodb+srv://guidopastorino:guidopasto01@cluster0.ltbz25q.mongodb.net/dbSocialNetwork";

    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;
