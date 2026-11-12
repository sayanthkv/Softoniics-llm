import React, { useState, useMemo } from 'react';
import './BatchManagement.css';
import { LuUser, LuSearch, LuX } from 'react-icons/lu';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BatchManagement = () => {
  const [activeTab, setActiveTab] = useState('batches'); // 'batches' | 'add-batch' | 'edit-batch'
  const [viewingBatch, setViewingBatch] = useState(null);
  const [editingBatchId, setEditingBatchId] = useState(null);

  // List Filter States (Matching Screenshot 1)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [branchFilter, setBranchFilter] = useState('calicut');

  // Form States
  const [formBatchName, setFormBatchName] = useState('');
  const [formBranchName, setFormBranchName] = useState('');
  const [formStatus, setFormStatus] = useState('Active');
  const [formInterns, setFormInterns] = useState([]);

  // Intern Search States
  const [internSearch, setInternSearch] = useState('');
  const [internAdmissionNumber, setInternAdmissionNumber] = useState('');
  const [internCourseName, setInternCourseName] = useState('');
  const [selectedInternObj, setSelectedInternObj] = useState(null);
  const [showInternSuggestions, setShowInternSuggestions] = useState(false);

  const [batches, setBatches] = useState([
    {
      id: 1,
      code: 'b5b23e',
      name: 'DA_BATCH4',
      branch: 'calicut',
      status: 'Active',
      createdAt: '11/6/2026',
      interns: [
        { id: 1, name: 'John', courseName: 'DATA ANALYTICS', admissionNumber: '0001' },
      ],
    },
    {
      id: 2,
      code: '24f14e',
      name: 'DS_BATCH1',
      branch: 'calicut',
      status: 'Active',
      createdAt: '11/6/2026',
      interns: [
        { id: 2, name: 'Abrahm', courseName: 'DATA SCIENCE', admissionNumber: '0002' },
      ],
    },
    {
      id: 3,
      code: '24f097',
      name: 'DA_BATCH3',
      branch: 'calicut',
      status: 'Active',
      createdAt: '11/6/2026',
      interns: Array.from({ length: 16 }, (_, idx) => ({
        id: 300 + idx,
        name: `Intern ${idx + 1}`,
        courseName: 'DATA ANALYTICS',
        admissionNumber: `010${idx + 1}`,
      })),
    },
    {
      id: 4,
      code: '6b34e4',
      name: 'DA_BATCH2',
      branch: 'calicut',
      status: 'Active',
      createdAt: '11/6/2026',
      interns: Array.from({ length: 15 }, (_, idx) => ({
        id: 400 + idx,
        name: `Intern ${idx + 1}`,
        courseName: 'DATA ANALYTICS',
        admissionNumber: `020${idx + 1}`,
      })),
    },
  ]);

  const mockInternsDatabase = [
    { id: 101, name: 'John', admissionNo: '0001', course: 'DATA ANALYTICS', branch: 'calicut' },
    { id: 102, name: 'Abrahm', admissionNo: '0002', course: 'DATA SCIENCE', branch: 'calicut' },
    { id: 103, name: 'Tasion', admissionNo: '0003', course: 'UI/UX DESIGNING', branch: 'calicut' },
    { id: 104, name: 'Santhos', admissionNo: '0004', course: 'UI/UX DESIGNING', branch: 'kochi' },
    { id: 105, name: 'Sayanth KV', admissionNo: '0005', course: 'MERN 6 MONTH', branch: 'calicut' },
    { id: 106, name: 'Rahul Sharma', admissionNo: '0006', course: 'PYTHON 6 MONTH', branch: 'kannur' },
  ];

  const availableBranches = ['calicut', 'perinthalmanna', 'kochi', 'kannur', 'trivandrum'];

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const matchesSearch =
        batch.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        batch.code.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesStatus = statusFilter === 'All Status' || batch.status === statusFilter;
      const matchesBranch =
        branchFilter === 'All Branches' ||
        batch.branch.toLowerCase() === branchFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesBranch;
    });
  }, [batches, searchQuery, statusFilter, branchFilter]);

  const branchFilteredInterns = useMemo(() => {
    if (!formBranchName) return [];
    return mockInternsDatabase.filter(
      (i) =>
        i.branch.toLowerCase() === formBranchName.toLowerCase() &&
        (i.name.toLowerCase().includes(internSearch.toLowerCase().trim()) ||
          i.admissionNo.includes(internSearch.trim()))
    );
  }, [formBranchName, internSearch]);

  const resetForm = () => {
    setFormBatchName('');
    setFormBranchName('');
    setFormStatus('Active');
    setFormInterns([]);
    setInternSearch('');
    setInternAdmissionNumber('');
    setInternCourseName('');
    setSelectedInternObj(null);
    setShowInternSuggestions(false);
    setEditingBatchId(null);
  };

  const handleOpenAddBatch = () => {
    resetForm();
    setViewingBatch(null);
    setActiveTab('add-batch');
  };

  const handleBackToBatches = () => {
    resetForm();
    setViewingBatch(null);
    setActiveTab('batches');
  };

  const handleViewBatch = (batchItem) => {
    setViewingBatch(batchItem);
  };

  const handleOpenEditBatch = (batchItem) => {
    setViewingBatch(null);
    setEditingBatchId(batchItem.id);
    setFormBatchName(batchItem.name);
    setFormBranchName(batchItem.branch);
    setFormStatus(batchItem.status || 'Active');
    setFormInterns([...batchItem.interns]);
    setActiveTab('edit-batch');
  };

  const handleSelectInternSuggestion = (intern) => {
    setSelectedInternObj(intern);
    setInternSearch(intern.name);
    setInternAdmissionNumber(intern.admissionNo);
    setInternCourseName(intern.course);
    setShowInternSuggestions(false);
  };

  const handleAddIntern = () => {
    if (!selectedInternObj) return;

    const alreadyAdded = formInterns.some(
      (i) => i.admissionNumber === selectedInternObj.admissionNo
    );
    if (alreadyAdded) return;

    const newEntry = {
      id: Date.now(),
      name: selectedInternObj.name,
      courseName: selectedInternObj.course,
      admissionNumber: selectedInternObj.admissionNo,
    };

    setFormInterns((prev) => [...prev, newEntry]);
    setInternSearch('');
    setInternAdmissionNumber('');
    setInternCourseName('');
    setSelectedInternObj(null);
  };

  const handleRemoveIntern = (id) => {
    setFormInterns((prev) => prev.filter((intern) => intern.id !== id));
  };

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!formBatchName.trim() || !formBranchName) return;

    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    const newBatch = {
      id: Date.now(),
      code: Math.random().toString(16).substring(2, 8),
      name: formBatchName.trim().toUpperCase(),
      branch: formBranchName.toLowerCase(),
      status: formStatus || 'Active',
      createdAt: formattedDate,
      interns: formInterns,
    };

    setBatches((prev) => [newBatch, ...prev]);
    handleBackToBatches();
  };

  const handleSaveEditedBatch = (e) => {
    e.preventDefault();
    if (!formBatchName.trim() || !formBranchName) return;

    setBatches((prev) =>
      prev.map((b) =>
        b.id === editingBatchId
          ? {
              ...b,
              name: formBatchName.trim().toUpperCase(),
              branch: formBranchName.toLowerCase(),
              status: formStatus,
              interns: formInterns,
            }
          : b
      )
    );

    handleBackToBatches();
  };

  const handleDeleteBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
    if (viewingBatch && viewingBatch.id === id) {
      setViewingBatch(null);
    }
  };

  return (
    <div className="btc-mgmt-container">
      {/* Header */}
      <header className="btc-mgmt-header">
        <div className="btc-mgmt-title-group">
          <h1 className="btc-mgmt-heading">Batch Management</h1>
          <nav className="btc-mgmt-breadcrumb">
            <span>Batch Management</span>
            <span className="btc-mgmt-breadcrumb-separator">&gt;</span>
            <span>
              {activeTab === 'batches' && 'batches'}
              {activeTab === 'add-batch' && 'new-batch'}
              {activeTab === 'edit-batch' && 'edit-batch'}
            </span>
          </nav>
        </div>

        <div className="btc-mgmt-profile-card">
          <div className="btc-mgmt-profile-avatar">
            <LuUser />
          </div>
          <div className="btc-mgmt-profile-info">
            <span className="btc-mgmt-username">vijitha</span>
            <span className="btc-mgmt-role">super admin</span>
          </div>
        </div>
      </header>

      {/* Outer Toolbar (Matches Screenshot 1, 2, 3) */}
      <div className="btc-mgmt-toolbar">
        <div className="btc-mgmt-tab-group">
          <button
            type="button"
            className={`btc-mgmt-tab-btn ${activeTab === 'batches' ? 'btc-mgmt-tab-btn--active' : ''}`}
            onClick={handleBackToBatches}
          >
            Batches
          </button>
          <button
            type="button"
            className={`btc-mgmt-tab-btn ${
              activeTab === 'add-batch' || activeTab === 'edit-batch'
                ? 'btc-mgmt-tab-btn--active'
                : ''
            }`}
            onClick={handleOpenAddBatch}
          >
            {activeTab === 'edit-batch' ? 'Edit Batch' : 'New Batch'}
          </button>
        </div>

        <button type="button" className="btc-mgmt-export-btn">
          <HiOutlineArrowDownTray className="btc-mgmt-export-icon" />
          <span>Export</span>
        </button>
      </div>

      {/* Main White Card Container */}
      <main className="btc-mgmt-panel">
        {/* BATCHES LIST VIEW (Matches Screenshot 1) */}
        {activeTab === 'batches' && (
          <>
            <div className="btc-mgmt-filter-bar">
              <div className="btc-mgmt-search-wrapper">
                <LuSearch className="btc-mgmt-search-icon" />
                <input
                  type="text"
                  className="btc-mgmt-search-input"
                  placeholder="Search Batches"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="btc-mgmt-filter-select-wrapper">
                <select
                  className="btc-mgmt-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
                <FiChevronDown className="btc-mgmt-select-arrow" />
              </div>

              <div className="btc-mgmt-filter-select-wrapper">
                <select
                  className="btc-mgmt-filter-select"
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                >
                  <option value="All Branches">All Branches</option>
                  {availableBranches.map((br) => (
                    <option key={br} value={br}>
                      {br}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="btc-mgmt-select-arrow" />
              </div>
            </div>

            {filteredBatches.length === 0 ? (
              <div className="btc-mgmt-content-area">
                <p className="btc-mgmt-empty-message">
                  No batches available. Please add batches to view them here.
                </p>
              </div>
            ) : (
              <div className="btc-mgmt-table-wrapper">
                <div className="btc-mgmt-table-header-row">
                  <div className="btc-mgmt-th">#</div>
                  <div className="btc-mgmt-th">BATCH NAME</div>
                  <div className="btc-mgmt-th btc-mgmt-th-center">BRANCH</div>
                  <div className="btc-mgmt-th btc-mgmt-th-center">STATUS</div>
                  <div className="btc-mgmt-th btc-mgmt-th-center">TOTAL INTERNS</div>
                  <div className="btc-mgmt-th btc-mgmt-th-center">CREATED</div>
                  <div className="btc-mgmt-th btc-mgmt-th-center">ACTIONS</div>
                </div>

                <div className="btc-mgmt-table-body">
                  {filteredBatches.map((item, idx) => {
                    const count = item.interns.length;
                    return (
                      <div key={item.id} className="btc-mgmt-table-row">
                        <div className="btc-mgmt-td" data-label="#">
                          {idx + 1}
                        </div>

                        <div className="btc-mgmt-td" data-label="Batch Name">
                          <div className="btc-mgmt-batch-cell">
                            <span className="btc-mgmt-batch-avatar">
                              {item.name.charAt(0).toUpperCase()}
                            </span>
                            <div className="btc-mgmt-batch-info">
                              <span className="btc-mgmt-batch-name-text">{item.name}</span>
                              <span className="btc-mgmt-batch-id-sub">ID: {item.code}</span>
                            </div>
                          </div>
                        </div>

                        <div className="btc-mgmt-td btc-mgmt-td-center" data-label="Branch">
                          <span className="btc-mgmt-branch-pill">{item.branch}</span>
                        </div>

                        <div className="btc-mgmt-td btc-mgmt-td-center" data-label="Status">
                          <span
                            className={`btc-mgmt-status-pill btc-mgmt-status-pill--${item.status.toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="btc-mgmt-td btc-mgmt-td-center" data-label="Total Interns">
                          <div className="btc-mgmt-interns-count-wrap">
                            <span className="btc-mgmt-interns-count">{count}</span>
                            {count > 2 && (
                              <span className="btc-mgmt-interns-more">+{count - 2} more</span>
                            )}
                          </div>
                        </div>

                        <div className="btc-mgmt-td btc-mgmt-td-center" data-label="Created">
                          <span className="btc-mgmt-date-text">{item.createdAt}</span>
                        </div>

                        <div className="btc-mgmt-td btc-mgmt-col-actions" data-label="Actions">
                          <button
                            type="button"
                            className="btc-mgmt-text-action btc-mgmt-text-action--view"
                            onClick={() => handleViewBatch(item)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btc-mgmt-text-action btc-mgmt-text-action--edit"
                            onClick={() => handleOpenEditBatch(item)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btc-mgmt-text-action btc-mgmt-text-action--delete"
                            onClick={() => handleDeleteBatch(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="btc-mgmt-pagination-bar">
                  <span className="btc-mgmt-pagination-text">1 of 1</span>
                  <div className="btc-mgmt-pagination-controls">
                    <button type="button" className="btc-mgmt-page-btn" disabled>
                      <FiChevronLeft />
                    </button>
                    <button type="button" className="btc-mgmt-page-btn" disabled>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* NEW BATCH & EDIT BATCH FORM (Matches Screenshot 2 & 3) */}
        {(activeTab === 'add-batch' || activeTab === 'edit-batch') && (
          <form
            className="btc-mgmt-form-layout"
            onSubmit={activeTab === 'add-batch' ? handleCreateBatch : handleSaveEditedBatch}
          >
            <div className="btc-mgmt-form-body">
              <h2 className="btc-mgmt-section-heading">Batch Details</h2>

              <div className="btc-mgmt-form-row">
                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">
                    Batch Name<span className="btc-mgmt-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="btc-mgmt-text-input"
                    placeholder="Enter Batch Name"
                    value={formBatchName}
                    onChange={(e) => setFormBatchName(e.target.value)}
                    required
                  />
                </div>

                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">
                    Branch Name<span className="btc-mgmt-required-star">*</span>
                  </label>
                  <div className="btc-mgmt-select-wrapper">
                    <select
                      className="btc-mgmt-select-input"
                      value={formBranchName}
                      onChange={(e) => {
                        setFormBranchName(e.target.value);
                        setInternSearch('');
                        setSelectedInternObj(null);
                      }}
                      required
                    >
                      <option value="" disabled>
                        Choose Branch
                      </option>
                      {availableBranches.map((br) => (
                        <option key={br} value={br}>
                          {br.charAt(0).toUpperCase() + br.slice(1)}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="btc-mgmt-select-arrow" />
                  </div>
                </div>

                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">Total Interns</label>
                  <input
                    type="text"
                    className="btc-mgmt-text-input btc-mgmt-text-input--readonly"
                    value={formInterns.length}
                    readOnly
                  />
                </div>
              </div>

              {/* Full-width Status Dropdown (Matching Screenshot 2) */}
              <div className="btc-mgmt-form-full-row">
                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">Status</label>
                  <div className="btc-mgmt-select-wrapper">
                    <select
                      className="btc-mgmt-select-input"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <FiChevronDown className="btc-mgmt-select-arrow" />
                  </div>
                </div>
              </div>

              <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--intern">
                Intern Assignment
              </h2>

              <div className="btc-mgmt-form-row">
                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">Search Interns</label>
                  <div className="btc-mgmt-intern-search-wrapper">
                    <LuSearch className="btc-mgmt-intern-search-icon" />
                    <input
                      type="text"
                      className="btc-mgmt-text-input btc-mgmt-text-input--left-icon"
                      placeholder={
                        formBranchName
                          ? 'Search by intern name or admission no...'
                          : 'Select a branch first to search interns...'
                      }
                      value={internSearch}
                      disabled={!formBranchName}
                      onFocus={() => setShowInternSuggestions(true)}
                      onChange={(e) => {
                        setInternSearch(e.target.value);
                        setSelectedInternObj(null);
                        setShowInternSuggestions(true);
                      }}
                    />
                    {showInternSuggestions &&
                      formBranchName &&
                      branchFilteredInterns.length > 0 && (
                        <div className="btc-mgmt-intern-dropdown">
                          {branchFilteredInterns.map((intern) => (
                            <div
                              key={intern.id}
                              className="btc-mgmt-intern-dropdown-item"
                              onClick={() => handleSelectInternSuggestion(intern)}
                            >
                              <span>{intern.name}</span>
                              <span className="btc-mgmt-intern-dropdown-meta">
                                #{intern.admissionNo} • {intern.course}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">Intern Admission Number</label>
                  <input
                    type="text"
                    className="btc-mgmt-text-input btc-mgmt-text-input--readonly"
                    placeholder="Enter admission number"
                    value={internAdmissionNumber}
                    readOnly
                  />
                </div>

                <div className="btc-mgmt-input-group">
                  <label className="btc-mgmt-label">Intern Course Name</label>
                  <input
                    type="text"
                    className="btc-mgmt-text-input btc-mgmt-text-input--readonly"
                    placeholder="Enter course name"
                    value={internCourseName}
                    readOnly
                  />
                </div>
              </div>

              <div className="btc-mgmt-add-intern-action">
                <button
                  type="button"
                  className={`btc-mgmt-add-intern-btn ${
                    selectedInternObj ? 'btc-mgmt-add-intern-btn--ready' : ''
                  }`}
                  onClick={handleAddIntern}
                  disabled={!selectedInternObj}
                >
                  Add Intern
                </button>
              </div>

              <h2 className="btc-mgmt-section-heading btc-mgmt-section-heading--added">
                Added Interns
              </h2>

              {formInterns.length === 0 ? (
                <div className="btc-mgmt-added-empty">
                  No interns added yet. Add interns using the form above.
                </div>
              ) : (
                <div className="btc-mgmt-added-interns-grid">
                  {formInterns.map((intern) => (
                    <div key={intern.id} className="btc-mgmt-intern-chip">
                      <div className="btc-mgmt-intern-chip-info">
                        <span className="btc-mgmt-intern-chip-name">{intern.name}</span>
                        <span className="btc-mgmt-intern-chip-sub">
                          #{intern.admissionNumber} • {intern.courseName}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btc-mgmt-intern-remove-btn"
                        onClick={() => handleRemoveIntern(intern.id)}
                      >
                        <LuX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="btc-mgmt-form-footer">
              <button
                type="button"
                className="btc-mgmt-cancel-btn"
                onClick={handleBackToBatches}
              >
                Cancel
              </button>
              <button type="submit" className="btc-mgmt-submit-btn">
                {activeTab === 'add-batch' ? 'Create Batch' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* VIEW BATCH MODAL */}
      {viewingBatch && (
        <div
          className="btc-mgmt-modal-backdrop"
          onClick={() => setViewingBatch(null)}
        >
          <div
            className="btc-mgmt-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="btc-mgmt-modal-header">
              <h2 className="btc-mgmt-modal-title">{viewingBatch.name}</h2>
              <button
                type="button"
                className="btc-mgmt-modal-close-top"
                onClick={() => setViewingBatch(null)}
              >
                <span>&lt; Close</span>
              </button>
            </div>

            <div className="btc-mgmt-modal-details-grid">
              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">Batch Name:</span>
                <span>{viewingBatch.name}</span>
              </div>

              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">Branch:</span>
                <span>{viewingBatch.branch}</span>
              </div>

              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">Status:</span>
                <span>{viewingBatch.status}</span>
              </div>

              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">Created:</span>
                <span>{viewingBatch.createdAt}</span>
              </div>

              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">Total Interns:</span>
                <span>{viewingBatch.interns.length}</span>
              </div>

              <div className="btc-mgmt-modal-detail-item">
                <span className="btc-mgmt-modal-detail-label">ID:</span>
                <span>{viewingBatch.code}</span>
              </div>
            </div>

            <div className="btc-mgmt-modal-subcard">
              <h3 className="btc-mgmt-modal-subcard-title">Assigned Interns</h3>
              {viewingBatch.interns.length === 0 ? (
                <p className="btc-mgmt-modal-subcard-text">
                  No interns assigned to this batch yet.
                </p>
              ) : (
                <div className="btc-mgmt-modal-interns-list">
                  {viewingBatch.interns.map((intern) => (
                    <div key={intern.id} className="btc-mgmt-modal-intern-tag">
                      <strong>{intern.name}</strong> ({intern.admissionNumber}) —{' '}
                      {intern.courseName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="btc-mgmt-modal-footer">
              <button
                type="button"
                className="btc-mgmt-modal-close-btn"
                onClick={() => setViewingBatch(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btc-mgmt-modal-edit-btn"
                onClick={() => handleOpenEditBatch(viewingBatch)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;