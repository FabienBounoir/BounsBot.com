import { Link } from "react-router-dom"
import Avatar from "../avatar/avatar";
import { useEffect, useState } from "react";
import { useRef } from "react";

export const Command = ({ command, onClick }) => {
    let ref = useRef(null);

    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function calContentMaxHeight() {
            ref.current != null && setContentMaxHeight(ref.current.scrollHeight);

        }
        calContentMaxHeight();
        window.addEventListener('resize', calContentMaxHeight);

        return () => {
            window.removeEventListener('resize', calContentMaxHeight);
        }
    }, [contentMaxHeight, ref]);

    let { name, description, category, elements } = command;

    name = name.charAt(0).toUpperCase() + name.slice(1);


    if (category != "context") {
        if (description.includes("»")) {
            description = description.split("»")[1].trim();
        }

        if (description.includes("|")) {
            description = description.split("|")[1].trim();
        }

        description = description.charAt(0).toUpperCase() + description.slice(1);
    }

    let usages = []
    let examples = []

    if (elements) {
        let elementsArgs = ""
        for (let arg of elements) {
            elementsArgs += ` [${arg.required ? '' : '*'}${arg.name}]`
        }

        usages.push(`/${name.toLowerCase()}${elementsArgs}`)
        examples.push(`/${name.toLowerCase()}${elementsArgs}`)
    }
    else {
        usages.push(`/${name.toLowerCase()}`)
        examples.push(`/${name.toLowerCase()}`)
    }

    return (
        <div className={'command-card__container ' + (open ? 'active' : '')} onClick={() => { setOpen(!open) }}>
            <div className="command-card__header">
                <div>
                    <h5 className="command-card__header__title">{`${name}`} <span>{`${description ? "- " + description : ""}`}</span></h5>
                </div>
                <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
            </div>

            <div className="command-card__body" ref={ref} style={{ maxHeight: open ? contentMaxHeight : 0 }}>
                <div className="command-card__body__usage">
                    <h5>Utilisation:</h5>
                    <div className="elementBody">
                        {(() => {
                            return <pre >{usages.join("\n")}</pre>
                        })()}
                    </div>
                </div>
                <div className="command-card__body__examples">
                    <h5>Exemples:</h5>
                    <div className="elementBody">
                        {(() => {
                            return <pre>{examples.join("\n")}</pre>
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Command;