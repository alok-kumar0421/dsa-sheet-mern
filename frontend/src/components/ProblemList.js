import React from "react";

const ProblemList = ({ problems, onToggle }) => {
  const chapters = {};
  problems.forEach(p => {
    if (!chapters[p.chapter]) chapters[p.chapter] = [];
    chapters[p.chapter].push(p);
  });

  return (
    <div className="problem-card">
      {Object.keys(chapters).map(chapter => (
        <div key={chapter} style={{marginBottom:"25px"}}>
          
          <h2>{chapter}</h2>

          <table className="problem-table">
            <thead>
              <tr className="problem-row">
                <th>Done</th>
                <th>Problem</th>
                <th>Level</th>
                <th>Links</th>
              </tr>
            </thead>

            <tbody>
              {chapters[chapter].map(p => (
                <tr className="problem-row" key={p._id}>
                  
                  <td>
                    <input 
                      type="checkbox" 
                      checked={p.completed} 
                      onChange={() => onToggle(p._id)} 
                    />
                  </td>

                  <td>
                    <b>{p.title}</b><br />
                    <small>{p.description}</small>
                  </td>

                  <td>{p.level}</td>

                  <td>
                    <a href={p.youtubeUrl} target="_blank">YouTube</a> |
                    <a href={p.leetCodeUrl} target="_blank">LeetCode</a> |
                    <a href={p.articleUrl} target="_blank">Article</a>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      ))}
    </div>
  );
};

export default ProblemList;
