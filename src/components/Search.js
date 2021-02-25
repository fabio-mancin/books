import {React, useContext, useState} from "react"
import {useMediaQuery} from 'react-responsive'
import {Form, Button, Collapse} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'

import Message from './Message'
import SearchButtons from "./SearchButtons"

import searchResultsContext from "../store/SearchResultsContext"

//renders the form
function Search() {

    const SearchResultsContext = useContext(searchResultsContext)

    const [open,
        setOpen] = useState(false);

    const isMobile = useMediaQuery({query: '(max-device-width: 600px)'})

    return (

        <Form className="form">
            <Message className="message" text={"Search something in Google Books!"}/>

            <Form.Group>
                <Form.Label>Title:
                </Form.Label>
                <Form.Control
                    type="text"
                    name="intitle"
                    value={SearchResultsContext.intitle}
                    onChange={SearchResultsContext.onChange}
                    placeholder="Enter title"/>
                <Collapse in={open}>
                    <div id="collapse-container">
                        <Form.Label>Author:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="inauthor"
                            value={SearchResultsContext.inauthor}
                            onChange={SearchResultsContext.onChange}
                            placeholder="Enter author"/>

                        <Form.Label>Publisher:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="inpublisher"
                            value={SearchResultsContext.inpublisher}
                            onChange={SearchResultsContext.onChange}
                            placeholder="Enter publisher"/>

                        <Form.Label>Subject:
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="insubject"
                            value={SearchResultsContext.insubject}
                            onChange={SearchResultsContext.onChange}
                            placeholder="Enter subject"/>
                    </div>
                </Collapse>
            </Form.Group>
            <div className="search-buttons">
                <Button
                    className="collapse-button"
                    variant="secondary"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-container"
                    aria-expanded={open}>
                    {open === true
                        ? isMobile ? <FontAwesomeIcon icon={faCaretUp}/> : "Basic Search" 
                        : isMobile ? <FontAwesomeIcon icon={faCaretDown}/> : "Advanced Search" }
                </Button>
                <SearchButtons/>
            </div>
        </Form>
    )
}

export default Search