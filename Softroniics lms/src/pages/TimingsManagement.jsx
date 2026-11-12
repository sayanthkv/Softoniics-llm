import React, { useState } from 'react';
import './TimingsManagement.css';
import { LuUser } from 'react-icons/lu';
import { FiChevronDown, FiEdit2 } from 'react-icons/fi';

const TimingsManagement = () => {
  const [activeTab, setActiveTab] = useState('timings'); // 'timings' | 'new-timing' | 'edit-timing'
  const [branchFilter, setBranchFilter] = useState('calicut');
  const [editingId, setEditingId] = useState(null);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [branchName, setBranchName] = useState('');

  const [timings, setTimings] = useState([
    { id: 1, start: '08:30', end: '11:00', label: '08:30 AM - 11:00 AM', branch: 'calicut' },
    { id: 2, start: '11:00', end: '13:30', label: '11:00 AM - 01:30 PM', branch: 'calicut' },
    { id: 3, start: '14:00', end: '17:00', label: '02:00 PM - 05:00 PM', branch: 'calicut' },
    { id: 4, start: '09:30', end: '12:00', label: '09:30 AM - 12:00 PM', branch: 'calicut' },
    { id: 5, start: '10:00', end: '13:00', label: '10:00 AM - 01:00 PM', branch: 'calicut' },
    { id: 6, start: '09:00', end: '11:00', label: '09:00 AM - 11:00 AM', branch: 'calicut' },
  ]);

  const branches = ['calicut', 'perinthalmanna', 'kochi', 'kannur', 'trivandrum'];

  const formatTo12Hour = (time24) => {
    if (!time24) return '';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${String(hour).padStart(2, '0')}:${minute} ${ampm}`;
  };

  const resetForm = () => {
    setStartTime('');
    setEndTime('');
    setBranchName('');
    setEditingId(null);
  };

  const handleOpenNew = () => {
    resetForm();
    setActiveTab('new-timing');
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setStartTime(item.start);
    setEndTime(item.end);
    setBranchName(item.branch);
    setActiveTab('edit-timing');
  };

  const handleSaveTiming = (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !branchName) return;

    const label = `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`;

    if (activeTab === 'edit-timing' && editingId) {
      setTimings((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, start: startTime, end: endTime, label, branch: branchName } : t
        )
      );
    } else {
      setTimings((prev) => [
        ...prev,
        { id: Date.now(), start: startTime, end: endTime, label, branch: branchName },
      ]);
    }

    resetForm();
    setActiveTab('timings');
  };

  const filteredTimings = timings.filter((t) => t.branch === branchFilter);

  return (
    <div className="tmg-mgmt-container">
      <header className="tmg-mgmt-header">
        <div className="tmg-mgmt-title-group">
          <h1 className="tmg-mgmt-heading">Settings</h1>
          <nav className="tmg-mgmt-breadcrumb">
            <span>Settings</span>
            <span className="tmg-mgmt-breadcrumb-separator">&gt;</span>
            <span>{activeTab === 'timings' ? 'timings' : 'new-timing'}</span>
          </nav>
        </div>

        <div className="tmg-mgmt-profile-card">
          <div className="tmg-mgmt-profile-avatar">
            <LuUser />
          </div>
          <div className="tmg-mgmt-profile-info">
            <span className="tmg-mgmt-username">vijitha</span>
            <span className="tmg-mgmt-role">super admin</span>
          </div>
        </div>
      </header>

      <div className="tmg-mgmt-toolbar">
        <div className="tmg-mgmt-tab-group">
          <button
            type="button"
            className={`tmg-mgmt-tab-btn ${activeTab === 'timings' ? 'tmg-mgmt-tab-btn--active' : ''}`}
            onClick={() => {
              resetForm();
              setActiveTab('timings');
            }}
          >
            Timings
          </button>
          <button
            type="button"
            className={`tmg-mgmt-tab-btn ${
              activeTab === 'new-timing' || activeTab === 'edit-timing'
                ? 'tmg-mgmt-tab-btn--active'
                : ''
            }`}
            onClick={handleOpenNew}
          >
            {activeTab === 'edit-timing' ? 'Edit Timing' : 'New Timing'}
          </button>
        </div>
      </div>

      <main className="tmg-mgmt-panel">
        {activeTab === 'timings' ? (
          <>
            <div className="tmg-mgmt-list-header">
              <h2 className="tmg-mgmt-section-heading">Added Timings</h2>

              <div className="tmg-mgmt-branch-filter">
                <span className="tmg-mgmt-filter-label">Filter by Branch:</span>
                <div className="tmg-mgmt-select-wrapper">
                  <select
                    className="tmg-mgmt-select-input"
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                  >
                    {branches.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="tmg-mgmt-select-arrow" />
                </div>
              </div>
            </div>

            {filteredTimings.length === 0 ? (
              <p className="tmg-mgmt-empty-text">No timings added for this branch yet.</p>
            ) : (
              <div className="tmg-mgmt-pills-grid">
                {filteredTimings.map((item) => (
                  <div key={item.id} className="tmg-mgmt-timing-pill">
                    <span>{item.label}</span>
                    <button
                      type="button"
                      className="tmg-mgmt-pill-edit-btn"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Timing"
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSaveTiming}>
            <h2 className="tmg-mgmt-section-heading">Timings Details</h2>

            <div className="tmg-mgmt-form-row">
              <div className="tmg-mgmt-input-group">
                <label className="tmg-mgmt-label">
                  Start Time<span className="tmg-mgmt-required-star">*</span>
                </label>
                <input
                  type="time"
                  className="tmg-mgmt-time-input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="tmg-mgmt-input-group">
                <label className="tmg-mgmt-label">
                  End Time<span className="tmg-mgmt-required-star">*</span>
                </label>
                <input
                  type="time"
                  className="tmg-mgmt-time-input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>

              <div className="tmg-mgmt-input-group">
                <label className="tmg-mgmt-label">
                  Branch Name<span className="tmg-mgmt-required-star">*</span>
                </label>
                <div className="tmg-mgmt-select-wrapper">
                  <select
                    className="tmg-mgmt-select-input tmg-mgmt-select-input--form"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Choose Branch
                    </option>
                    {branches.map((br) => (
                      <option key={br} value={br}>
                        {br.charAt(0).toUpperCase() + br.slice(1)}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="tmg-mgmt-select-arrow" />
                </div>
              </div>
            </div>

            <div className="tmg-mgmt-form-footer">
              <button
                type="button"
                className="tmg-mgmt-cancel-btn"
                onClick={() => {
                  resetForm();
                  setActiveTab('timings');
                }}
              >
                Cancel
              </button>
              <button type="submit" className="tmg-mgmt-submit-btn">
                {activeTab === 'edit-timing' ? 'Save Timing' : 'Create Timing'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default TimingsManagement;