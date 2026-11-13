// import React, { useState, useMemo } from 'react';
// import './WeeklySchedule.css';
// import { LuUser, LuSearch, LuEye, LuX } from 'react-icons/lu';
// import { FiChevronDown, FiEdit3, FiCalendar } from 'react-icons/fi';

// const WeeklySchedule = () => {
//   const [branchFilter, setBranchFilter] = useState('calicut');
//   const [startDate, setStartDate] = useState('2026-11-08');
//   const [batchSearch, setBatchSearch] = useState('');
//   const [previewBatch, setPreviewBatch] = useState(null);
//   const [dragOverCell, setDragOverCell] = useState(null);
//   const [editingNoteKey, setEditingNoteKey] = useState(null);

//   const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
//   const subjects = ['PYTHON', 'JAVASCRIPT', 'REACT', 'NODE & EXPRESS', 'MONGODB', 'UI/UX FIGMA'];

//   const allBatches = [
//     { id: 'b1', name: 'DA_BATCH4', course: 'DATA ANALYTICS', interns: 1, branch: 'calicut' },
//     { id: 'b2', name: 'DS_BATCH1', course: 'DATA SCIENCE', interns: 1, branch: 'calicut' },
//     { id: 'b3', name: 'DA_BATCH3', course: 'DATA ANALYTICS', interns: 16, branch: 'calicut' },
//     { id: 'b4', name: 'DA_BATCH2', course: 'DATA ANALYTICS', interns: 15, branch: 'calicut' },
//     { id: 'b5', name: 'DA_BATCH1', course: 'DATA ANALYTICS', interns: 12, branch: 'calicut' },
//     { id: 'b6', name: 'MERN_batch01', course: 'MERN 6 MONTH', interns: 14, branch: 'calicut' },
//     { id: 'b7', name: 'MERN_batch_02', course: 'MERN 6 MONTH', interns: 10, branch: 'calicut' },
//     { id: 'b8', name: 'PY_Batch old 01', course: 'PYTHON 6 MONTH', interns: 8, branch: 'calicut' },
//   ];

//   const mentors = [
//     {
//       id: 'm1',
//       name: 'MOHAMMED NASIH',
//       branch: 'calicut',
//       slots: ['09:30 AM - 12:00 PM', '11:00 AM - 01:30 PM', '02:00 PM - 05:00 PM'],
//     },
//     { id: 'm2', name: 'SHAHAL KP', branch: 'calicut', slots: [] },
//     { id: 'm3', name: 'HIBA C', branch: 'calicut', slots: [] },
//     { id: 'm4', name: 'ARJUN P', branch: 'calicut', slots: [] },
//   ];

//   // Schedule state keyed by `${mentorId}_${slot}_${day}`
//   const [scheduleData, setScheduleData] = useState({});

//   const endDateFormatted = useMemo(() => {
//     if (!startDate) return '11/14/2026';
//     const dt = new Date(startDate);
//     dt.setDate(dt.getDate() + 6);
//     return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
//   }, [startDate]);

//   // Track which batches have at least one slot assigned (highlights green in sidebar)
//   const assignedBatchNames = useMemo(() => {
//     const set = new Set(['MERN_batch01', 'MERN_batch_02']);
//     Object.values(scheduleData).forEach((entry) => {
//       (entry.batches || []).forEach((b) => set.add(b));
//     });
//     return set;
//   }, [scheduleData]);

//   const filteredSidebarBatches = allBatches.filter((b) =>
//     b.name.toLowerCase().includes(batchSearch.toLowerCase().trim())
//   );

//   const handleDragStart = (e, batchName) => {
//     e.dataTransfer.setData('text/plain', batchName);
//   };

//   const handleDropBatch = (e, cellKey) => {
//     e.preventDefault();
//     setDragOverCell(null);
//     const batchName = e.dataTransfer.getData('text/plain');
//     if (!batchName) return;

//     setScheduleData((prev) => {
//       const existing = prev[cellKey] || { batches: [], subject: '', note: '' };
//       if (existing.batches.includes(batchName)) return prev;
//       return {
//         ...prev,
//         [cellKey]: {
//           ...existing,
//           batches: [...existing.batches, batchName],
//         },
//       };
//     });
//   };

//   const handleRemoveAssignedBatch = (cellKey, batchName) => {
//     setScheduleData((prev) => {
//       const existing = prev[cellKey];
//       if (!existing) return prev;
//       return {
//         ...prev,
//         [cellKey]: {
//           ...existing,
//           batches: existing.batches.filter((b) => b !== batchName),
//         },
//       };
//     });
//   };

