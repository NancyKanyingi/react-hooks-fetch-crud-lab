import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
const [questions, setQuestions] = useState([]);
const[isLoaded, setIsLoaded] = useState(false)

useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then ((response)=>response.json())
  .then ((data) => {
      setQuestions(data)
      setIsLoaded(true);
})
  .catch ((error) => console.log("Error",error))
}, [])


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> {/* display QuestionItem components here after fetching */}
        <QuestionItem key={q.id} question={q} /></ul>
    </section>
  );

}

export default QuestionList;
