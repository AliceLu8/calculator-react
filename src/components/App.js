import { useState } from "react";
import Display from './Display';
import Buttons from "./Buttons";
import "../styles/App.css";

function App() {

  const [output, setOutput] = useState('');
  const [result, setResult] = useState(false);

  const [memory, setMemory] = useState('');
  
  
  function assessString(fn) {
      //return new Function( 'return' + fn)(); // eslint-disable-line
      return Function('"use strict";return (' + fn + ')')();
  }


  function isOperator(str) {
    const lastCharacter = str.charAt(str.length - 1) 
    if (lastCharacter === '+' ||
        lastCharacter === '-' ||
        lastCharacter === '*' ||
        lastCharacter === '/') {
        return true;
        } else {
          return false;
        }
  }

  // Operators
  function handleClickButton(value, type) {

    switch (type) {
      case 'number':
        handleNumber(value);
        break;
      case 'operator':
        handleOperator(value);
        break;
      case 'clear':
        handleClear(value);
        break;
      case 'enter':
        handleEnter();
        break;
      case 'memory':
        handleMemory(value);
        break;
      default:
        break;
    }
}


function handleNumber(value){
  
  if (output === '' && value === 0) {
    return;
  }

  if(result) {
    setResult(false);
    setOutput(`${value}`);
      return;
  }

  setOutput(`${output}${value}`);
}

 // +/-* functions
function handleOperator(value){

  if(isOperator(output)){
    return;
  }

  // Fix leading 0 before the operator issue
  if(isOperator(output) && value === 0){
    return;
  }

  if(value === 'Add') {
    value = '+';
  } else if(value === 'Subtract') {
    value = '-';
  } else if(value === 'Multiply') {
    value = '*';
  } else if(value === 'Divide') {
    value = '/';
  }
  
  if(result){
    setResult(false);
    setOutput(`${output}${value}`);
    return;
  }
  
  setOutput(`${output}${value}`);
    
}

 // Clear function
function handleClear(value){
  if(value === 'Clear') {
    setOutput(output.slice(0,-1));
    return;
  } else if (value === 'All Clear') {
    setOutput('');
  }
}

  // Enter function
function handleEnter(){
  const result = assessString(output);
  setResult(true);
  setOutput(`${result}`);
}

// Memory function
function handleMemory(value) {
  if(value === 'Memory Save') {
    setMemory(output);
    console.log(memory);
    return;
  } else {
    setOutput('');
  }

  if(value === 'Memory Recall') {
    setOutput(memory);
    console.log(output);
    return;
  }

  if(value === 'Memory Clear') {
    setMemory('');
    console.log(output);
    return;
  }

  if(value === 'Memory Subtract') {
    const newValue = `${output*1 - memory*1}`;
    setOutput(newValue);
    setMemory(newValue);
    return;
  }

  if(value === 'Memory Addition') {
    const newValue = `${output*1 + memory*1}`;
    setOutput(newValue);
    setMemory(newValue);
    console.log(output);
    return;
  }

}

  return (
      <div className="wrapper">
        <header className="App-header">
          <h1>React Calculator</h1>
        </header>

        <div className="calculator">
          <Display output={output} />
          <Buttons handleClick={handleClickButton}/>
        </div>

      </div>

  );
}

export default App;