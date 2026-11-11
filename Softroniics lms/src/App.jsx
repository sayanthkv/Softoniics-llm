import React, { useState } from 'react';
import ModuleManagement from "./pages/ModuleManagement";
import TopicManagement from "./pages/TopicsManagement"
import BatchManagement from "./pages/BatchManagement"

function App() {
  const [currentSection, setCurrentSection] = useState('batches');

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#fafbfb' }}>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          padding: '6px',
          borderRadius: '8px',
          backgroundColor: '#111827',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentSection('modules')}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: currentSection === 'modules' ? '#e08316' : '#1f2937',
            color: '#ffffff',
            transition: 'background-color 0.15s ease',
          }}
        >
          Modules
        </button>
        <button
          type="button"
          onClick={() => setCurrentSection('topics')}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: currentSection === 'topics' ? '#e08316' : '#1f2937',
            color: '#ffffff',
            transition: 'background-color 0.15s ease',
          }}
        >
          Topics
        </button>
        <button
          type="button"
          onClick={() => setCurrentSection('batches')}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: currentSection === 'batches' ? '#e08316' : '#1f2937',
            color: '#ffffff',
            transition: 'background-color 0.15s ease',
          }}
        >
          Batches
        </button>
      </div>

      {currentSection === 'modules' && <ModuleManagement />}
      {currentSection === 'topics' && <TopicManagement />}
      {currentSection === 'batches' && <BatchManagement />}
    </div>
  );
}

export default App;