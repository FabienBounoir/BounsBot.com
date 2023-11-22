import { Link } from "react-router-dom"
import Avatar from "../avatar/avatar";
import { memo, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

let typeExample = new Map([
    [3, ["Hello-World", "<:PepeEuh:955820244327354389>", "https://www.youtu.be/dQw4w9WgXcQ"]],
    [4, [2, 4, 17, 320, 42, 69, 100]],
    [5, ["true", "false"]],
    [6, ["<@266636247017979904>", "266636247017979904", "<@498592618717118485>", "498592618717118485", "<@&1014168572320305254>", "1014168572320305254", "<@714815862074376253>", "714815862074376253", "<@1014168572320305254>", "1014168572320305254", "<@590590390407528469>", "590590390407528469"]],
    [7, ["<#714815862074376253>", "714815862074376253", "<#1014168572320305254>", "1014168572320305254", "<#590590390407528469>", "590590390407528469"]],
    [8, ["<@&1014168572320305254>", "1014168572320305254", "<@&714815862074376253>", "714815862074376253", "<@&590590390407528469>", "590590390407528469"]],
    [9, ["<@&1014168572320305254>", "<#714815862074376253>", "<@266636247017979904>", "<#498592618717118485>", "<@&1014168572320305254>", "<#824715360057163819>", "<@429621241071140887>", "<#268128835470491648>"]],
    [10, [2, 4, 17, 320, 42, 69, 100, 24, 22, 45, 98, 76]],
    [11, ["image.png", "video.mp4", "audio.mp3"]],
]);


export const Command = memo(({ command }) => {
    const { t } = useTranslation();
    let ref = useRef(null);

    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

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
        if (description.includes("»")) description = description.split("»")[1].trim();
        if (description.includes("|")) description = description.split("|")[1].trim();

        description = description.charAt(0).toUpperCase() + description.slice(1);
    }

    const copyToClipboard = (e) => {
        e.stopPropagation()

        if (category == "context") return
        if (edit) return
        setEdit(true)

        navigator.clipboard.writeText(`/${name.toLowerCase()}`)
        const original = e.target.innerHTML
        e.target.innerHTML = t("commands.copied")
        setTimeout(() => {
            e.target.innerHTML = original
            setEdit(false)
        }, 1000)
    }

    const commandBody = useMemo(() => {
        let usages = []
        let examples = []

        if (elements) {
            let usageArgs = ""
            let exampleArgs = ""
            for (let arg of elements) {
                usageArgs += ` [${arg.required ? '' : '*'}${arg.name}]`

                exampleArgs += ` ${typeExample.has(arg.type) ? typeExample.get(arg.type)[Math.floor(Math.random() * typeExample.get(arg.type).length)] : arg.name}`
            }

            usages.push(`${category != "context" ? "/" : ""}${name.toLowerCase()}${usageArgs}`)
            examples.push(`${category != "context" ? "/" : ""}${name.toLowerCase()}${exampleArgs}`)
        }
        else {
            usages.push(`${category != "context" ? "/" : ""}${name.toLowerCase()}`)
            examples.push(`${category != "context" ? "/" : ""}${name.toLowerCase()}`)
        }

        return (
            <>
                <div className="command-card__body__usage">
                    <h5>{t("commands.usage")}:</h5>
                    <div className="elementBody" onClick={(e) => {
                        copyToClipboard(e)
                    }}>
                        <pre>{usages.join("\n")}</pre>
                    </div>
                </div>
                <div className="command-card__body__examples">
                    <h5>{t("commands.example")}:</h5>
                    <div className="elementBody" onClick={(e) => {
                        copyToClipboard(e)
                    }}>
                        <pre>{examples.join("\n")}</pre>
                    </div>
                </div>
            </>

        );
    }, []);

    return (
        <div className={'command-card__container ' + (open ? 'active' : '')} onClick={() => { setOpen(!open) }}>
            <div className="command-card__header">
                <div>
                    <h5 className="command-card__header__title">{`${name}`} <span>{`${description ? "- " + description : ""}`}</span></h5>
                </div>
                <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
            </div>
            <div className="command-card__body" ref={ref} style={{ maxHeight: open ? contentMaxHeight : 0 }}>
                {commandBody}
            </div>
        </div>
    );
})

export default Command;