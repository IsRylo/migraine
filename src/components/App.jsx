import "../App.css"
import React, {useState, useEffect} from "react";
import Question from "./Question";
import QuestionTree from "../rules/QuestionTree";
import getClass from "../rules/MigraineRules"
import Explanation from "./Explanation";


const key_length = 15;

let activities = [];

let params = {};

function App(props) {
  // let curr = tree.find(key);

  const [currNode, setCurr] = useState(QuestionTree.root);

  function processAnswer() {
    var c = getClass(params);
    return c;
  }

  // Mencatat perubahan state 
  useEffect(() => {
    if (currNode.parameter in params) {
      console.log("Skipped " + currNode.question);
      setCurr(currNode["children"][params[currNode.parameter] <= currNode["threshold"] ? 0 : 1]);
    }
  }, [currNode]);

  function handleSubmit(){
    const response = parseInt(document.querySelector('input[name="response"]').value);
    const answer = {
      "question": currNode.question,
      "response": response,
      "date": new Date().toLocaleString(),
      "parameter": currNode["parameter"]
    };
    activities.push(answer);
    params[currNode.parameter] = response;
    setCurr(currNode["children"][response <= currNode["threshold"] ? 0 : 1]);
  }

  function createExplanation(element, index) {
    return(
      <Explanation 
        key={index}
        date={element["date"]}
        question={element["question"]}
        answer={"Anda menjawab : " + element["response"]}
      />
    );
  }

  return ( 
  <div className = "App container" >
    <h1> Migraine Diagnostic System </h1> 
    <div className = "row top" >

      {/* Question Section */}
      <div className = "col" >
        <div id="Question">
            <h2>Question Section</h2>
            <Question question={currNode.isLeaf ? "No further Questions" :currNode.question}/>
            <form className="mt-4">
                <div className="form-group">
                <div className="Input">
                  <label className="mx-2">{currNode.isLeaf ? "": currNode["parameter"] + ":"}  </label>
                  {currNode.isLeaf ? "" : <input type="number" className="" aria-describedby="button" name="response" placeholder="Masukkan Nilai"/>}
              </div>
                </div>
            </form>
            {currNode.isLeaf ? "" : <button id="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button> }
        </div>
      </div> 


      {/* Explanaction Section */}
      <div className = "col" > 
        <div id="Explanation">
              <h2>Explanation Section</h2>
              <div className="d-flex flex-column">
                {activities.map(createExplanation)}
              </div>
          </div> 
      </div> 


    </div> 


    {/* Bottom Row */}
    <div className = "row" >
      {currNode.isLeaf ? <h2>Your Migraine Type is: {currNode["migraine"]}</h2> : ""}
      <p>{currNode.isLeaf ? processAnswer() : ""}</p>      
    </div> 
  </div>
  );
}
export default App;