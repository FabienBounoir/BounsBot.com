
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap/'
import Avatar from "../../components/avatar/avatar";

import LoadingComponent from "../loading/LoadingComponent.jsx";


export const Musique = (props) => {
    const [loading, setLoading] = useState(false)

    return (
        <>
            {loading ? <LoadingComponent /> :
                ""
            }
        </>
    )
}


