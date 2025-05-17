import { useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export default function AuthModal({ setIsModalOpen, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toggleAuth = () => setIsSignup(!isSignup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignup
      ? "http://localhost:5000/api/auth/register"  // Registration endpoint
      : "http://localhost:5000/api/auth/login";    // Login endpoint

    const payload = isSignup ? { email, mobile, password } : { email, password };

    try {
      const response = await axios.post(endpoint, payload, { withCredentials: true });

      if (isSignup) {
        setIsSignup(false);
      } else {
        const { accessToken, user } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setCredentials({ user, accessToken }));
        setIsModalOpen(false);
        
        // Call onLoginSuccess callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
      <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] relative mt-10 max-h-screen overflow-y-auto">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-3 text-gray-500 text-lg">
          ✖
        </button>
        <img src={Logo} alt="Logo" className="w-20 mx-auto" />
        <h2 className="text-lg font-semibold text-center">{isSignup ? "Sign Up" : "Login"}</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md" required />

          {isSignup && (
            <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded-md" required />
          )}

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md" required />

          <button type="submit" disabled={loading} className="w-full bg-primary text-white p-2 rounded-lg hover:bg-purple-800">
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

      

        {/* <p className="text-center text-sm mt-4">
          By {isSignup ? "Signing up " : "Logging in"} you agree to our
          <a href="#" className="text-blue-600 hover:underline"> Terms and Conditions</a> and
          <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
        </p> */}

        <p className="text-center text-sm mt-1">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={toggleAuth} className="text-blue-600 hover:underline">
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>

    </div>
  );
}
