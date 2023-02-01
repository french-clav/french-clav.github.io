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

    forEach(callback, initialReturnValue) {
        const control = {
            stopped: false,
            returnValue: initialReturnValue
        }

        const exec = (node, context) => {
            callback(node.composer, context)
            if (control.stopped)
                return

            for (const successor of node.successors) {
                exec(successor, { ...context, level: context.level + 1 })
                if (control.stopped)
                    return
            }
        }

        const context = {
            level: 0,
            stop(returnValue) {
                control.stopped = true
                control.returnValue = returnValue
            }
        }

        exec(this.root, context)

        return control.returnValue
    }

    contains(composer) {
        return this.forEach((c, context) => {
            if (c === composer) {
                context.stop(true)
            }
        }, false)
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