import {React, useEffect, useState} from "react"
import {BrowserRouter as Route, Link, useParams} from "react-router-dom";
import {Button} from 'react-bootstrap'
import Book from "./Book.js"
import Loading from "./Loading"
import Helpers from "../store/Helpers"

function BookDetails(props) {
    const {id} = useParams()
    const [state,
        setState] = useState({volumeInfo: ""})

    useEffect(() => {

        (async() => {
            const volumeInfo = await Helpers.getId(id)
            setState({
                ...state,
                volumeInfo: volumeInfo
            });
        })();

    }, []);

    return (
        <div className="book">
            <Link to="/">
                <Button variant="info" className="back-button">
                    Back
                </Button>
            </Link>
            {state.volumeInfo !== ""
                ? <Book info={state.volumeInfo}/>
                : <Loading/>}
        </div>
    );
}

export default BookDetails