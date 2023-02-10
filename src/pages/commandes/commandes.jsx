import "./_commandes.css";
import commandList from "./../../components/command.json"
import React, { useEffect, useState, useRef } from "react";

export const Commandes = () => {
    const [configuration, setConfiguration] = useState({
        commands: [],
        types: [],
        activeType: "Tout",
        query: ""
    })

    useEffect(() => {
        let types = ["Tout"];
        for (let command of commandList.commands) {
            command.open = false
            if (!types.includes(command.type)) {
                types.push(command.type)
            }
        }
        setConfiguration({ ...configuration, commands: commandList.commands, types })

    }, [])

    const filteredCommands = () => {
        let commands = configuration.commands.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        if (configuration.activeType !== "Tout") {
            commands = commands.filter(command => command.type === configuration.activeType)
        }
        if (configuration.query) {
            commands = commands.filter(command =>
                command.name.toLowerCase().includes(configuration.query.toLowerCase()) ||
                command.description.toLowerCase().includes(configuration.query.toLowerCase())
            )
        }
        return commands;
    };

    function openCommand(index) {
        console.log(index)
        let commands = configuration.commands
        commands[index].open = !commands[index].open

        setConfiguration({ ...configuration, commands })
    }

    function selectType(type) {
        let commands = configuration.commands
        for (let command of commands) {
            command.open = false
        }

        setConfiguration({ ...configuration, activeType: type, commands })
    }

    function search(e) {
        let query = e.target.value
        let commands = configuration.commands
        for (let command of commands) {
            command.open = false
        }

        setConfiguration({ ...configuration, query, commands, activeType: "Tout" })
    }

    return (
        <div transition="page" className="commands-list" >
            <div className="top">
                <h1>COMMANDES</h1>
                <div className="search search-bar" data-v-7085cbe2=""></div>
            </div>
            <>
                <div className="command__input">
                    <input type="text" placeholder="Rechercher une commande" onChange={(e) => search(e)} />
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
                            for (let type of configuration.types) {
                                typesList.push(<li key={type} className={"btnSearch btn-commands-category " + (configuration.activeType === type ? "active" : "")} onClick={() => { selectType(type) }} >{type}</li>)
                            }
                            return typesList;
                        })()}
                    </ul>
                </div>

                <div className="commands-listing">
                    {(() => {
                        let commandListing = [];
                        let commands = filteredCommands();

                        if (commands.length === 0) commandListing.push(<div className="no-result">Aucun résultat</div>)

                        for (let [index, command] of commands.entries()) {
                            commandListing.push(
                                <Command
                                    key={index}
                                    command={command}
                                    onClick={() => openCommand(index)}
                                />
                            );
                        }
                        return commandListing;
                    })()}

                </div>
            </>
        </div >
    )
}

const Command = ({ command, onClick }) => {
    let ref = useRef(null);

    const [contentMaxHeight, setContentMaxHeight] = useState(0);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (command.open) {
    //         ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }
    // }, [command.open]);

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


    return (
        <div className={'command-card__container ' + (open ? 'active' : '')} onClick={() => { setOpen(!open) }}>
            <div className="command-card__header">
                <div>
                    <h5 className="command-card__header__title">{`${(command.name + "").charAt().toUpperCase()}${(command.name + "").substring(1)}`} <span>- {`${(command.description + "").charAt().toUpperCase()}${(command.description + "").substring(1)}`}</span></h5>
                </div>
                <svg className="arrow" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30.021 30.021"><path d="M29.069,22.276c-0.791,0.932-1.917,1.409-3.052,1.409c-0.913,0-1.834-0.312-2.587-0.949l-8.42-7.152l-8.42,7.151 c-1.683,1.43-4.208,1.225-5.639-0.459c-1.43-1.686-1.224-4.208,0.46-5.64l11.01-9.351c1.493-1.269,3.686-1.269,5.178,0 l11.011,9.351C30.294,18.068,30.499,20.591,29.069,22.276z" fill="var(--color-principal)" /></svg>
            </div>

            <div className="command-card__body" ref={ref} style={{ maxHeight: open ? contentMaxHeight : 0 }}>
                <div className="command-card__body__usage">
                    <h5>Utilisation:</h5>
                    <div className="elementBody">
                        {(() => {
                            return <pre >{command.usages.join("\n")}</pre>
                        })()}
                    </div>
                </div>
                <div className="command-card__body__examples">
                    <h5>Exemples:</h5>
                    <div className="elementBody">
                        {(() => {
                            return <pre>{command.examples.join("\n")}</pre>
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}
