import { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signIn, googleSignIn, setLoading } = use(AuthContext);

  const handleSubmit = (e) => {
    setError("");
    setSuccess(false);

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then(() => {
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message.split("or")[1]);
        setLoading(false);
      });
  };
  const handleGoogleSignIn = () => {
    setError("");
    setSuccess(false);
    googleSignIn()
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message.split("or")[1]);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Register Now
          </Link>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">Login Successful!</p>
          )}
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full border border-gray-300 py-2 rounded-md flex justify-center items-center gap-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign In With Google</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
