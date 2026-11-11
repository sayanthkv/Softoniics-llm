// import React, { useState } from 'react';
// import './BatchManagement.css';
// import { LuUser, LuSearch, LuEye, LuTrash2, LuX } from 'react-icons/lu';
// import { HiOutlineArrowUpTray } from 'react-icons/hi2';
// import { FiChevronDown, FiEdit, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

// const BatchManagement = () => {
//   const [activeTab, setActiveTab] = useState('batches');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedBatch, setSelectedBatch] = useState(null);
//   const [editingBatchId, setEditingBatchId] = useState(null);

//   const [formBatchName, setFormBatchName] = useState('');
//   const [formBatchCode, setFormBatchCode] = useState('');
//   const [formBranchName, setFormBranchName] = useState('');
//   const [formStatus, setFormStatus] = useState('Active');
//   const [formInterns, setFormInterns] = useState([]);

//   const [internSearch, setInternSearch] = useState('');
//   const [internAdmissionNumber, setInternAdmissionNumber] = useState('');
//   const [internCourseName, setInternCourseName] = useState('');
//   const [selectedInternObj, setSelectedInternObj] = useState(null);

//   const [batches, setBatches] = useState([
//     {
//       id: 1,
//       name: 'Ui/UX_JUN_RG_B1_2025',
//       code: 'B11',
//       branch: 'Calicut',
//       status: 'Active',
//       totalInterns: 4,
//       interns: [
//         { id: 1, name: 'John', courseName: 'UI/UX Designing 3M', admissionNumber: '0001' },
//         { id: 2, name: 'Abrahm', courseName: 'UI/UX Designing 3M', admissionNumber: '0002' },
//         { id: 3, name: 'Tasion', courseName: 'UI/UX Designing 3M', admissionNumber: '0003' },
//         { id: 4, name: 'Santhos', courseName: 'UI/UX Designing 3M', admissionNumber: '0004' },
//       ],
//     },
//   ]);

//   const mockInternsDatabase = [
//     { id: 101, name: 'John', admissionNo: '0001', course: 'UI/UX Designing 3M' },
//     { id: 102, name: 'Abrahm', admissionNo: '0002', course: 'UI/UX Designing 3M' },
//     { id: 103, name: 'Tasion', admissionNo: '0003', course: 'UI/UX Designing 3M' },
//     { id: 104, name: 'Santhos', admissionNo: '0004', course: 'UI/UX Designing 3M' },
//     { id: 105, name: 'Sayanth KV', admissionNo: '0005', course: 'MERN Stack Development' },
//     { id: 106, name: 'Rahul Sharma', admissionNo: '0006', course: 'Python Full Stack' },
//   ];

//   const resetForm = () => {
//     setFormBatchName('');
//     setFormBatchCode('');
//     setFormBranchName('');
//     setFormStatus('Active');
//     setFormInterns([]);
//     setInternSearch('');
//     setInternAdmissionNumber('');
//     setInternCourseName('');
//     setSelectedInternObj(null);
//     setEditingBatchId(null);
//   };

//   const handleOpenAddBatch = () => {
//     resetForm();
//     setSelectedBatch(null);
//     setActiveTab('add-batch');
//   };

//   const handleBackToBatches = () => {
//     resetForm();
//     setSelectedBatch(null);
//     setActiveTab('batches');
//   };

//   const handleViewBatch = (batchItem) => {
//     setSelectedBatch(batchItem);
//     setActiveTab('view-batch');
//   };

//   const handleOpenEditBatch = (batchItem) => {
//     setEditingBatchId(batchItem.id);
//     setFormBatchName(batchItem.name);
//     setFormBatchCode(batchItem.code || `B${batchItem.id}`);
//     setFormBranchName(batchItem.branch);
//     setFormStatus(batchItem.status || 'Active');
//     setFormInterns([...batchItem.interns]);
//     setSelectedBatch(batchItem);
//     setActiveTab('edit-batch');
//   };

//   const handleInternSearchChange = (value) => {
//     setInternSearch(value);
//     const matched = mockInternsDatabase.find((intern) =>
//       intern.name.toLowerCase().includes(value.toLowerCase().trim())
//     );

//     if (matched && value.trim()) {
//       setInternAdmissionNumber(matched.admissionNo);
//       setInternCourseName(matched.course);
//       setSelectedInternObj(matched);
//     } else {
//       setInternAdmissionNumber('');
//       setInternCourseName('');
//       setSelectedInternObj(null);
//     }
//   };

//   const handleAddIntern = () => {
//     if (!selectedInternObj) return;

//     const alreadyAdded = formInterns.some((i) => i.admissionNumber === selectedInternObj.admissionNo);
//     if (alreadyAdded) return;

//     const newEntry = {
//       id: Date.now(),
//       name: selectedInternObj.name,
//       courseName: selectedInternObj.course,
//       admissionNumber: selectedInternObj.admissionNo,
//     };

//     setFormInterns((prev) => [...prev, newEntry]);
//     setInternSearch('');
//     setInternAdmissionNumber('');
//     setInternCourseName('');
//     setSelectedInternObj(null);
//   };

//   const handleRemoveIntern = (id) => {
//     setFormInterns((prev) => prev.filter((intern) => intern.id !== id));
//   };

//   const handleCreateBatch = (e) => {
//     e.preventDefault();
//     if (!formBatchName.trim() || !formBranchName) return;

//     const newBatch = {
//       id: Date.now(),
//       name: formBatchName.trim(),
//       code: `B${batches.length + 11}`,
//       branch: formBranchName,
//       status: formStatus || 'Active',
//       totalInterns: formInterns.length,
//       interns: formInterns,
//     };

//     setBatches((prev) => [...prev, newBatch]);
//     handleBackToBatches();
//   };

//   const handleSaveEditedBatch = (e) => {
//     e.preventDefault();
//     if (!formBatchName.trim() || !formBranchName) return;

//     setBatches((prev) =>
//       prev.map((b) =>
//         b.id === editingBatchId
//           ? {
//               ...b,
//               name: formBatchName.trim(),
//               code: formBatchCode,
//               branch: formBranchName,
//               status: formStatus,
//               totalInterns: formInterns.length,
//               interns: formInterns,
//             }
//           : b
//       )
//     );

//     handleBackToBatches();
//   };

//   const handleDeleteBatch = (id) => {
//     setBatches((prev) => prev.filter((b) => b.id !== id));
//     if (selectedBatch && selectedBatch.id === id) {
//       setSelectedBatch(null);
//     }
//     handleBackToBatches();
//   };

//   const filteredBatches = batches.filter((batch) =>
//     batch.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
//     batch.branch.toLowerCase().includes(searchQuery.toLowerCase().trim())
//   );

//   return (
//     <div className="btc-mgmt-container">
//       <header className="btc-mgmt-header">
//         <div className="btc-mgmt-title-group">
//           <h1 className="btc-mgmt-heading">Schedule</h1>
//           <nav className="btc-mgmt-breadcrumb">
//             <span>Schedule</span>
//             <span className="btc-mgmt-breadcrumb-separator">&gt;</span>
//             <span className="btc-mgmt-breadcrumb-segment">Batches</span>
//             {activeTab !== 'batches' && (
//               <>
//                 <span className="btc-mgmt-breadcrumb-separator">&gt;</span>
//                 <span className="btc-mgmt-breadcrumb-current">Add Batch</span>
//               </>
//             )}
//           </nav>
//         </div>

//         <div className="btc-mgmt-profile-card">
//           <LuUser className="btc-mgmt-profile-icon" />
//           <div className="btc-mgmt-profile-info">
//             <span className="btc-mgmt-username">Priyesh</span>
//             <span className="btc-mgmt-role">Super Admin</span>
//           </div>
//         </div>
//       </header>

//       <main className="btc-mgmt-panel">
//         {activeTab !== 'view-batch' && activeTab !== 'edit-batch' && (
//           <div className="btc-mgmt-toolbar">
//             <div className="btc-mgmt-tab-group">
//               <button
//                 type="button"
//                 className={`btc-mgmt-tab-btn ${activeTab === 'batches' ? 'btc-mgmt-tab-btn--active' : ''}`}
//                 onClick={handleBackToBatches}
//               >
//                 Batches
//               </button>
//               <button
//                 type="button"
//                 className={`btc-mgmt-tab-btn ${activeTab === 'add-batch' ? 'btc-mgmt-tab-btn--active' : ''}`}
//                 onClick={handleOpenAddBatch}
//               >
//                 Add Batch
//               </button>
//             </div>

//             {activeTab === 'batches' && (
//               <div className="btc-mgmt-actions-group">
//                 <div className="btc-mgmt-search-box">
//                   <LuSearch className="btc-mgmt-search-icon" />
//                   <input
//                     type="text"
//                     className="btc-mgmt-search-input"
//                     placeholder="Search Batch"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>

//                 <button type="button" className="btc-mgmt-filter-btn">
//                   <span>Filter</span>
//                   <FiChevronDown className="btc-mgmt-filter-icon" />
//                 </button>

//                 <button type="button" className="btc-mgmt-export-btn">
//                   <span>Export</span>
//                   <HiOutlineArrowUpTray className="btc-mgmt-export-icon" />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'batches' && (
//           filteredBatches.length === 0 ? (
//             <div className="btc-mgmt-content-area">
//               <p className="btc-mgmt-empty-message">
//                 No data available. Please add batches to view them here
//               </p>
//             </div>
//           ) : (
//             <div className="btc-mgmt-table-wrapper">
//               <div className="btc-mgmt-table-card">
//                 <div className="btc-mgmt-table-header-row">
//                   <div className="btc-mgmt-th btc-mgmt-col-name">Batch Name</div>
//                   <div className="btc-mgmt-th btc-mgmt-col-branch">Branch</div>
//                   <div className="btc-mgmt-th btc-mgmt-col-status">Status</div>
//                   <div className="btc-mgmt-th btc-mgmt-col-interns">Total Interns</div>
//                   <div className="btc-mgmt-th btc-mgmt-col-actions">Actions</div>
//                 </div>

//                 <div className="btc-mgmt-table-body">
//                   {filteredBatches.map((item) => (
//                     <div key={item.id} className="btc-mgmt-table-row">
//                       <div className="btc-mgmt-td btc-mgmt-col-name" data-label="Batch Name">
//                         {item.name}
//                       </div>
//                       <div className="btc-mgmt-td btc-mgmt-col-branch" data-label="Branch">
//                         {item.branch}
//                       </div>
//                       <div className="btc-mgmt-td btc-mgmt-col-status" data-label="Status">
//                         <span className="btc-mgmt-status-active">{item.status}</span>
//                       </div>
//                       <div className="btc-mgmt-td btc-mgmt-col-interns" data-label="Total Interns">
//                         {item.totalInterns}
//                       </div>
//                       <div className="btc-mgmt-td btc-mgmt-col-actions" data-label="Actions">
//                         <button
//                           type="button"
//                           className="btc-mgmt-action-btn btc-mgmt-action-view"
//                           onClick={() => handleViewBatch(item)}
//                         >
//                           <LuEye />
//                         </button>
//                         <button
//                           type="button"
//                           className="btc-mgmt-action-btn btc-mgmt-action-edit"
//                           onClick={() => handleOpenEditBatch(item)}
//                         >
//                           <FiEdit />
//                         </button>
//                         <button
//                           type="button"
//                           className="btc-mgmt-action-btn btc-mgmt-action-delete"
//                           onClick={() => handleDeleteBatch(item.id)}
//                         >
//                           <LuTrash2 />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="btc-mgmt-pagination-bar">
//                 <span className="btc-mgmt-pagination-text">1 of 1</span>
//                 <div className="btc-mgmt-pagination-controls">
//                   <button type="button" className="btc-mgmt-page-btn" disabled>
//                     <FiChevronLeft />
//                   </button>
//                   <button type="button" className="btc-mgmt-page-btn" disabled>
//                     <FiChevronRight />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )
//         )}

//         {activeTab === 'add-batch' && (
//           <form className="btc-mgmt-form-layout" onSubmit={handleCreateBatch}>
//             <div className="btc-mgmt-form-body">
//               <h2 className="btc-mgmt-section-heading">Batch Details</h2>

//               <div className="btc-mgmt-form-row">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Batch Name</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input"
//                     placeholder="Enter Batch Name"
//                     value={formBatchName}
//                     onChange={(e) => setFormBatchName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Branch Name</label>
//                   <div className="btc-mgmt-select-wrapper">
//                     <select
//                       className="btc-mgmt-select-input"
//                       value={formBranchName}
//                       onChange={(e) => setFormBranchName(e.target.value)}
//                       required
//                     >
//                       <option value="" disabled>Choose Branch</option>
//                       <option value="Calicut">Calicut</option>
//                       <option value="Perinthalmanna">Perinthalmanna</option>
//                       <option value="Kochi">Kochi</option>
//                       <option value="Kannur">Kannur</option>
//                       <option value="Trivandrum">Trivandrum</option>
//                     </select>
//                     <FiChevronDown className="btc-mgmt-select-arrow" />
//                   </div>
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Total Interns</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     value={formInterns.length}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               <div className="btc-mgmt-form-row btc-mgmt-form-row--half">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Status</label>
//                   <div className="btc-mgmt-select-wrapper">
//                     <select
//                       className="btc-mgmt-select-input"
//                       value={formStatus}
//                       onChange={(e) => setFormStatus(e.target.value)}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Upcoming">Upcoming</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                     <FiChevronDown className="btc-mgmt-select-arrow" />
//                   </div>
//                 </div>
//               </div>

