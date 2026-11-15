import React, { useState, useMemo } from 'react';
import './InternWeeklySchedule.css';
import { LuUser, LuCalendar, LuDownload, LuBriefcase } from 'react-icons/lu';
import { FiCalendar } from 'react-icons/fi';

const InternWeeklySchedule = () => {
  const [selectedDate, setSelectedDate] = useState('2026-11-15');

  const internProfile = {
    name: 'SAYANTH',
    role: 'Intern',
    badgeRole: 'INTERN',
    email: 'sayanthsajeev721@gmail.com',
  };

  const myBatches = [
    {
      id: 'b1',
      name: 'MERN_batch_02',
      branch: 'calicut',
    },
  ];

  // Sample schedule entries (empty by default to match the screenshot state; populates dynamically if slots exist)
  const [weeklySlots] = useState([]);

  // Calculates "To: DD/MM/YYYY" (6 days after selected start date)
  const endDateFormatted = useMemo(() => {
    if (!selectedDate) return '21/11/2026';
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dt = new Date(year, month - 1, day);
    dt.setDate(dt.getDate() + 6);
    const dd = String(dt.getDate()).padStart(2, '0');
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const yyyy = dt.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, [selectedDate]);

  const handleExport = () => {
    const csvRows = [
      ['Batch', 'Branch', 'Day', 'Time', 'Subject', 'Mentor'],
      ...(weeklySlots.length > 0
        ? weeklySlots.map((s) => [s.batch, s.branch, s.day, s.time, s.subject, s.mentor])
        : [[myBatches[0]?.name || '', myBatches[0]?.branch || '', '-', '-', 'No classes scheduled', '-']]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Weekly_Schedule_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="int-sched-container">
      {/* Top Header */}
      <header className="int-sched-header">
        <div className="int-sched-title-group">
          <h1 className="int-sched-heading">My Weekly Schedule</h1>
          <nav className="int-sched-breadcrumb">
            <span>My Weekly Schedule</span>
            <span className="int-sched-breadcrumb-sep">&gt;</span>
            <span>Weekly Schedule</span>
          </nav>
        </div>

        <div className="int-sched-profile-card">
          <div className="int-sched-profile-avatar">
            <LuUser />
          </div>
          <div className="int-sched-profile-info">
            <span className="int-sched-username">{internProfile.name}</span>
            <span className="int-sched-role">{internProfile.role}</span>
          </div>
        </div>
      </header>

      {/* Top Banner Card: My Weekly Timeline */}
      <section className="int-sched-banner-card">
        <div className="int-sched-banner-left">
          <div className="int-sched-icon-box int-sched-icon-box--orange">
            <LuCalendar />
          </div>
          <div className="int-sched-banner-text">
            <h2 className="int-sched-banner-title">My Weekly Timeline</h2>
            <p className="int-sched-banner-subtitle">
              View class timings, subjects, and mentors
            </p>
          </div>
        </div>

        <div className="int-sched-banner-controls">
          <div className="int-sched-date-wrap">
            <input
              type="date"
              className="int-sched-date-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <span className="int-sched-to-pill">To: {endDateFormatted}</span>

          <button
            type="button"
            className="int-sched-download-btn"
            onClick={handleExport}
            title="Download Schedule"
          >
            <LuDownload />
          </button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="int-sched-grid">
        {/* Left Column */}
        <div className="int-sched-left-col">
          {/* Intern Profile Summary Card */}
          <div className="int-sched-card">
            <div className="int-sched-intern-top">
              <div className="int-sched-intern-avatar-box">
                <div className="int-sched-intern-avatar-circle">
                  <LuUser />
                </div>
              </div>
              <div className="int-sched-intern-meta">
                <span className="int-sched-role-badge">{internProfile.badgeRole}</span>
                <h3 className="int-sched-intern-name">{internProfile.name}</h3>
                <p className="int-sched-intern-email">{internProfile.email}</p>
              </div>
            </div>

            <div className="int-sched-stats-row">
              <div className="int-sched-stat-box">
                <span className="int-sched-stat-num int-sched-stat-num--blue">
                  {myBatches.length}
                </span>
                <span className="int-sched-stat-label">MY BATCHES</span>
              </div>

              <div className="int-sched-stat-box">
                <span className="int-sched-stat-num int-sched-stat-num--green">
                  {weeklySlots.length}
                </span>
                <span className="int-sched-stat-label">WEEKLY SLOTS</span>
              </div>
            </div>
          </div>

          {/* My Batches Card */}
          <div className="int-sched-card">
            <div className="int-sched-card-header">
              <div className="int-sched-mini-icon int-sched-mini-icon--blue">
                <LuBriefcase />
              </div>
              <h3 className="int-sched-card-title">My Batches ({myBatches.length})</h3>
            </div>

            <div className="int-sched-batches-list">
              {myBatches.map((batch) => (
                <div key={batch.id} className="int-sched-batch-item">
                  <span className="int-sched-batch-name">{batch.name}</span>
                  <span className="int-sched-batch-branch">{batch.branch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Schedule Timeline */}
        <div className="int-sched-right-col">
          <div className="int-sched-card int-sched-timeline-card">
            <div className="int-sched-card-header int-sched-card-header--bordered">
              <div className="int-sched-mini-icon int-sched-mini-icon--green">
                <FiCalendar />
              </div>
              <h3 className="int-sched-card-title">Weekly Schedule Timeline</h3>
            </div>

            {weeklySlots.length === 0 ? (
              <div className="int-sched-empty-state">
                <p className="int-sched-empty-text">
                  No classes scheduled for your batches this week.
                </p>
              </div>
            ) : (
              <div className="int-sched-slots-list">
                {weeklySlots.map((slot) => (
                  <div key={slot.id} className="int-sched-slot-card">
                    <div className="int-sched-slot-top">
                      <span className="int-sched-slot-day">{slot.day}</span>
                      <span className="int-sched-slot-time">{slot.time}</span>
                    </div>
                    <div className="int-sched-slot-subject">{slot.subject}</div>
                    <div className="int-sched-slot-footer">
                      <span>Batch: {slot.batch}</span>
                      <span>Mentor: {slot.mentor}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternWeeklySchedule;