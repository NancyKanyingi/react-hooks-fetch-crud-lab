import React from "react";
import App from "./App.jsx"
import {useState} from 'react'

function QuestionItem({ question }) {
  const { id, prompt, answers } = question;
  const [questions, setQuestions] = useState([]);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDeleteQuestion({id}) {
    fetch(`http://localhost:4000/questions/${questions.id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((questions) => questions.id !== id));
    });
  }
    const onDeleteQuestion={handleDeleteQuestion} 
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select>{options}</select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
