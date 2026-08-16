import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCall, setShowCall] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const calls = [
    {
      id: "CALL-001",
      customer: "Rahul Sharma",
      status: "PTP Agreed",
      amount: "₹8,499",
      date: "Aug 14, 2026",
    },
    {
      id: "CALL-002",
      customer: "Priya Kumar",
      status: "Disputed",
      amount: "₹6,200",
      date: "Aug 13, 2026",
    },
    {
      id: "CALL-003",
      customer: "Arjun Reddy",
      status: "Already Paid",
      amount: "₹5,999",
      date: "Aug 12, 2026",
    },
  ];

  const startCall = () => {
    setShowCall(true);
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Kapture</h2>

        <button
          className={activeTab === "dashboard" ? "nav active" : "nav"}
          onClick={() => setActiveTab("dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className={activeTab === "calls" ? "nav active" : "nav"}
          onClick={() => setActiveTab("calls")}
        >
          📞 Call History
        </button>

        <button
          className={activeTab === "analytics" ? "nav active" : "nav"}
          onClick={() => setActiveTab("analytics")}
        >
          📊 Analysis
        </button>

        <button
          className="nav"
          onClick={() => setShowSettings(true)}
        >
          ⚙️ Settings
        </button>
      </aside>

      {/* Main */}
      <main className="main">

        <header className="topbar">
          <div>
            <h1>Maya Collections Agent</h1>
            <p>AI-powered loan collections dashboard</p>
          </div>

          <button className="call-btn" onClick={startCall}>
            📞 Call Customer
          </button>
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <section className="cards">

              <div className="card">
                <h3>Total Calls</h3>
                <strong>128</strong>
                <span>+12% this week</span>
              </div>

              <div className="card">
                <h3>PTP Rate</h3>
                <strong>68%</strong>
                <span>Promise to Pay</span>
              </div>

              <div className="card">
                <h3>Resolved</h3>
                <strong>94</strong>
                <span>Without escalation</span>
              </div>

              <div className="card">
                <h3>Escalations</h3>
                <strong>18</strong>
                <span>Human agent required</span>
              </div>

            </section>

            <section className="panel">
              <h2>Recent Calls</h2>

              <table>
                <thead>
                  <tr>
                    <th>Call ID</th>
                    <th>Customer</th>
                    <th>Outcome</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {calls.map((call) => (
                    <tr key={call.id}>
                      <td>{call.id}</td>
                      <td>{call.customer}</td>
                      <td>
                        <span className="status">{call.status}</span>
                      </td>
                      <td>{call.amount}</td>
                      <td>{call.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* Call History */}
        {activeTab === "calls" && (
          <section className="panel">
            <h2>Call History</h2>

            {calls.map((call) => (
              <div className="call-row" key={call.id}>
                <div>
                  <strong>{call.customer}</strong>
                  <p>{call.id} • {call.date}</p>
                </div>

                <span className="status">{call.status}</span>

                <button onClick={() => alert(`Opening ${call.id}`)}>
                  View Call
                </button>
              </div>
            ))}
          </section>
        )}

        {/* Analysis */}
        {activeTab === "analytics" && (
          <section className="panel analysis">
            <h2>Call Analysis</h2>

            <div className="analysis-grid">
              <div>
                <h3>Containment Rate</h3>
                <strong>73%</strong>
              </div>

              <div>
                <h3>PTP Rate</h3>
                <strong>68%</strong>
              </div>

              <div>
                <h3>Average Latency</h3>
                <strong>1.1 sec</strong>
              </div>

              <div>
                <h3>Drop Rate</h3>
                <strong>4.2%</strong>
              </div>
            </div>

            <div className="chart">
              📈
              <p>Collections performance analysis</p>
              <div className="bars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Call Modal */}
      {showCall && (
        <div className="modal-bg">
          <div className="modal">
            <h2>📞 Call Customer</h2>
            <p>Start a demo collections call with Maya.</p>

            <input
              placeholder="Customer name"
              defaultValue="Rahul Sharma"
            />

            <input
              placeholder="Phone number"
              defaultValue="+91 XXXXX XXXXX"
            />

            <button
              className="start-btn"
              onClick={() =>
                alert("Demo call started with Maya!")
              }
            >
              Start Demo Call
            </button>

            <button
              className="close-btn"
              onClick={() => setShowCall(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-bg">
          <div className="modal">
            <h2>⚙️ Settings</h2>

            <label>Agent Name</label>
            <input defaultValue="Maya" />

            <label>Language</label>
            <select defaultValue="English">
              <option>English</option>
              <option>Hindi</option>
              <option>English + Hindi</option>
            </select>

            <label>Voice</label>
            <select defaultValue="Professional Female">
              <option>Professional Female</option>
              <option>Professional Male</option>
            </select>

            <button
              className="start-btn"
              onClick={() => {
                alert("Settings saved!");
                setShowSettings(false);
              }}
            >
              Save Settings
            </button>

            <button
              className="close-btn"
              onClick={() => setShowSettings(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;