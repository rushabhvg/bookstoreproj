import  mongooose from "mongoose";

const bookSchema = mongooose.Schema(
    {
        title: { 
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongooose.model('Cat', bookSchema);