import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import Quiz from './Quiz';

export default function LessonModule({
  section,
  isCompleted,
  onToggleComplete,
  quizQuestions,
  savedQuizScore,
  onSaveScore
}) {
  // Local state for checking off individual bullet points in this section
  const [tickedItems, setTickedItems] = useState({});

  // Reset checked items when section changes
  useEffect(() => {
    setTickedItems({});
  }, [section.id]);

  const handleTickItem = (idx) => {
    setTickedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  const getCalloutStyles = (type, isTicked) => {
    if (isTicked) {
      return {
        borderColor: 'var(--success-color)',
        backgroundColor: 'var(--success-pastel)',
        iconColor: 'var(--success-color)',
        iconName: 'CheckCircle2'
      };
    }

    switch (type) {
      case 'tip':
        return {
          borderColor: 'var(--primary-blue)',
          backgroundColor: 'var(--primary-blue-pastel)',
          iconColor: 'var(--primary-blue)',
          iconName: 'Lightbulb'
        };
      case 'trick':
        return {
          borderColor: '#9b59b6',
          backgroundColor: '#f5eef8',
          iconColor: '#9b59b6',
          iconName: 'Zap'
        };
      case 'warning':
      case 'caution':
        return {
          borderColor: 'var(--danger-color)',
          backgroundColor: 'var(--danger-pastel)',
          iconColor: 'var(--danger-color)',
          iconName: 'AlertTriangle'
        };
      case 'note':
        return {
          borderColor: 'var(--text-muted)',
          backgroundColor: '#f8fafc',
          iconColor: 'var(--text-muted)',
          iconName: 'Info'
        };
      default:
        return {
          borderColor: 'var(--primary-blue)',
          backgroundColor: 'var(--bg-primary)',
          iconColor: 'var(--primary-blue)',
          iconName: 'Sparkles'
        };
    }
  };

  if (!section) return null;

  const listItems = section.items || [];
  
  // Calculate read progress for this section (only checkable 'normal' items)
  const checkableItems = listItems.filter(item => item.type === 'normal');
  const totalItems = checkableItems.length;
  const tickedCount = listItems.reduce((acc, item, idx) => {
    if (item.type === 'normal' && tickedItems[idx]) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const readProgressPercent = totalItems > 0 ? Math.round((tickedCount / totalItems) * 100) : 0;

  // Render a clean checklist item
  const renderChecklistItem = (item, index) => {
    if (item.type === 'subtitle') {
      return (
        <div 
          key={index} 
          style={{
            fontSize: '17px',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginTop: '28px',
            marginBottom: '12px',
            paddingLeft: '4px',
            fontFamily: 'var(--font-heading)',
            borderBottom: '2px solid var(--border-color)',
            paddingBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-orange)', display: 'flex', alignItems: 'center' }}>
              {renderIcon('ChevronRight', 'w-5 h-5')}
            </span>
            <span>{item.text}</span>
          </div>
          {item.checkpoint && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--primary-blue)',
              backgroundColor: 'var(--primary-blue-pastel)',
              padding: '4px 8px',
              borderRadius: '12px',
              fontFamily: 'monospace'
            }}>
              {renderIcon('Clock', 'w-3.5 h-3.5')}
              <span>{item.checkpoint}</span>
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'note' || item.type === 'warning' || item.type === 'tip') {
      const callout = getCalloutStyles(item.type, false);
      return (
        <div 
          key={index} 
          style={{
            borderLeft: '4px solid',
            borderLeftColor: callout.borderColor,
            backgroundColor: callout.backgroundColor,
            padding: '16px 20px',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '12px',
            marginTop: '8px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            fontSize: '14px',
            color: 'var(--text-main)',
            lineHeight: '1.6',
            boxShadow: 'var(--shadow-inset)'
          }}
        >
          <span style={{ color: callout.iconColor, display: 'flex', alignItems: 'center', marginTop: '2px' }}>
            {renderIcon(callout.iconName, 'w-4 h-4')}
          </span>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: '700', color: callout.iconColor, marginRight: '6px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
              {item.type}:
            </span>
            <span>{item.text}</span>
          </div>
        </div>
      );
    }

    const isTicked = !!tickedItems[index];
    const callout = getCalloutStyles(item.type, isTicked);

    return (
      <div 
        key={index} 
        className={`note-item ${isTicked ? 'ticked' : ''}`}
        style={{
          borderLeft: '4px solid',
          borderLeftColor: callout.borderColor,
          backgroundColor: callout.backgroundColor,
          cursor: 'pointer',
          display: 'flex',
          gap: '16px',
          padding: '20px',
          borderRadius: 'var(--border-radius-md)',
          transition: 'all var(--transition-fast)',
          position: 'relative'
        }}
        onClick={() => handleTickItem(index)}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '2px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            border: '2px solid',
            borderColor: isTicked ? 'var(--success-color)' : callout.borderColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isTicked ? 'var(--success-color)' : 'transparent',
            color: '#fff',
            transition: 'all var(--transition-fast)'
          }}>
            {isTicked && renderIcon('Check', 'w-3 h-3')}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: '15px', 
            fontWeight: '600', 
            color: isTicked ? 'var(--text-muted)' : 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color var(--transition-fast)'
          }}>
            {!isTicked && item.type !== 'normal' && (
              <span style={{ color: callout.iconColor, display: 'inline-flex', alignItems: 'center' }}>
                {renderIcon(callout.iconName, 'w-4 h-4')}
              </span>
            )}
            <span>{item.text}</span>
          </div>
          
          {item.subItems && item.subItems.length > 0 && (
            <ul className="sub-list" style={{ marginTop: '12px' }} onClick={(e) => e.stopPropagation()}>
              {item.subItems.map((sub, sIdx) => {
                const subText = typeof sub === 'object' ? sub.text : sub;
                const subType = typeof sub === 'object' ? sub.type : 'normal';
                const subCallout = getCalloutStyles(subType, false);

                return (
                  <li 
                    key={sIdx} 
                    className="sub-list-item" 
                    style={{ 
                      fontSize: '13px', 
                      color: isTicked ? 'var(--text-light)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      padding: subType !== 'normal' && !isTicked ? '6px 12px' : '0',
                      backgroundColor: subType !== 'normal' && !isTicked ? subCallout.backgroundColor : 'transparent',
                      borderLeft: subType !== 'normal' && !isTicked ? `3px solid ${subCallout.borderColor}` : 'none',
                      borderRadius: '4px',
                      marginTop: subType !== 'normal' ? '6px' : '4px'
                    }}
                  >
                    {subType !== 'normal' && !isTicked ? (
                      <span style={{ color: subCallout.iconColor, display: 'inline-flex', alignItems: 'center', marginTop: '2px' }}>
                        {renderIcon(subCallout.iconName, 'w-3.5 h-3.5')}
                      </span>
                    ) : (
                      // Custom bullet indicator
                      <span style={{ color: 'var(--primary-orange)', fontWeight: 'bold', marginRight: '4px' }}>•</span>
                    )}
                    <span>{subText}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {item.checkpoint && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{ 
                marginTop: '16px', 
                display: 'flex', 
                justifyContent: 'flex-end',
                fontSize: '12px', 
                fontWeight: '700', 
                color: isTicked ? 'var(--text-light)' : 'var(--primary-blue)',
                alignItems: 'center',
                gap: '6px',
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '10px'
              }}
            >
              {renderIcon('Clock', 'w-3.5 h-3.5')}
              <span>Checkpoint: {item.checkpoint}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="content-card" style={{ padding: '32px' }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-title">
          <div className="section-icon-wrapper">
            {renderIcon(section.icon)}
          </div>
          <div>
            <h2>{section.title}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '4px' }}>
              {section.isLesson ? 'Training Module' : 'Procedure Documentation'}
            </p>
          </div>
        </div>

        {(!quizQuestions || quizQuestions.length === 0) && (
          <button 
            className={`btn-complete-section ${isCompleted ? 'completed' : 'not-completed'}`}
            onClick={() => onToggleComplete(section.id)}
          >
            {isCompleted ? (
              <>
                {renderIcon('CheckCircle2', 'w-4 h-4')}
                Completed
              </>
            ) : (
              'Mark as Completed'
            )}
          </button>
        )}
      </div>

      {/* Reading Progress Indicator */}
      {totalItems > 0 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          backgroundColor: 'var(--primary-blue-pastel)', 
          padding: '12px 20px', 
          borderRadius: 'var(--border-radius-md)',
          marginBottom: '32px',
          border: '1px solid var(--primary-blue-pastel-deep)'
        }}>
          {renderIcon('BookOpen', 'w-5 h-5 text-blue-500')}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '6px' }}>
              <span>Section Reading Progress</span>
              <span>{tickedCount}/{totalItems} items read</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${readProgressPercent}%`, 
                  height: '100%', 
                  backgroundColor: 'var(--primary-blue)',
                  transition: 'width var(--transition-normal)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* General Notes */}
      {section.generalNotes && section.generalNotes.length > 0 && (
        <div style={{ 
          backgroundColor: 'var(--primary-orange-pastel)', 
          borderLeft: '4px solid var(--primary-orange)', 
          padding: '20px', 
          borderRadius: 'var(--border-radius-md)', 
          marginBottom: '32px'
        }}>
          {section.generalNotes.map((noteObj, i) => {
            const noteText = typeof noteObj === 'object' ? noteObj.text : noteObj;
            const noteType = typeof noteObj === 'object' ? noteObj.type : 'normal';
            const callout = getCalloutStyles(noteType, false);

            return (
              <div 
                key={i} 
                style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-main)', 
                  lineHeight: '1.6', 
                  marginBottom: i === section.generalNotes.length - 1 ? 0 : '12px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  backgroundColor: noteType !== 'normal' ? callout.backgroundColor : 'transparent',
                  padding: noteType !== 'normal' ? '8px 12px' : '0',
                  borderLeft: noteType !== 'normal' ? `3px solid ${callout.borderColor}` : 'none',
                  borderRadius: '4px'
                }}
              >
                {noteType !== 'normal' && (
                  <span style={{ color: callout.iconColor, display: 'inline-flex', alignItems: 'center', marginTop: '2px' }}>
                    {renderIcon(callout.iconName, 'w-4 h-4')}
                  </span>
                )}
                <span style={{ flex: 1 }}>{noteText}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Checklist / Manual Content */}
      {listItems.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {renderIcon('ClipboardList', 'w-5 h-5 text-blue-500')}
            <span>{section.isLesson ? 'Lesson Exercises & Steps' : 'Procedure Checklist'}</span>
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            💡 Click on any checklist card to mark it as read.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {listItems.map((item, index) => renderChecklistItem(item, index))}
          </div>
        </div>
      )}

      {/* Quiz Module */}
      {quizQuestions && quizQuestions.length > 0 && (
        <Quiz 
          sectionId={section.id}
          questions={quizQuestions}
          savedScore={savedQuizScore}
          onSaveScore={onSaveScore}
        />
      )}
    </div>
  );
}
