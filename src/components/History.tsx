import React from "react";
import { IHistoryProps } from "./history.interface";

const History = ({
  toggleHistoryPanel,
  isVisible,
  history,
  clearHistory,
}: IHistoryProps) => {
  return (
    <div className="hamburgerMenu">
      <button
        className="hamburger"
        onClick={(e) => {
          e.stopPropagation();
          toggleHistoryPanel();
        }}
        title="History"
      >
        ☰
      </button>
      <div className={`history-panel ${isVisible ? "visible" : ""}`}>
        <span title="Close " className="close" onClick={toggleHistoryPanel}>
          X
        </span>
        <div className="historyUl">
          {history.length > 0 ? (
            history.map((entry, index) => (
              <div className="historyLi" key={index}>
                <span className="historyInput">{entry.input} = </span>
                <span className="historyResult">{entry.result}</span>
              </div>
            ))
          ) : (
            <div>No history found</div>
          )}
        </div>
        {history.length > 0 && (
          <button type="button" className="red" onClick={clearHistory}>
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default History;
