const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    userID: {
        type: String,
    },
    description: {
        type: String
    },
    files: {
        type: Array
    },
    created: {
        type: Number,
        default: Date.now()
    }
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

module.exports = Post;
