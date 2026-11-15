import React, { useState, useEffect } from 'react';
import './WeeklyCard.css';
import { LuUser } from 'react-icons/lu';

const WeeklyCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [internData, setInternData] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternData({
        name: 'SAYANTH',
        initial: 'S',
        mode: 'FULL TIME',
        batch: 'PY-01',
        studentId: 'STU-001',
        course: 'MERN 6 MONTH',
        avgTestScore: 0,
        avgProjectScore: 0,
        attendance: 0,
      });
      setEvaluations([]);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const tableColumns = [
    'WEEK',
    'DATES',
    'SUBJECT',
    'TOPIC',
    'TEST',
    'PROJECT',
    'SOFT SKILL',
    'ATTENDANCE',
    'MENTOR',
    'NOTES',
  ];

  return (
    <div className="wk-card-container">
      {/* Header */}
      <header className="wk-card-header">
        <div className="wk-card-title-group">
          <h1 className="wk-card-heading">My Evaluation Card</h1>
          <nav className="wk-card-breadcrumb">
            <span>My Evaluation Card</span>
            <span className="wk-card-breadcrumb-sep">&gt;</span>
            <span>My Card</span>
          </nav>
        </div>

        <div className="wk-card-profile-card">
          <div className="wk-card-profile-avatar">
            <LuUser />
          </div>
          <div className="wk-card-profile-info">
            <span className="wk-card-username">SAYANTH</span>
            <span className="wk-card-role">Intern</span>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="wk-card-body">
        {/* Intern Identity Banner */}
        <section className="wk-card-identity-card">
          <div className="wk-card-avatar-square">
            {isLoading ? '...' : internData?.initial || 'S'}
          </div>

          <div className="wk-card-identity-details">
            <h2 className="wk-card-intern-title">
              {isLoading ? 'Loading...' : internData?.name}
            </h2>

            <div className="wk-card-badges-row">
              <span className="wk-card-badge wk-card-badge--indigo">
                {isLoading ? 'FULL TIME' : internData?.mode}
              </span>
              <span className="wk-card-badge wk-card-badge--teal">
                {isLoading ? 'BATCH' : internData?.batch}
              </span>
              <span className="wk-card-badge wk-card-badge--slate">
                {isLoading ? 'STU-001' : internData?.studentId}
              </span>
              {!isLoading && internData?.course && (
                <span className="wk-card-badge wk-card-badge--purple">
                  {internData.course}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Three Metric Summary Cards */}
        <section className="wk-card-metrics-grid">
          <div className="wk-card-metric-box wk-card-metric-box--teal">
            <div className="wk-card-metric-top">
              <span className="wk-card-metric-label">AVG TEST SCORE</span>
              <span className="wk-card-score-tag">SCORE</span>
            </div>
            <div className="wk-card-metric-value-row">
              <span className="wk-card-metric-num">
                {isLoading ? 0 : internData?.avgTestScore ?? 0}
              </span>
              <span className="wk-card-metric-denom">/ 100</span>
            </div>
          </div>

          <div className="wk-card-metric-box wk-card-metric-box--purple">
            <div className="wk-card-metric-top">
              <span className="wk-card-metric-label">AVG PROJECT SCORE</span>
              <span className="wk-card-score-tag">SCORE</span>
            </div>
            <div className="wk-card-metric-value-row">
              <span className="wk-card-metric-num">
                {isLoading ? 0 : internData?.avgProjectScore ?? 0}
              </span>
              <span className="wk-card-metric-denom">/ 100</span>
            </div>
          </div>

          <div className="wk-card-metric-box wk-card-metric-box--orange">
            <div className="wk-card-metric-top">
              <span className="wk-card-metric-label">ATTENDANCE</span>
            </div>
            <div className="wk-card-metric-value-row">
              <span className="wk-card-metric-num">
                {isLoading ? 0 : internData?.attendance ?? 0}
              </span>
              <span className="wk-card-metric-percent">%</span>
            </div>
            <span className="wk-card-metric-subtext">Percentage</span>
          </div>
        </section>

        {/* Evaluation Table Card */}
        <section className="wk-card-table-card">
          <div className="wk-card-table-scroll">
            <table className="wk-card-table">
              <thead>
                <tr>
                  {tableColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={tableColumns.length} className="wk-card-table-status">
                      Loading your evaluation details...
                    </td>
                  </tr>
                ) : evaluations.length === 0 ? (
                  <tr>
                    <td colSpan={tableColumns.length} className="wk-card-table-status">
                      No evaluation details are currently available for you.
                    </td>
                  </tr>
                ) : (
                  evaluations.map((row, idx) => (
                    <tr key={row.id || idx}>
                      <td>{row.week}</td>
                      <td>{row.dates}</td>
                      <td>{row.subject}</td>
                      <td>{row.topic}</td>
                      <td>{row.test}</td>
                      <td>{row.project}</td>
                      <td>{row.softSkill}</td>
                      <td>{row.attendance}</td>
                      <td>{row.mentor}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeeklyCard;