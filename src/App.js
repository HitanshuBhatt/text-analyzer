import React, { useState } from "react";
import "./App.css";

// function to analyze the text and return the report 
function analyzeText(text) {
  const trimmed = text.trim(); // removes the white space from start to the end 
 
  // Count number of periods only
let sentenceCount = 0;

for (let i = 0; i < trimmed.length; i++) {
  if (trimmed[i] === ".") {
    sentenceCount++;  // increaments by 1 when a period is found 
  }
}
  const rawWords = trimmed // split into words
    .split(/[\s.?!,;:()]+/)
    .filter(w => w.length > 0); // removes empty entries 

  // Clean punctuation and lowercase
  const words = rawWords.map(w =>
    w
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") // remove any chracters that are not numbers or alphabets
  );
 
  // count word frequency in text 
  const wordFrequency = {};
  words.forEach(word => {
    if (!wordFrequency[word]) {
      wordFrequency[word] = 1; // create a count 
    } else {
      wordFrequency[word] += 1; // increament the count 
    }
  });

  return {
    sentenceCount,
    wordFrequency
  };
}


// main text nalyrzer compomnenet 
function App() {
  const [text, setText] = useState(""); // user inputs text 
  const [report, setReport] = useState(null); // analysis output 
 
  const handleAnalyze = () => {
    const result = analyzeText(text); // proccess the text 
    setReport(result);// save the reslt 
  };

  const handleClear = () => {
    setText(""); // clear the text area 
    setReport(null);// clear any report created 
  };

  return (
    // main app container 
    <div className="App">
      <header className="app-header">
        <h1>Text Analyzer</h1>
        <p>Enter your text and click Submit to analyze.</p>
      </header>

      <main className="app-main">
        <div className="input-section">
          <label className="input-label">Enter text:</label>

          <textarea
            className="text-area"
            value={text}
            onChange={(e) => setText(e.target.value)} // update tes=xt state 
            placeholder="Type or paste your text here..."
          />

          <div className="button-row">
            <button className="btn primary" onClick={handleAnalyze}>  
              Submit
            </button>
            <button className="btn secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
{/* output the report */} 
        <div className="report-section">
          <h2>Analysis Report</h2>

          {!report ? (
            <p className="placeholder">No report yet.</p> // place holder until submit button is not clicked 
          ) : (
            <>
              <p>
                <strong>Total Sentences (separted by '.'): </strong>
                {report.sentenceCount}
              </p>

              <h3>Word Frequency:</h3>
              <ul className="report-list">
                {Object.entries(report.wordFrequency).map(([word, count]) => (
                  <li key={word}>
                    <strong>{word}:</strong> {count}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <small>React Text Analyzer — React 18.2.0 Compatible</small>
      </footer>
    </div>
  );
}

export default App;
