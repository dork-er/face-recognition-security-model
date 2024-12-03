import React from 'react';
// import "../styles/dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">M</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Logs</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <div className="profile">
            <img src="/images/profile.jpg" alt="Admin Profile" />
          </div>
        </header>

        <section className="report-section">
          <div className="card usage-report">
            <h2>Usage Report</h2>
            <p>Graph goes here</p>
          </div>
          <div className="card full-report">
            <h2>Full Report</h2>
            <button className="download-btn">Download</button>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ferdinand</td>
                <td>ferdie@gmail.com</td>
                <td>14/02/2024</td>
                <td className="status threat">Threat</td>
                <td>
                  <button className="download-btn">Download</button>
                </td>
              </tr>
              <tr>
                <td>Carla</td>
                <td>vwhite@yahoo.com</td>
                <td>14/02/2024</td>
                <td className="status safe">Safe</td>
                <td>
                  <button className="download-btn">Download</button>
                </td>
              </tr>
              <tr>
                <td>Thornton</td>
                <td>fmartin@aol.com</td>
                <td>14/02/2024</td>
                <td className="status safe">Safe</td>
                <td>
                  <button className="download-btn">Download</button>
                </td>
              </tr>
              <tr>
                <td>Murdock</td>
                <td>anguyen@outlook.com</td>
                <td>14/02/2024</td>
                <td className="status threat">Threat</td>
                <td>
                  <button className="download-btn">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
