import "../App.css"
import React, {
  useState,
  useEffect
} from "react";
import Answer from "./Answer";
import Explanation from "./Explanation";
import Question from "./Question";
// import MigraineTree from "../rules/MigraineTree";
import getClass from "../rules/MigraineRules"

// const tree = MigraineTree;
// Age=0, Frequency=0, Location=0, Character=0, Intensity=0, Photophobia=0, Visual=0, Sensory=0, Dysphasia=0, Vertigo=0, Tinnitus=0, Hypoacusis=0, Defect=0, DPF=0
const questions = [{
    question: "Umur pasien",
    parameter: "Age"
  },
  {
    question: "Durasi gejala yang terjadi dalam 1 hari",
    parameter: "Duration"
  },
  {
    question: "Berapa kali kemunculan gejala dalam 1 bulan terakhir",
    parameter: "Frequency"
  },
  // {
  //   question: "Lokasi penyakit yang dirasakan pada kepala (Tidak ada - 0, Satu sisi- 1, Dua atau lebih- 2)",
  //   parameter: "Location"
  // },
  // {
  //   question: "Jenis rasa sakit yang dipilih Throbbing or constant pain (Tidak ada - 0, Berdenyut-denyut - 1, Konstan- 2)",
  //   parameter: "Character"
  // },
  // {
  //   question: "Intensitas penyakit yang dirasakan (Tidak ada - 0, Ringan - 1, Sedang - 2, Parah - 3)",
  //   parameter: "Intensity"
  // },
  // {
  //   question: "Sensitif terhadap cahaya (Tidak - 0, Ya - 1)",
  //   parameter: "Photophobia"
  // },
  // {
  //   question: "Banyak komplikasi atau gejala yang berhubungan dengan penglihatan",
  //   parameter: "Visual"
  // },
  // {
  //   question: "Banyak komplikasi atau gejala yang berhubungan dengan indrawi",
  //   parameter: "Sensory"
  // },
  // {
  //   question: "Kesulitan dalam mengkoordinasikan pembicaraan atau kata-kata yang diucapkan (Tidak - 0, Ya - 1)",
  //   parameter: "Dysphasia"
  // },
  // {
  //   question: "Mengalami pusing-pusing (Tidak - 0, Ya - 1)",
  //   parameter: "Vertigo"
  // },
  // {
  //   question: "Telinga berdenging (Tidak - 0, Ya - 1)",
  //   parameter: "Tinnitus"
  // },
  // {
  //   question: "Gangguang pendengaran (Tidak - 0, Ya - 1)",
  //   parameter: "Hypoacusis"
  // },
  // {
  //   question: "Cacat pada baik pada satu atau kedua mata bersamaan dengan bidang hidung (Tidak - 0, Ya - 1)",
  //   parameter: "Defect"
  // },
  // {
  //   question: "Ada anggota keluarga atau keturunan yang mengalami gejala yang sama (Not - 0, Yes - 1)",
  //   parameter: "DPF"
  // },
  {
    question: "",
    parameter: undefined
  }
];

const key_length = questions.length - 1;

var activities = [];

function App(props) {
  const [key, setKey] = useState(0);

  // Fungsi untuk menerima data dari Question

  // let curr = tree.find(key);

  const [data, setData] = useState({
    // question: curr.question,
    question: questions[key].question,
    answer: "",
    date: new Date().toLocaleString(),
    parameter: ""
  });

  const questionToApp = (data) => {
    setData(data);
  }

  function processAnswer() {
    console.log("Key: " + key);
    if (key < key_length) return;
    console.log("Activities: ");
    console.log(activities)
    var a = {};
    for (let i = 1; i < activities.length; i++) {
      a[activities[i].parameter] = activities[i].answer;
    }
    console.log(a);
    var c = getClass(a);
    console.log(c);
    return c;
  }

  // Mencatat perubahan state 
  useEffect(() => {
    activities.push(data);
  }, [key]);

  return ( 
  <div className = "App container" >
    <h1> Migraine Diagnostic System </h1> 
    <div className = "row top" >
      <div className = "col" >
        <Question
          // question={!curr.isLeaf ? curr.question : "No Questions Found."}
          // answers={curr != undefined ? curr.answers : []}
          // options={curr.children.map(child => {return child.key})}
          // threshold={curr.threshold}
          // parameter = {curr.parameter}
          question = {key < key_length ? questions[key].question : "Tidak ada pertanyaan lanjut"}
          parameter = {key < key_length ? questions[key].parameter : undefined}
          currKey = {key}
          onAnswerSubmit = {setKey}
          onData = {questionToApp}
        /> 
      </div> 
      { /* <p>{processAnswer()}</p> */ } 
      <div className = "col" > 
      {
        /* <Explanation 
                    activities={activities == undefined ? [] : activities}
                  /> */
      } 
      </div> 
    </div> 
    <div className = "row" >
    <Answer answer = {
      processAnswer()
    }
    /> 
    </div> 
  </div>
  );
}
export default App;