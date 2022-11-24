import "../App.css"
import React, {useState, useEffect} from "react";
import Question from "./Question";
import QuestionTree from "../rules/QuestionTree";
import getClass from "../rules/MigraineRules"
import Explanation from "./Explanation";

let activities = [];

let params = {};

function App() {

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

  function createAnswer(){
    return(
      <div id="Answer">
      <h3 className="answer">Tipe Migraine adalah: {currNode["migraine"]}</h3> 
      <p>{processAnswer()}</p>
    </div>
    );
  }

  function handleSubmit(){
    if (document.querySelector('input[name="response"]').value == "") return;
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
  <div className = "App" >
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand mb-0 h1" style={{"color":"#FAFAFA"}}>Sistem Diagnosis Migraine</a>
      </div>
  </nav> 
    <div className = "row top" >

      {/* Question Section */}
      <div className = "col" >
        <div id="Question">
            <h2 className="section-title">Pertanyaan</h2>
            <div id="question-content">
              <Question question={currNode.isLeaf ? "Tidak ada pertanyaan lanjut" :currNode.question}/>
              <form className="mt-4">
                  <div className="form-group">
                    <div className="Input">
                      <label className="input-label mx-2">{currNode.isLeaf ? "": currNode["parameter"] + ":"}  </label>
                      {currNode.isLeaf ? "" : <input type="number" className="inputNumber" aria-describedby="button" name="response" placeholder="Masukkan Nilai" min={0}/>}
                      {currNode.isLeaf ? "" : <button id="submit" className="btn mx-3" onClick={handleSubmit} style={{"backgroundColor":"#EDECEB"}} type="button">Submit</button> }
                    </div>
                  </div>
              </form>
            </div>
        </div>
      </div> 


      {/* Explanaction Section */}
      <div className = "col" > 
        <div id="Explanation">
              <h2 className="section-title">Jawaban Anda</h2>
              <div className="d-flex flex-column">
                {activities.map(createExplanation)}
              </div>
          </div> 
      </div> 

      {/* Kalau pertanyaan sudah berakhir */}
      {currNode.isLeaf ? createAnswer() : ""}
    </div> 
  </div>
  );
}
export default App;