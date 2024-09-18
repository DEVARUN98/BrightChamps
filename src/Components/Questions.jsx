import React,{useState,useEffect} from 'react'
import { questions } from './DummyQuestions';


function Questions() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [seconds, setSeconds] = useState(20); //Timer setting
  const [isActive, setIsActive] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  
  // Timer

  useEffect(() => {
    if(isSubmitted || isTimeUp){
      return
    }
    if (seconds === 0 ) {
      setIsTimeUp(true)
      return
    }
    if(isActive){
      const interval = setInterval(() => {
        setSeconds(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    
  }, [seconds,isTimeUp,isSubmitted,isActive]);

  // start button
  const handleStart=  () =>{        
    setIsActive(true)
    setIsSubmitted(false)
    setIsTimeUp(false)
  };

  const handleRestart=  () =>{        
    setIsSubmitted(false)
    setIsTimeUp(false)
    setIsActive(false)
    window.location.reload()    
  };

    const handleOptionChange=(event)=>{      
      const { name, value } = event.target;
      setSelectedAnswers(prev => ({
        ...prev,
        [name]: value
      }));
  }

  const handleSubmit=()=>{
    calculateScore()

  }

  const calculateScore=()=>{
    let newScore =0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.answer) {
        newScore += 1;
      }
    });
    return newScore
  }

  if (isSubmitted || isTimeUp) {
    return (
      <div className='home'>
        <h2>Your Score: {calculateScore()} / {questions.length}</h2>
        <button className='btnHome' onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <>
    {/* Hide Start Button */}
        {/* {(!isSubmitted || !isTimeUp)?<> */}
        {!isActive?
        <div className='home'>
          <h2>Welcome to the Quiz Contest</h2>
          <h3 style={{ color: "red" }}>Please Beware of Timer, You can't submit answers until timer stops</h3>
          <button className='btnHome' onClick={handleStart} >Start Quiz</button>
        </div>:''}
      
      {/* To display Questions when clicking on start button */}

      {isActive?
      <div style={{ margin: '2px solid black', marginBottom:'50px',marginLeft:'40px'}}>
        <div>
          <h1>Countdown Timer</h1>
          <h1 style={{ color: 'red' }}>Time Remaining: {seconds}</h1>
        </div>
        <div>
            {questions.map((qst) => <><h3>{qst.id}. {qst.question}</h3>
              {qst.options.map((op) => <div key={op}>
                <input type="radio" name={qst.id} id={op} value={op} onChange={(e) => handleOptionChange(e)} />
                <label htmlFor="">{op}</label>
              </div>
              )}
            </>
            )}
            {/* <button style={{ textAlign: 'center', backgroundColor: "green" }} onClick={handleSubmit()}>Submit</button> */}
          </div>
      </div>:''}


</>
  )
}

export default Questions