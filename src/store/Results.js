import {React, useContext} from "react"
import searchResultsContext from "./SearchResultsContext"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import _ from "lodash"

import BookPreview from "../components/BookPreview"
import BookDetails from "../components/BookDetails"
import Message from "../components/Message"
import Loading from "../components/Loading"
import error404 from "../img/404.jpg"

function Results(props) {
    const SearchResultsContext = useContext(searchResultsContext) //initialize context API with the dedicated Hook
    const searchResults = SearchResultsContext.state.searchResults //isolating data I need commonly
    const isLoading = SearchResultsContext.state.loading //will be used to show the loading animation while API is being called
    let books //initializing books, will be used only if results are not undefined

    //handle cases when there are no search results 
    if (searchResults !== undefined) {
        //iterate over results and returning an object with parsed data
        const bookPreviews = searchResults.map(e => {
            const volumeInfo = e.volumeInfo
            return {
                id: e.id,
                //sometimes the volumes don't have a title or author or image, returning a default in those cases
                title: volumeInfo.title !== undefined
                    ? volumeInfo.title
                    : "No title found",
                author: volumeInfo.authors !== undefined
                    ? volumeInfo
                        .authors
                        .join(", ") //authors is an array, I'm dividing them nicely
                    : "No author found",
                imageLink: volumeInfo.imageLinks !== undefined
                    ? volumeInfo.imageLinks.thumbnail || error404
                    : error404
            }
        })
        //creating an array of React Components to be rendered later
        books = bookPreviews.map(e => <BookPreview key={e.id} info={e}/>)
    }

    return (
        <Router>
            <Switch>
                {/* Rendered at index */}
                <Route exact path="/">
                    {/* rendering animation if app is loading, books array if there are any, or an error string if there are no results*/}
                    {isLoading == false
                        ? searchResults !== undefined
                            ? <div className="books-list">{books}</div>
                            : <Message className="message" text={"No results."}/>
                        : <Loading/>}
                </Route>
                {/* Rendered per book */}
                <Route path={`/books/:id`} component={BookDetails}/>
            </Switch>
        </Router>
    )
}

export default Results