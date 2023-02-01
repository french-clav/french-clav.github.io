import React from "react"
import ComposerBadge from "../ComposerBadge.jsx"
import "../../styles/successionDiagram/treeNode.css"

export default function TreeNode({ node, openComposerModal, isChild, isLeft, isRight }) {
    const linesColor = "#ccc"
    const linesThickness = 2

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {isChild &&
                <>
                    {!isLeft && <div style={{ width: "50%", height: linesThickness, backgroundColor: linesColor, zIndex: -1, position: "absolute", top: 0, left: 0 }} />}
                    {!isRight && <div style={{ width: "50%", height: linesThickness, backgroundColor: linesColor, zIndex: -1, position: "absolute", top: 0, right: 0 }} />}
                    <div style={{ width: linesThickness, height: 20, backgroundColor: linesColor, zIndex: -1 }} />
                </>
            }
            <div style={{ width: "auto", maxWidth: 110, marginLeft: 10, marginRight: 10 }}>
                <ComposerBadge composer={node.composer} className="composer-card succession-tree-node" onClick={() => openComposerModal(node.composer)} showLifetime />
            </div>
            {node.successors.length > 0 &&
                <>
                    <div style={{ width: linesThickness, height: 20, backgroundColor: linesColor, zIndex: -1 }} />
                    <div style={{ display: "flex" }}>
                        {node.successors.map((successorNode, i) => (
                            <TreeNode key={successorNode.composer.name} node={successorNode} openComposerModal={openComposerModal} isChild isLeft={i === 0} isRight={i === node.successors.length - 1} />
                        ))}
                    </div>
                </>
            }
        </div>
    )
}