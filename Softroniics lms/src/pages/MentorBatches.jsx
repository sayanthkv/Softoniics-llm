// import React, { useState, useMemo } from 'react';
// import './MentorBatches.css';
// import { LuUser, LuClock, LuBriefcase, LuTag } from 'react-icons/lu';
// import { HiOutlineArrowDownTray } from 'react-icons/hi2';
// import { FiChevronDown, FiCalendar } from 'react-icons/fi';

// const MentorBatches = () => {
//   const [startDate, setStartDate] = useState('2026-11-08');
//   const [branchFilter, setBranchFilter] = useState('calicut');
//   const [selectedMentorId, setSelectedMentorId] = useState('akhil');

//   const mentorsData = {
//     akhil: {
//       id: 'akhil',
//       name: 'Akhil C V',
//       email: 'akhilcv430@gmail.com',
//       primaryBranch: 'calicut',
//       assignedBatches: [
//         {
//           id: 'ab1',
//           name: 'MERN_batch_02',
//           isToday: true,
//           days: 'Friday, Monday, Wednesday',
//           branch: 'calicut',
//           course: 'MERN 6 MONTH',
//         },
//         {
//           id: 'ab2',
//           name: 'PY-01',
//           isToday: false,
//           days: 'Monday',
//           branch: 'calicut',
//           course: 'PYTHON 6 MONTH',
//         },
//         {
//           id: 'ab3',
//           name: 'MERN_batch01',
//           isToday: false,
//           days: 'Tuesday, Thursday, Saturday',
//           branch: 'calicut',
//           course: 'MERN 6 MONTH',
//         },
//       ],
//       timeline: [
//         {
//           slot: '08:30 AM - 11:00 AM',
//           entries: [
//             {
//               day: 'MONDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'PY-01',
//               subject: 'JAVASCRIPT',
//             },
//             {
//               day: 'TUESDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'MERN_batch01',
//               subject: '',
//             },
//             {
//               day: 'THURSDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'MERN_batch01',
//               subject: '',
//             },
//             {
//               day: 'SATURDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'MERN_batch01',
//               subject: 'JAVASCRIPT',
//             },
//           ],
//         },
//         {
//           slot: '11:00 AM - 01:30 PM',
//           entries: [
//             {
//               day: 'MONDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'MERN_batch_02',
//               subject: '',
//             },
//             {
//               day: 'TUESDAY',
//               branch: 'calicut',
//               active: false,
//               batchName: '',
//               subject: '',
//             },
//           ],
//         },
//       ],
//     },
//     nasih: {
//       id: 'nasih',
//       name: 'Mohammed Nasih',
//       email: 'nasih@softroniics.in',
//       primaryBranch: 'calicut',
//       assignedBatches: [
//         {
//           id: 'nb1',
//           name: 'DA_BATCH4',
//           isToday: true,
//           days: 'Monday, Wednesday, Friday',
//           branch: 'calicut',
//           course: 'DATA ANALYTICS',
//         },
//       ],
//       timeline: [
//         {
//           slot: '09:30 AM - 12:00 PM',
//           entries: [
//             {
//               day: 'MONDAY',
//               branch: 'calicut',
//               active: true,
//               batchName: 'DA_BATCH4',
//               subject: 'PYTHON',
//             },
//           ],
//         },
//       ],
//     },
//   };

//   const currentMentor = mentorsData[selectedMentorId] || mentorsData.akhil;

//   const endDateFormatted = useMemo(() => {
//     if (!startDate) return '11/14/2026';
//     const dt = new Date(startDate);
//     dt.setDate(dt.getDate() + 6);
//     return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
//   }, [startDate]);

//   return (
//     <div className="mnt-btc-container">
//       {/* Header */}
//       <header className="mnt-btc-header">
//         <div className="mnt-btc-title-group">
//           <h1 className="mnt-btc-heading">Mentor Batches</h1>
//           <nav className="mnt-btc-breadcrumb">
//             <span>Mentor Batches</span>
//             <span className="mnt-btc-breadcrumb-separator">&gt;</span>
//             <span>Mentor Batches</span>
//           </nav>
//         </div>

//         <div className="mnt-btc-profile-card">
//           <div className="mnt-btc-profile-avatar">
//             <LuUser />
//           </div>
//           <div className="mnt-btc-profile-info">
//             <span className="mnt-btc-username">vijitha</span>
//             <span className="mnt-btc-role">super admin</span>
//           </div>
//         </div>
//       </header>

//       {/* Top Selector Bar */}
//       <section className="mnt-btc-selector-card">
//         <div className="mnt-btc-selector-left">
//           <div className="mnt-btc-selector-icon-box">
//             <LuUser />
//           </div>
//           <div>
//             <h2 className="mnt-btc-selector-title">Select Mentor Schedule</h2>
//             <p className="mnt-btc-selector-sub">
//               Choose a mentor to view assigned batches &amp; schedule
//             </p>
//           </div>
//         </div>

//         <div className="mnt-btc-selector-controls">
//           <input
//             type="date"
//             className="mnt-btc-date-input"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />

//           <span className="mnt-btc-to-pill">To: {endDateFormatted}</span>

//           <div className="mnt-btc-select-wrapper">
//             <select
//               className="mnt-btc-select"
//               value={branchFilter}
//               onChange={(e) => setBranchFilter(e.target.value)}
//             >
//               <option value="calicut">calicut</option>
//               <option value="kochi">kochi</option>
//               <option value="kannur">kannur</option>
//             </select>
//             <FiChevronDown className="mnt-btc-select-arrow" />
//           </div>

