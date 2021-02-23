import {React, useContext} from "react"
import searchResultsContext from "./SearchResultsContext"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import _ from "lodash"

import BookPreview from "../components/BookPreview"
import BookDetails from "../components/BookDetails"
import Loading from "../components/Loading"
import error404 from "../img/404.jpg"

function Results(props) {

    const SearchResultsContext = useContext(searchResultsContext)

    const searchResults = SearchResultsContext
        .state
        .searchResults
        .map(e => {
            const volumeInfo = e.volumeInfo
            return {
                id: e.id,
                title: volumeInfo.title !== undefined ? volumeInfo.title : "No title found",
                author: volumeInfo.authors !== undefined ? volumeInfo.authors.join(", ") : "No author found",
                imageLink: volumeInfo.imageLinks !== undefined ? volumeInfo.imageLinks.thumbnail || error404 : error404
            }
        })

    const isLoading = SearchResultsContext.state.loading

    const books = searchResults.map(e => <BookPreview key={e.id} info={e}/>)

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {isLoading == false
                        ? <div className="books-list">{books}</div>
                        : <Loading/>}
                </Route>
                <Route path={`/books/:id`} component={BookDetails}/>
            </Switch>
        </Router>
    )
}

export default Results