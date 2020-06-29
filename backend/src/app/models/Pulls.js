import mongoose from 'mongoose';

const PullsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: true,
        },
        html_url: {
            type: String,
            required: true,
        },
        diff_url: {
            type: String,
            required: true,
        },
        user: {
            login: {
                type: String,
                required: true,
            },
            avatar_url: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Pulls', PullsSchema);