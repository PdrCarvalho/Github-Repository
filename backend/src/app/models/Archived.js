import mongoose from 'mongoose';

const ArchivedSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        description: {
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
        name: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
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
        contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contributors' }],
        pulls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pulls' }],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Archived', ArchivedSchema);