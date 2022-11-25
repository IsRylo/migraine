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

  function createInput(){
    if (currNode.answerOption.length > 0) return(
      <div className="radioInputs">
        <label className="input-label mx-2">{currNode["parameter"] + ":"}  </label>
        {currNode.answerOption.map((element, index) => {
          return(
            <div className="form-check form-check-inline" key={index}>
              <input id={element} type="radio" className="form-check-input" aria-describedby="button" name="response" value={index}/>
              <label className="form-check-label" htmlFor={element}>{element}</label>
            </div>
          )
        })}
      </div>
    );

    else return(
      <div className="numberInput">
        <label className="input-label mx-2">{currNode["parameter"] + ":"}  </label>
        <input type="number" className="inputNumber" aria-describedby="button" name="response" onChange={validation} placeholder="Masukkan Nilai" min={0}/>
      </div>
    );
  }

  function validation() {
    if (document.querySelector('input[name="response"]').value < 0) {
      document.getElementById("error").innerHTML = "Angka harus lebih dari 0";
    }
  }

  function handleSubmit(){
    let response, answer;
    if (currNode.answerOption.length > 0) {
      if (document.querySelector('input[name="response"]:checked') == null) {
        document.getElementById("error").innerHTML = "Tolong Pilih Salah Satu opsi";
        return;
      };
      response = parseInt(document.querySelector('input[name="response"]:checked').value);  
      answer = {
        "question": currNode.question,
        "response": currNode.answerOption[response],
        "date": new Date().toLocaleString(),
        "parameter": currNode["parameter"]
      };
    } else {
      if (document.querySelector('input[name="response"]').value == "") {
        document.getElementById("error").innerHTML = "Tolong Masukkan sebuah Nilai";
        return;
      }
      response = parseInt(document.querySelector('input[name="response"]').value); 
      answer = {
        "question": currNode.question,
        "response": response,
        "date": new Date().toLocaleString(),
        "parameter": currNode["parameter"]
      };
    }
    
    activities.push(answer);
    params[currNode.parameter] = response;
    document.getElementById("error").innerHTML = "";
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
            <div id="question-content" className="d-flex flex-column justify-content-evenly align-items-center">
              <Question question={currNode.isLeaf ? "Tidak ada pertanyaan lanjut" :currNode.question}/>
              <form className="mt-4">
                  <div className="form-group">
                    <div className="Input">
                      {currNode.isLeaf ? "" : createInput()}
                    </div>
                  </div>
              </form>
              {currNode.isLeaf ? "" : <button id="submit" className="btn mx-3" onClick={handleSubmit} style={{"backgroundColor":"#EDECEB", "width":"max-content"}} type="button">Submit</button> }
              <p id="error"></p>
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