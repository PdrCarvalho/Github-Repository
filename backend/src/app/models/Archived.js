import mongoose from 'mongoose';

const ArchivedSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: false,
        },
        id: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
        html_url: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        language: {
            type: String,
            required: false,
        },
        created_at: {
            type: Date,
        },
        updated_at: {
            type: Date,
        },
        pushed_at: {
            type: Date,
        },
        contributors: [{
            id: {
                type: String,
                required: false,
            },
            login: {
                type: String,
                required: false,
            },
            avatar_url: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
            html_url: {
                type: String,
                required: false,
            },
            type: {
                type: String,
                required: false,
            },
            language: {
                type: String,
                required: false,
            },
            contributions: {
                type: String,
                required:false
            },
        }],
        pulls: [{
            title: {
                type: String,
                required: false,
            },
            id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
            html_url: {
                type: String,
                required: false,
            },
            diff_url: {
                type: String,
                required: false,
            },
            user: {
                login: {
                    type: String,
                    required: false,
                },
                avatar_url: {
                    type: String,
                    required: false,
                },
            },
        }],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Archived', ArchivedSchema);