//               <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--intern">
//                 Intern Assignment
//               </h2>

//               <div className="btc-mgmt-form-row">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Name</label>
//                   <div className="btc-mgmt-search-input-wrapper">
//                     <input
//                       type="text"
//                       className="btc-mgmt-text-input btc-mgmt-text-input--with-icon"
//                       placeholder="Search Intern"
//                       value={internSearch}
//                       onChange={(e) => handleInternSearchChange(e.target.value)}
//                     />
//                     <LuSearch className="btc-mgmt-input-search-icon" />
//                   </div>
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Admission Number</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     placeholder="0000"
//                     value={internAdmissionNumber}
//                     readOnly
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Course Name</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     placeholder="Course Name"
//                     value={internCourseName}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               <div className="btc-mgmt-add-intern-action">
//                 <button
//                   type="button"
//                   className="btc-mgmt-add-intern-btn"
//                   onClick={handleAddIntern}
//                 >
//                   Add Intern
//                 </button>
//               </div>

//               <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--added">
//                 Added Interns
//               </h2>

//               <div className="btc-mgmt-added-interns-grid">
//                 {formInterns.map((intern) => (
//                   <div key={intern.id} className="btc-mgmt-intern-bar">
//                     {intern.name} - {intern.courseName}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="btc-mgmt-form-footer">
//               <button
//                 type="button"
//                 className="btc-mgmt-cancel-btn"
//                 onClick={handleBackToBatches}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btc-mgmt-submit-btn"
//               >
//                 Create Batch
//               </button>
//             </div>
//           </form>
//         )}

//         {activeTab === 'view-batch' && selectedBatch && (
//           <div className="btc-mgmt-view-layout">
//             <div className="btc-mgmt-view-topbar">
//               <h2 className="btc-mgmt-view-title">{selectedBatch.name}</h2>
//               <button
//                 type="button"
//                 className="btc-mgmt-back-btn"
//                 onClick={handleBackToBatches}
//               >
//                 <FiArrowLeft className="btc-mgmt-back-icon" />
//                 <span>Back</span>
//               </button>
//             </div>

//             <div className="btc-mgmt-form-body">
//               <h3 className="btc-mgmt-section-heading">Batch Details</h3>

//               <div className="btc-mgmt-form-row">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Batch Name</label>
//                   <div className="btc-mgmt-static-box">{selectedBatch.name}</div>
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Branch Name</label>
//                   <div className="btc-mgmt-static-box">{selectedBatch.branch}</div>
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Total Interns</label>
//                   <div className="btc-mgmt-static-box">{selectedBatch.totalInterns}</div>
//                 </div>
//               </div>

//               <div className="btc-mgmt-form-row btc-mgmt-form-row--half">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Status</label>
//                   <div className="btc-mgmt-static-box btc-mgmt-static-box--status">
//                     {selectedBatch.status}
//                   </div>
//                 </div>
//               </div>

//               <h3 className="btc-mgmt-section-heading btc-mgmt-section-heading--added">
//                 Added Interns
//               </h3>

//               <div className="btc-mgmt-added-interns-grid">
//                 {selectedBatch.interns && selectedBatch.interns.length > 0 ? (
//                   selectedBatch.interns.map((intern) => (
//                     <div key={intern.id} className="btc-mgmt-intern-bar">
//                       {intern.name} - {intern.courseName}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="btc-mgmt-intern-bar">No interns assigned</div>
//                 )}
//               </div>
//             </div>

