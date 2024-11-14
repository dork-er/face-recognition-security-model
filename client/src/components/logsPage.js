import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../styles/logsPage.css';
import { useNavigate } from 'react-router-dom';

const logs = [
  {
    user: 'Ferdinand',
    email: 'ferdie@gmail.com',
    date: '14/02/2024',
    status: 'threat',
    download: true,
  },
  {
    user: 'Carla',
    email: 'vwhite@yahoo.com',
    date: '14/02/2024',
    status: 'safe',
    download: true,
  },
  // Add more logs here...
];

const LogsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">
        <img src="/icons/back_icon.png" alt="Back" className="back-icon" />
      </button>
      <div className="logs-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.user}</td>
                <td>{log.email}</td>
                <td>{log.date}</td>
                <td
                  className={
                    log.status === 'threat' ? 'threat-row' : 'safe-row'
                  }
                >
                  {log.status}
                </td>
                <td>
                  {log.download && (
                    <button className="download-btn">Download</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
