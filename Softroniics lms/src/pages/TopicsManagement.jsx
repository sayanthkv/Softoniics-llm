import React, { useState } from 'react';
import './TopicManagement.css';
import { LuUser, LuEye, LuTrash2 } from 'react-icons/lu';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { FiChevronDown, FiEdit, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

const TopicManagement = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [editingTopicId, setEditingTopicId] = useState(null);

  const [formTopicName, setFormTopicName] = useState('');
  const [formTopicCode, setFormTopicCode] = useState('');
  const [formModule, setFormModule] = useState('');

  const [topics, setTopics] = useState([
    {
      id: 1,
      code: 'T11',
      name: 'Auto Layout',
      module: 'Figma',
    },
  ]);

  const resetForm = () => {
    setFormTopicName('');
    setFormTopicCode('');
    setFormModule('');
    setEditingTopicId(null);
  };

  const handleOpenNewTopic = () => {
    resetForm();
    setSelectedTopic(null);
    setActiveTab('new-topic');
  };

  const handleBackToTopics = () => {
    resetForm();
    setSelectedTopic(null);
    setActiveTab('topics');
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!formTopicName.trim() || !formModule) return;

    const newTopic = {
      id: Date.now(),
      code: `T${topics.length + 11}`,
      name: formTopicName.trim(),
      module: formModule,
    };

    setTopics((prev) => [...prev, newTopic]);
    handleBackToTopics();
  };

  const handleViewTopic = (topicItem) => {
    setSelectedTopic(topicItem);
    setActiveTab('view-topic');
  };

  const handleOpenEditTopic = (topicItem) => {
    setEditingTopicId(topicItem.id);
    setFormTopicName(topicItem.name);
    setFormTopicCode(topicItem.code);
    setFormModule(topicItem.module);
    setSelectedTopic(topicItem);
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
              name: formTopicName.trim(),
              module: formModule,
            }
          : t
      )
    );

    handleBackToTopics();
  };

  const handleDeleteTopic = (id) => {
    setTopics((prev) => prev.filter((t) => t.id !== id));
    if (selectedTopic && selectedTopic.id === id) {
      handleBackToTopics();
    }
  };

  return (
    <div className="tpc-mgmt-container">
      <header className="tpc-mgmt-header">
        <div className="tpc-mgmt-title-group">
          <h1 className="tpc-mgmt-heading">Syllabus Management</h1>
          <nav className="tpc-mgmt-breadcrumb">
            <span>Syllabus management</span>
            <span className="tpc-mgmt-breadcrumb-separator">&gt;</span>
            <span className="tpc-mgmt-breadcrumb-segment">Topics</span>
            {activeTab !== 'topics' && (
              <>
                <span className="tpc-mgmt-breadcrumb-separator">&gt;</span>
                <span className="tpc-mgmt-breadcrumb-current">Add Topics</span>
              </>
            )}
          </nav>
        </div>

        <div className="tpc-mgmt-profile-card">
          <LuUser className="tpc-mgmt-profile-icon" />
          <div className="tpc-mgmt-profile-info">
            <span className="tpc-mgmt-username">Priyesh</span>
            <span className="tpc-mgmt-role">Super Admin</span>
          </div>
        </div>
      </header>

      <main className="tpc-mgmt-panel">
        {activeTab !== 'view-topic' && activeTab !== 'edit-topic' && (
          <div className="tpc-mgmt-toolbar">
            <div className="tpc-mgmt-tab-group">
              <button
                type="button"
                className={`tpc-mgmt-tab-btn ${activeTab === 'topics' ? 'tpc-mgmt-tab-btn--active' : ''}`}
                onClick={handleBackToTopics}
              >
                Topics
              </button>
              <button
                type="button"
                className={`tpc-mgmt-tab-btn ${activeTab === 'new-topic' ? 'tpc-mgmt-tab-btn--active' : ''}`}
                onClick={handleOpenNewTopic}
              >
                New Topic
              </button>
            </div>

            {activeTab === 'topics' && (
              <button type="button" className="tpc-mgmt-export-btn">
                <span>Export</span>
                <HiOutlineArrowUpTray className="tpc-mgmt-export-icon" />
              </button>
            )}
          </div>
        )}

        {activeTab === 'topics' && (
          topics.length === 0 ? (
            <div className="tpc-mgmt-content-area">
              <p className="tpc-mgmt-empty-message">
                No data available. Please add Category to view them here
              </p>
            </div>
          ) : (
            <div className="tpc-mgmt-table-wrapper">
              <div className="tpc-mgmt-table-card">
                <div className="tpc-mgmt-table-header-row">
                  <div className="tpc-mgmt-th tpc-mgmt-col-code">Topic Code</div>
                  <div className="tpc-mgmt-th tpc-mgmt-col-name">Topic Name</div>
                  <div className="tpc-mgmt-th tpc-mgmt-col-module">Module</div>
                  <div className="tpc-mgmt-th tpc-mgmt-col-actions">Actions</div>
                </div>

                <div className="tpc-mgmt-table-body">
                  {topics.map((item) => (
                    <div key={item.id} className="tpc-mgmt-table-row">
                      <div className="tpc-mgmt-td tpc-mgmt-col-code" data-label="Topic Code">{item.code}</div>
                      <div className="tpc-mgmt-td tpc-mgmt-col-name" data-label="Topic Name">{item.name}</div>
                      <div className="tpc-mgmt-td tpc-mgmt-col-module" data-label="Module">{item.module}</div>
                      <div className="tpc-mgmt-td tpc-mgmt-col-actions" data-label="Actions">
                        <button
                          type="button"
                          className="tpc-mgmt-action-btn tpc-mgmt-action-view"
                          onClick={() => handleViewTopic(item)}
                        >
                          <LuEye />
                        </button>
                        <button
                          type="button"
                          className="tpc-mgmt-action-btn tpc-mgmt-action-edit"
                          onClick={() => handleOpenEditTopic(item)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="tpc-mgmt-action-btn tpc-mgmt-action-delete"
                          onClick={() => handleDeleteTopic(item.id)}
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
          )
        )}

        {activeTab === 'new-topic' && (
          <form className="tpc-mgmt-form-layout" onSubmit={handleCreateTopic}>
            <div className="tpc-mgmt-form-body">
              <h2 className="tpc-mgmt-section-heading">Topic Details</h2>

              <div className="tpc-mgmt-form-row">
                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Topic Name</label>
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
                  <label className="tpc-mgmt-label">Module</label>
                  <div className="tpc-mgmt-select-wrapper">
                    <select
                      className="tpc-mgmt-select-input"
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choose Module</option>
                      <option value="Figma">Figma</option>
                      <option value="HTML & CSS">HTML & CSS</option>
                      <option value="React.js">React.js</option>
                      <option value="Node.js">Node.js</option>
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
              <button
                type="submit"
                className="tpc-mgmt-submit-btn"
              >
                Create Topic
              </button>
            </div>
          </form>
        )}

        {activeTab === 'view-topic' && selectedTopic && (
          <div className="tpc-mgmt-view-layout">
            <div className="tpc-mgmt-view-topbar">
              <h2 className="tpc-mgmt-view-title">{selectedTopic.name}</h2>
              <button
                type="button"
                className="tpc-mgmt-back-btn"
                onClick={handleBackToTopics}
              >
                <FiArrowLeft className="tpc-mgmt-back-icon" />
                <span>Back</span>
              </button>
            </div>

            <div className="tpc-mgmt-form-body">
              <h3 className="tpc-mgmt-section-heading">Topic Details</h3>

              <div className="tpc-mgmt-form-row-view">
                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Topic Name</label>
                  <div className="tpc-mgmt-static-box">{selectedTopic.name}</div>
                </div>

                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Topic Code</label>
                  <div className="tpc-mgmt-static-box">{selectedTopic.code}</div>
                </div>

                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Module</label>
                  <div className="tpc-mgmt-static-box">{selectedTopic.module}</div>
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
              <button
                type="button"
                className="tpc-mgmt-submit-btn"
                onClick={() => handleOpenEditTopic(selectedTopic)}
              >
                Edit Topic
              </button>
            </div>
          </div>
        )}

        {activeTab === 'edit-topic' && (
          <form className="tpc-mgmt-view-layout" onSubmit={handleSaveEditedTopic}>
            <div className="tpc-mgmt-view-topbar">
              <h2 className="tpc-mgmt-view-title">{formTopicName || 'Edit Topic'}</h2>
              <button
                type="button"
                className="tpc-mgmt-back-btn"
                onClick={handleBackToTopics}
              >
                <FiArrowLeft className="tpc-mgmt-back-icon" />
                <span>Back</span>
              </button>
            </div>

            <div className="tpc-mgmt-form-body">
              <h3 className="tpc-mgmt-section-heading">Topic Details</h3>

              <div className="tpc-mgmt-form-row-view">
                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Topic Name</label>
                  <input
                    type="text"
                    className="tpc-mgmt-text-input"
                    value={formTopicName}
                    onChange={(e) => setFormTopicName(e.target.value)}
                    required
                  />
                </div>

                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Topic Code</label>
                  <input
                    type="text"
                    className="tpc-mgmt-text-input tpc-mgmt-text-input--disabled"
                    value={formTopicCode}
                    readOnly
                  />
                </div>

                <div className="tpc-mgmt-input-group">
                  <label className="tpc-mgmt-label">Module</label>
                  <div className="tpc-mgmt-select-wrapper">
                    <select
                      className="tpc-mgmt-select-input"
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value)}
                      required
                    >
                      <option value="" disabled>Choose Module</option>
                      <option value="Figma">Figma</option>
                      <option value="HTML & CSS">HTML & CSS</option>
                      <option value="React.js">React.js</option>
                      <option value="Node.js">Node.js</option>
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
              <button
                type="submit"
                className="tpc-mgmt-submit-btn"
              >
                Save Topic
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default TopicManagement;