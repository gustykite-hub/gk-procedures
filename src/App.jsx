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
    checkDocUpdates,
    clearLocalCache
  } = useProgress();

  const [currentSectionId, setCurrentSectionId] = useState('pre-arriving');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [debugTab, setDebugTab] = useState('inspector'); // 'inspector' | 'raw'
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('gustykite_debug_unlocked') === 'true';
  });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  const mainContentRef = useRef(null);

  // Scroll to top when section changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
      try {
        mainContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {
        // Fallback for browsers with strict scrollIntoView options
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionId]);

  // Helper for icons
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  // Handler for secure debug page navigation
  const handleDebugNavigation = () => {
    if (isUnlocked) {
      setCurrentSectionId('debug');
    } else {
      setShowPinModal(true);
    }
  };

  // Submit security PIN code
  const handlePinSubmit = () => {
    if (pinInput === '2026') {
      setIsUnlocked(true);
      sessionStorage.setItem('gustykite_debug_unlocked', 'true');
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      setCurrentSectionId('debug');
    } else {
      setPinError('Invalid PIN code');
      setPinInput('');
    }
  };

  // Find the currently active section object
  const currentSection = manualData.find(s => s.id === currentSectionId);

  return (
    <div className="app-container">
      {/* Mobile Sticky Navigation Top Bar */}
      <header className="mobile-top-header">
        <button 
          className="btn-mobile-menu" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {renderIcon(mobileMenuOpen ? 'X' : 'Menu', 'w-6 h-6')}
        </button>
        <div className="mobile-brand">
          {renderIcon('Compass', 'w-6 h-6')}
          Gusty<span>Kite</span>
        </div>
        <div className="mobile-section-badge">
          {currentSectionId === 'changelog' ? 'Changelog' : currentSectionId === 'debug' ? 'Debug' : currentSection?.title || 'Menu'}
        </div>
      </header>

      {/* Sidebar Panel */}
      <Sidebar
        manualData={manualData}
        currentSectionId={currentSectionId}
        setCurrentSectionId={setCurrentSectionId}
        completedSections={completedSections}
        version={version}
        lastUpdated={lastUpdated}
        loading={loading}
        checkDocUpdates={checkDocUpdates}
        onDebugClick={handleDebugNavigation}
        onClearCache={clearLocalCache}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Panel */}
      <main className="main-content" ref={mainContentRef}>
        <div className="content-wrapper">
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
                {renderIcon('Code')} Security & Debug Dashboard
              </h2>
              <p className="section-description">
                This panel allows managers to inspect the parsed manual data and review the complete quiz question pool.
              </p>

              {/* Tab Navigation */}
              <div style={{
                display: 'flex',
                gap: '12px',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '24px',
                paddingBottom: '8px'
              }}>
                <button
                  onClick={() => setDebugTab('inspector')}
                  style={{
                    padding: '8px 16px',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: debugTab === 'inspector' ? 'var(--primary-orange)' : 'transparent',
                    color: debugTab === 'inspector' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Quiz Pool Inspector
                </button>
                <button
                  onClick={() => setDebugTab('raw')}
                  style={{
                    padding: '8px 16px',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: debugTab === 'raw' ? 'var(--primary-orange)' : 'transparent',
                    color: debugTab === 'raw' ? '#fff' : 'var(--text-muted)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Raw Parser Data
                </button>
              </div>

              {debugTab === 'inspector' ? (
                /* Quiz Inspector */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="content-card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '8px', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {renderIcon('ListCollapse')} Active Question Pools
                    </h3>
                    <p className="section-description" style={{ marginBottom: '16px' }}>
                      Review every active hand-crafted question, sequencing, and blank-fill currently loaded in the database.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {Object.entries(quizzesData).map(([secId, questionPool]) => {
                        const sectionName = manualData.find(s => s.id === secId)?.title || secId;
                        return (
                          <div key={secId} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                            <div style={{ backgroundColor: 'var(--primary-blue-pastel)', padding: '12px 16px', fontWeight: 'bold', color: 'var(--primary-blue)', fontSize: '15px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{sectionName}</span>
                              <span style={{ fontSize: '12px', opacity: 0.8 }}>{questionPool.length} questions in pool</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {questionPool.map((q, qIdx) => (
                                <div key={q.id || qIdx} style={{ padding: '16px', borderBottom: qIdx === questionPool.length - 1 ? 'none' : '1px solid #f1f5f9', fontSize: '14px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{
                                      fontSize: '11px',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      backgroundColor: q.type === 'qna' ? 'var(--primary-blue-pastel-deep)' : q.type === 'sequencing' ? 'var(--primary-orange-pastel-deep)' : '#d1fae5',
                                      color: q.type === 'qna' ? 'var(--primary-blue)' : q.type === 'sequencing' ? 'var(--primary-orange)' : '#065f46',
                                      fontWeight: '600'
                                    }}>
                                      {q.type.toUpperCase()}
                                    </span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>ID: {q.id}</span>
                                  </div>
                                  <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-main)' }}>
                                    {q.type === 'blanks' ? 'Fill-in-the-blanks Sentence:' : q.question}
                                  </div>
                                  {q.type === 'blanks' && (
                                    <div style={{ fontStyle: 'italic', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #10b981' }}>
                                      {q.text}
                                    </div>
                                  )}
                                  {q.type === 'qna' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '16px', marginBottom: '8px' }}>
                                      {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} style={{ color: oIdx === q.correctIndex ? 'var(--success-color)' : 'var(--text-muted)', fontWeight: oIdx === q.correctIndex ? '700' : 'normal', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          {oIdx === q.correctIndex ? '✓' : '•'} {opt}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {q.type === 'sequencing' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '16px', marginBottom: '8px' }}>
                                      {q.sequence.map((seqVal, sIdx) => (
                                        <div key={sIdx} style={{ color: 'var(--text-muted)' }}>
                                          {sIdx + 1}. {seqVal}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {q.type === 'blanks' && (
                                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px', marginBottom: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                      <span style={{ fontWeight: 'bold' }}>Answers:</span>
                                      {q.blanks.map((bVal, bIdx) => (
                                        <span key={bIdx} style={{ backgroundColor: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                          [{bIdx}] {bVal}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', borderTop: '1px dashed #f1f5f9', paddingTop: '8px', marginTop: '8px' }}>
                                    <strong>Explanation:</strong> {q.explanation}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Raw Data Debugger */
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
              )}
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
        </div>
      </main>

      {/* Security PIN Modal Overlay */}
      {showPinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="content-card" style={{
            width: '100%',
            maxWidth: '380px',
            padding: '32px',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
            backgroundColor: '#fff'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-orange-pastel)',
              color: 'var(--primary-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              {renderIcon('Lock', 'w-6 h-6')}
            </div>
            
            <h3 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              Enter Security PIN
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Access to the debugger and quiz inspector is restricted to managers.
            </p>
            
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value.replace(/\D/g, ''));
                setPinError('');
              }}
              placeholder="••••"
              style={{
                width: '140px',
                height: '48px',
                fontSize: '24px',
                textAlign: 'center',
                letterSpacing: '8px',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '12px',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-orange)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePinSubmit();
              }}
              autoFocus
            />
            
            {pinError && (
              <div style={{ color: 'var(--danger-color)', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }}>
                {pinError}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button 
                className="btn-next-question" 
                style={{ 
                  flex: 1, 
                  backgroundColor: '#f1f5f9', 
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)'
                }}
                onClick={() => {
                  setShowPinModal(false);
                  setPinInput('');
                  setPinError('');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-next-question" 
                style={{ flex: 1, backgroundColor: 'var(--primary-orange)' }}
                onClick={handlePinSubmit}
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
