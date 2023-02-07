import React from "react"
import SuccessionTreePositioner from "../../features/successionTreePositioner.js"
import ComposerBadge from "../ComposerBadge.jsx"
import "../../styles/successionDiagram/successionDiagram.css"

export default function SuccessionDiagram({ successionTree, successionGroups, openComposerModal }) {
    const positioner = new SuccessionTreePositioner({
        orientation: "horizontal",
        nodeWidth: 280,
        nodeHeight: 54,
        levelSeparation: 50,
        siblingSeparation: 20,
        subtreeSeparation: 60
    })

    const map = positioner.position(successionTree)

    return (
        <div className="zero-pos xy-centerer">
            <div className="succession-diagram-container">
                <div className="stretch relative">
                    {map.nodePlaces.map(({ node, x, y, width, height }) =>
                        <div key={node.composer.id} style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), width: width.toPercent(), height: height.toPercent() }}>
                            <ComposerBadge
                                composer={node.composer}
                                className="composer-card"
                                showLifetime={node.composer.hasKnownLifetime()}
                                onClick={() => openComposerModal(node.composer)}
                            />
                        </div>
                    )}
                    {map.lines.map(({ orientation, x, y, length }) =>     
                        orientation == 'vertical'
                            ? <div style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), height: length.toPercent(), width: 2, backgroundColor: "#bbb" }} />
                            : <div style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), height: 2, width: length.toPercent(), backgroundColor: "#bbb" }} />
                    )}
                </div>
            </div>
        </div>
    )
}

// export default function SuccessionDiagram({ successionTree, successionGroups, openComposerModal }) {
//     const height = 748
//     const width = 1920
//     const nodeHeight = 54
//     const nodeWidth = 280
//     const factor = nodeWidth / nodeHeight
//     const levelGap = 10
//     const levelSeparation = levelGap + nodeHeight
//     const siblingSeparation = 20
//     const subtreeSeparation = 60
//     const lineThickness = 2
//     const lineColor = "#bbb"

//     const vertexMap = new Map()
//     const nodeSizeMap = new Map()
//     successionTree.forEach(node => {
//         vertexMap.set(node.composer.id, node.successors.map(s => s.composer.id))
//         nodeSizeMap.set(node.composer.id, nodeHeight)
//     })
    
//     const treeGraph = new TreeGraph(vertexMap, nodeSizeMap, [successionTree.root.composer.id, { x: height / 2 - 50, y: 0, prelim: 0, mod: 0 }])

//     positionTree(treeGraph, successionTree.root.composer.id, {
//         width: height,
//         height: width,
//         levelSeparation,
//         maxDepth: Infinity,
//         siblingSeparation,
//         subtreeSeparation
//     })

//     const components = []

//     const couperinBrothers = []
//     successionTree.forEach(node => {
//         if ([47, 2, 48].includes(parseInt(node.composer.id))) {
//             couperinBrothers.push(node)
//         }
//     })

//     const couperinBrothersPadding = 15
//     const couperinBrothersColor = "rgb(147 199 163 / 3%)"
//     const couperinLabelHeight = 30
//     const couperinLabelPadding = 8

//     const couperinBrotherCoordinates = couperinBrothers.map(s => {
//         const [y, x] = treeGraph.getCoordinates(s.composer.id)
//         return [x, y]
//     })
//     const minCouperinBrotherCoordinates = couperinBrotherCoordinates.minBy(c => c.y)
//     const maxCouperinBrotherCoordinates = couperinBrotherCoordinates.maxBy(c => c.y)

//     components.push(
//         <div key="coup" style={{ width: nodeWidth + couperinBrothersPadding*2, height: maxCouperinBrotherCoordinates[1] - minCouperinBrotherCoordinates[1] + nodeHeight + couperinBrothersPadding * 2 + couperinLabelHeight - couperinLabelPadding, position: "absolute", left: minCouperinBrotherCoordinates[0]*factor - couperinBrothersPadding, top: minCouperinBrotherCoordinates[1] - couperinBrothersPadding, border: "1px dashed #89b496", backgroundColor: couperinBrothersColor, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: couperinLabelPadding, borderRadius: 5 }} >
//             Братья Куперены
//         </div>
//     )

//     successionTree.forEach(node => {
//         const [y, x] = treeGraph.getCoordinates(node.composer.id)
//         components.push(
//             <div key={node.composer.id} style={{ width: nodeWidth, height: nodeHeight, position: "absolute", left: x * factor, top: y}}>
//                 <ComposerBadge composer={node.composer} className="composer-card" showLifetime={node.composer.hasKnownLifetime()} onClick={() => openComposerModal(node.composer)} />
//             </div>
//         )

//         const successorCoordinates = node.successors.map(s => {
//             const [y, x] = treeGraph.getCoordinates(s.composer.id)
//             return [x, y]
//         })
//         const minSuccessorCoordinates = successorCoordinates.minBy(c => c.y)
//         const maxSuccessorCoordinates = successorCoordinates.maxBy(c => c.y)

//         if (node.successors.length > 0) {
//             components.push(
//                 <div key={node.composer.id + "r"} style={{ height: lineThickness, width: levelGap / 2 * factor, position: "absolute", left: x*factor + nodeWidth, top: y + nodeHeight / 2, backgroundColor: lineColor }} />
//             )
//         }

//         for (const [successorX, successorY] of successorCoordinates) {
//             components.push(
//                 <div key={node.composer.id + "l"} style={{ height: lineThickness, width: levelGap / 2 * factor, position: "absolute", left: successorX*factor - levelGap / 2 * factor, top: successorY + nodeHeight / 2, backgroundColor: lineColor }} />
//             )
//         }

//         if (node.successors.length > 1) {
//             components.push(
//                 <div key={node.composer.id + "v"} style={{ width: lineThickness, height: maxSuccessorCoordinates[1] - minSuccessorCoordinates[1], position: "absolute", left: x*factor + nodeWidth + levelGap / 2 * factor, top: minSuccessorCoordinates[1] + nodeHeight / 2, backgroundColor: lineColor }} />
//             )
//         }
//     })

//     return (
//         <div className="zero-pos stretch" style={{ marginLeft: 200 }}>
//             {components}
//         </div>
//     )
// }