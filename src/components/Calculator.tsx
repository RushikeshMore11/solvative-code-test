import React, { useState } from "react";
import { IMAGES } from "../assets";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value: string) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  const handleBackSpace = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      setInputValue((prevValue) => String(eval(prevValue)));
    } catch (error) {
      alert("Invalid operations");
      setInputValue("");
    }
  };

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
                alert("Write a function for Clear End");
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
            {["%"].map((val) => (
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
    </div>
  );
};

export default Calculator;