//           <div className="mnt-btc-select-wrapper mnt-btc-select-wrapper--mentor">
//             <select
//               className="mnt-btc-select"
//               value={selectedMentorId}
//               onChange={(e) => setSelectedMentorId(e.target.value)}
//             >
//               <option value="akhil">Akhil C V</option>
//               <option value="nasih">Mohammed Nasih</option>
//             </select>
//             <FiChevronDown className="mnt-btc-select-arrow" />
//           </div>

//           <button type="button" className="mnt-btc-download-btn" title="Export Schedule">
//             <HiOutlineArrowDownTray />
//           </button>
//         </div>
//       </section>

//       {/* Main 2-Column Content */}
//       <div className="mnt-btc-grid">
//         {/* Left Column: Mentor Info + Assigned Batches */}
//         <div className="mnt-btc-left-col">
//           {/* Mentor Overview Card */}
//           <div className="mnt-btc-card">
//             <div className="mnt-btc-mentor-top">
//               <div className="mnt-btc-mentor-avatar">
//                 <LuUser />
//               </div>
//               <div>
//                 <span className="mnt-btc-role-badge">MENTOR</span>
//                 <h3 className="mnt-btc-mentor-name">{currentMentor.name}</h3>
//                 <p className="mnt-btc-mentor-email">{currentMentor.email}</p>
//               </div>
//             </div>

//             <div className="mnt-btc-assigned-label">ASSIGNED BRANCHES</div>
//             <div className="mnt-btc-branch-tag">
//               <span className="mnt-btc-branch-dot" />
//               <span>{currentMentor.primaryBranch} (Primary)</span>
//             </div>

//             <div className="mnt-btc-stats-row">
//               <div className="mnt-btc-stat-box">
//                 <span className="mnt-btc-stat-num mnt-btc-stat-num--blue">
//                   {currentMentor.assignedBatches.length}
//                 </span>
//                 <span className="mnt-btc-stat-label">ASSIGNED BATCHES</span>
//               </div>

//               <div className="mnt-btc-stat-box">
//                 <span className="mnt-btc-stat-num mnt-btc-stat-num--green">
//                   {currentMentor.assignedBatches.length}
//                 </span>
//                 <span className="mnt-btc-stat-label">SCHEDULE SLOTS</span>
//               </div>
//             </div>
//           </div>

//           {/* Assigned Batches Card (Matching Screenshot 3) */}
//           <div className="mnt-btc-card">
//             <div className="mnt-btc-card-header">
//               <div className="mnt-btc-card-header-icon">
//                 <LuBriefcase />
//               </div>
//               <h3 className="mnt-btc-card-title">
//                 Assigned Batches ({currentMentor.assignedBatches.length})
//               </h3>
//             </div>

//             <div className="mnt-btc-assigned-list">
//               {currentMentor.assignedBatches.map((batch) => (
//                 <div key={batch.id} className="mnt-btc-assigned-item">
//                   <div className="mnt-btc-assigned-item-top">
//                     <span className="mnt-btc-assigned-batch-name">{batch.name}</span>
//                     <div className="mnt-btc-assigned-badges">
//                       {batch.isToday && <span className="mnt-btc-today-pill">Today</span>}
//                       <span className="mnt-btc-days-pill">{batch.days}</span>
//                       <span className="mnt-btc-branch-mini-pill">{batch.branch}</span>
//                     </div>
//                   </div>
//                   <div className="mnt-btc-assigned-course-sub">
//                     {batch.course} &bull; {batch.branch}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Weekly Schedule Timeline */}
//         <div className="mnt-btc-card">
//           <div className="mnt-btc-card-header">
//             <div className="mnt-btc-card-header-icon mnt-btc-card-header-icon--green">
//               <FiCalendar />
//             </div>
//             <h3 className="mnt-btc-card-title">Weekly Schedule Timeline</h3>
//           </div>

//           <div className="mnt-btc-timeline-wrapper">
//             {currentMentor.timeline.map((group) => (
//               <div key={group.slot} className="mnt-btc-slot-group">
//                 <span className="mnt-btc-slot-dot" />
//                 <div className="mnt-btc-slot-badge">
//                   <LuClock />
//                   <span>{group.slot}</span>
//                 </div>

//                 <div className="mnt-btc-day-cards">
//                   {group.entries.map((entry, idx) => (
//                     <div
//                       key={`${group.slot}_${entry.day}_${idx}`}
//                       className={`mnt-btc-day-card ${
//                         !entry.active ? 'mnt-btc-day-card--inactive' : ''
//                       }`}
//                     >
//                       <div className="mnt-btc-day-card-top">
//                         <div className="mnt-btc-day-left">
//                           <span className="mnt-btc-day-badge">{entry.day}</span>
//                           <span className="mnt-btc-branch-mini-pill">{entry.branch}</span>
//                         </div>
//                         {entry.active ? (
//                           <span className="mnt-btc-active-status">1 Batch(es) Active</span>
//                         ) : (
//                           <span className="mnt-btc-no-batch-status">No Batches</span>
//                         )}
//                       </div>

//                       {entry.active ? (
//                         <div className="mnt-btc-day-batch-row">
//                           <span className="mnt-btc-batch-tag">
//                             {entry.batchName}{' '}
//                             <span className="mnt-btc-batch-tag-branch">{entry.branch}</span>
//                           </span>

//                           {entry.subject && (
//                             <span className="mnt-btc-subject-tag">
//                               <LuTag />
//                               <span>Subject: {entry.subject}</span>
//                             </span>
//                           )}
//                         </div>
//                       ) : (
//                         <p className="mnt-btc-inactive-text">
//                           No active batches assigned to this slot
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorBatches;