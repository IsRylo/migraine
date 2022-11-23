import data from "../rules/Data.json";
import Tree from "./DecisionTree";

let firstObj = data.shift();

const QuestionTree = new Tree(firstObj["key"], firstObj);

for (let objKey in data) {
    // MigraineTree.insert(10, 20, {question:"Is your Dysphasia under or equal to 0.5?", parameter: "Dysphasia"});
    QuestionTree.insert(data[objKey]["parent"], data[objKey]["key"], data[objKey]);
}

export default QuestionTree;