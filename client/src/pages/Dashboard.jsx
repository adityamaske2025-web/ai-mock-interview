import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  FaBriefcase,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
// import AnalyticsChart from "../components/AnalyticsChart";
function Dashboard() {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);

  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [techStack, setTechStack] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://ai-mock-interview-lx7x.onrender.com/api/interview/my-interviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://ai-mock-interview-lx7x.onrender.com/api/interview/create",
        {
          jobRole,
          experience,
          techStack,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh interview list
      fetchInterviews();

      // Clear inputs
      setJobRole("");
      setExperience("");
      setTechStack("");

      alert("Interview Created Successfully");

      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to create interview");
    }
  };
  const handleDeleteInterview = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://ai-mock-interview-lx7x.onrender.com/api/interview/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(
        interviews.filter(
          (interview) => interview._id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold">
              Welcome {user?.name} 👋
            </h1>

            <p className="text-zinc-400 mt-2">
              {user?.email}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaBriefcase />
                Total
              </h3>
              <p>{interviews.length}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-bold text-green-400">
                <FaCheckCircle />
                Completed
              </h3>
              <p>
                {
                  interviews.filter(
                    interview =>
                      interview.answers?.length > 0
                  ).length
                }
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-lg font-bold text-yellow-400">
                <FaClock />
                Pending
              </h3>
              <p>
                {
                  interviews.filter(
                    interview =>
                      !interview.answers ||
                      interview.answers.length === 0
                  ).length
                }
              </p>
            </div>
          </div>

          {/* <AnalyticsChart
        completed={
          interviews.filter(
            interview =>
              interview.answers?.length > 0
          ).length
        }
        pending={
          interviews.filter(
            interview =>
              !interview.answers ||
              interview.answers.length === 0
          ).length
        }
      /> */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Create Interview Form */}
            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-xl h-fit">
              <h2 className="text-2xl font-semibold mb-4">
                Create Interview
              </h2>

              <input
                type="text"
                placeholder="Job Role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full p-3 mb-3 rounded bg-zinc-800 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 mb-3 rounded bg-zinc-800 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Tech Stack"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full p-3 mb-4 rounded bg-zinc-800 text-white outline-none"
              />

              <button
                onClick={handleCreateInterview}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-medium"
              >
                Create Interview
              </button>
            </div>

            {/* Interview List */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                My Interviews
              </h2>

              <div className="grid gap-4">
                {interviews.map((interview) => (
                  <div
                    key={interview._id}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-lg"
                  >
                    <h2 className="text-xl font-bold mb-2">
                      {interview.jobRole}
                    </h2>

                    <p className="mb-1 text-zinc-300">
                      Experience: {interview.experience}
                    </p>

                    <p className="text-zinc-300">
                      Tech Stack: {interview.techStack}
                    </p>

                    <p className="mt-3 font-semibold">
                      Status:
                      {interview.answers?.length > 0 ? (
                        <span className="text-green-400">
                          {" "}Completed ✅
                        </span>
                      ) : (
                        <span className="text-yellow-400">
                          {" "}Pending ⏳
                        </span>
                      )}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() =>
                          navigate(`/interview/${interview._id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                      >
                        {interview.answers?.length > 0
                          ? "View Interview"
                          : "Start Interview"}
                      </button>

                      {interview.answers?.length > 0 && (
                        <button
                          onClick={() =>
                            navigate(`/result/${interview._id}`)
                          }
                          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                        >
                          View Result
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDeleteInterview(interview._id)
                        }
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;