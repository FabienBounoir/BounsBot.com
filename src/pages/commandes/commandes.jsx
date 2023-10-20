import "./_commandes.css";
import commandList from "./../../components/command.json"
import React, { useEffect, useState, useRef } from "react";
import Command from "../../components/command/command";
import CommandSqueleton from "../../components/command/commandSqueleton";
import MenuSqueleton from "../../components/command/MenuSqueleton";
import * as commandsAPI from "../../utils/API/commandsAPI"
import { useTranslation } from "react-i18next";

export const Commandes = () => {
    const { t } = useTranslation();

    const [commands, setCommands] = useState([])
    const [displayedCommands, setDisplayedCommands] = useState([])
    const [menu, setMenu] = useState([])
    const [selectedMenu, setSelectedMenu] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        getCommands()
    }, [])

    const getCommands = async () => {
        try {
            const commandsObject = await commandsAPI.get() // await fetch(`${process.env.REACT_APP_HOSTNAME_BACKEND}/commands`).then(res => res.json())

            let commands = commandsObject.commands
            let commandLocaleLanguage = []

            let index = 0

            for (let command of commands) {
                let name = ""
                let description = ""
                let elements = []

                if (command.options && command.options.length > 0 && (command.options.find(o => o.type == 1 || o.type == 2))) {
                    let argsElement = []

                    for (let options of command.options) {
                        if (options.type == 1) {
                            argsElement = []
                            let name = ""
                            let description = ""

                            if (command.name_localizations) {
                                let languageName = command.name_localizations[navigator.language] || command.name_localizations[navigator.language.split("-")[0]] || command.name_localizations[navigator.language?.toLowerCase()] || command.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                name = (languageName || command.name)
                            }
                            else {
                                name = command.name
                            }

                            if (options.name_localizations) {
                                let languageOptionsName = options.name_localizations[navigator.language] || options.name_localizations[navigator.language.split("-")[0]] || options.name_localizations[navigator.language?.toLowerCase()] || options.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                name += " " + (languageOptionsName || options.name)
                            }
                            else {
                                name += " " + options.name
                            }

                            if (options.description_localizations) {
                                let languageOptionsDescription = options.description_localizations[navigator.language] || options.description_localizations[navigator.language.split("-")[0]] || options.description_localizations[navigator.language?.toLowerCase()] || options.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                                if (languageOptionsDescription) {
                                    description = languageOptionsDescription
                                }
                                else {
                                    description = options.description
                                }
                            }
                            else {
                                description = options.description
                            }

                            for (let option of options.options) {
                                let optionName = option.name
                                let optionDescription = option.description

                                if (option.name_localizations && navigator.language) {
                                    let languageName = option.name_localizations[navigator.language] || option.name_localizations[navigator.language.split("-")[0]] || option.name_localizations[navigator.language?.toLowerCase()] || option.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                    if (languageName) {
                                        optionName = languageName
                                    }
                                }


                                if (option.description_localizations && navigator.language) {
                                    let languageDescription = option.description_localizations[navigator.language] || option.description_localizations[navigator.language.split("-")[0]] || option.description_localizations[navigator.language?.toLowerCase()] || option.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                                    if (languageDescription) {
                                        optionDescription = languageDescription
                                    }
                                }

                                argsElement.push({ name: optionName, description: optionDescription, type: option.type, required: option.required })
                            }

                            commandLocaleLanguage.push({ name, description, type: options.type, required: options.required, elements: argsElement, category: command.category, index })
                            index++
                        }
                        else if (options.type == 2) {
                            argsElement = []
                            let name = ""
                            let description = ""

                            if (command.name_localizations) {
                                let languageName = command.name_localizations[navigator.language] || command.name_localizations[navigator.language.split("-")[0]] || command.name_localizations[navigator.language?.toLowerCase()] || command.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                name = (languageName || command.name)
                            }
                            else {
                                name = command.name
                            }

                            if (options.name_localizations) {
                                let languageOptionsName = options.name_localizations[navigator.language] || options.name_localizations[navigator.language.split("-")[0]] || options.name_localizations[navigator.language?.toLowerCase()] || options.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                name += " " + (languageOptionsName || options.name)
                            }
                            else {
                                name += " " + options.name
                            }

                            let commandSubGroupName = name

                            for (let optionSub of options.options) {

                                if (optionSub.name_localizations) {
                                    let languageOptionsSubName = optionSub.name_localizations[navigator.language] || optionSub.name_localizations[navigator.language.split("-")[0]] || optionSub.name_localizations[navigator.language?.toLowerCase()] || optionSub.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                    name = commandSubGroupName + " " + (languageOptionsSubName || optionSub.name)
                                }
                                else {
                                    name = commandSubGroupName + " " + optionSub.name
                                }

                                if (optionSub.description_localizations) {
                                    let languageOptionsDescription = optionSub.description_localizations[navigator.language] || optionSub.description_localizations[navigator.language.split("-")[0]] || optionSub.description_localizations[navigator.language?.toLowerCase()] || optionSub.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                                    if (languageOptionsDescription) {
                                        description = languageOptionsDescription
                                    }
                                    else {
                                        description = optionSub.description
                                    }
                                }
                                else {
                                    description = optionSub.description
                                }

                                if (optionSub) {
                                    for (let option of optionSub.options) {
                                        let optionName = option.name
                                        let optionDescription = option.description

                                        if (option.name_localizations && navigator.language) {
                                            let languageName = option.name_localizations[navigator.language] || option.name_localizations[navigator.language.split("-")[0]] || option.name_localizations[navigator.language?.toLowerCase()] || option.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                            if (languageName) {
                                                optionName = languageName
                                            }
                                        }


                                        if (option.description_localizations && navigator.language) {
                                            let languageDescription = option.description_localizations[navigator.language] || option.description_localizations[navigator.language.split("-")[0]] || option.description_localizations[navigator.language?.toLowerCase()] || option.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                                            if (languageDescription) {
                                                optionDescription = languageDescription
                                            }
                                        }

                                        argsElement.push({ name: optionName, description: optionDescription, type: option.type, required: option.required })
                                    }
                                }
                                commandLocaleLanguage.push({
                                    name, description, type: options.type, required: options.required, elements: argsElement, category: command.category, index
                                })
                                index++
                            }
                        }
                    }
                }
                else {
                    name = command.name
                    description = command.description

                    if (command.name_localizations && navigator.language) {
                        let languageName = command.name_localizations[navigator.language] || command.name_localizations[navigator.language.split("-")[0]] || command.name_localizations[navigator.language?.toLowerCase()] || command.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                        if (languageName) {
                            name = languageName
                        }
                    }

                    if (command.description_localizations && navigator.language) {
                        let languageDescription = command.description_localizations[navigator.language] || command.description_localizations[navigator.language.split("-")[0]] || command.description_localizations[navigator.language?.toLowerCase()] || command.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                        if (languageDescription) {
                            description = languageDescription
                        }
                    }

                    if (command.options) {
                        for (let option of command.options) {
                            let optionName = option.name
                            let optionDescription = option.description

                            if (option.name_localizations && navigator.language) {
                                let languageName = option.name_localizations[navigator.language] || option.name_localizations[navigator.language.split("-")[0]] || option.name_localizations[navigator.language?.toLowerCase()] || option.name_localizations[navigator.language.split("-")[0].toLowerCase()]

                                if (languageName) {
                                    optionName = languageName
                                }
                            }


                            if (option.description_localizations && navigator.language) {
                                let languageDescription = option.description_localizations[navigator.language] || option.description_localizations[navigator.language.split("-")[0]] || option.description_localizations[navigator.language?.toLowerCase()] || option.description_localizations[navigator.language.split("-")[0].toLowerCase()]

                                if (languageDescription) {
                                    optionDescription = languageDescription
                                }
                            }

                            elements.push({ name: optionName, description: optionDescription, type: option.type, required: option.required })
                        }
                    }

                    commandLocaleLanguage.push({
                        name, description, elements, category: command.category, index
                    })
                    index++
                }
            }

            commandLocaleLanguage = commandLocaleLanguage.sort((a, b) => { return a.name.localeCompare(b.name) })

            setDisplayedCommands(commandLocaleLanguage)
            setCommands(commandLocaleLanguage)
            setMenu(["All", ...commandsObject.menu.map(m => m.value)])
        }
        catch (e) {
            console.log("ERROR WHEN LOADING COMMANDS", e)
        }
    }

    function selectType(type) {
        setSelectedMenu(type)

        setSearchQuery("")

        if (type === "All") return setDisplayedCommands(commands)
        else setDisplayedCommands(commands.filter(command => command.category === type))
    }

    function search(e) {
        let query = e.target.value
        setSearchQuery(query)

        let commandsSearch = []

        if (selectedMenu !== "All") {
            commandsSearch = commands.filter(command => command.category === selectedMenu)
        }
        else {
            commandsSearch = commands
        }

        if (e.target.value !== "") {
            commandsSearch = commandsSearch.filter(command =>
                command.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                command?.description?.toLowerCase()?.includes(e.target.value.toLowerCase())
            )
        }

        setDisplayedCommands(commandsSearch)
    }

    return (
        <div transition="page" className="commands-list" >
            <div className="top">
                <h1>{t("title.commands")}</h1>
                <div className="search search-bar" data-v-7085cbe2=""></div>
            </div>
            <>
                <div className="command__input">
                    <input type="text" placeholder={t("commands.search_command")} onChange={(e) => search(e)} value={searchQuery} />
                    <p className="fa-solid fa-magnifying-glass">
                        <svg width="25" height="25" viewBox="0 0 298 298" xmlns="http://www.w3.org/2000/svg">
                            <path d="M230.942 199.589C239.601 208.247 239.601 222.284 230.942 230.943C222.285 239.601 208.248 239.6 199.59 230.943L149.494 180.847C140.837 172.189 140.835 158.152 149.493 149.494C158.152 140.835 172.189 140.836 180.848 149.494L230.942 199.589Z" fill="var(--color-principal-hover)" />
                            <path d="M201.39 100.695C201.39 156.307 156.307 201.39 100.695 201.39C45.0827 201.39 0 156.307 0 100.695C0 45.0827 45.0827 0 100.695 0C156.307 0 201.39 45.0827 201.39 100.695ZM35.8068 100.695C35.8068 136.532 64.8582 165.583 100.695 165.583C136.532 165.583 165.583 136.532 165.583 100.695C165.583 64.8582 136.532 35.8068 100.695 35.8068C64.8582 35.8068 35.8068 64.8582 35.8068 100.695Z" fill="var(--color-principal)" />
                            <path d="M186.271 233.504C173.227 220.462 173.227 199.313 186.271 186.27C199.314 173.226 220.461 173.227 233.505 186.27L288.105 240.871C301.149 253.914 301.149 275.061 288.105 288.105C275.063 301.148 253.915 301.148 240.871 288.105L186.271 233.504Z" fill="var(--color-principal)" />
                        </svg>
                    </p>
                </div>

                <div className="crtl">
                    <ul role="tablist" className="nav-pills commands-pills mb-20" id="myTabs_6">
                        {(() => {
                            let typesList = [];

                            if (menu.length === 0) {
                                for (let i = 0; i < 15; i++) {
                                    typesList.push(<MenuSqueleton key={i} />)
                                }
                            }

                            for (let type of menu) {
                                typesList.push(<li key={type} className={"btnSearch btn-commands-category " + (selectedMenu === type ? "active" : "")} onClick={() => { selectType(type) }} >{type}</li>)
                            }
                            return typesList;
                        })()}
                    </ul>
                </div>

                <div className="commands-listing">
                    {(() => {
                        let commandListing = [];

                        if (displayedCommands.length === 0 && commands.length > 0) commandListing.push(<div className="no-result">Aucun résultat</div>)
                        else if (commands.length === 0) {
                            for (let i = 0; i < 10; i++) {
                                commandListing.push(
                                    <CommandSqueleton
                                        key={i}
                                    />)
                            }
                        }
                        else {
                            for (let command of displayedCommands) {
                                commandListing.push(
                                    <Command
                                        key={command.index}
                                        command={command}
                                    />
                                );
                            }
                        }
                        return commandListing;
                    })()}

                </div>
            </>
        </div >
    )
}
