import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"

import "../styles/displaySettingsPanels.css"
import DisplaySettingsCheckbox from "./DisplaySettingsCheckbox.jsx"

export default function DisplaySettingsPanels({ displaySettings, setDisplaySettings }) {
    const orderSectionRef = useRef()
    const patchSettings = (value) => setDisplaySettings({ ...displaySettings, ...value })

    return (
        <div className="display-settings-panels-container">
            <div>
                <DisplaySettingsPanel>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.lifetimes} onChange={x => patchSettings({ lifetimes: x })}>
                            Годы жизни
                        </DisplaySettingsCheckbox>
                    </section>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.publications} onChange={x => patchSettings({ publications: x })}>
                            Даты издания сборников
                        </DisplaySettingsCheckbox>
                    </section>
                    <CSSTransition in={displaySettings.lifetimes && displaySettings.publications} nodeRef={orderSectionRef} timeout={250} classNames="order-by-section">
                        <div ref={orderSectionRef} className="order-by-section">
                            <hr />
                            <section>
                                <DisplaySettingsCheckbox type="radio" checked={!displaySettings.orderByPublications} onChange={x => patchSettings({ orderByPublications: !x })}>
                                    Упорядочить по годам жизни
                                </DisplaySettingsCheckbox>
                            </section>
                            <section>
                                <DisplaySettingsCheckbox type="radio" checked={displaySettings.orderByPublications} onChange={x => patchSettings({ orderByPublications: x })}>
                                    Упорядочить по датам издания
                                </DisplaySettingsCheckbox>
                            </section>
                        </div>
                    </CSSTransition>
                </DisplaySettingsPanel>
                <DisplaySettingsPanel>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.historicalContext} onChange={x => patchSettings({ historicalContext: x })}>
                            Хронология правителей
                        </DisplaySettingsCheckbox>
                    </section>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.suiteTypes} onChange={x => patchSettings({ suiteTypes: x })}>
                            Модификация сюиты
                        </DisplaySettingsCheckbox>
                    </section>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.generations} onChange={x => patchSettings({ generations: x })}>
                            Поколения композиторов
                        </DisplaySettingsCheckbox>
                    </section>
                </DisplaySettingsPanel>
                <DisplaySettingsPanel>
                    <section>
                        <DisplaySettingsCheckbox checked={displaySettings.succession} onChange={x => patchSettings({ succession: x })}>
                            Преемственность
                        </DisplaySettingsCheckbox>
                    </section>
                </DisplaySettingsPanel>
            </div>
        </div>
    )
}

function DisplaySettingsPanel({ children }) {
    return (
        <div className="display-settings-panel">
            {children}
        </div>
    )
}