import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

function FirstTimeHelper() {
    // Initialize page navigation
    var navigate = useNavigate();

    // Creates a state called step, which tracks the current step of the first time
    // helper and starts at value 1
    var [step, setStep] = useState(1);
    
    useEffect(() => {
        if (step === 1) {
            navigate("/");
        }
    }, []);

    var nextStep = () => {
        setStep(step+1);
    }

    var prevStep = () => {
        setStep(step-1);
    }

    var close = () => {
        setStep(-1);
    }

    // Display the first time user helper modal
    return (
        <div>
            {step === 1 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                        <h1>Welcome to Recipedia!</h1>
                        <div class="buttons">
                            <button onClick={close}>Close</button>
                            <button onClick={nextStep}>Get Started</button>
                        </div>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                        <img src="screenshot1.png"/>
                        <p>Use the Saved Recipes button to navigate to the saved recipes page.</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 3 && (
                <>

                </>
            )}

            {step === 4 && (
                <>
                    
                </>
            )}

            {step === 5 && (
                <>
                    
                </>
            )}

            {step === 6 && (
                <>
                    
                </>
            )}

            {step === 7 && (
                <>
                    
                </>
            )}  
        </div>
    );
}

export default FirstTimeHelper;