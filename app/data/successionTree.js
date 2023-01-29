export class SuccessionTreeNode {
    constructor(composer) {
        this.composer = composer

        this.predecessor = null
        this.successors = []
    }

    connectToPredecessor(predecessor) {
        this.predecessor = predecessor
        predecessor.successors.push(this)
    }
}

export class SuccessionTree {
    constructor(root) {
        this.root = root
    }
}

export class SuccessionTreeBuilder {
    #nodes

    constructor() {
        this.#nodes = []
    }

    insert(composer, predecessor) {
        const composerNode = this.#getOrCreateNode(composer)
        const predecessorNode = this.#getOrCreateNode(predecessor)

        composerNode.connectToPredecessor(predecessorNode)
    }

    build() {
        const root = this.#nodes.find(n => n.predecessor == null)
        return new SuccessionTree(root)
    }

    #getOrCreateNode(composer) {
        return this.#nodes.find(n => n.composer === composer)
            ?? this.#nodes.add(new SuccessionTreeNode(composer))
    }
}