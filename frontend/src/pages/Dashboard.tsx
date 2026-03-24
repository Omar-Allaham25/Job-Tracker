import { useNavigate } from "react-router-dom";
import { deleteApplication, getMyApplications, updateApplication } from "../api/jobsApi";
import React, { useEffect, useState } from "react";

type status = "Applied" | "Interview" | "Offer" | "Rejected";
type Job = {
  job_id: number;
  job_title: string;
  company_id: number;
  status: status;
  application_date: Date | string;
  notes?: string;
}

const statusOptions = ['Applied', "Interview", "Offer", "Rejected"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const [editedJob, setEditedJob] = useState<Job | null>(null);

  useEffect(() => { fetchJobs() }, [])

  const fetchJobs = async () => {
    try {
      const response = await getMyApplications();
      setJobs(response.data.applications);
    } catch (err: unknown) {
      setError('Error in fetching data');
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (job: Job) => {
    setEditedJob(job);
    setIsOpen(true);
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id);
      setJobs(jobs.filter(job => job.job_id !== id));
    } catch (err: unknown) {
      setError("Cannot delete, try again later");
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedJob) return;
    await updateApplication(editedJob.job_id);  
    setIsOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading..</div>}
      
      <header>
        <h2>Job Tracker</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      
      <div>
        {jobs.map((job: Job) => (
          <div key={job.job_id}>
            <div>
              <span><b>{job.job_title}</b></span>
              <span >{job.status}</span>
            </div>
            <p>Company ID: {job.company_id}</p>
            <p>{new Date(job.application_date).toLocaleDateString()}</p>
            {job.notes && <p>Notes: {job.notes}</p>}
            <hr />
            <div>
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job.job_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && editedJob && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Job Application</h3>
            <form onSubmit={handleSave}>
              <label htmlFor="company">Company ID*</label>
              <input 
                id='company' 
                value={editedJob.company_id} 
                type="number" 
                onChange={(e) => setEditedJob({ ...editedJob, company_id: Number(e.target.value) })} 
              />
              <br/>

              <label htmlFor="postion">Position*</label>
              <input 
                id='postion' 
                value={editedJob.job_title} 
                type="text" 
                onChange={(e) => setEditedJob({ ...editedJob, job_title: e.target.value })} 
              />
              <br/>

              <label htmlFor="status">Status*</label>
              <select 
                id="status" 
                value={editedJob.status} 
                onChange={(e) => setEditedJob({ ...editedJob, status: e.target.value as status })}
              >
                {statusOptions.map((item) => (
                  <option key={item} value={item}><b>{item}</b></option>
                ))}
              </select>
              <br/>

              <label htmlFor="notes">Notes (Optional)</label>
              <input 
                id="notes" 
                value={editedJob.notes || ""} 
                type="text" 
                onChange={(e) => setEditedJob({ ...editedJob, notes: e.target.value })} 
              />
              <br/>
              
              <div>
                <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}