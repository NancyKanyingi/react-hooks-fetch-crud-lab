import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {

  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])
   useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

   function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  }

   function handleUpdateQuestion(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(questions.map((q) => (q.id === data.id ? data : q)));
      });
  }
    function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      body:JSON.stringify({})
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    })
      
  }
  
  return (
    <main>
        <AdminNavBar setPage={setPage}  />
      {page === "Form" ? (
  <QuestionForm onAddQuestion={handleAddQuestion}  />
) : (
  <QuestionList 
    questions={questions} 
    onDeleteQuestion={handleDeleteQuestion} 
    onUpdateQuestion={handleUpdateQuestion} 
  />
)}
  
    </main>
  );
}

export default App;
