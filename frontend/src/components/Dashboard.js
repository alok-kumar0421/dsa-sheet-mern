import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ProblemList from "./ProblemList";

const Dashboard = ({ user }) => {
  const [summary, setSummary] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
    loadSummary();
  }, []);

  const loadSummary = async () => {
    const { data } = await API.get("/problems/chapters/summary");
    setSummary(data);
  };

  const openChapter = async (chapter) => {
    setSelectedChapter(chapter);
    const { data } = await API.get("/problems");
    setProblems(data.filter(p => p.chapter === chapter));
  };

  const toggleProblem = async (id) => {
    await API.post(`/problems/${id}/toggle`);
    openChapter(selectedChapter);
    loadSummary();
  };

  return (
    <div className="main-container">

      <h2>Total Questions Solved : {summary.reduce((a,c)=>a+c.solved,0)} 
          / {summary.reduce((a,c)=>a+c.total,0)}</h2>

      <progress 
        value={summary.reduce((a,c)=>a+c.solved,0)} 
        max={summary.reduce((a,c)=>a+c.total,0)} 
        style={{width:"100%", height:"18px"}}/>

      {selectedChapter === null ? (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"15px",marginTop:"25px"}}>
        
          {summary.map(c=>(
            <div key={c.chapter} style={{background:"#b2c6e0ff",padding:"18px",borderRadius:"10px"}}>
              <h3>{c.chapter}</h3>
              <p>Total Questions: <b>{c.total}</b></p>
              <p>{c.status}</p>
              <button 
                style={{background:"#1f7ae1ff",color:"white",padding:"6px 12px",border:"none",borderRadius:"5px",cursor:"pointer"}}
                onClick={()=>openChapter(c.chapter)}>
                Start Solve
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={() => setSelectedChapter(null)}>⟵ Back</button>
          <ProblemList problems={problems} onToggle={toggleProblem} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