//   const handleSubjectChange = (cellKey, subject) => {
//     setScheduleData((prev) => {
//       const existing = prev[cellKey] || { batches: [], subject: '', note: '' };
//       return {
//         ...prev,
//         [cellKey]: { ...existing, subject },
//       };
//     });
//   };

//   const handleNoteChange = (cellKey, note) => {
//     setScheduleData((prev) => {
//       const existing = prev[cellKey] || { batches: [], subject: '', note: '' };
//       return {
//         ...prev,
//         [cellKey]: { ...existing, note },
//       };
//     });
//   };

//   const handleAdvanceWeek = () => {
//     const dt = new Date(startDate);
//     dt.setDate(dt.getDate() + 7);
//     setStartDate(dt.toISOString().split('T')[0]);
//   };

//   return (
//     <div className="wk-sched-container">
//       {/* Header */}
//       <header className="wk-sched-header">
//         <div className="wk-sched-title-group">
//           <h1 className="wk-sched-heading">Batch Management</h1>
//           <nav className="wk-sched-breadcrumb">
//             <span>Batch Management</span>
//             <span className="wk-sched-breadcrumb-separator">&gt;</span>
//             <span>weekly-schedule</span>
//           </nav>
//         </div>

//         <div className="wk-sched-profile-card">
//           <div className="wk-sched-profile-avatar">
//             <LuUser />
//           </div>
//           <div className="wk-sched-profile-info">
//             <span className="wk-sched-username">vijitha</span>
//             <span className="wk-sched-role">super admin</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Split Workspace */}
//       <div className="wk-sched-workspace">
//         {/* Left Draggable Batch List */}
//         <aside className="wk-sched-batch-sidebar">
//           <h2 className="wk-sched-sidebar-title">Batch&apos;s</h2>
//           <p className="wk-sched-sidebar-subtitle">
//             Drag batches to the weekly live schedule (classes.)
//           </p>

//           <div className="wk-sched-sidebar-search">
//             <LuSearch className="wk-sched-sidebar-search-icon" />
//             <input
//               type="text"
//               className="wk-sched-sidebar-search-input"
//               placeholder="Search Batch"
//               value={batchSearch}
//               onChange={(e) => setBatchSearch(e.target.value)}
//             />
//           </div>

//           <div className="wk-sched-batch-list">
//             {filteredSidebarBatches.map((batch) => {
//               const isAssigned = assignedBatchNames.has(batch.name);
//               return (
//                 <div
//                   key={batch.id}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, batch.name)}
//                   className={`wk-sched-batch-pill ${
//                     isAssigned ? 'wk-sched-batch-pill--assigned' : ''
//                   }`}
//                 >
//                   <span>{batch.name}</span>
//                   <button
//                     type="button"
//                     className="wk-sched-batch-eye-btn"
//                     onClick={() => setPreviewBatch(batch)}
//                     title="Quick View Batch"
//                   >
//                     <LuEye />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </aside>

//         {/* Right Weekly Schedule Card */}
//         <section className="wk-sched-main-panel">
//           <div className="wk-sched-panel-topbar">
//             <div className="wk-sched-panel-title-wrap">
//               <h2 className="wk-sched-panel-title">Weekly Schedule</h2>
//               <p className="wk-sched-panel-subtitle">Assign batches to timings</p>
//             </div>

//             <div className="wk-sched-controls-group">
//               <div className="wk-sched-select-wrapper">
//                 <select
//                   className="wk-sched-select"
//                   value={branchFilter}
//                   onChange={(e) => setBranchFilter(e.target.value)}
//                 >
//                   <option value="calicut">calicut</option>
//                   <option value="kochi">kochi</option>
//                   <option value="kannur">kannur</option>
//                   <option value="trivandrum">trivandrum</option>
//                 </select>
//                 <FiChevronDown className="wk-sched-select-arrow" />
//               </div>

//               <input
//                 type="date"
//                 className="wk-sched-date-input"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />

//               <span className="wk-sched-to-badge">To: {endDateFormatted}</span>

//               <button type="button" className="wk-sched-export-btn">
//                 Export
//               </button>

//               <button
//                 type="button"
//                 className="wk-sched-add-next-btn"
//                 onClick={handleAdvanceWeek}
//               >
//                 <FiCalendar />
//                 <span>Add Next Schedule</span>
//               </button>
//             </div>
//           </div>

//           {/* Horizontal Scrollable Matrix */}
//           <div className="wk-sched-table-scroll">
//             <table className="wk-sched-table">
//               <thead className="wk-sched-thead">
//                 <tr>
//                   <th>MENTORS</th>
//                   <th>TIME</th>
//                   {days.map((day) => (
//                     <React.Fragment key={day}>
//                       <th>{day}</th>
//                       <th>SUBJECT</th>
//                     </React.Fragment>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody className="wk-sched-tbody">
//                 {mentors.map((mentor) => {
//                   if (mentor.slots.length === 0) {
//                     return (
//                       <tr key={mentor.id}>
//                         <td className="wk-sched-mentor-cell">{mentor.name}</td>
//                         <td className="wk-sched-time-cell">-</td>
//                         <td colSpan={days.length * 2} className="wk-sched-no-timings">
//                           No timings assigned for this branch
//                         </td>
//                       </tr>
//                     );
//                   }

