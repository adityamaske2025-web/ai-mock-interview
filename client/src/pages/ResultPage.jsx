import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

function ResultPage() {
    const { id } = useParams();

    const [interview, setInterview] = useState(null);

    useEffect(() => {
        const fetchInterview = async () => {
            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `http://localhost:5000/api/interview/${id}`,
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

    if (!interview) {
        return (
            <div className="text-white p-10">
                Loading...
            </div>
        );
    }

    const answeredQuestions =
        interview.answers.filter(
            answer => answer.trim() !== ""
        ).length;

    const score =
        Math.round(
            (answeredQuestions /
                interview.questions.length) * 10
        );
    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("AI Mock Interview Report", 20, 20);

        doc.setFontSize(12);

        doc.text(
            `Role: ${interview.jobRole}`,
            20,
            40
        );

        doc.text(
            `Experience: ${interview.experience}`,
            20,
            50
        );

        doc.text(
            `Score: ${score}/10`,
            20,
            60
        );

        let y = 80;

        interview.questions.forEach(
            (question, index) => {

                doc.text(
                    `Q${index + 1}: ${question}`,
                    20,
                    y
                );

                y += 10;

                const answer =
                    interview.answers[index] ||
                    "No answer";

                doc.text(
                    `Answer: ${answer}`,
                    20,
                    y
                );

                y += 20;

                if (y > 260) {
                    doc.addPage();
                    y = 20;
                }

            }
        );

        doc.save("Interview_Report.pdf");

    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-6">
                Interview Completed 🎉
            </h1>

            <div className="border border-gray-700 rounded p-8 w-[500px]">
                <h2 className="text-3xl font-bold mb-4">
                    Score: {score}/10
                </h2>

                <button
                    onClick={downloadPDF}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4"
                >
                    Download PDF Report
                </button>

                <div className="w-full bg-zinc-700 rounded-full h-4 mb-4">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{
                            width: `${score * 10}%`,
                        }}
                    ></div>
                </div>

                <p className="mb-2">
                    Job Role: {interview.jobRole}
                </p>

                <p className="mb-2">
                    Questions: {interview.questions.length}
                </p>

                <p className="mb-2">
                    Answers Submitted: {interview.answers.length}
                </p>

                <p className="text-green-400 font-bold mt-4">
                    Status: Completed ✅
                </p>

                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">
                        Interview Review
                    </h3>

                    {interview.questions.map((question, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-lg hover:border-blue-500 transition"
                        >
                            <p className="font-bold text-blue-400 mb-2">
                                Question {index + 1}
                            </p>

                            <p className="mb-3">
                                {question}
                            </p>

                            <p className="font-bold text-green-400 mb-2">
                                Your Answer
                            </p>

                            <p className="mb-3">
                                {interview.answers[index] ||
                                    "No answer provided"}
                            </p>

                            <div>
                                {interview.answers[index]?.length > 100 ? (
                                    <span className="bg-green-600 px-3 py-1 rounded">
                                        Good Answer ✅
                                    </span>
                                ) : interview.answers[index]?.length > 30 ? (
                                    <span className="bg-yellow-600 px-3 py-1 rounded">
                                        Average Answer ⚠️
                                    </span>
                                ) : (
                                    <span className="bg-red-600 px-3 py-1 rounded">
                                        Needs Improvement ❌
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">
                        Feedback
                    </h3>

                    <ul className="list-disc ml-5">
                        <li>
                            Good attempt at answering questions.
                        </li>

                        <li>
                            Try providing more detailed examples.
                        </li>

                        <li>
                            Improve explanation of technical concepts.
                        </li>
                    </ul>
                </div>

                <p className="mt-4 text-blue-400">
                    Answered Questions: {answeredQuestions}
                </p>
            </div>
        </div>
    );
}

export default ResultPage;