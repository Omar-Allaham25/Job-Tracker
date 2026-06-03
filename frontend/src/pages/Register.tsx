import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/jobsApi";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerUser(formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
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
        <section className="grid w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 md:grid-cols-[0.9fr_1fr]">
          <div className="hidden bg-cyan-950 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                New account
              </p>
              <h1 className="mt-5 max-w-sm text-4xl font-bold leading-tight">
                Build a clear record of every opportunity.
              </h1>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5">
              <p className="text-sm leading-6 text-cyan-50">
                Register once, then manage your applications, statuses, and
                notes from a single workspace.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Create account
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Start tracking jobs
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Add your details and jump straight into your dashboard.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handlechange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handlechange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
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
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handlechange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handlechange}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-md bg-cyan-700 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-200"
            >
              Register
            </button>

            <div className="mt-6 flex flex-col gap-3 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-center">
              <span>Already have an account?</span>
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
                className="font-semibold text-cyan-700 transition hover:text-cyan-900"
              >
                Login here
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
