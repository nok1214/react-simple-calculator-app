import './style.css';
import React, { useState } from 'react';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  // Input digit handler
  const inputDigit = (e) => {
    const digit = e.target.textContent;

    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue.charAt(0) === '0' ? digit : displayValue + digit
      );
    }
  };

  // Input decimal point handler
  function inputDot() {
    if (waitingForOperand) {
      setDisplayValue('.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  }

  // Clear the display
  function clearDisplay() {
    setDisplayValue('0');
    setValue(null);
  }

  // Toggle sign handler
  function toggleSign() {
    setDisplayValue(
      displayValue.charAt(0) !== '-'
        ? '-' + displayValue
        : displayValue.substr(1)
    );
  }

  // Convert to percentage handler
  function convertPercent() {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  }

  // Perform operation handler
  function performOperation(e) {
    const nextOperator = e.target.textContent;
    const nextValue = parseFloat(displayValue);

    // Define operations
    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '=': (prevValue, nextValue) => nextValue,
    };

    // Calculate and update value and display
    if (value === null) {
      setValue(nextValue);
    } else if (operator) {
      const currentValue = value || 0;
      const computedValue = operations[operator](currentValue, nextValue);
      setValue(computedValue);
      setDisplayValue(String(computedValue));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  }

  return (
    <div className="calculator">
      <div className="displayPanel">{displayValue}</div>
      <div className="inputPanel">
        <button onClick={clearDisplay}>AC</button>
        <button onClick={toggleSign}>+/-</button>
        <button onClick={convertPercent}>%</button>
        <button className="operators" onClick={performOperation}>
          /
        </button>
        <button onClick={inputDigit}>7</button>
        <button onClick={inputDigit}>8</button>
        <button onClick={inputDigit}>9</button>
        <button className="operators" onClick={performOperation}>
          *
        </button>
        <button onClick={inputDigit}>4</button>
        <button onClick={inputDigit}>5</button>
        <button onClick={inputDigit}>6</button>
        <button className="operators" onClick={performOperation}>
          -
        </button>
        <button onClick={inputDigit}>1</button>
        <button onClick={inputDigit}>2</button>
        <button onClick={inputDigit}>3</button>
        <button className="operators" onClick={performOperation}>
          +
        </button>
        <button onClick={inputDigit} id="zero">
          0
        </button>
        <button onClick={inputDot}>.</button>
        <button className="operators" onClick={performOperation}>
          =
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}
