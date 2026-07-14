import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import LessonModule from './components/LessonModule';
import Changelog from './components/Changelog';
import { useProgress } from './hooks/useProgress';
import { quizzesData } from './data/quizzesData';
import * as Icons from 'lucide-react';

export default function App() {
  const {
    rawText,
    manualData,
    version,
    lastUpdated,
    unreadUpdate,
    completedSections,
    quizScores,
    history,
    loading,
    error,
    toggleSectionCompleted,
    saveQuizScore,
    dismissUpdateNotification,
    checkDocUpdates
  } = useProgress();

  const [currentSectionId, setCurrentSectionId] = useState('pre-arriving');
  const mainContentRef = useRef(null);

  // Scroll to top when section changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [currentSectionId]);

  // Helper for icons
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  // Find the currently active section object
  const currentSection = manualData.find(s => s.id === currentSectionId);

  return (
    <div className="app-container">
      {/* Sidebar Panel */}
      <Sidebar
        manualData={manualData}
        currentSectionId={currentSectionId}
        setCurrentSectionId={setCurrentSectionId}
        completedSections={completedSections}
        version={version}
        lastUpdated={lastUpdated}
        loading={loading}
        error={error}
        checkDocUpdates={checkDocUpdates}
        history={history}
      />

      {/* Main Panel */}
      <main className="main-content" ref={mainContentRef}>
        {/* Top bar with errors or updates */}
        {error && (
          <div 
            style={{ 
              backgroundColor: 'var(--danger-pastel)', 
              color: 'var(--danger-color)', 
              border: '1px solid #f5c2c2',
              borderRadius: 'var(--border-radius-md)', 
              padding: '16px 20px', 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {renderIcon('AlertTriangle', 'w-5 h-5')}
            <span>{error}</span>
          </div>
        )}

        {/* Update Notification Banner */}
        {unreadUpdate && (
          <div className="update-notification-banner">
            <div className="update-notification-content">
              <div style={{ color: 'var(--primary-orange)', display: 'flex', alignItems: 'center' }}>
                {renderIcon('Sparkles', 'w-6 h-6')}
              </div>
              <div className="update-notification-text">
                <h4>Manual Updated! (v{version})</h4>
                <p>New changes from the Google Doc have been synchronized. Your progress has been preserved!</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                className="btn-next-question" 
                onClick={() => {
                  setCurrentSectionId('changelog');
                  dismissUpdateNotification();
                }}
                style={{ 
                  padding: '6px 14px', 
                  fontSize: '12px', 
                  backgroundColor: 'var(--primary-orange)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 'var(--border-radius-sm)',
                  cursor: 'pointer'
                }}
              >
                View Changelog
              </button>
              <button className="btn-dismiss" onClick={dismissUpdateNotification}>
                {renderIcon('X', 'w-4 h-4')}
              </button>
            </div>
          </div>
        )}

        {/* Content Render */}
        {currentSectionId === 'changelog' ? (
          <Changelog history={history} />
        ) : currentSectionId === 'debug' ? (
          <div className="module-container">
            <h2 className="module-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {renderIcon('Code')} Raw Data Debugger
            </h2>
            <p className="section-description">
              This section shows the exact raw text currently loaded from Google Drive (or the fallback file) and how the application parsed it.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="content-card">
                <h3 style={{ marginBottom: '12px', color: 'var(--primary-blue)' }}>Raw Text from Google Drive</h3>
                <pre style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '13px', overflowX: 'auto', whiteSpace: 'pre-wrap', border: '1px solid #e2e8f0' }}>
                  {rawText}
                </pre>
              </div>
              <div className="content-card">
                <h3 style={{ marginBottom: '12px', color: 'var(--primary-orange)' }}>Parsed JSON Structure</h3>
                <pre style={{ backgroundColor: '#1e293b', color: '#cbd5e1', padding: '16px', borderRadius: '8px', fontSize: '13px', overflowX: 'auto', border: '1px solid #0f172a' }}>
                  {JSON.stringify(manualData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <LessonModule
            section={currentSection}
            isCompleted={!!completedSections[currentSectionId]}
            onToggleComplete={toggleSectionCompleted}
            quizQuestions={quizzesData[currentSectionId]}
            savedQuizScore={quizScores[currentSectionId]}
            onSaveScore={saveQuizScore}
          />
        )}
      </main>
    </div>
  );
}
