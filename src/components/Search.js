import {React, useContext, useState} from "react"
import searchResultsContext from "../store/SearchResultsContext"
import {Form, Button, Collapse} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import {divide} from "lodash"

function Search(props) {

    const SearchResultsContext = useContext(searchResultsContext)
    
    const [open,
        setOpen] = useState(false);

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
                <Button onClick={SearchResultsContext.onClick}>
                    <FontAwesomeIcon icon={faSearch}/>
                    <span>
                        Search</span>
                </Button>
                <Button
                    className="collapse-button"
                    variant="secondary"
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-container"
                    aria-expanded={open}>
                    {open === true
                        ? "Basic Search"
                        : "Advanced Search"}
                </Button>
                {(parseInt(SearchResultsContext.state.totalItems) - parseInt(SearchResultsContext.state.startIndex) <= 10)
                    ? ""
                    : <Button variant="warning" onClick={SearchResultsContext.nextPage}>
                        Next
                    </Button>}

            </div>
        </Form>
    )
}

export default Search