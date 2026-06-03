import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "../api/jobsApi";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "There is something wrong please try again",
        );
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <section className="grid w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 md:grid-cols-[1fr_0.9fr]">
          <div className="hidden bg-emerald-950 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Job Tracker
              </p>
              <h1 className="mt-5 max-w-sm text-4xl font-bold leading-tight">
                Keep every application moving forward.
              </h1>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5">
              <p className="text-sm leading-6 text-emerald-50">
                Track statuses, notes, interviews, and offers from one focused
                dashboard.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Login to your account
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Track your job applications without losing the thread.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-md bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Login
            </button>

            <div className="mt-6 flex flex-col gap-3 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-center">
              <span>Don't have an account?</span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Register here
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
