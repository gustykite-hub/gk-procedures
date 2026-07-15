import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

// Helper to shuffle and pick a subset of questions
const shuffleAndSample = (pool, size = 4) => {
  if (!pool || pool.length === 0) return [];
  const shuffled = [...pool]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled.slice(0, size);
};

export default function Quiz({ sectionId, questions, savedScore, onSaveScore }) {
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Q&A specific state
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Sequencing specific state
  const [currentSequence, setCurrentSequence] = useState([]);
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Blanks specific state
  const [placedBlanks, setPlacedBlanks] = useState({});
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);

  const currentQuestion = activeQuestions && activeQuestions.length > 0 ? activeQuestions[currentIdx] : null;

  // Initialize and reset states when section or active questions change
  useEffect(() => {
    if (!currentQuestion) return;

    setIsAnswered(false);

    if (currentQuestion.type === 'sequencing') {
      // Shuffle elements for the sequencing question
      const shuffled = [...currentQuestion.sequence]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setCurrentSequence(shuffled);
    } else if (currentQuestion.type === 'blanks') {
      setPlacedBlanks({});
      setActiveSlotIdx(0);
    } else {
      // Default Q&A
      setSelectedIdx(null);
    }
  }, [currentIdx, sectionId, activeQuestions]);

  // Reset entire quiz when switching sections
  useEffect(() => {
    setCurrentIdx(0);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    
    // Generate a fresh random subset of 4 questions from the pool
    const selected = shuffleAndSample(questions, 4);
    setActiveQuestions(selected);
  }, [sectionId, questions]);

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = Icons[iconName] || Icons.BookOpen;
    return <IconComponent className={className} />;
  };

  // Q&A select
  const handleOptionSelect = (optionIdx) => {
    if (isAnswered) return;
    setSelectedIdx(optionIdx);
  };

  // Sequencing drag & drop handlers
  const handleDragStart = (e, idx) => {
    if (isAnswered) return;
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drag over
  const handleDragOver = (e, idx) => {
    e.preventDefault();
  };

  // Drop handler
  const handleDrop = (e, idx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newSeq = [...currentSequence];
    const draggedItem = newSeq[draggedIdx];
    newSeq.splice(draggedIdx, 1);
    newSeq.splice(idx, 0, draggedItem);

    setCurrentSequence(newSeq);
    setDraggedIdx(null);
  };

  // Move items with buttons (Accessibility and touch fallback)
  const handleMoveItem = (idx, direction) => {
    if (isAnswered) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentSequence.length) return;

    const newSeq = [...currentSequence];
    const temp = newSeq[idx];
    newSeq[idx] = newSeq[targetIdx];
    newSeq[targetIdx] = temp;
    setCurrentSequence(newSeq);
  };

  // Fill in the blanks handlers
  const handleOptionClick = (option) => {
    if (isAnswered) return;

    // Check if the option is already used in a slot
    const usedInSlotIdx = Object.keys(placedBlanks).find(key => placedBlanks[key] === option);

    if (usedInSlotIdx !== undefined) {
      // Remove it from that slot (free it up)
      const newPlaced = { ...placedBlanks };
      delete newPlaced[usedInSlotIdx];
      setPlacedBlanks(newPlaced);
      setActiveSlotIdx(Number(usedInSlotIdx));
      return;
    }

    // Place it in the active slot
    if (activeSlotIdx !== null && activeSlotIdx !== undefined) {
      const newPlaced = { ...placedBlanks, [activeSlotIdx]: option };
      setPlacedBlanks(newPlaced);

      // Move active slot to the next empty slot
      const totalSlots = currentQuestion.blanks.length;
      let nextEmptySlot = null;
      for (let i = 0; i < totalSlots; i++) {
        const idxToCheck = (activeSlotIdx + 1 + i) % totalSlots;
        if (!newPlaced[idxToCheck]) {
          nextEmptySlot = idxToCheck;
          break;
        }
      }
      setActiveSlotIdx(nextEmptySlot);
    }
  };

  // Handle slot click
  const handleSlotClick = (slotIdx) => {
    if (isAnswered) return;

    // If slot is filled, click removes/clears it
    if (placedBlanks[slotIdx]) {
      const newPlaced = { ...placedBlanks };
      delete newPlaced[slotIdx];
      setPlacedBlanks(newPlaced);
    }

    setActiveSlotIdx(slotIdx);
  };

  // Submit Answer
  const handleAnswerSubmit = () => {
    if (isAnswered) return;

    let isCorrect = false;
    if (currentQuestion.type === 'sequencing') {
      isCorrect = currentSequence.every((val, i) => val === currentQuestion.sequence[i]);
    } else if (currentQuestion.type === 'blanks') {
      isCorrect = currentQuestion.blanks.every((val, i) => placedBlanks[i] === val);
    } else {
      isCorrect = selectedIdx === currentQuestion.correctIndex;
    }

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Save final score
      if (typeof onSaveScore === 'function') {
        onSaveScore(sectionId, correctAnswersCount, activeQuestions.length);
      }
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    
    // Clear state
    setSelectedIdx(null);
    setCurrentSequence([]);
    setPlacedBlanks({});
    setActiveSlotIdx(0);
    setIsAnswered(false);

    // Shuffle and sample a fresh set of questions
    const selected = shuffleAndSample(questions, 4);
    setActiveQuestions(selected);
  };

  if (!activeQuestions || activeQuestions.length === 0) return null;

  // Check if current question submission is allowed
  const isSubmitDisabled = () => {
    if (currentQuestion.type === 'blanks') {
      return Object.keys(placedBlanks).length !== currentQuestion.blanks.length;
    }
    if (currentQuestion.type === 'sequencing') {
      return false; // Sequencing is always submittable in its current order
    }
    // qna
    return selectedIdx === null;
  };

  // Check if the current question is answered correctly (for feedback styling)
  const isCurrentQuestionCorrect = () => {
    if (currentQuestion.type === 'sequencing') {
      return currentSequence.every((val, i) => val === currentQuestion.sequence[i]);
    }
    if (currentQuestion.type === 'blanks') {
      return currentQuestion.blanks.every((val, i) => placedBlanks[i] === val);
    }
    return selectedIdx === currentQuestion.correctIndex;
  };

  // Rendering Helpers
  const renderQnA = () => {
    return (
      <div className="quiz-options">
        {currentQuestion.options.map((option, idx) => {
          let optionClass = 'quiz-option';
          if (selectedIdx === idx) optionClass += ' selected';
          if (isAnswered) {
            optionClass += ' disabled';
            if (idx === currentQuestion.correctIndex) {
              optionClass += ' correct';
            } else if (selectedIdx === idx) {
              optionClass += ' wrong';
            }
          }

          return (
            <div
              key={idx}
              className={optionClass}
              onClick={() => handleOptionSelect(idx)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: selectedIdx === idx ? 'var(--primary-orange)' : 'var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: selectedIdx === idx ? 'var(--primary-orange)' : 'transparent',
                color: selectedIdx === idx ? '#fff' : 'var(--text-muted)'
              }}>
                {idx + 1}
              </div>
              <span>{option}</span>
              {isAnswered && idx === currentQuestion.correctIndex && (
                <span style={{ marginLeft: 'auto', color: 'var(--success-color)' }}>
                  {renderIcon('CheckCircle2', 'w-5 h-5')}
                </span>
              )}
              {isAnswered && selectedIdx === idx && idx !== currentQuestion.correctIndex && (
                <span style={{ marginLeft: 'auto', color: 'var(--danger-color)' }}>
                  {renderIcon('AlertTriangle', 'w-5 h-5')}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSequencing = () => {
    return (
      <div className="quiz-sort-container">
        {currentSequence.map((value, idx) => {
          const isItemCorrect = value === currentQuestion.sequence[idx];
          let itemClass = 'quiz-sort-item';
          if (isAnswered) {
            itemClass += isItemCorrect ? ' correct' : ' wrong';
            itemClass += ' disabled';
          }

          return (
            <div
              key={value}
              className={itemClass}
              draggable={!isAnswered}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
            >
              {!isAnswered && (
                <div className="quiz-sort-handle">
                  {renderIcon('GripVertical', 'w-5 h-5')}
                </div>
              )}
              <div className="quiz-sort-number">{idx + 1}</div>
              <div style={{ flex: 1 }}>{value}</div>
              
              {isAnswered ? (
                <span style={{ color: isItemCorrect ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  {isItemCorrect ? renderIcon('CheckCircle2', 'w-5 h-5') : renderIcon('AlertTriangle', 'w-5 h-5')}
                </span>
              ) : (
                <div className="quiz-sort-actions">
                  <button
                    className="btn-sort-action"
                    disabled={idx === 0}
                    onClick={() => handleMoveItem(idx, 'up')}
                    title="Move Up"
                  >
                    {renderIcon('ArrowUp', 'w-4 h-4')}
                  </button>
                  <button
                    className="btn-sort-action"
                    disabled={idx === currentSequence.length - 1}
                    onClick={() => handleMoveItem(idx, 'down')}
                    title="Move Down"
                  >
                    {renderIcon('ArrowDown', 'w-4 h-4')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderBlanks = () => {
    // Split text by placeholder like {0}, {1}
    const parts = currentQuestion.text.split(/(\{\d+\})/g);

    return (
      <div>
        <div className="quiz-blank-sentence">
          {parts.map((part, index) => {
            const placeholderMatch = part.match(/^\{(\d+)\}$/);
            if (placeholderMatch) {
              const slotIdx = parseInt(placeholderMatch[1], 10);
              const filledValue = placedBlanks[slotIdx];
              const isActive = activeSlotIdx === slotIdx;
              const isCorrectSlot = filledValue === currentQuestion.blanks[slotIdx];

              let slotClass = 'quiz-blank-slot';
              if (isActive) slotClass += ' active';
              if (filledValue) slotClass += ' filled';
              if (isAnswered) {
                slotClass += isCorrectSlot ? ' correct' : ' wrong';
                slotClass += ' disabled';
              }

              return (
                <span
                  key={index}
                  className={slotClass}
                  onClick={() => handleSlotClick(slotIdx)}
                >
                  {filledValue || `Slot ${slotIdx + 1}`}
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </div>

        {/* Options to click/place */}
        <div className="quiz-blank-options-title">
          {isAnswered ? 'Answer Keys:' : 'Select options to place in active slot:'}
        </div>
        <div className="quiz-blank-options">
          {currentQuestion.options.map((option, index) => {
            const isUsed = Object.values(placedBlanks).includes(option);
            let optionClass = 'quiz-blank-option';
            if (isUsed) optionClass += ' used';
            if (isAnswered) optionClass += ' disabled';

            return (
              <div
                key={`${option}-${index}`}
                className={optionClass}
                onClick={() => !isUsed && handleOptionClick(option)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-icon">
          {renderIcon('Award', 'w-6 h-6')}
        </div>
        <div>
          <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>Knowledge Check</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {currentQuestion?.type === 'sequencing' 
              ? 'Arrange the items in the correct sequence' 
              : currentQuestion?.type === 'blanks' 
                ? 'Drag or click options to fill in the blanks' 
                : 'Choose the best answer'}
          </p>
        </div>

        {savedScore && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--primary-orange-pastel-deep)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-orange)' }}>Best: {savedScore.score}/{savedScore.total}</span>
            <span style={{ color: 'var(--text-muted)' }}>({savedScore.date})</span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="quiz-question-box">
          <div className="quiz-question-num">
            Question {currentIdx + 1} of {activeQuestions.length} • {currentQuestion?.type === 'sequencing' ? 'Sequencing' : currentQuestion?.type === 'blanks' ? 'Fill-in-the-Blanks' : 'Q&A'}
          </div>
          <div className="quiz-question-text">
            {currentQuestion.question}
          </div>

          {/* Render Quiz Types */}
          {currentQuestion.type === 'sequencing' 
            ? renderSequencing() 
            : currentQuestion.type === 'blanks' 
            ? renderBlanks() 
            : renderQnA()}

          {/* Explanation Feedbacks */}
          {isAnswered && (
            <div className={`quiz-feedback ${isCurrentQuestionCorrect() ? 'correct' : 'wrong'}`}>
              <div style={{ fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isCurrentQuestionCorrect() ? (
                  <>
                    {renderIcon('CheckCircle2', 'w-4 h-4')}
                    Correct!
                  </>
                ) : (
                  <>
                    {renderIcon('AlertTriangle', 'w-4 h-4')}
                    Incorrect
                  </>
                )}
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="quiz-footer">
            {!isAnswered ? (
              <button
                className="btn-next-question"
                onClick={handleAnswerSubmit}
                disabled={isSubmitDisabled()}
                style={{ opacity: isSubmitDisabled() ? 0.6 : 1 }}
              >
                Submit Answer
              </button>
            ) : (
              <button className="btn-next-question" onClick={handleNext}>
                {currentIdx + 1 === activeQuestions.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished View */
        <div className="quiz-results">
          <div className="quiz-score-circle">
            {correctAnswersCount} / {activeQuestions.length}
          </div>
          <h4 className="quiz-results-title">
            {correctAnswersCount === activeQuestions.length ? 'Perfect Score! 🏄‍♂️' : 'Quiz Completed!'}
          </h4>
          <p className="quiz-results-subtitle">
            {correctAnswersCount === activeQuestions.length
              ? 'Excellent! You have fully mastered the procedures for this section.'
              : `You got ${correctAnswersCount} out of ${activeQuestions.length} questions correct. Review the procedures and try again!`}
          </p>
          <button
            className="btn-next-question"
            onClick={handleRetake}
            style={{ backgroundColor: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {renderIcon('RotateCw', 'w-4 h-4')}
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
