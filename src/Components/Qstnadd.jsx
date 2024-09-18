import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import './Nav.css';

const LOCAL_STORAGE_KEY = 'quiz_questions';

function Qstnadd() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [questionsList, setQuestionsList] = useState([]);

  // Get questions from localStorage 
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setQuestionsList(storedQuestions);
  }, []);

  // Save questions to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questionsList));
  }, [questionsList]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const newQuestionsList = {
      question,
      options,
      answer
    };

    const updatedQuestionsList = [...questionsList, newQuestionsList];
    setQuestionsList(updatedQuestionsList);

    // Save updated questions to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedQuestionsList));

    console.log('Updated localStorage:', localStorage.getItem(LOCAL_STORAGE_KEY));

    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
  };

  const handleNewOptions = (i, value) => {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);
  };

  return (
    <>
      <div className='qAddcontainer'>
      <form onSubmit={handleSubmit} className='qstn_form'>
        <div className='col-12'>
          <label>
            Question
            <input className='addQstnInp' type="text" value={question} placeholder='Please Enter the Question' onChange={(e) => setQuestion(e.target.value)} />
          </label>
        </div>
        <div className='col-12'>
          {options.map((option, i) => (
            <div key={i}>
              <label>
                Option {i + 1}:
                <input
                 className='addQstnInp'
                  type="text"
                  value={option}
                  onChange={(e) => handleNewOptions(i, e.target.value)}
                  required
                  placeholder='Please Enter Options'
                />
              </label>
            </div>
          ))}
        </div>
        <div className='col-12'>
          <label>
            Answer
            <input className='addQstnInp' type="text" value={answer} placeholder='Please Enter Answer' onChange={(e) => setAnswer(e.target.value)} />
          </label>
        </div>
        <button type="button" className='submitQstn' onClick={handleSubmit}>Submit Question</button>
      </form>
      </div>

      <div style={{marginLeft:'20px'}}>
        <h2>Newly Added Questions</h2>
        <ul>
          {questionsList.map((q, index) => (
            <li key={index}>
              <h3>{index+1}) {q.question}</h3>
              <ul>
                {q.options.map((optn, i) => (
                  <li key={i}>Option {i+1}: {optn}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {q.answer}</p>
            </li>
          ))}
        </ul>
      </div>


    </>
  );
}

export default Qstnadd;