//                   return mentor.slots.map((slot, slotIdx) => (
//                     <tr key={`${mentor.id}_${slot}`}>
//                       {slotIdx === 0 && (
//                         <td
//                           rowSpan={mentor.slots.length}
//                           className="wk-sched-mentor-cell"
//                         >
//                           {mentor.name}
//                         </td>
//                       )}

//                       <td className="wk-sched-time-cell">{slot}</td>

//                       {days.map((day) => {
//                         const cellKey = `${mentor.id}_${slot}_${day}`;
//                         const cellData = scheduleData[cellKey] || {
//                           batches: [],
//                           subject: '',
//                           note: '',
//                         };
//                         const isOver = dragOverCell === cellKey;

//                         return (
//                           <React.Fragment key={cellKey}>
//                             <td
//                               className={`wk-sched-drop-cell ${
//                                 isOver ? 'wk-sched-drop-cell--over' : ''
//                               }`}
//                               onDragOver={(e) => {
//                                 e.preventDefault();
//                                 setDragOverCell(cellKey);
//                               }}
//                               onDragLeave={() => setDragOverCell(null)}
//                               onDrop={(e) => handleDropBatch(e, cellKey)}
//                             >
//                               <div className="wk-sched-drop-box">
//                                 {cellData.batches.length === 0 ? (
//                                   <span className="wk-sched-empty-slot-text">
//                                     No batches assigned
//                                   </span>
//                                 ) : (
//                                   <div className="wk-sched-assigned-tags">
//                                     {cellData.batches.map((bName) => (
//                                       <span key={bName} className="wk-sched-assigned-chip">
//                                         {bName}
//                                         <button
//                                           type="button"
//                                           className="wk-sched-chip-remove"
//                                           onClick={() =>
//                                             handleRemoveAssignedBatch(cellKey, bName)
//                                           }
//                                         >
//                                           <LuX />
//                                         </button>
//                                       </span>
//                                     ))}
//                                   </div>
//                                 )}

//                                 {editingNoteKey === cellKey ? (
//                                   <input
//                                     type="text"
//                                     className="wk-sched-note-input"
//                                     placeholder="Type note..."
//                                     value={cellData.note}
//                                     autoFocus
//                                     onBlur={() => setEditingNoteKey(null)}
//                                     onChange={(e) =>
//                                       handleNoteChange(cellKey, e.target.value)
//                                     }
//                                   />
//                                 ) : (
//                                   <button
//                                     type="button"
//                                     className="wk-sched-note-trigger"
//                                     onClick={() => setEditingNoteKey(cellKey)}
//                                   >
//                                     <FiEdit3 />
//                                     <span>{cellData.note || 'Add Note'}</span>
//                                   </button>
//                                 )}
//                               </div>
//                             </td>

//                             <td className="wk-sched-subject-cell">
//                               <select
//                                 className="wk-sched-subject-select"
//                                 value={cellData.subject}
//                                 onChange={(e) =>
//                                   handleSubjectChange(cellKey, e.target.value)
//                                 }
//                               >
//                                 <option value="">Choose Subject</option>
//                                 {subjects.map((sub) => (
//                                   <option key={sub} value={sub}>
//                                     {sub}
//                                   </option>
//                                 ))}
//                               </select>
//                             </td>
//                           </React.Fragment>
//                         );
//                       })}
//                     </tr>
//                   ));
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>

//       {/* Quick Batch Preview Modal */}
//       {previewBatch && (
//         <div
//           className="wk-sched-modal-backdrop"
//           onClick={() => setPreviewBatch(null)}
//         >
//           <div
//             className="wk-sched-modal-card"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="wk-sched-modal-header">
//               <h3 className="wk-sched-modal-title">{previewBatch.name}</h3>
//               <button
//                 type="button"
//                 className="wk-sched-modal-close"
//                 onClick={() => setPreviewBatch(null)}
//               >
//                 Close
//               </button>
//             </div>
//             <div className="wk-sched-modal-row">
//               <strong>Course:</strong> {previewBatch.course}
//             </div>
//             <div className="wk-sched-modal-row">
//               <strong>Branch:</strong> {previewBatch.branch}
//             </div>
//             <div className="wk-sched-modal-row">
//               <strong>Total Interns:</strong> {previewBatch.interns}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeeklySchedule;