import "../App.css"
import React, {useState, useEffect} from "react";
import Question from "./Question";
import QuestionTree from "../rules/QuestionTree";
import Explanation from "./Explanation";
import Modal from "./Modal"
import predict from "../rules/MigraineRules";

let activities = [];

let params = {};

function App() {

  const [currNode, setCurr] = useState(QuestionTree.root);
  const [isDisabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  function processAnswer() {
    var c = getClass(params);
    return c;
  }

  function getClass({Age=0, Frequency=0, Location=0, Character=0, Intensity=0, Photophobia=0, Visual=0, Sensory=0, Dysphasia=0, Vertigo=0, Tinnitus=0, Hypoacusis=0, Defect=0, DPF=0}) {
      const classes = ['Typical aura with migraine', 'Migraine without aura', 'Typical aura without migraine', 'Familial hemiplegic migraine', 'Sporadic hemiplegic migraine', 'Basilar-type Aura', 'Other']
      const a = {
          Age:Age, Frequency:Frequency, Location:Location, Character:Character, Intensity:Intensity, Photophobia:Photophobia, Visual:Visual, Sensory:Sensory, Dysphasia:Dysphasia, Vertigo:Vertigo, Tinnitus:Tinnitus, Hypoacusis:Hypoacusis, Defect:Defect, DPF:DPF
      };
      const [result, certain] = predict(a);
      const migraine = classes[result.indexOf(Math.max(...result))]
      return migraine +  " dengan persentase kepastian " + (certain*100).toFixed(2) + "%";
  }

  // Mencatat perubahan state 
  useEffect(() => {
    if (currNode.parameter in params) {
      console.log("Skipped " + currNode.question);
      setCurr(currNode["children"][params[currNode.parameter] <= currNode["threshold"] ? 0 : 1]);
    }
  }, [currNode]);

  function createAnswer(){

    const title = processAnswer();
    const [prediction] = predict(params);
    const sum = prediction.reduce((accumulator, value) => {return accumulator + value;}, 0);

    return(
      <Modal 
        title={"Tipe Migrainemu adalah " + title}
        show={currNode.isLeaf}
        sum={sum}
        prediction={prediction}
        onReload={() => window.location.reload(false)}
      />
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
      setDisabled(true);
      setError("Input harus berupa angka positif");
    } else {
      setError("");
      setDisabled(false);
    }
  }

  function handleSubmit(){
    let response, answer;
    if (currNode.answerOption.length > 0) {
      if (document.querySelector('input[name="response"]:checked') == null) {
        setError("Tolong Pilih Salah Satu opsi");
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
      if (document.querySelector('input[name="response"]').value === "") {
        setError("Tolong Masukkan sebuah Angka");
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
    setError("");
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
        <a href="#" className="navbar-brand mb-0 h1" style={{"color":"#FAFAFA"}}>Sistem Diagnosis Migraine</a>
      </div>
      
  </nav> 
    <div className = "row top" >
    <Modal />
      {/* Question Section */}
      <div className = "col" >
        <div id="Question">
          <h2 className="section-title mb-5">Pertanyaan</h2>
            <div id="question-content" style={{"height": "20vw", "textAlign":"center"}} className="">
              <Question question={currNode.isLeaf ? "Tidak ada pertanyaan lanjut" :currNode.question}/>
              <form className="mt-4">
                  <div className="form-group">
                    <div className="Input">
                      {currNode.isLeaf ? "" : createInput()}
                    </div>
                  </div>
              </form>
              {currNode.isLeaf ? "" : <button id="submit" className="btn mx-3 mt-5" onClick={handleSubmit} style={{"backgroundColor":"#EDECEB", "width":"max-content"}} type="button" disabled={isDisabled}>Submit</button> }
              <p id="error" className="mt-5">{error}</p>
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
    </div> 
    {currNode.isLeaf ? createAnswer() : ""}
  </div>
  );
}
export default App;