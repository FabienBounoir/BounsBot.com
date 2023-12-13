
import { useState, useEffect, useRef } from "react"
import Avatar from "../avatar/avatar";
import LoadingComponent from "../loading/LoadingComponent.jsx";
import { Form } from 'react-bootstrap/'
import { useTranslation } from "react-i18next";

export const Rename = ({ guildId, loading, configuration, setConfiguration }) => {
    const { t } = useTranslation();

    return (
        <>
            {["ERROR", "LOADING"].includes(loading) ? <LoadingComponent error={loading == "ERROR"} errorMessage="Une erreur est survenue lors du chargement des données." /> :
                <div className={"block automargin padding-1 heightMax" + (!configuration?.rename ? " disabled" : "")}>
                    <div className="infoActive">
                        <h5>{t("dashboard.nickname.category")}</h5>
                        <Form.Check className="picto" type="switch" id="custom-switch success" checked={configuration.rename} onChange={(e) => { setConfiguration({ ...configuration, rename: e.target.checked }) }} />
                    </div>

                    <div className="separator"></div>

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>{t("dashboard.nickname.acceptNickname")}</h6>
                        <div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="IntentionallyTopList"
                                    value={true}
                                    checked={configuration?.renameConfig?.RemoveIntentionallyTopList == true}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, RemoveIntentionallyTopList: true } }) }}
                                />
                                <label>{t("dashboard.nickname.authorizedUpperOtherMember")}</label>
                            </div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="IntentionallyTopList"
                                    value={false}
                                    checked={configuration?.renameConfig?.RemoveIntentionallyTopList == false}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, RemoveIntentionallyTopList: false } }) }}
                                />
                                <label>{t("dashboard.nickname.notAuthorizedUpperOtherMember")}</label>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>{t("dashboard.nickname.verificationNickname")}</h6>
                        <div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="verificationType"
                                    value={"EASY_CHECK"}
                                    checked={configuration?.renameConfig?.wordsCheckType == "EASY_CHECK"}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsCheckType: "EASY_CHECK" } }) }}
                                />
                                <label>{t("dashboard.nickname.lightChecking")}</label>
                            </div>
                            <div className="radioButton">

                                <input
                                    type="radio"
                                    name="verificationType"
                                    value={"HARD_CHECK"}
                                    checked={configuration?.renameConfig?.wordsCheckType == "HARD_CHECK"}
                                    onChange={(e) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsCheckType: "HARD_CHECK" } }) }}
                                />
                                <label>{t("dashboard.nickname.heavyChecking")}</label>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className={"informationConfig xpConfigType radioComponent"}>
                        <h6>{t("dashboard.nickname.wordUnauthorized")}</h6>

                        <Form.Control
                            style={{ "max-width": "530px" }}
                            as="textarea"
                            rows={3}
                            placeholder="wumpus,discord,fortnite,..."
                            disabled={!configuration?.rename}
                            value={configuration?.renameConfig?.wordsList}
                            onChange={(event) => { setConfiguration({ ...configuration, renameConfig: { ...configuration.renameConfig, wordsList: event.target.value.split(",").map(str => str.trim()) } }) }}
                        />
                    </div>
                </div>}
        </>
    )
}


