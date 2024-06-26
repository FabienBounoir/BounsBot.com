import { useTranslation } from "react-i18next";

export const InfoDashboard = (props) => {
    const { t } = useTranslation();
    return (
        <div className="infoDashboard" >
            <h1>{t("dashboard.menu.dashboard")}</h1>
            <div className="infoDashboard__content">
                <p>{t("dashboard.info.text1")}</p>
                <p>{t("dashboard.info.text2")}</p>
                <p>{t("dashboard.info.text3")}</p>
                <p>{t("dashboard.info.text4")}</p>
                <p>{t("dashboard.info.text5")}</p>
                <p>{t("dashboard.info.text6")}</p>
                <p>{t("dashboard.info.text7")}</p>
            </div>
        </div>
    )
}


