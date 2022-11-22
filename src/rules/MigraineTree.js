import Tree from "./DecisionTree"

// Tree (key, question = key, criteria = 0,  parent = null)
// Root

const MigraineTree = new Tree(0, {question:"Is Your Visual under or equal to 0.5?", parameter: "Visual"});

// Row 1
MigraineTree.insert(0, 10, {question:"Is Your Sensory under 0.5?", parameter:"Sensory"});
MigraineTree.insert(0, 11, {question:"Is Your Character under or equal to 0.5?", parameter:"Character"});

// Row 2
MigraineTree.insert(10, 20, {question:"Is your Dysphasia under or equal to 0.5?", parameter: "Dysphasia"});
MigraineTree.insert(10, 21, {question:"Is your Hypoacusis under or equal to 0.5?", parameter:"Hypoacusis"});

MigraineTree.insert(11, 22, {question:"Your Migraine is OTHER.", parameter:null});
MigraineTree.insert(11, 23, {question:"Is your Vertigo below or under 0.5?", parameter:"Vertigo"});

export default MigraineTree;