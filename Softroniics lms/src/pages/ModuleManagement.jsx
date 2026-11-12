import React, { useState, useMemo } from 'react';
import './ModuleManagement.css';
import { LuUser, LuX, LuSearch } from 'react-icons/lu';
import { HiOutlineArrowDownTray, HiOutlineArrowUpTray } from 'react-icons/hi2';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SyllabusManagement = () => {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'new-module' | 'edit-module'
  const [viewingModule, setViewingModule] = useState(null); // Controls View Modal
  const [editingModuleId, setEditingModuleId] = useState(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All Courses');

  // Form states (Add & Edit)
  const [formName, setFormName] = useState('');
  const [formSelectedCourses, setFormSelectedCourses] = useState([]);
  const [formFileName, setFormFileName] = useState('');
  const [formTopics, setFormTopics] = useState([]);

  const [modules, setModules] = useState([
    {
      id: 1,
      code: '8ae94b',
      name: 'PYTHON',
      courses: ['PYTHON 6 MONTH'],
      addedTopics: 0,
      document: '',
      createdAt: '8/13/2026',
      topicsList: [],
    },
    {
      id: 2,
      code: '4f12c9',
      name: 'MONGODB',
      courses: ['MERN 6 MONTH'],
      addedTopics: 0,
      document: '',
      createdAt: '8/12/2026',
      topicsList: [],
    },
    {
      id: 3,
      code: '9d31e2',
      name: 'NODE AND EXPRESS',
      courses: ['MERN 6 MONTH'],
      addedTopics: 0,
      document: '',
      createdAt: '8/11/2026',
      topicsList: [],
    },
    {
      id: 4,
      code: '7c84a1',
      name: 'REACT',
      courses: ['PYTHON 6 MONTH', 'MERN 6 MONTH'],
      addedTopics: 0,
      document: '',
      createdAt: '8/11/2026',
      topicsList: [],
    },
  ]);

  const availableCourses = [
    'DATA ANALYTICS',
    'DATA ANALYTICS WITH GEN AI',
    'DATA SCIENCE',
    'DATA SCIENCE & AI ENGINEERING',
    'DIGITAL MARKETING',
    'FLUTTER',
    'MERN 6 MONTH',
    'PYTHON 6 MONTH',
    'UI/UX DESIGNING',
  ];

  const filteredModules = useMemo(() => {
    return modules.filter((mod) => {
      const matchesSearch = mod.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesCourse =
        courseFilter === 'All Courses' || mod.courses.includes(courseFilter);
      return matchesSearch && matchesCourse;
    });
  }, [modules, searchQuery, courseFilter]);

  const resetForm = () => {
    setFormName('');
    setFormSelectedCourses([]);
    setFormFileName('');
    setFormTopics([]);
    setEditingModuleId(null);
  };

  const handleOpenNewModule = () => {
    resetForm();
    setViewingModule(null);
    setActiveTab('new-module');
  };

  const handleOpenEditModule = (moduleItem) => {
    setViewingModule(null);
    setEditingModuleId(moduleItem.id);
    setFormName(moduleItem.name);
    setFormSelectedCourses([...moduleItem.courses]);
    setFormFileName(moduleItem.document || '');
    setFormTopics([...(moduleItem.topicsList || [])]);
    setActiveTab('edit-module');
  };

  const handleViewModule = (moduleItem) => {
    setViewingModule(moduleItem);
  };

  const handleBackToModules = () => {
    resetForm();
    setViewingModule(null);
    setActiveTab('modules');
  };

  const handleAddCourseToForm = (e) => {
    const selected = e.target.value;
    if (selected && !formSelectedCourses.includes(selected)) {
      setFormSelectedCourses((prev) => [...prev, selected]);
    }
  };

  const handleRemoveCourseFromForm = (courseToRemove) => {
    setFormSelectedCourses((prev) => prev.filter((c) => c !== courseToRemove));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormFileName(e.target.files[0].name);
    }
  };

  const handleRemoveTopic = (indexToRemove) => {
    setFormTopics((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!formName.trim() || formSelectedCourses.length === 0) return;

    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    const newModule = {
      id: Date.now(),
      code: Math.random().toString(16).substring(2, 8),
      name: formName.trim().toUpperCase(),
      courses: formSelectedCourses,
      addedTopics: 0,
      document: formFileName || '',
      createdAt: formattedDate,
      topicsList: [],
    };

    setModules((prev) => [newModule, ...prev]);
    resetForm();
    setActiveTab('modules');
  };

  const handleSaveEditedModule = (e) => {
    e.preventDefault();
    if (!formName.trim() || formSelectedCourses.length === 0) return;

    setModules((prev) =>
      prev.map((m) =>
        m.id === editingModuleId
          ? {
              ...m,
              name: formName.trim().toUpperCase(),
              courses: formSelectedCourses,
              document: formFileName,
              topicsList: formTopics,
              addedTopics: formTopics.length,
            }
          : m
      )
    );

    resetForm();
    setActiveTab('modules');
  };

  const handleDeleteModule = (id) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    if (viewingModule && viewingModule.id === id) {
      setViewingModule(null);
    }
  };

  return (
    <div className="syl-mgmt-container">
      {/* Header */}
      <header className="syl-mgmt-header">
        <div className="syl-mgmt-title-group">
          <h1 className="syl-mgmt-heading">Modules Management</h1>
          <nav className="syl-mgmt-breadcrumb">
            <span>Modules Management</span>
            <span className="syl-mgmt-breadcrumb-separator">&gt;</span>
            <span>
              {activeTab === 'modules' && 'modules-list'}
              {activeTab === 'new-module' && 'new-module'}
              {activeTab === 'edit-module' && 'edit-module'}
            </span>
          </nav>
        </div>

        <div className="syl-mgmt-profile-card">
          <div className="syl-mgmt-profile-avatar">
            <LuUser />
          </div>
          <div className="syl-mgmt-profile-info">
            <span className="syl-mgmt-username">vijitha</span>
            <span className="syl-mgmt-role">super admin</span>
          </div>
        </div>
      </header>

      {/* Outer Toolbar (Matches Screenshot 1, 2, 3) */}
      <div className="syl-mgmt-toolbar">
        <div className="syl-mgmt-tab-group">
          <button
            type="button"
            className={`syl-mgmt-tab-btn ${activeTab === 'modules' ? 'syl-mgmt-tab-btn--active' : ''}`}
            onClick={handleBackToModules}
          >
            Modules List
          </button>
          <button
            type="button"
            className={`syl-mgmt-tab-btn ${
              activeTab === 'new-module' || activeTab === 'edit-module'
                ? 'syl-mgmt-tab-btn--active'
                : ''
            }`}
            onClick={handleOpenNewModule}
          >
            {activeTab === 'edit-module' ? 'Edit Module' : 'New Module'}
          </button>
        </div>

        <button type="button" className="syl-mgmt-export-btn">
          <HiOutlineArrowDownTray className="syl-mgmt-export-icon" />
          <span>Export</span>
        </button>
      </div>

      {/* Main White Card Container */}
      <main className="syl-mgmt-panel">
        {/* MODULES LIST VIEW */}
        {activeTab === 'modules' && (
          <>
            <div className="syl-mgmt-filter-bar">
              <div className="syl-mgmt-search-wrapper">
                <LuSearch className="syl-mgmt-search-icon" />
                <input
                  type="text"
                  className="syl-mgmt-search-input"
                  placeholder="Search Modules"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="syl-mgmt-filter-select-wrapper">
                <select
                  className="syl-mgmt-filter-select"
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value="All Courses">All Courses</option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="syl-mgmt-select-arrow" />
              </div>
            </div>

            {filteredModules.length === 0 ? (
              <div className="syl-mgmt-content-area">
                <p className="syl-mgmt-empty-message">
                  No modules found. Please add a module or adjust your search filters.
                </p>
              </div>
            ) : (
              <div className="syl-mgmt-table-wrapper">
                <div className="syl-mgmt-table-header-row">
                  <div className="syl-mgmt-th">#</div>
                  <div className="syl-mgmt-th">MODULE NAME</div>
                  <div className="syl-mgmt-th syl-mgmt-th-center">COURSE</div>
                  <div className="syl-mgmt-th syl-mgmt-th-center">TOTAL TOPICS</div>
                  <div className="syl-mgmt-th syl-mgmt-th-center">DOCUMENT</div>
                  <div className="syl-mgmt-th syl-mgmt-th-center">CREATED</div>
                  <div className="syl-mgmt-th syl-mgmt-th-center">ACTIONS</div>
                </div>

                <div className="syl-mgmt-table-body">
                  {filteredModules.map((item, idx) => (
                    <div key={item.id} className="syl-mgmt-table-row">
                      <div className="syl-mgmt-td" data-label="#">
                        {idx + 1}
                      </div>

                      <div className="syl-mgmt-td" data-label="Module Name">
                        <div className="syl-mgmt-module-cell">
                          <span className="syl-mgmt-module-avatar">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                          <span className="syl-mgmt-module-name-text">{item.name}</span>
                        </div>
                      </div>

                      <div className="syl-mgmt-td syl-mgmt-td-center" data-label="Course">
                        <div className="syl-mgmt-course-badges">
                          {item.courses.map((courseName, cIdx) => (
                            <span key={cIdx} className="syl-mgmt-course-pill">
                              {courseName}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="syl-mgmt-td syl-mgmt-td-center" data-label="Total Topics">
                        <span className="syl-mgmt-topic-badge">{item.addedTopics}</span>
                      </div>

                      <div className="syl-mgmt-td syl-mgmt-td-center" data-label="Document">
                        <span
                          className={`syl-mgmt-doc-badge ${
                            item.document ? 'syl-mgmt-doc-badge--has-file' : ''
                          }`}
                          title={item.document || 'No File'}
                        >
                          {item.document || 'No File'}
                        </span>
                      </div>

                      <div className="syl-mgmt-td syl-mgmt-td-center" data-label="Created">
                        <span className="syl-mgmt-date-text">{item.createdAt}</span>
                      </div>

                      <div className="syl-mgmt-td syl-mgmt-col-actions" data-label="Actions">
                        <button
                          type="button"
                          className="syl-mgmt-text-action syl-mgmt-text-action--view"
                          onClick={() => handleViewModule(item)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="syl-mgmt-text-action syl-mgmt-text-action--edit"
                          onClick={() => handleOpenEditModule(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="syl-mgmt-text-action syl-mgmt-text-action--delete"
                          onClick={() => handleDeleteModule(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="syl-mgmt-pagination-bar">
                  <span className="syl-mgmt-pagination-text">1 of 1</span>
                  <div className="syl-mgmt-pagination-controls">
                    <button type="button" className="syl-mgmt-page-btn" disabled>
                      <FiChevronLeft />
                    </button>
                    <button type="button" className="syl-mgmt-page-btn" disabled>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* NEW MODULE & EDIT MODULE FORM (Matches Screenshot 2 & 3) */}
        {(activeTab === 'new-module' || activeTab === 'edit-module') && (
          <form
            className="syl-mgmt-form-layout"
            onSubmit={activeTab === 'new-module' ? handleCreateModule : handleSaveEditedModule}
          >
            <div className="syl-mgmt-form-body">
              <h2 className="syl-mgmt-section-heading">Module Details</h2>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Module Name<span className="syl-mgmt-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="syl-mgmt-text-input"
                    placeholder="Enter Module Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Total Topics</label>
                  <input
                    type="text"
                    className="syl-mgmt-text-input syl-mgmt-text-input--readonly"
                    value={activeTab === 'edit-module' ? formTopics.length : 0}
                    readOnly
                  />
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Select Courses<span className="syl-mgmt-required-star">*</span>
                  </label>
                  <div className="syl-mgmt-select-wrapper">
                    <select
                      className="syl-mgmt-select-input"
                      value=""
                      onChange={handleAddCourseToForm}
                    >
                      <option value="">-- Add a Course --</option>
                      {availableCourses.map((course) => (
                        <option
                          key={course}
                          value={course}
                          disabled={formSelectedCourses.includes(course)}
                        >
                          {course}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="syl-mgmt-select-arrow" />
                  </div>
                </div>
              </div>

              {/* Full-width Selected Courses Row */}
              <div className="syl-mgmt-form-full-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Selected Courses<span className="syl-mgmt-required-star">*</span>
                  </label>
                  <div className="syl-mgmt-selected-courses-box">
                    {formSelectedCourses.length === 0 ? (
                      <span className="syl-mgmt-placeholder-italic">No courses selected yet.</span>
                    ) : (
                      formSelectedCourses.map((course) => (
                        <span key={course} className="syl-mgmt-course-pill">
                          {course}
                          <button
                            type="button"
                            className="syl-mgmt-pill-remove"
                            onClick={() => handleRemoveCourseFromForm(course)}
                            title="Remove course"
                          >
                            <LuX />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Module Image/PDF Upload */}
              <div className="syl-mgmt-form-full-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Module Image/PDF{' '}
                    <span className="syl-mgmt-label-hint">
                      (Optional - JPG/PNG/PDF only, Max 10MB)
                    </span>
                  </label>
                  <label className="syl-mgmt-file-dropzone">
                    <span
                      className={`syl-mgmt-file-placeholder ${
                        formFileName ? 'syl-mgmt-file-placeholder--active' : ''
                      }`}
                    >
                      {formFileName || 'Upload Module Image/PDF'}
                    </span>
                    <HiOutlineArrowUpTray className="syl-mgmt-file-icon" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                      className="syl-mgmt-hidden-file-input"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Added Topics List (Shown in Edit Mode if topics exist) */}
              {activeTab === 'edit-module' && formTopics.length > 0 && (
                <div className="syl-mgmt-form-full-row">
                  <div className="syl-mgmt-input-group">
                    <label className="syl-mgmt-label">Added Topics</label>
                    <div className="syl-mgmt-topics-grid">
                      {formTopics.map((topic, index) => (
                        <div key={index} className="syl-mgmt-topic-chip">
                          <span>{topic}</span>
                          <button
                            type="button"
                            className="syl-mgmt-topic-remove-btn"
                            onClick={() => handleRemoveTopic(index)}
                          >
                            <LuX />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="syl-mgmt-form-footer">
              <button
                type="button"
                className="syl-mgmt-cancel-btn"
                onClick={handleBackToModules}
              >
                Cancel
              </button>
              <button type="submit" className="syl-mgmt-submit-btn">
                {activeTab === 'new-module' ? 'Create Module' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* VIEW MODULE MODAL (Matches Screenshot 4) */}
      {viewingModule && (
        <div
          className="syl-mgmt-modal-backdrop"
          onClick={() => setViewingModule(null)}
        >
          <div
            className="syl-mgmt-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="syl-mgmt-modal-header">
              <h2 className="syl-mgmt-modal-title">{viewingModule.name}</h2>
              <button
                type="button"
                className="syl-mgmt-modal-close-top"
                onClick={() => setViewingModule(null)}
              >
                <span>&lt; Close</span>
              </button>
            </div>

            <div className="syl-mgmt-modal-details-grid">
              <div className="syl-mgmt-modal-detail-item">
                <span className="syl-mgmt-modal-detail-label">Module Name:</span>
                <span>{viewingModule.name}</span>
              </div>

              <div className="syl-mgmt-modal-detail-item">
                <span className="syl-mgmt-modal-detail-label">Total Topics:</span>
                <span>{viewingModule.addedTopics}</span>
              </div>

              <div className="syl-mgmt-modal-detail-item">
                <span className="syl-mgmt-modal-detail-label">Courses:</span>
                <span>{viewingModule.courses.join(', ')}</span>
              </div>

              <div className="syl-mgmt-modal-detail-item">
                <span className="syl-mgmt-modal-detail-label">Created:</span>
                <span>{viewingModule.createdAt}</span>
              </div>

              <div className="syl-mgmt-modal-detail-item">
                <span className="syl-mgmt-modal-detail-label">ID:</span>
                <span>{viewingModule.code}</span>
              </div>
            </div>

            <div className="syl-mgmt-modal-subcard">
              <h3 className="syl-mgmt-modal-subcard-title">Module Document &amp; Topics</h3>
              <p className="syl-mgmt-modal-subcard-text">
                {viewingModule.document
                  ? `Uploaded Document: ${viewingModule.document}`
                  : 'No document uploaded for this module.'}
              </p>

              {viewingModule.topicsList && viewingModule.topicsList.length > 0 && (
                <div className="syl-mgmt-modal-topics-list">
                  {viewingModule.topicsList.map((topic, idx) => (
                    <span key={idx} className="syl-mgmt-modal-topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="syl-mgmt-modal-footer">
              <button
                type="button"
                className="syl-mgmt-modal-close-btn"
                onClick={() => setViewingModule(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="syl-mgmt-modal-edit-btn"
                onClick={() => handleOpenEditModule(viewingModule)}
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

export default SyllabusManagement;