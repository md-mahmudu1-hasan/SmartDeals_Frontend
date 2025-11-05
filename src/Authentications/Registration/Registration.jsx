import { use, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import Loader from "../../Pages/Loader/Loader";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSignIn, loading, setLoading } = use(AuthContext);

  if(loading){
    return <Loader/>
  }
  const navigate = useNavigate(); 

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must have at least one uppercase, one lowercase, and be at least 6 characters long."
      );
      return;
    }

    setError("");
    setSuccess(false);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setLoading(true);
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setSuccess(true);
            e.target.reset();
            setLoading(false);
            navigate("/");
          })
          .catch((error) => {
            if (error.code === "auth/invalid-photo-url") {
              setError("Invalid photo URL.");
            } else {
              setError(error.message);
            }
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email address.");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak.");
        } else {
          setError(error.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        setSuccess(true);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message.split("or")[1]);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Register Now!</h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login Now
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://yourimage.com/pic.jpg"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-10 text-gray-500 hover:text-[#347928] transition"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Register
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Registration Successful!
            </p>
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
          <span>Sign Up With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
