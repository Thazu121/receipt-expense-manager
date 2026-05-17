import { Link, useNavigate } from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useState,
  useEffect,
} from "react";

import {
  login,
  clearMessages,
} from "../../redux/features/authSlice";

export default function Login() {

  const isLight =
    useSelector(
      (state) => state.theme.isLight
    );

  const {
    isAuthenticated,
    error,
    loading,
  } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});



  useEffect(() => {

    if (isAuthenticated) {

      navigate(
        "/dashboard",
        { replace: true }
      );
    }

  }, [
    isAuthenticated,
    navigate,
  ])

  useEffect(() => {

    dispatch(clearMessages());

  }, [dispatch]);



  const validate = () => {

    let newErrors = {};

    if (
      !/^\S+@\S+\.\S+$/.test(
        email
      )
    ) {

      newErrors.email =
        "Enter valid email";
    }

    if (password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };



  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    dispatch(
      login({
        email: email.trim(),
        password,
      })
    );
  };


  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        py-6
      "
    >

      <div
        className={`
          w-full
          max-w-md
          sm:max-w-lg
          rounded-2xl
          p-6
          sm:p-8
          backdrop-blur-xl
          border
          transition-all
          duration-300
          ${
            isLight
              ? "bg-white shadow-xl border-gray-200"
              : "bg-[#0b2a1a]/80 border-white/10 shadow-2xl"
          }
        `}
      >


        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-center
            mb-2
          "
        >
          Welcome Back 👋
        </h2>

        <p
          className={`
            text-center
            text-sm
            mb-6
            ${
              isLight
                ? "text-gray-500"
                : "text-gray-300"
            }
          `}
        >
          Login to continue
        </p>



        {error && (

          <p
            className="
              text-red-500
              text-center
              text-sm
              mb-4
            "
          >
            {error}
          </p>

        )}



        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >


          <div>

            <input
              type="email"

              autoComplete="email"

              placeholder="Email"

              value={email}

              onChange={(e) => {

                setEmail(
                  e.target.value
                );

                dispatch(
                  clearMessages()
                );
              }}

              className={`
                w-full
                px-4
                py-3
                text-sm
                sm:text-base
                rounded-lg
                outline-none
                transition-all
                ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }
              `}
            />

            {errors.email && (

              <p
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              >
                {errors.email}
              </p>

            )}

          </div>



          <div>

            <input
              type="password"

              autoComplete="current-password"

              placeholder="Password"

              value={password}

              onChange={(e) => {

                setPassword(
                  e.target.value
                );

                dispatch(
                  clearMessages()
                );
              }}

              className={`
                w-full
                px-4
                py-3
                text-sm
                sm:text-base
                rounded-lg
                outline-none
                transition-all
                ${
                  isLight
                    ? "bg-gray-100 focus:ring-2 focus:ring-green-500"
                    : "bg-white/5 border border-white/10 focus:border-green-400"
                }
              `}
            />

            {errors.password && (

              <p
                className="
                  text-red-500
                  text-sm
                  mt-1
                "
              >
                {errors.password}
              </p>

            )}



            <div
              className="
                text-right
                mt-2
              "
            >

              <Link
                to="/login/forgot-password"

                className="
                  text-sm
                  text-green-500
                  hover:underline
                "
              >
                Forgot Password?
              </Link>

            </div>

          </div>



          <button
            type="submit"

            disabled={loading}

            className="
              w-full
              py-3
              rounded-lg
              text-sm
              sm:text-base
              font-semibold
              bg-green-500
              hover:bg-green-600
              text-white
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>



        <p
          className="
            text-center
            mt-6
            text-sm
          "
        >

          Don't have an account?{" "}

          <Link
            to="/signup"

            className="
              text-green-500
              hover:underline
            "
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}