//             <div className="btc-mgmt-form-footer">
//               <button
//                 type="button"
//                 className="btc-mgmt-cancel-btn"
//                 onClick={() => handleDeleteBatch(selectedBatch.id)}
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 className="btc-mgmt-submit-btn"
//                 onClick={() => handleOpenEditBatch(selectedBatch)}
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab === 'edit-batch' && (
//           <form className="btc-mgmt-view-layout" onSubmit={handleSaveEditedBatch}>
//             <div className="btc-mgmt-view-topbar">
//               <h2 className="btc-mgmt-view-title">{formBatchName || 'Edit Batch'}</h2>
//               <button
//                 type="button"
//                 className="btc-mgmt-back-btn"
//                 onClick={handleBackToBatches}
//               >
//                 <FiArrowLeft className="btc-mgmt-back-icon" />
//                 <span>Back</span>
//               </button>
//             </div>

//             <div className="btc-mgmt-form-body">
//               <h3 className="btc-mgmt-section-heading">Batch Details</h3>

//               <div className="btc-mgmt-form-row">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Batch Name</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input"
//                     value={formBatchName}
//                     onChange={(e) => setFormBatchName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Batch Code</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input"
//                     value={formBatchCode}
//                     onChange={(e) => setFormBatchCode(e.target.value)}
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Branch Name</label>
//                   <div className="btc-mgmt-select-wrapper">
//                     <select
//                       className="btc-mgmt-select-input"
//                       value={formBranchName}
//                       onChange={(e) => setFormBranchName(e.target.value)}
//                       required
//                     >
//                       <option value="" disabled>Choose Branch</option>
//                       <option value="Calicut">Calicut</option>
//                       <option value="Perinthalmanna">Perinthalmanna</option>
//                       <option value="Kochi">Kochi</option>
//                       <option value="Kannur">Kannur</option>
//                       <option value="Trivandrum">Trivandrum</option>
//                     </select>
//                     <FiChevronDown className="btc-mgmt-select-arrow" />
//                   </div>
//                 </div>
//               </div>

//               <div className="btc-mgmt-form-row btc-mgmt-form-row--two-col">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Total Interns</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     value={formInterns.length}
//                     readOnly
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Status</label>
//                   <div className="btc-mgmt-select-wrapper">
//                     <select
//                       className="btc-mgmt-select-input btc-mgmt-select-input--blue"
//                       value={formStatus}
//                       onChange={(e) => setFormStatus(e.target.value)}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Upcoming">Upcoming</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                     <FiChevronDown className="btc-mgmt-select-arrow" />
//                   </div>
//                 </div>
//               </div>

//               <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--intern">
//                 Intern Assignment
//               </h2>

//               <div className="btc-mgmt-form-row">
//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Name</label>
//                   <div className="btc-mgmt-search-input-wrapper">
//                     <input
//                       type="text"
//                       className="btc-mgmt-text-input btc-mgmt-text-input--with-icon"
//                       placeholder="Search Intern"
//                       value={internSearch}
//                       onChange={(e) => handleInternSearchChange(e.target.value)}
//                     />
//                     <LuSearch className="btc-mgmt-input-search-icon" />
//                   </div>
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Admission Number</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     placeholder="0000"
//                     value={internAdmissionNumber}
//                     readOnly
//                   />
//                 </div>

//                 <div className="btc-mgmt-input-group">
//                   <label className="btc-mgmt-label">Intern Course Name</label>
//                   <input
//                     type="text"
//                     className="btc-mgmt-text-input btc-mgmt-text-input--disabled"
//                     placeholder="Course Name"
//                     value={internCourseName}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               <div className="btc-mgmt-add-intern-action">
//                 <button
//                   type="button"
//                   className="btc-mgmt-add-intern-btn"
//                   onClick={handleAddIntern}
//                 >
//                   Add Intern
//                 </button>
//               </div>

//               <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--added">
//                 Added Interns
//               </h2>

//               <div className="btc-mgmt-added-interns-grid">
//                 {formInterns.map((intern) => (
//                   <div key={intern.id} className="btc-mgmt-intern-bar btc-mgmt-intern-bar--editable">
//                     <span>{intern.name} - {intern.courseName}</span>
//                     <button
//                       type="button"
//                       className="btc-mgmt-intern-remove-btn"
//                       onClick={() => handleRemoveIntern(intern.id)}
//                     >
//                       <LuX />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="btc-mgmt-form-footer">
//               <button
//                 type="button"
//                 className="btc-mgmt-cancel-btn"
//                 onClick={handleBackToBatches}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btc-mgmt-submit-btn"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BatchManagement;