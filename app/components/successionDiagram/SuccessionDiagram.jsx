import React from "react"
import TreeNode from "./TreeNode.jsx"

export default function SuccessionDiagram({ successionTree, openComposerModal }) {
    return (
        <div className="zero-pos stretch xy-centerer">
            <div style={{ maxWidth: "90%" }}>
                <TreeNode node={successionTree.root} openComposerModal={openComposerModal} />
            </div>
        </div>
    )
}