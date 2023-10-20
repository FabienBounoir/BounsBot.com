import React from 'react';
import "./_gainRolesLevels.css";
import { useTranslation } from 'react-i18next';

function GainRolesLevels(props) {
    const { t } = useTranslation();

    return (<div className="rolesInfo">
        <h1>{t("levels.role_rewards")}</h1>
        <div>
            <div className="borderTop"></div>
            {(() => {
                let roles = [];

                if (props.levelsRole) {
                    for (let i = 0; i < props.levelsRole.length; i++) {
                        roles.push(
                            <div className="roleInfo" id={props.levelsRole[i].role.id}>
                                <h5>{t("levels.level_number", { level: props.levelsRole[i].level })}</h5>
                                <div className="roleRender">
                                    <span style={{ background: `${props.levelsRole[i].role.color}` }}></span>
                                    <div>{props.levelsRole[i].role.name ? (props.levelsRole[i].role.name.length > 35 ? (props.levelsRole[i].role.name.substring(0, 32) + "...") : (props.levelsRole[i].role.name)) : ("")}</div>
                                </div>
                            </div>
                        )
                    }
                }

                return roles;
            })()}

        </div>
    </div>
    );
}

export default GainRolesLevels;
