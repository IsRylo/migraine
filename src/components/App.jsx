import "../App.css"
import React, {useState, useEffect} from "react";
import Answer from "./Answer";
import Explanation from "./Explanation";
import Question from "./Question";
// import MigraineTree from "../rules/MigraineTree";
 

// const tree = MigraineTree;
var activities = [];

function App(props) {
  const [key, setKey] = useState(0);

  // Fungsi untuk menerima data dari Question

  // let curr = tree.find(key);
  
  const [data, setData] = useState(
    {
      question: curr.question,
      answer: "",
      date: new Date().toLocaleString(),
      parameter:""
    }
  );

  const questionToApp = (data) => {
    setData(data);
  }

  // Mencatat perubahan state 
  useEffect(() => {
    activities.push(data);
  },[key]);

  return (
    <div className="App container">
      <h1>Migraine Diagnostic System</h1>
      <div className="row top">
        <div className="col">
          <Question
            question={!curr.isLeaf ? curr.question : "No Questions Found."}
            // answers={curr != undefined ? curr.answers : []}
            // options={curr.children.map(child => {return child.key})}
            // threshold={curr.threshold}
            parameter = {curr.parameter}
            currKey = {key}
            onAnswerSubmit={setKey}
            onData={questionToApp}
          />
        </div>
        <div className="col">
          <Explanation 
            activities={activities == undefined ? [] : activities}
          />
        </div>
      </div>
      <div className="row">
          <Answer 
            answer={curr.isLeaf ? curr.question : ""}
          />
      </div>
    </div>
  );
}

export default App;
