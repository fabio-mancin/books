import {React, useEffect, useState} from "react"
import {BrowserRouter as Route, Link, useParams} from "react-router-dom";
import axios from "axios"
import _ from "lodash"
import {Button} from 'react-bootstrap'
import Book from "./Book.js"
import Message from "./Message"
import Loading from "./Loading"

function BookDetails(props) {
    const {id} = useParams()
    const [state,
        setState] = useState({volumeInfo: ""})

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
                params: {
                    key: process.env.REACT_APP_API_KEY
                }
            })
            .then(function (response) {
                const volumeInfo = _.get(response, "data.volumeInfo")
                setState({
                    ...state,
                    volumeInfo: volumeInfo
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    return (
        <div className="book">
            <Link to="/">
                <Button 
                    variant="info"
                    className="back-button">
                    Back
                </Button>
            </Link>
            {state.volumeInfo !== ""
                ? <Book info={state.volumeInfo}/>
                : <Loading />}
        </div>
    );
}

export default BookDetails