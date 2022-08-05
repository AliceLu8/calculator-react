import { calculatorButtons } from "../globals/calculator-button-data";
import "../styles/App.css";

function Buttons( { handleClick } ) {

    function handleNumber(value, type) {
        handleClick(value, type);
    }
 
    return (  
            <div className="buttons-wrapper">

                {calculatorButtons.map((btn, i) => 
                <button key={i}
                        className={`${btn.className} ${btn.type}`}
                        onClick={() => handleNumber(btn.value, btn.type)}>
                            {btn.text}
                        </button>)
                }
            </div>
  
  
    );
  }
  
  export default Buttons;