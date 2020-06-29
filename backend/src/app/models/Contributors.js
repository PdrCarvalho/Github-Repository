import mongoose from 'mongoose';

const ContributorsSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
        },
        avatar_url: {
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
        type: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        contributions: {
            type: Date,
          },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Contributors', ContributorsSchema);