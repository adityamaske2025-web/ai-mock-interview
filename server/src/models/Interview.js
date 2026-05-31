const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        jobRole: {
            type: String,
            required: true,
        },

        experience: {
            type: String,
            required: true,
        },

        techStack: {
            type: String,
            required: true,
        },

        questions: [
            {
                type: String,
            },
        ],

        answers: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model(
    "Interview",
    interviewSchema
);