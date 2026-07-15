import { useState, useEffect } from 'react';
import { fetchRawText, parseManualText, FALLBACK_RAW_TEXT } from '../utils/docFetcher';

export function useProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Core state loaded from localStorage
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('gustykite_app_state_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rawText) {
          // Re-parse cached text to apply any parser updates immediately
          parsed.manualData = parseManualText(parsed.rawText);
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing saved state", e);
      }
    }

    // Default state using fallback parsed content
    const parsedFallback = parseManualText(FALLBACK_RAW_TEXT);
    return {
      rawText: FALLBACK_RAW_TEXT,
      manualData: parsedFallback,
      version: '1.0',
      lastUpdated: new Date().toLocaleDateString(),
      unreadUpdate: false,
      completedSections: {}, // e.g. { 'pre-arriving': true }
      quizScores: {}, // e.g. { 'lesson-1': { score: 3, total: 4 } }
      history: [] // Changelog/update history
    };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gustykite_app_state_v4', JSON.stringify(state));
  }, [state]);

  const toggleSectionCompleted = (sectionId) => {
    setState(prev => {
      const completedSections = { ...prev.completedSections };
      completedSections[sectionId] = !completedSections[sectionId];
      return { ...prev, completedSections };
    });
  };

  const saveQuizScore = (sectionId, score, total) => {
    setState(prev => {
      const quizScores = { ...prev.quizScores };
      quizScores[sectionId] = { score, total, date: new Date().toLocaleDateString() };
      
      const completedSections = { ...prev.completedSections };
      completedSections[sectionId] = true;
      
      return { ...prev, quizScores, completedSections };
    });
  };

  const dismissUpdateNotification = () => {
    setState(prev => ({ ...prev, unreadUpdate: false }));
  };

  const checkDocUpdates = async () => {
    setLoading(true);
    setError(null);
    try {
      const liveText = await fetchRawText();
      
      // Compare live text with saved text (ignoring white spaces at end/start)
      const cleanLive = liveText.trim();
      const cleanSaved = state.rawText.trim();

      if (cleanLive !== cleanSaved) {
        // Increment version number
        const currentVerNum = parseFloat(state.version) || 1.0;
        const newVersion = (currentVerNum + 0.1).toFixed(1);
        const parsedData = parseManualText(liveText);

        // Generate a small changelog detail (e.g. comparing lines or basic message)
        const dateStr = new Date().toLocaleDateString();
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newHistoryItem = {
          version: newVersion,
          date: `${dateStr} ${timeStr}`,
          message: `Manual content synchronized with Google Docs updates.`
        };

        setState(prev => ({
          ...prev,
          rawText: liveText,
          manualData: parsedData,
          version: newVersion,
          lastUpdated: dateStr,
          unreadUpdate: true,
          history: [newHistoryItem, ...prev.history]
        }));
        
        setLoading(false);
        return { updated: true, version: newVersion };
      }
      
      setLoading(false);
      return { updated: false };
    } catch (e) {
      console.error(e);
      setError("Unable to retrieve updates from Google Docs. Please check your internet connection.");
      setLoading(false);
      return { updated: false, error: e.message };
    }
  };

  // Merge completedSections with quizScores keys to ensure sections with completed quizzes are always marked completed
  const mergedCompletedSections = {
    ...state.completedSections,
    ...Object.keys(state.quizScores).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  };

  const clearLocalCache = () => {
    localStorage.removeItem('gustykite_app_state_v4');
    sessionStorage.removeItem('gustykite_debug_unlocked');
    window.location.reload();
  };

  return {
    rawText: state.rawText,
    manualData: state.manualData,
    version: state.version,
    lastUpdated: state.lastUpdated,
    unreadUpdate: state.unreadUpdate,
    completedSections: mergedCompletedSections,
    quizScores: state.quizScores,
    history: state.history,
    loading,
    error,
    toggleSectionCompleted,
    saveQuizScore,
    dismissUpdateNotification,
    checkDocUpdates,
    clearLocalCache
  };
}
