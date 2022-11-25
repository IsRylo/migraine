class TreeNode {
    constructor(key, {question = key, parameter, threshold = 0.5, answerOption=[], migraine=null},  parent = null) {
        this.key = key;
        this.question = question;
        this.parameter = parameter;
        this.parent = parent;
        this.threshold = threshold;
        this.answerOption = answerOption;
        this.migraine = migraine;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class Tree {
    constructor(key, {question = key, parameter, threshold = 0.5, answerOption=[], migraine=null}) {
        const a = {question: question, parameter: parameter, threshold: threshold, answerOption: answerOption, migraine:migraine};
        this.root = new TreeNode(key, a);
    }

    * preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    * postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    insert(parentNodeKey, key, {question = key, parameter, threshold = 0.5, answerOption = [], migraine=null}) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const a = {
                    question:question,
                    parameter : parameter,
                    threshold : threshold,
                    migraine  : migraine,
                    answerOption: answerOption
                };
                node.children.push(new TreeNode(key, a, node));
                return true;
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

export default Tree;