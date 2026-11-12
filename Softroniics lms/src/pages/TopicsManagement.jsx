import React, { useState, useMemo } from 'react';
import './TopicManagement.css';
import { LuUser, LuSearch } from 'react-icons/lu';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TopicManagement = () => {
  const [activeTab, setActiveTab] = useState('topics'); // 'topics' | 'new-topic' | 'edit-topic'
  const [viewingTopic, setViewingTopic] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');

  // Form states
  const [formTopicName, setFormTopicName] = useState('');
  const [formModule, setFormModule] = useState('');

  // Starts empty to match Screenshot 1; adding a topic populates the table
  const [topics, setTopics] = useState([]);

  const availableModules = [
    'PYTHON',
    'MONGODB',
    'NODE AND EXPRESS',
    'REACT',
    'FIGMA',
  ];

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesSearch = topic.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesModule =
        moduleFilter === 'All Modules' || topic.module === moduleFilter;
      return matchesSearch && matchesModule;
    });
  }, [topics, searchQuery, moduleFilter]);

  const resetForm = () => {
    setFormTopicName('');
    setFormModule('');
    setEditingTopicId(null);
  };

  const handleOpenNewTopic = () => {
    resetForm();
    setViewingTopic(null);
    setActiveTab('new-topic');
  };

  const handleBackToTopics = () => {
    resetForm();
    setViewingTopic(null);
    setActiveTab('topics');
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!formTopicName.trim() || !formModule) return;

    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    const newTopic = {
      id: Date.now(),
      code: `T${topics.length + 11}`,
      name: formTopicName.trim().toUpperCase(),
      module: formModule,
      createdAt: formattedDate,
    };

    setTopics((prev) => [newTopic, ...prev]);
    handleBackToTopics();
  };

  const handleViewTopic = (topicItem) => {
    setViewingTopic(topicItem);
  };

  const handleOpenEditTopic = (topicItem) => {
    setViewingTopic(null);
    setEditingTopicId(topicItem.id);
    setFormTopicName(topicItem.name);
    setFormModule(topicItem.module);
    setActiveTab('edit-topic');
  };

  const handleSaveEditedTopic = (e) => {
    e.preventDefault();
    if (!formTopicName.trim() || !formModule) return;

    setTopics((prev) =>
      prev.map((t) =>
        t.id === editingTopicId
          ? {
              ...t,
              name: formTopicName.trim().toUpperCase(),
              module: formModule,
            }
          : t
      )
    );

    handleBackToTopics();
  };

  const handleDeleteTopic = (id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
    if (viewingTopic && viewingTopic.id === id) {
      setViewingTopic(null);
    }
  };

  return (
    <div className="tpc-mgmt-container">
      {/* Header */}
      <header className="tpc-mgmt-header">
        <div className="tpc-mgmt-title-group">
          <h1 className="tpc-mgmt-heading">Topics Management</h1>
          <nav className="tpc-mgmt-breadcrumb">
            <span>Topics Management</span>
            <span className="tpc-mgmt-breadcrumb-separator">&gt;</span>
            <span>
              {activeTab === 'topics' && 'topics-list'}
              {activeTab === 'new-topic' && 'new-topic'}
              {activeTab === 'edit-topic' && 'edit-topic'}
            </span>
          </nav>
        </div>

        <div className="tpc-mgmt-profile-card">
          <div className="tpc-mgmt-profile-avatar">
            <LuUser />
          </div>
          <div className="tpc-mgmt-profile-info">
            <span className="tpc-mgmt-username">vijitha</span>
            <span className="tpc-mgmt-role">super admin</span>
          </div>
        </div>
      </header>

      {/* Outer Toolbar (Matches Screenshot 1 & 2) */}
      <div className="tpc-mgmt-toolbar">
        <div className="tpc-mgmt-tab-group">
          <button
            type="button"
            className={`tpc-mgmt-tab-btn ${activeTab === 'topics' ? 'tpc-mgmt-tab-btn--active' : ''}`}
            onClick={handleBackToTopics}
          >
            Topics List
          </button>
          <button
            type="button"
            className={`tpc-mgmt-tab-btn ${
              activeTab === 'new-topic' || activeTab === 'edit-topic'
                ? 'tpc-mgmt-tab-btn--active'
                : ''
            }`}
            onClick={handleOpenNewTopic}
          >
            {activeTab === 'edit-topic' ? 'Edit Topic' : 'New Topic'}
          </button>
        </div>

        <button type="button" className="tpc-mgmt-export-btn">
          <HiOutlineArrowDownTray className="tpc-mgmt-export-icon" />
          <span>Export</span>
        </button>
      </div>

      {/* Main White Card Container */}
      <main className="tpc-mgmt-panel">
        {/* TOPICS LIST & EMPTY STATE (Matches Screenshot 1) */}
        {activeTab === 'topics' && (
          <>
            <div className="tpc-mgmt-filter-bar">
              <div className="tpc-mgmt-search-wrapper">
                <LuSearch className="tpc-mgmt-search-icon" />
                <input
                  type="text"
                  className="tpc-mgmt-search-input"
                  placeholder="Search Topics"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="tpc-mgmt-filter-select-wrapper">
                <select
                  className="tpc-mgmt-filter-select"
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                >
                  <option value="All Modules">All Modules</option>
                  {availableModules.map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="tpc-mgmt-select-arrow" />
              </div>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="tpc-mgmt-content-area">
                <p className="tpc-mgmt-empty-message">
                  No topics available. Please add topics to view them here.
                </p>
              </div>
            ) : (
              <div className="tpc-mgmt-table-wrapper">
                <div className="tpc-mgmt-table-header-row">
                  <div className="tpc-mgmt-th">#</div>
                  <div className="tpc-mgmt-th">TOPIC NAME</div>
                  <div className="tpc-mgmt-th tpc-mgmt-th-center">MODULE</div>
                  <div className="tpc-mgmt-th tpc-mgmt-th-center">TOPIC CODE</div>
                  <div className="tpc-mgmt-th tpc-mgmt-th-center">CREATED</div>
                  <div className="tpc-mgmt-th tpc-mgmt-th-center">ACTIONS</div>
                </div>

                <div className="tpc-mgmt-table-body">
                  {filteredTopics.map((item, idx) => (
                    <div key={item.id} className="tpc-mgmt-table-row">
                      <div className="tpc-mgmt-td" data-label="#">
                        {idx + 1}
                      </div>

                      <div className="tpc-mgmt-td" data-label="Topic Name">
                        <div className="tpc-mgmt-topic-cell">
                          <span className="tpc-mgmt-topic-avatar">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                          <span className="tpc-mgmt-topic-name-text">{item.name}</span>
                        </div>
                      </div>

                      <div className="tpc-mgmt-td tpc-mgmt-td-center" data-label="Module">
                        <span className="tpc-mgmt-module-pill">{item.module}</span>
                      </div>

                      <div className="tpc-mgmt-td tpc-mgmt-td-center" data-label="Topic Code">
                        <span className="tpc-mgmt-code-badge">{item.code}</span>
                      </div>

                      <div className="tpc-mgmt-td tpc-mgmt-td-center" data-label="Created">
                        <span className="tpc-mgmt-date-text">{item.createdAt}</span>
                      </div>

                      <div className="tpc-mgmt-td tpc-mgmt-col-actions" data-label="Actions">
                        <button
                          type="button"
                          className="tpc-mgmt-text-action tpc-mgmt-text-action--view"
                          onClick={() => handleViewTopic(item)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="tpc-mgmt-text-action tpc-mgmt-text-action--edit"
                          onClick={() => handleOpenEditTopic(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="tpc-mgmt-text-action tpc-mgmt-text-action--delete"
                          onClick={() => handleDeleteTopic(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tpc-mgmt-pagination-bar">
                  <span className="tpc-mgmt-pagination-text">1 of 1</span>
                  <div className="tpc-mgmt-pagination-controls">
                    <button type="button" className="tpc-mgmt-page-btn" disabled>
                      <FiChevronLeft />
                    </button>
                    <button type="button" className="tpc-mgmt-page-btn" disabled>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* NEW TOPIC & EDIT TOPIC FORM (Matches Screenshot 2) */}
        {(activeTab === 'new-topic' || activeTab === 'edit-topic') && (
          <form
            className="tpc-mgmt-form-layout"
            onSubmit={activeTab === 'new-topic' ? handleCreateTopic : handleSaveEditedTopic}
          >
            <div className="tpc-mgmt-form-body">
              <h2 className="tpc-mgmt-section-heading">Topic Details</h2>

              <div className="tpc-mgmt-form-row">
                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">
                    Topic Name<span className="tpc-mgmt-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="tpc-mgmt-text-input"
                    placeholder="Enter Topic Name"
                    value={formTopicName}
                    onChange={(e) => setFormTopicName(e.target.value)}
                    required
                  />
                </div>

                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">
                    Module<span className="tpc-mgmt-required-star">*</span>
                  </label>
                  <div className="tpc-mgmt-select-wrapper">
                    <select
                      className="tpc-mgmt-select-input"
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Choose Module
                      </option>
                      {availableModules.map((mod) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="tpc-mgmt-select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            <div className="tpc-mgmt-form-footer">
              <button
                type="button"
                className="tpc-mgmt-cancel-btn"
                onClick={handleBackToTopics}
              >
                Cancel
              </button>
              <button type="submit" className="tpc-mgmt-submit-btn">
                {activeTab === 'new-topic' ? 'Create Topic' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* VIEW TOPIC MODAL */}
      {viewingTopic && (
        <div
          className="tpc-mgmt-modal-backdrop"
          onClick={() => setViewingTopic(null)}
        >
          <div
            className="tpc-mgmt-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tpc-mgmt-modal-header">
              <h2 className="tpc-mgmt-modal-title">{viewingTopic.name}</h2>
              <button
                type="button"
                className="tpc-mgmt-modal-close-top"
                onClick={() => setViewingTopic(null)}
              >
                <span>&lt; Close</span>
              </button>
            </div>

            <div className="tpc-mgmt-modal-details-grid">
              <div className="tpc-mgmt-modal-detail-item">
                <span className="tpc-mgmt-modal-detail-label">Topic Name:</span>
                <span>{viewingTopic.name}</span>
              </div>

              <div className="tpc-mgmt-modal-detail-item">
                <span className="tpc-mgmt-modal-detail-label">Module:</span>
                <span>{viewingTopic.module}</span>
              </div>

              <div className="tpc-mgmt-modal-detail-item">
                <span className="tpc-mgmt-modal-detail-label">Topic Code:</span>
                <span>{viewingTopic.code}</span>
              </div>

              <div className="tpc-mgmt-modal-detail-item">
                <span className="tpc-mgmt-modal-detail-label">Created:</span>
                <span>{viewingTopic.createdAt}</span>
              </div>
            </div>

            <div className="tpc-mgmt-modal-footer">
              <button
                type="button"
                className="tpc-mgmt-modal-close-btn"
                onClick={() => setViewingTopic(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="tpc-mgmt-modal-edit-btn"
                onClick={() => handleOpenEditTopic(viewingTopic)}
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

export default TopicManagement;