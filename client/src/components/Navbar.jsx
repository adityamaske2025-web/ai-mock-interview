import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-500">
                AI Mock Interview
            </h1>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    A
                </div>

                <span>
                    Aditya
                </span>
            </div>
        </nav>
    );
}

export default Navbar;