import React, { useState } from 'react';
import './ModuleManagement.css';
import { LuUser, LuEye, LuTrash2, LuX } from 'react-icons/lu';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { FiChevronDown, FiUpload, FiEdit, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

const SyllabusManagement = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedModule, setSelectedModule] = useState(null);
  const [editingModuleId, setEditingModuleId] = useState(null);

  const [formName, setFormName] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [formTopics, setFormTopics] = useState([]);

  const [modules, setModules] = useState([
    {
      id: 1,
      code: 'M1',
      name: 'Figma',
      addedTopics: 5,
      course: 'UI/UX 3M, UI/UX 6M, UI/UX 1 Y',
      image: 'figma.png',
      topicsList: ['Auto Layout', 'Style', 'Components', 'Prototype', 'Layout'],
    },
  ]);

  const resetForm = () => {
    setFormName('');
    setFormCourse('');
    setFormFileName('');
    setFormTopics([]);
    setEditingModuleId(null);
  };

  const handleOpenNewModule = () => {
    resetForm();
    setSelectedModule(null);
    setActiveTab('new-module');
  };

  const handleOpenEditModule = (moduleItem) => {
    setEditingModuleId(moduleItem.id);
    setFormName(moduleItem.name);
    setFormCourse(moduleItem.course);
    setFormFileName(moduleItem.image || '');
    setFormTopics([...(moduleItem.topicsList || [])]);
    setSelectedModule(moduleItem);
    setActiveTab('edit-module');
  };

  const handleViewModule = (moduleItem) => {
    setSelectedModule(moduleItem);
    setActiveTab('view-module');
  };

  const handleBackToModules = () => {
    resetForm();
    setSelectedModule(null);
    setActiveTab('modules');
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
    if (!formName.trim() || !formCourse) return;

    const newModule = {
      id: Date.now(),
      code: `M${modules.length + 1}`,
      name: formName.trim(),
      addedTopics: 0,
      course: formCourse,
      image: formFileName || '',
      topicsList: [],
    };

    setModules((prev) => [...prev, newModule]);
    resetForm();
    setActiveTab('modules');
  };

  const handleSaveEditedModule = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formCourse) return;

    setModules((prev) =>
      prev.map((m) =>
        m.id === editingModuleId
          ? {
              ...m,
              name: formName.trim(),
              course: formCourse,
              image: formFileName,
              topicsList: formTopics,
              addedTopics: formTopics.length,
            }
          : m
      )
    );

    const updatedModule = {
      ...selectedModule,
      name: formName.trim(),
      course: formCourse,
      image: formFileName,
      topicsList: formTopics,
      addedTopics: formTopics.length,
    };
    setSelectedModule(updatedModule);
    resetForm();
    setActiveTab('modules');
  };

  const handleDeleteModule = (id) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
    if (selectedModule && selectedModule.id === id) {
      setSelectedModule(null);
    }
    resetForm();
    setActiveTab('modules');
  };

  return (
    <div className="syl-mgmt-container">
      <header className="syl-mgmt-header">
        <div className="syl-mgmt-title-group">
          <h1 className="syl-mgmt-heading">Syllabus Management</h1>
          <nav className="syl-mgmt-breadcrumb">
            <span>Syllabus management</span>
            <span className="syl-mgmt-breadcrumb-separator">&gt;</span>
            <span className="syl-mgmt-breadcrumb-segment">Modules</span>
            {activeTab !== 'modules' && (
              <>
                <span className="syl-mgmt-breadcrumb-separator">&gt;</span>
                <span className="syl-mgmt-breadcrumb-current">Add Modules</span>
              </>
            )}
          </nav>
        </div>

        <div className="syl-mgmt-profile-card">
          <LuUser className="syl-mgmt-profile-icon" />
          <div className="syl-mgmt-profile-info">
            <span className="syl-mgmt-username">Priyesh</span>
            <span className="syl-mgmt-role">Super Admin</span>
          </div>
        </div>
      </header>

      <main className="syl-mgmt-panel">
        {activeTab !== 'view-module' && activeTab !== 'edit-module' && (
          <div className="syl-mgmt-toolbar">
            <div className="syl-mgmt-tab-group">
              <button
                type="button"
                className={`syl-mgmt-tab-btn ${activeTab === 'modules' ? 'syl-mgmt-tab-btn--active' : ''}`}
                onClick={handleBackToModules}
              >
                Modules
              </button>
              <button
                type="button"
                className={`syl-mgmt-tab-btn ${activeTab === 'new-module' ? 'syl-mgmt-tab-btn--active' : ''}`}
                onClick={handleOpenNewModule}
              >
                New Module
              </button>
            </div>

            {activeTab === 'modules' && (
              <button type="button" className="syl-mgmt-export-btn">
                <span>Export</span>
                <HiOutlineArrowUpTray className="syl-mgmt-export-icon" />
              </button>
            )}
          </div>
        )}

        {activeTab === 'modules' && (
          modules.length === 0 ? (
            <div className="syl-mgmt-content-area">
              <p className="syl-mgmt-empty-message">
                No data available. Please add Module to view them here
              </p>
            </div>
          ) : (
            <div className="syl-mgmt-table-wrapper">
              <div className="syl-mgmt-table-card">
                <div className="syl-mgmt-table-header-row">
                  <div className="syl-mgmt-th syl-mgmt-col-code">Module Code</div>
                  <div className="syl-mgmt-th syl-mgmt-col-name">Module Name</div>
                  <div className="syl-mgmt-th syl-mgmt-col-topics">Added Topics</div>
                  <div className="syl-mgmt-th syl-mgmt-col-course">Course</div>
                  <div className="syl-mgmt-th syl-mgmt-col-actions">Actions</div>
                </div>

                <div className="syl-mgmt-table-body">
                  {modules.map((item) => (
                    <div key={item.id} className="syl-mgmt-table-row">
                      <div className="syl-mgmt-td syl-mgmt-col-code" data-label="Module Code">{item.code}</div>
                      <div className="syl-mgmt-td syl-mgmt-col-name" data-label="Module Name">{item.name}</div>
                      <div className="syl-mgmt-td syl-mgmt-col-topics" data-label="Added Topics">{item.addedTopics}</div>
                      <div className="syl-mgmt-td syl-mgmt-col-course" data-label="Course">{item.course}</div>
                      <div className="syl-mgmt-td syl-mgmt-col-actions" data-label="Actions">
                        <button
                          type="button"
                          className="syl-mgmt-action-btn syl-mgmt-action-view"
                          onClick={() => handleViewModule(item)}
                        >
                          <LuEye />
                        </button>
                        <button
                          type="button"
                          className="syl-mgmt-action-btn syl-mgmt-action-edit"
                          onClick={() => handleOpenEditModule(item)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="syl-mgmt-action-btn syl-mgmt-action-delete"
                          onClick={() => handleDeleteModule(item.id)}
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
          )
        )}

        {activeTab === 'new-module' && (
          <form className="syl-mgmt-form-layout" onSubmit={handleCreateModule}>
            <div className="syl-mgmt-form-body">
              <h2 className="syl-mgmt-section-heading">Module Details</h2>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Module Name</label>
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
                    className="syl-mgmt-text-input syl-mgmt-text-input--disabled"
                    value="0"
                    readOnly
                  />
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Course</label>
                  <div className="syl-mgmt-select-wrapper">
                    <select
                      className="syl-mgmt-select-input"
                      value={formCourse}
                      onChange={(e) => setFormCourse(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choose Course</option>
                      <option value="UI/UX 3M, UI/UX 6M, UI/UX 1 Y">UI/UX 3M, UI/UX 6M, UI/UX 1 Y</option>
                      <option value="MERN Stack Development">MERN Stack Development</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="Flutter App Development">Flutter App Development</option>
                    </select>
                    <FiChevronDown className="syl-mgmt-select-arrow" />
                  </div>
                </div>
              </div>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Module Image <span className="syl-mgmt-label-optional">(Optional)</span>
                  </label>
                  <label className="syl-mgmt-file-dropzone">
                    <span className="syl-mgmt-file-placeholder">
                      {formFileName || 'Upload image'}
                    </span>
                    <FiUpload className="syl-mgmt-file-icon" />
                    <input
                      type="file"
                      accept="image/*"
                      className="syl-mgmt-hidden-file-input"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="syl-mgmt-form-footer">
              <button
                type="button"
                className="syl-mgmt-cancel-btn"
                onClick={handleBackToModules}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="syl-mgmt-submit-btn"
              >
                Create Module
              </button>
            </div>
          </form>
        )}

        {activeTab === 'view-module' && selectedModule && (
          <div className="syl-mgmt-view-layout">
            <div className="syl-mgmt-view-topbar">
              <h2 className="syl-mgmt-view-title">{selectedModule.name}</h2>
              <button
                type="button"
                className="syl-mgmt-back-btn"
                onClick={handleBackToModules}
              >
                <FiArrowLeft className="syl-mgmt-back-icon" />
                <span>Back</span>
              </button>
            </div>

            <div className="syl-mgmt-form-body">
              <h3 className="syl-mgmt-section-heading">Module Details</h3>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Module Name</label>
                  <div className="syl-mgmt-static-box">{selectedModule.name}</div>
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Total Topics</label>
                  <div className="syl-mgmt-static-box">{selectedModule.addedTopics}</div>
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Course</label>
                  <div className="syl-mgmt-static-box">{selectedModule.course}</div>
                </div>
              </div>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Module Image <span className="syl-mgmt-label-optional">(Optional)</span>
                  </label>
                  <div className="syl-mgmt-static-box">{selectedModule.image || 'None'}</div>
                </div>
              </div>

              <div className="syl-mgmt-topics-section">
                <h3 className="syl-mgmt-section-heading">Added Topics</h3>
                <div className="syl-mgmt-topics-grid">
                  {selectedModule.topicsList && selectedModule.topicsList.length > 0 ? (
                    selectedModule.topicsList.map((topic, index) => (
                      <div key={index} className="syl-mgmt-static-box syl-mgmt-topic-item">
                        {topic}
                      </div>
                    ))
                  ) : (
                    <div className="syl-mgmt-static-box syl-mgmt-topic-item">No topics added yet</div>
                  )}
                </div>
              </div>
            </div>

            <div className="syl-mgmt-form-footer">
              <button
                type="button"
                className="syl-mgmt-cancel-btn"
                onClick={() => handleDeleteModule(selectedModule.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="syl-mgmt-submit-btn"
                onClick={() => handleOpenEditModule(selectedModule)}
              >
                Edit Module
              </button>
            </div>
          </div>
        )}

        {activeTab === 'edit-module' && (
          <form className="syl-mgmt-view-layout" onSubmit={handleSaveEditedModule}>
            <div className="syl-mgmt-view-topbar">
              <h2 className="syl-mgmt-view-title">{formName || 'Edit Module'}</h2>
              <button
                type="button"
                className="syl-mgmt-back-btn"
                onClick={handleBackToModules}
              >
                <FiArrowLeft className="syl-mgmt-back-icon" />
                <span>Back</span>
              </button>
            </div>

            <div className="syl-mgmt-form-body">
              <h3 className="syl-mgmt-section-heading">Module Details</h3>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Module Name</label>
                  <input
                    type="text"
                    className="syl-mgmt-text-input"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Total Topics</label>
                  <input
                    type="text"
                    className="syl-mgmt-text-input syl-mgmt-text-input--disabled"
                    value={formTopics.length}
                    readOnly
                  />
                </div>

                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">Course</label>
                  <div className="syl-mgmt-select-wrapper">
                    <select
                      className="syl-mgmt-select-input"
                      value={formCourse}
                      onChange={(e) => setFormCourse(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choose Course</option>
                      <option value="UI/UX 3M, UI/UX 6M, UI/UX 1 Y">UI/UX 3M, UI/UX 6M, UI/UX 1 Y</option>
                      <option value="MERN Stack Development">MERN Stack Development</option>
                      <option value="Python Full Stack">Python Full Stack</option>
                      <option value="Flutter App Development">Flutter App Development</option>
                    </select>
                    <FiChevronDown className="syl-mgmt-select-arrow" />
                  </div>
                </div>
              </div>

              <div className="syl-mgmt-form-row">
                <div className="syl-mgmt-input-group">
                  <label className="syl-mgmt-label">
                    Module Image <span className="syl-mgmt-label-optional">(Optional)</span>
                  </label>
                  <label className="syl-mgmt-file-dropzone">
                    <span className="syl-mgmt-file-placeholder">
                      {formFileName || 'Upload image'}
                    </span>
                    <FiUpload className="syl-mgmt-file-icon" />
                    <input
                      type="file"
                      accept="image/*"
                      className="syl-mgmt-hidden-file-input"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="syl-mgmt-topics-section">
                <h3 className="syl-mgmt-section-heading">Added Topics</h3>
                <div className="syl-mgmt-topics-grid">
                  {formTopics.map((topic, index) => (
                    <div key={index} className="syl-mgmt-static-box syl-mgmt-topic-item syl-mgmt-topic-item--editable">
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

            <div className="syl-mgmt-form-footer">
              <button
                type="button"
                className="syl-mgmt-cancel-btn"
                onClick={() => handleDeleteModule(editingModuleId)}
              >
                Delete
              </button>
              <button
                type="submit"
                className="syl-mgmt-submit-btn"
              >
                Save Module
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default SyllabusManagement;