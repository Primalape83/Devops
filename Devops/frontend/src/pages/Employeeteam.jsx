import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeeTeam() {
  const [team,    setTeam]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    api.get("/employee/viewteam")
      .then(({ data }) => setTeam(data.team || []))
      .catch(err => {
        if (err.response?.status === 404) setTeam([]);
        else setError(err.response?.data?.msg || "Failed to load team.");
      })
      .finally(() => setLoading(false));
  }, []);

  const manager = team[0];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My Team</h1>
          <p>Your teammates and manager.</p>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {/* Manager info card */}
      {manager && (
        <div className="card" style={{ marginBottom: 20, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "var(--color-accent)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, flexShrink: 0
            }}>
              {manager.manager_firstname?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>
                {manager.manager_firstname} {manager.manager_lastname}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
                Team Manager &nbsp;·&nbsp; {manager.team_name}
              </div>
            </div>
            <span className="badge badge-blue" style={{ marginLeft: "auto" }}>Your Manager</span>
          </div>
        </div>
      )}

      {/* Teammates */}
      <div className="card">
        <div className="card-header">
          <h2>Teammates</h2>
          <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
            {team.length} member{team.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="table-wrap">
          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : team.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◫</div>
              <p>No teammates yet. You may not have joined a team yet — check your invitations.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Employee ID</th>
                </tr>
              </thead>
              <tbody>
                {team.map((m, i) => (
                  <tr key={m.emp_id}>
                    <td style={{ color: "var(--color-text-muted)" }}>{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: "var(--color-border)", color: "var(--color-text-muted)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700
                        }}>
                          {m.firstname?.[0]?.toUpperCase()}
                        </div>
                        <strong>{m.firstname} {m.lastname}</strong>
                      </div>
                    </td>
                    <td style={{ color: "var(--color-text-muted)" }}>#{m.emp_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}