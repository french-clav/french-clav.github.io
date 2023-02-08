import React from "react"
import SuccessionTreePositioner from "../../features/successionTreePositioner.js"
import ComposerBadge from "../ComposerBadge.jsx"
import "../../styles/successionDiagram/successionDiagram.css"
import BoundingBox from "../../util/boundingBox.js"

export default function SuccessionDiagram({ successionTree, successionGroups, openComposerModal }) {
    const positioner = new SuccessionTreePositioner({
        orientation: "horizontal",
        nodeWidth: 280,
        nodeHeight: 54,
        levelSeparation: 50,
        siblingSeparation: 20,
        subtreeSeparation: 60
    })

    const blueprint = positioner.position(successionTree)

    const groupBoxes = successionGroups.map(g => ({
        group: g,
        box: BoundingBox.unionAll(blueprint
                .nodePlaces
                .filter(n => g.composers.includes(n.node.composer))
                .map(({ x, y, width, height }) => new BoundingBox(x, y, width, height))
            )
            .offset(0.01)
            .offsetTop(0.02)
            .offsetBottom(0.05)
    }))

    return (
        <div className="zero-pos xy-centerer">
            <div className="succession-diagram-container">
                <div className="stretch relative">
                    {blueprint.lines.map(({ orientation, x, y, length }, idx) =>
                        orientation == 'vertical'
                            ? <div key={idx} style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), height: length.toPercent(), width: 2, backgroundColor: "#bbb" }} />
                            : <div key={idx} style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), height: 2, width: length.toPercent(), backgroundColor: "#bbb" }} />
                    )}
                    {groupBoxes.map(({ group, box }) =>
                        <div key={group.name} style={{
                            position: "absolute",
                            left: box.x.toPercent(),
                            top: box.y.toPercent(),
                            width: box.width.toPercent(),
                            height: box.height.toPercent(),
                            border: "1px dashed #89b496",
                            backgroundColor: "rgb(147 199 163 / 3%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingBottom: 8,
                            borderRadius: 5
                        }}>
                            {group.name}
                        </div>
                    )}
                    {blueprint.nodePlaces.map(({ node, x, y, width, height }) =>
                        <div key={node.composer.id} style={{ position: "absolute", left: x.toPercent(), top: y.toPercent(), width: width.toPercent(), height: height.toPercent() }}>
                            <ComposerBadge
                                composer={node.composer}
                                className="composer-card"
                                showLifetime={node.composer.hasKnownLifetime()}
                                onClick={() => openComposerModal(node.composer)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}