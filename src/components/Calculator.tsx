import React, { useEffect, useState } from "react";
import { IMAGES } from "../assets";
import { IHistory } from "./calculator.interface";
import History from "./History";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [isHistoryPanelVisible, setIsHistoryPanelVisible] =
    useState<boolean>(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  const handleButtonClick = (value: string) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  const toggleHistoryPanel = () => {
    setIsHistoryPanelVisible(!isHistoryPanelVisible);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleBackSpace = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  //numeric input before last operator
  const clearEnd = () => {
    for (let i = inputValue.length - 1; i >= 0; i--) {
      if (
        inputValue[i] === "+" ||
        inputValue[i] === "-" ||
        inputValue[i] === "*" ||
        inputValue[i] === "/"
      )
        return;
      else {
        handleBackSpace();
      }
    }
  };

  const calculateResult = () => {
    try {
      const sanitizedInput = inputValue.replace(/(?<=\D|^)0+(?=\d)/g, "");
      const result = eval(sanitizedInput);

      // Ensuring the result is displayed as a string without leading zeros
      setInputValue(String(parseFloat(result)));
      setHistory([...history, { input: inputValue, result }]);
      console.log(result);
    } catch (error) {
      alert("Invalid operations");
      return;
    }
  };

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("calculatorHistory") || "[]"
    );
    setHistory(storedHistory);
  }, []);

  // Update localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  //effect to close the hamburger menu on document click
  useEffect(() => {
    document.addEventListener("click", () => setIsHistoryPanelVisible(false));

    return () => {
      document.addEventListener("click", () => setIsHistoryPanelVisible(false));
    };
  }, []);

  return (
    <div className="container">
      <form
        name="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          calculateResult();
        }}
      >
        <div className="display">
          <input
            type="text"
            placeholder="0"
            name="displayResult"
            value={inputValue}
            readOnly
          />
        </div>
        <div className="buttons">
          <div className="row">
            {/* CE, C, Erase, division '%' */}
            <input
              key={"CE"}
              type="button"
              onClick={() => {
                clearEnd();
              }}
              value={"CE"}
            />
            <input
              key={"C"}
              type="button"
              onClick={() => clearInput()}
              value={"C"}
            />
            {/* <input
              key={"C"}
              type="button"
              onClick={() => clearInput()}
              value={"C"}
            /> */}
            <button
              onClick={handleBackSpace}
              type="button"
              className="backspace"
            >
              <img src={IMAGES.backspace} alt="backspace" />
            </button>
            {["/"].map((val) => (
              <input
                key={val}
                type="button"
                onClick={() => handleButtonClick(val)}
                value={val}
              />
            ))}
          </div>
          <div className="row">
            {/* Buttons 7 to 9 and addition */}
            {["7", "8", "9", "*"].map((val) => (
              <input
                key={val}
                type="button"
                onClick={() => handleButtonClick(val)}
                value={val}
              />
            ))}
          </div>
          <div className="row">
            {/* Buttons 4 to 6 and subtraction */}
            {["4", "5", "6", "-"].map((val) => (
              <input
                key={val}
                type="button"
                onClick={() => handleButtonClick(val)}
                value={val}
              />
            ))}
          </div>
          <div className="row">
            {/* Buttons 1 to 3 and addition '+' */}
            {["1", "2", "3", "+"].map((val) => (
              <input
                key={val}
                type="button"
                onClick={() => handleButtonClick(val)}
                value={val}
              />
            ))}
          </div>
          <div className="row">
            {/* Button 0, '.', '/', and '=' */}
            {[" ", "0", "."].map((val) => (
              <input
                key={val}
                type="button"
                onClick={() => handleButtonClick(val)}
                value={val}
                style={{ backgroundColor: val === " " ? "white" : "" }}
              />
            ))}
            <input
              key={"="}
              type="button"
              onClick={() => calculateResult()}
              value={"="}
              className="red"
            />
          </div>
        </div>
      </form>

      <History
        isVisible={isHistoryPanelVisible}
        history={history}
        clearHistory={clearHistory}
        toggleHistoryPanel={toggleHistoryPanel}
      />
    </div>
  );
};

export default Calculator;
