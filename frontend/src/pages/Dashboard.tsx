import { useNavigate } from "react-router-dom";
import {
  deleteApplication,
  getMyApplications,
  updateApplication,
} from "../api/jobsApi";
import React, { useEffect, useState } from "react";

type status = "Applied" | "Interview" | "Offer" | "Rejected";
type Job = {
  job_id: number;
  job_title: string;
  company_id: number;
  status: status;
  application_date: Date | string;
  notes?: string;
};

const statusOptions = ["Applied", "Interview", "Offer", "Rejected"];

const statusStyles: Record<status, string> = {
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  Interview: "border-amber-200 bg-amber-50 text-amber-700",
  Offer: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [editedJob, setEditedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getMyApplications();
      setJobs(response.data.applications);
    } catch (err: unknown) {
      setError("Error in fetching data");
    } finally {
      setLoading(false);
    }
  };

  const numstatus: Record<status, number> = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchInput.trim().toLowerCase();
    if (!search) return true;

    return (
      job.job_title.toLowerCase().includes(search) ||
      String(job.company_id).includes(search) ||
      job.status.toLowerCase().includes(search) ||
      (job.notes || "").toLowerCase().includes(search)
    );
  });

  const handleAdd = () => {
    // Add job flow can be connected here when the API form is ready.
  };

  const handleEdit = (job: Job) => {
    setEditedJob(job);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id);
      setJobs(jobs.filter((job) => job.job_id !== id));
    } catch (err: unknown) {
      setError("Cannot delete, try again later");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedJob) return;
    try {
      await updateApplication(editedJob.job_id, {
        job_title: editedJob.job_title,
        status: editedJob.status,
        notes: editedJob.notes,
      });

      setJobs(
        jobs.map((job) => (job.job_id === editedJob.job_id ? editedJob : job)),
      );

      setIsOpen(false);
    } catch (err: unknown) {
      setError("Failed to update application. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Job Tracker
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              Applications Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusOptions.map((item) => {
            const currentStatus = item as status;
            return (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">{item}</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">
                  {numstatus[currentStatus]}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Job Applications
              </h2>
              <p className="text-sm text-slate-500">
                {filteredJobs.length} shown from {jobs.length} total
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                placeholder="Search by company, position, or status"
                type="text"
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchInput(e.target.value);
                }}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 sm:w-80"
              />
              <button
                onClick={() => handleAdd()}
                className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                Add Job
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {loading && (
              <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
                Loading applications...
              </div>
            )}

            {!loading && filteredJobs.length === 0 && (
              <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
                No applications match your search.
              </div>
            )}

            {!loading &&
              filteredJobs.map((job: Job) => (
                <article
                  key={job.job_id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">
                        {job.job_title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Company ID: {job.company_id}
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <p>
                        Applied:{" "}
                        {new Date(job.application_date).toLocaleDateString()}
                      </p>
                      {job.notes && (
                        <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-slate-700">
                          Notes: {job.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.job_id)}
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </div>

      {isOpen && editedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-950">
                Edit Job Application
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Update the application details and save your changes.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company ID*
                </label>
                <input
                  id="company"
                  value={editedJob.company_id}
                  type="number"
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      company_id: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="postion"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Position*
                </label>
                <input
                  id="postion"
                  value={editedJob.job_title}
                  type="text"
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, job_title: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Status*
                </label>
                <select
                  id="status"
                  value={editedJob.status}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      status: e.target.value as status,
                    })
                  }
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  {statusOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Notes (Optional)
                </label>
                <input
                  id="notes"
                  value={editedJob.notes || ""}
                  type="text"
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, notes: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
