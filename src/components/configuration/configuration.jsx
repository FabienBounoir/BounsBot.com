import Fetch from "../../utils/fetch.js"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import "./_configuration.css";

export const Configuration = () => {
    const { id, typeconfig } = useParams();

    //juste when the component is mounted
    useEffect(() => {

    }, [])


    return (<>
        <div className="configuration_list">

        </div>
        <div className="config">

        </div>
    </>
    )
}



