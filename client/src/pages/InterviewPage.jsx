import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function InterviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [answers, setAnswers] = useState({});
    const answeredCount =
        Object.values(answers).filter(
            answer => answer.trim() !== ""
        ).length;
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `https://ai-mock-interview-lx7x.onrender.com/api/interview/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInterview(res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchInterview();
    }, [id]);

    useEffect(() => {

        if (timeLeft <= 0) {

            handleSubmit();

            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);
    const handleSubmit = async () => {
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                `https://ai-mock-interview-lx7x.onrender.com/api/interview/${id}/submit`,
                {
                    answers: Object.values(answers),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate(`/result/${id}`);

        } catch (error) {

            console.log(error);

            alert("Error submitting interview");

        }
    };

    if (!interview) {
        return (
            <div className="text-white p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
            <h1 className="text-4xl font-bold mb-4">
                {interview.jobRole}
            </h1>

            <p className="text-red-400 font-bold mb-4">
                <p className="mb-2">
                    Progress: {answeredCount} / {interview.questions.length}
                </p>

                <div className="w-full bg-zinc-700 rounded-full h-3 mb-6">
                    <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{
                            width: `${(answeredCount /
                                interview.questions.length) * 100
                                }%`,
                        }}
                    ></div>
                </div>
                {timeLeft <= 60 && (
                    <p className="text-yellow-400 mb-4">
                        ⚠️ Less than 1 minute remaining
                    </p>
                )}
                Time Left:
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60)
                    .toString()
                    .padStart(2, "0")}
            </p>

            <p className="mb-2">
                Experience: {interview.experience}
            </p>

            <p className="mb-6">
                Tech Stack: {interview.techStack}
            </p>

            <h2 className="text-2xl font-bold mb-4">
                Interview Questions
            </h2>

            {interview.questions?.map((question, index) => (
                <div
                    key={index}
                    className="border border-gray-700 p-4 rounded mb-4"
                >
                    <p className="mb-3">
                        <strong>Q{index + 1}:</strong> {question}
                    </p>

                    <textarea
                        placeholder="Write your answer here..."
                        value={answers[index] || ""}
                        onChange={(e) =>
                            setAnswers({
                                ...answers,
                                [index]: e.target.value,
                            })
                        }
                        className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="4"
                    />
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded"
            >
                Submit Interview
            </button>
        </div>
    );
}

export default InterviewPage;