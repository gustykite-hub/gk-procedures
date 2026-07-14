import React from 'react';
import * as Icons from 'lucide-react';

export default function Changelog({ history }) {
  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  return (
    <div className="content-card">
      <div className="section-header">
        <div className="section-title">
          <div className="section-icon-wrapper" style={{ backgroundColor: 'var(--primary-orange-pastel)', color: 'var(--primary-orange)' }}>
            {renderIcon('History')}
          </div>
          <div>
            <h2>Update Changelog</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 'normal', marginTop: '4px' }}>
              Track manual revisions and content synchronization
            </p>
          </div>
        </div>
      </div>

      {history && history.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
          {history.map((item, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                gap: '16px',
                borderBottom: index !== history.length - 1 ? '1px solid var(--border-color)' : 'none',
                paddingBottom: '20px'
              }}
            >
              <div style={{
                minWidth: '60px',
                fontWeight: '700',
                color: 'var(--primary-blue)',
                fontSize: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                v{item.version}
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '500' }}>
                  Synced on {item.date}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: '500' }}>
                  {item.message}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: 'var(--success-color)', 
                  backgroundColor: 'var(--success-pastel)', 
                  padding: '4px 10px', 
                  borderRadius: '6px', 
                  display: 'inline-block',
                  marginTop: '10px',
                  fontWeight: '600'
                }}>
                  Status: Up to date with Google Doc
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          {renderIcon('ClipboardList', 'w-12 h-12 text-gray-300 mx-auto mb-16')}
          <p style={{ fontWeight: '500' }}>No updates logged yet.</p>
          <p style={{ fontSize: '13px', marginTop: '4px' }}>Click "Check for Updates" in the sidebar to sync with Google Docs.</p>
        </div>
      )}
    </div>
  );
}
