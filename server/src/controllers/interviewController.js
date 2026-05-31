const Interview = require("../models/Interview");

const {
    generateQuestions,
} = require("../services/aiService");

const createInterview = async (req, res) => {
    try {

        const {
            jobRole,
            experience,
            techStack,
        } = req.body;

        const questions = await generateQuestions(
            jobRole,
            experience,
            techStack
        );

        const interview = await Interview.create({
            user: req.user._id,
            jobRole,
            experience,
            techStack,
            questions,
        });

        res.status(201).json({
            message: "Interview created successfully",
            interview,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

const getMyInterviews = async (req, res) => {
    try {

        const interviews = await Interview.find({
            user: req.user._id,
        });

        res.status(200).json(interviews);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};
const getInterviewById = async (req, res) => {
    try {

        const interview = await Interview.findById(
            req.params.id
        );

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        res.status(200).json(interview);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

const submitInterview = async (req, res) => {
    try {

        const { answers } = req.body;

        const interview = await Interview.findById(
            req.params.id
        );

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        interview.answers = answers;

        await interview.save();

        res.status(200).json({
            message: "Answers submitted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

const deleteInterview = async (req, res) => {
    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found",
            });
        }

        if (interview.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await Interview.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Interview deleted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = {
    createInterview,
    getMyInterviews,
    getInterviewById,
    submitInterview,
    deleteInterview,
};