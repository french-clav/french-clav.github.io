import positionTree from "../thirdParty/reactSvgTree/positionTree.ts"
import TreeGraph from "../thirdParty/reactSvgTree/TreeGraph.ts"
import BoundingBox from "../util/boundingBox.js"
import Vector2 from "../util/vector2.js"

export default class SuccessionTreePositioner {
    #canvasSize = new Vector2(10000, 10000)
    #nodeSize

    constructor(options) {
        this.orientation = options.orientation ?? "vertical"

        this.#nodeSize = this.#transform(options.nodeWidth, options.nodeHeight)
        this.levelSeparation = options.levelSeparation
        this.siblingSeparation = options.siblingSeparation
        this.subtreeSeparation = options.subtreeSeparation
    }

    // TODO: refactor
    position(tree) {
        const vertexMap = new Map()
        const nodeSizeMap = new Map()
        tree.forEach(node => {
            vertexMap.set(node.composer.id, node.successors.map(s => s.composer.id))
            nodeSizeMap.set(node.composer.id, this.#nodeSize.x)
        })

        const rootPosition = [tree.root.composer.id, { x: this.#canvasSize.x / 2, y: this.#nodeSize.y / 2, prelim: 0, mod: 0 }]
        const treeGraph = new TreeGraph(vertexMap, nodeSizeMap, rootPosition)

        positionTree(treeGraph, tree.root.composer.id, {
            ...this.#canvasSize.widthHeight(),
            levelSeparation: this.levelSeparation + this.#nodeSize.y,
            maxDepth: Infinity,
            siblingSeparation: this.siblingSeparation,
            subtreeSeparation: this.subtreeSeparation
        })

        const nodeBoxes = tree.map(node => {
            const corner = new Vector2(...treeGraph.getCoordinates(node.composer.id))
                .subtract(this.#nodeSize.scale(0.5))

            return {
                node,
                box: new BoundingBox(corner.x, corner.y, this.#nodeSize.x, this.#nodeSize.y)
            }
        })

        const boundingBox = BoundingBox.unionAll(nodeBoxes.map(n => n.box))

        // TODO: introduce BoxedPoint concept: a point belonging to a bounding box - can calculate proportional position
        const nodePlaces = nodeBoxes.map(({ node, box: nodeBox }) => ({
            node,
            ...this.#untransform(boundingBox.getLocalProportionalPosition(nodeBox.topLeft())).xy(),
            ...this.#untransform(boundingBox.getLocalProportionalSize(this.#nodeSize)).widthHeight()
        }))

        const lines = nodeBoxes
            .filter(({ node }) => node.successors.length > 0)
            .flatMap(({ node, box }) => {
                const successorNodeBoxes = nodeBoxes.filter(({ node: n }) => node.successors.includes(n))

                const result = [
                    {
                        orientation: this.orientation,
                        ...this.#untransform(boundingBox.getLocalProportionalPosition(box.bottomCenter())).xy(),
                        length: boundingBox.getLocalProportionalSize(new Vector2(0, this.levelSeparation / 2)).y
                    },
                    ...successorNodeBoxes.map(({ box }) => ({
                        orientation: this.orientation,
                        ...this.#untransform(boundingBox.getLocalProportionalPosition(box.topCenter().addY(-this.levelSeparation / 2))).xy(),
                        length: boundingBox.getLocalProportionalSize(new Vector2(0, this.levelSeparation / 2)).y
                    }))
                ]

                if (node.successors.length > 1) {
                    const successorsBoundingBox = BoundingBox.unionAll(successorNodeBoxes.map(n => n.box))
                    const from = successorsBoundingBox.topLeft().addY(-this.levelSeparation / 2).addX(this.#nodeSize.x / 2)
                    const to = successorsBoundingBox.topRight().addY(-this.levelSeparation / 2).addX(-this.#nodeSize.x / 2)

                    result.push({
                        orientation: this.orientation == 'vertical' ? 'horizontal' : 'vertical',
                        ...this.#untransform(boundingBox.getLocalProportionalPosition(from)).xy(),
                        length: boundingBox.getLocalProportionalSize(to.subtract(from)).x
                    })
                }

                return result
            })

        return {
            nodePlaces,
            lines,
            boundingBox: this.#untransform(boundingBox.size()).widthHeight(),
        }
    }

    #transform(x, y) {
        return this.orientation == "vertical"
            ? new Vector2(x, y)
            : new Vector2(y, x)
    }

    #untransform(vector) {
        return this.orientation == "vertical"
            ? new Vector2(vector.x, vector.y)
            : new Vector2(vector.y, vector.x)
    }
}