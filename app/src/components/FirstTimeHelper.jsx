import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

function FirstTimeHelper() {
    // Initialize page navigation
    var navigate = useNavigate();

    // Creates a state called step, which tracks the current step of the first time
    // helper and starts at value 1
    var [step, setStep] = useState(0);
    
    useEffect(() => {
        // If user has not visited the website yet, start the first time helper,
        // navigate to the home page, and set the local storage variable to false
        if (!localStorage.getItem("user")) {
            setStep(1);
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
        setStep(0);
    }

    // Display the first time user helper modal
    return (
        <div>
            {step === 1 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                        <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
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
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot1.jpg"/>
                        <p>Use the Login/Signup button to navigate to the login page!</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot2.jpg"/>
                        <p>
                            Enter your login credentials and click the login button to login! If you don't have
                            an account, click on the sign up button!
                        </p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 4 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot3.jpg"/>
                        <p>Use the Saved Recipes button to navigate to the saved recipes page!</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 5 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot4.jpg"/>
                        <p>Click on the create recipe button in the corner to begin creating a recipe!</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 6 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot5.jpg"/>
                        <p>Enter your recipe details and press submit to save the recipe!</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 7 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot6.jpg"/>
                        <p>
                            Now that your recipe has been saved, click on the recipe to view it's details!
                            Note that pressing the edit button will allow you to change the details of a recipe!
                        </p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 8 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot7.jpg"/>
                        <p>
                            This page shows the top of the details of the selected recipe! Use the navigation bar 
                            at the top to return to either the home page or the saved recipes page!
                        </p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 9 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <img src="screenshot8.jpg"/>
                        <p>
                            This page shows the meal multiplier which changes the quantity of the ingredients as
                            well as the nutritional summary!
                        </p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </>
            )}

            {step === 10 && (
                <>
                    <div class="blur"></div>
                    <div class="helper-modal">
                    <button class="close" onClick={close}><i class="fa-solid fa-xmark"></i></button>
                        <h1>That's it!</h1>
                        <p>Thank you for using my website and enjoy!</p>
                        <div class="back-next-buttons">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Finish</button>
                        </div>
                    </div>
                </>
            )}  
        </div>
    );
}

export default FirstTimeHelper;