import data from "../rules/Data.json";
import Tree from "./DecisionTree";

let firstObj = data.shift();

const QuestionTree = new Tree(firstObj["key"], firstObj);

for (let objKey in data) {
    QuestionTree.insert(data[objKey]["parent"], data[objKey]["key"], data[objKey]);
}
export default QuestionTree;