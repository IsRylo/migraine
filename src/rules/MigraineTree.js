import Tree from "./DecisionTree"

// Tree (key, question = key, criteria = 0,  parent = null)
// Root
const MigraineTree = new Tree(0, ["Is Your Visual under or equal to 0.5?", 0.5]);

// Row 1
MigraineTree.insert(0, 10, ["Is Your Sensory under 0.5?", 0.5]);
MigraineTree.insert(0, 11, ["Is Your Intensity under or equal to 0.5?", 0.5]);

// Row 2
MigraineTree.insert(10, 20, ["Is your Dysphasia under or equal to 0.5?", 0.5]);
MigraineTree.insert(10, 21, ["Is your Hypo under or equal to 0.5?", 0.5]);

MigraineTree.insert(11, 22, ["Your Migraine is OTHER.", null, []]);
MigraineTree.insert(11, 23, ["Is your Vertigo below or under 0.5?", 0.5]);

export default MigraineTree;