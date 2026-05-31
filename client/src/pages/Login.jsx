import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    // state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // login function
    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "https://ai-mock-interview-lx7x.onrender.com/api/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log(res.data);

            alert("Login Successful");
            navigate("/dashboard");

            // save token
            localStorage.setItem(
                "token",
                res.data.token
            );

            // save user
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black">

            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-10 rounded-xl w-[400px]"
            >

                <h1 className="text-white text-3xl mb-6 text-center">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-zinc-800 text-white outline-none"
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-zinc-800 text-white outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
                >
                    Login
                </button>

                <p className="text-gray-400 mt-4 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-500 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;