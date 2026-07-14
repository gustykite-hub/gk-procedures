import React, { useState } from 'react';
import * as Icons from 'lucide-react';

export default function Sidebar({
  manualData,
  currentSectionId,
  setCurrentSectionId,
  completedSections,
  version,
  lastUpdated,
  loading,
  error,
  checkDocUpdates,
  history,
  onShowHistory
}) {
  const [syncMessage, setSyncMessage] = useState('');

  // Dynamic Lucide Icon helper
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  // Calculate overall progress
  const totalSections = manualData.length;
  const completedCount = Object.values(completedSections).filter(Boolean).length;
  const progressPercent = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const handleUpdateClick = async () => {
    setSyncMessage('');
    try {
      const result = await checkDocUpdates();
      if (result.updated) {
        setSyncMessage(`Updated successfully to v${result.version}!`);
      } else if (result.error) {
        setSyncMessage(`Sync failed: ${result.error}`);
      } else {
        setSyncMessage('Manual is already up to date!');
      }
    } catch (e) {
      setSyncMessage('Sync failed.');
    }
  };

  return (
    <aside className="sidebar">
      {/* Brand & Logo */}
      <div className="brand-section">
        <div className="brand-logo">
          {renderIcon('Compass', 'w-8 h-8 text-blue-500')}
          Gusty<span>Kite</span>
        </div>
        <div className="version-badge">v{version}</div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px', padding: '0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <span>Overall Completion</span>
          <span>{completedCount}/{totalSections} ({progressPercent}%)</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              backgroundColor: 'var(--success-color)', 
              borderRadius: '4px',
              transition: 'width var(--transition-normal)'
            }} 
          />
        </div>
      </div>

      {/* Nav Menu */}
      <ul className="nav-menu">
        {manualData.map((section) => {
          const isActive = section.id === currentSectionId;
          const isCompleted = !!completedSections[section.id];
          return (
            <li 
              key={section.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentSectionId(section.id)}
            >
              <span className="nav-item-icon">
                {renderIcon(section.icon, 'w-4 h-4')}
              </span>
              <span>{section.title}</span>
              {isCompleted && (
                <span className="nav-item-check">
                  {renderIcon('Check', 'w-4 h-4')}
                </span>
              )}
            </li>
          );
        })}

        {/* Change History Link */}
        {history && history.length > 0 && (
          <li 
            className={`nav-item ${currentSectionId === 'changelog' ? 'active' : ''}`}
            onClick={() => setCurrentSectionId('changelog')}
            style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px' }}
          >
            <span className="nav-item-icon">
              {renderIcon('History', 'w-4 h-4')}
            </span>
            <span>Update Changelog</span>
          </li>
        )}

        {/* Debug Content Link */}
        <li 
          className={`nav-item ${currentSectionId === 'debug' ? 'active' : ''}`}
          onClick={() => setCurrentSectionId('debug')}
          style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px' }}
        >
          <span className="nav-item-icon">
            {renderIcon('Code', 'w-4 h-4')}
          </span>
          <span>Debug Content</span>
        </li>
      </ul>

      {/* Sync Footer */}
      <div className="sidebar-footer">
        <div className="update-status">
          {renderIcon('RotateCw', `w-3 h-3 ${loading ? 'animate-spin' : ''}`)}
          <span>Last sync: {lastUpdated}</span>
        </div>
        
        {syncMessage && (
          <div style={{ 
            fontSize: '11px', 
            color: syncMessage.includes('failed') ? 'var(--danger-color)' : 'var(--primary-blue)',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            {syncMessage}
          </div>
        )}

        <button 
          className="btn-update" 
          onClick={handleUpdateClick}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check for Updates'}
        </button>
      </div>
    </aside>
  );
}
