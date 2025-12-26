import React, { useState, useEffect } from "react";
import "./TestsPage.css"; // CSS file must exist in same folder

const subjects = ["Physics", "Chemistry", "Mathematics"];

const questionBank = {
  Physics: [
    { id: 1, section: "Section A", text: "A body moves with constant velocity. Which of the following is true?", options: ["Resultant force on the body is zero", "Its acceleration is constant and non-zero", "Its speed must be zero", "It is moving in a circular path"] },
    { id: 2, section: "Section A", text: "The SI unit of power is:", options: ["Joule", "Watt", "Newton", "Pascal"] },
    { id: 3, section: "Section B", text: "Light year is the unit of:", options: ["Time", "Distance", "Intensity", "Speed"] },
    { id: 4, section: "Section A", text: "Velocity–time graph of uniform motion is:", options: ["A straight line parallel to time axis", "A straight line through origin", "A parabola", "A horizontal line at zero"] },
    { id: 5, section: "Section A", text: "Which quantity is a vector?", options: ["Speed", "Work", "Displacement", "Mass"] },
    { id: 6, section: "Section B", text: "Unit of electric current is:", options: ["Coulomb", "Volt", "Ampere", "Ohm"] },
    { id: 7, section: "Section A", text: "Dimension of force is:", options: ["MLT⁻²", "ML²T⁻²", "MLT⁻¹", "M²LT⁻²"] },
    { id: 8, section: "Section B", text: "Which law explains the relationship between pressure and volume?", options: ["Hooke's law", "Boyle's law", "Ohm's law", "Faraday's law"] },
    { id: 9, section: "Section A", text: "The speed of light in vacuum is approximately:", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁴ m/s", "3 × 10² m/s"] },
    { id: 10, section: "Section A", text: "Work done is zero when:", options: ["Force and displacement are perpendicular", "Force is zero", "Displacement is zero", "All of these"] }
  ],
  Chemistry: [
    { id: 1, section: "Section A", text: "pH of a neutral solution at 25°C is:", options: ["0", "1", "7", "14"] },
    { id: 2, section: "Section A", text: "Atomic number represents the number of:", options: ["Neutrons", "Protons", "Electrons + Protons", "Nucleons"] },
    { id: 3, section: "Section A", text: "The gas responsible for greenhouse effect is mainly:", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"] },
    { id: 4, section: "Section B", text: "H₂O is an example of:", options: ["Ionic compound", "Covalent compound", "Metallic compound", "Coordinate compound"] },
    { id: 5, section: "Section A", text: "The most electronegative element is:", options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"] }
  ],
  Mathematics: [
    { id: 1, section: "Section A", text: "Derivative of x² with respect to x is:", options: ["x", "2x", "x²", "2"] },
    { id: 2, section: "Section A", text: "∫ x dx equals:", options: ["x² + C", "x²/2 + C", "2x + C", "ln x + C"] },
    { id: 3, section: "Section A", text: "If sinθ = 1, then θ is:", options: ["0°", "30°", "60°", "90°"] },
    { id: 4, section: "Section B", text: "The value of (a + b)² is:", options: ["a² + b²", "a² + 2ab + b²", "2ab", "a² - 2ab + b²"] },
    { id: 5, section: "Section A", text: "Slope of a line parallel to x-axis is:", options: ["0", "1", "∞", "−1"] }
  ]
};

function TestsPage() {
  const [currentSubject, setCurrentSubject] = useState("Physics");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(3 * 60 * 60); // 3 hours demo timer

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const questions = questionBank[currentSubject];
  const currentQuestion = questions[currentIndex];
  const currentKey = `${currentSubject}-${currentIndex}`;

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  /* ===========================
        BUTTON HANDLERS
  ============================ */

  const handleSubjectChange = (sub) => {
    setCurrentSubject(sub);
    setCurrentIndex(0);
  };

  const handleOptionSelect = (idx) => {
    setSelectedOptions((prev) => ({ ...prev, [currentKey]: idx }));
    setStatusMap((prev) => ({ ...prev, [currentKey]: "answered" }));
  };

  const handleClear = () => {
    setSelectedOptions((prev) => {
      const copy = { ...prev };
      delete copy[currentKey];
      return copy;
    });
    setStatusMap((prev) => ({ ...prev, [currentKey]: "not-answered" }));
  };

  const goToQuestion = (index) => {
    const key = `${currentSubject}-${index}`;
    setCurrentIndex(index);
    setStatusMap((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: "not-visited" };
    });
  };

  const markStatusBeforeMove = () => {
    setStatusMap((prev) => {
      const hasOption = selectedOptions[currentKey] !== undefined;
      const existing = prev[currentKey];
      if (existing === "marked") return prev;
      if (hasOption) return { ...prev, [currentKey]: "answered" };
      return { ...prev, [currentKey]: "not-answered" };
    });
  };

  const handleSaveNext = () => {
    markStatusBeforeMove();
    if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
  };

  const handleMarkForReviewNext = () => {
    setStatusMap((prev) => ({ ...prev, [currentKey]: "marked" }));
    if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
  };

  const handleNextOnly = () => {
    markStatusBeforeMove();
    if (currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
  };

  const getQuestionStatus = (subject, index) => {
    const key = `${subject}-${index}`;
    return statusMap[key] || "not-visited";
  };

  const handleSubmit = () => {
    const totalQuestions = Object.values(questionBank).reduce(
      (sum, arr) => sum + arr.length,
      0
    );
    const answered = Object.values(statusMap).filter((s) => s === "answered").length;
    const marked = Object.values(statusMap).filter((s) => s === "marked").length;

    alert(
      `Demo Submit 📝\n\nTotal Questions: ${totalQuestions}\nAnswered: ${answered}\nMarked for Review: ${marked}\n\n(This is only a front-end demo.)`
    );
  };

  return (
    <div className="test-wrapper">



      <div className="test-topbar">
        <div>
          <div className="test-title">JEE Mains (B.E./B.Tech) – Demo</div>
          <div className="test-subtitle">Complete Mock Test Platform</div>
        </div>
        <div className="test-top-right">
          <div className="candidate-info">
            <div className="candidate-label">Candidate Name</div>
            <div className="candidate-name">John Doe</div>
          </div>
          <div className="timer-box">
            <span>Time Left</span>
            <strong>{hours}:{minutes}:{seconds}</strong>
          </div>
        </div>
      </div>

      {/* SUBJECT TABS */}
      <div className="subject-tabs">
        {subjects.map((sub) => (
          <button
            key={sub}
            className={`subject-tab ${currentSubject === sub ? "active" : ""}`}
            onClick={() => handleSubjectChange(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="test-main">

        {/* QUESTION CARD */}
        <div className="question-area">
          <div className="question-header">
            <div className="question-no">Question No. {currentQuestion.id}</div>
            <div className="question-meta">
              <span>{currentSubject} – {currentQuestion.section}</span>
              <span className="marks-label">SCQ (+4, -1)</span>
            </div>
          </div>

          <div className="question-body">
            <p className="question-text">
              [{currentSubject} – {currentQuestion.section}] Question {currentQuestion.id}. {currentQuestion.text}
            </p>

            <div className="options-list">
              {currentQuestion.options.map((opt, idx) => (
                <label key={idx} className={`option-item ${selectedOptions[currentKey] === idx ? "selected" : ""}`}>
                  <input type="radio" name="option" checked={selectedOptions[currentKey] === idx} onChange={() => handleOptionSelect(idx)} />
                  <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="question-actions">
            <button className="btn primary" onClick={handleSaveNext}>SAVE & NEXT</button>
            <button className="btn secondary" onClick={handleClear}>CLEAR</button>
            <button className="btn warning" onClick={handleMarkForReviewNext}>SAVE & MARK FOR REVIEW</button>
            <button className="btn info" onClick={handleMarkForReviewNext}>MARK FOR REVIEW & NEXT</button>
            <button className="btn ghost" onClick={handleNextOnly}>NEXT</button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="test-sidebar">
          <div className="legend">
            <div className="legend-item"><span className="legend-dot answered" /> Answered</div>
            <div className="legend-item"><span className="legend-dot not-answered" /> Not Answered</div>
            <div className="legend-item"><span className="legend-dot not-visited" /> Not Visited</div>
            <div className="legend-item"><span className="legend-dot marked" /> Marked</div>
          </div>

          <div className="question-palette">
            <div className="palette-title">{currentSubject}</div>
            <div className="palette-scroll">
              <div className="palette-grid">
                {questions.map((q, index) => {
                  const status = getQuestionStatus(currentSubject, index);
                  return (
                    <button
                      key={q.id}
                      className={`palette-btn ${status} ${currentIndex === index ? "current" : ""}`}
                      onClick={() => goToQuestion(index)}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="btn submit-btn" onClick={handleSubmit}>SUBMIT TEST</button>
        </div>
      </div>

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => window.history.back()}>
        ◀ Go Back
      </button>
    </div>
  );
}

export default TestsPage;
