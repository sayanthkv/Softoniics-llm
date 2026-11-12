import React, { useState } from 'react';
import ModuleManagement from './pages/ModuleManagement';
import TopicManagement from './pages/TopicsManagement';
import BatchManagement from './pages/BatchManagement';
import TimingsManagement from './pages/TimingsManagement';

function App() {
  const [currentSection, setCurrentSection] = useState('batches');

  const navItems = [
    { key: 'modules', label: 'Modules' },
    { key: 'topics', label: 'Topics' },
    { key: 'batches', label: 'Batches' },
    { key: 'timings', label: 'Timings' },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          padding: '6px',
          borderRadius: '10px',
          backgroundColor: '#111827',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setCurrentSection(item.key)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: currentSection === item.key ? '#f97316' : '#1f2937',
              color: '#ffffff',
              transition: 'background-color 0.15s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {currentSection === 'modules' && <ModuleManagement />}
      {currentSection === 'topics' && <TopicManagement />}
      {currentSection === 'batches' && <BatchManagement />}
      {currentSection === 'timings' && <TimingsManagement />}
    </div>
  );
}

export default App;