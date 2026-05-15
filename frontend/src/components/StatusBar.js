import React from 'react';
import './StatusBar.css';

function StatusBar({ status }) {
  return (
    <div className={`status-bar status-${status}`}>
      <div className="status-content">
        <span className="status-indicator"></span>
        {status === 'connected' && <span>✓ Backend Connected</span>}
        {status === 'disconnected' && <span>✗ Backend Disconnected</span>}
        {status === 'checking' && <span>⟳ Checking Backend...</span>}
      </div>
    </div>
  );
}

export default StatusBar;
