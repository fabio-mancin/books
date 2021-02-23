import {React, useState} from 'react'
import SearchResultsContext from './SearchResultsContext';
import axios from 'axios'
import _ from 'lodash'

function SearchResults(props) {
    const defaultState = {
        intitle: "",
        inauthor: "",
        inpublisher: "",
        insubject: "",
        searchResults: [],
        loading: false
    }

    const [state,
        setState] = useState(defaultState)

    const onChange = (e) => {
        const value = e.target.value;

        setState({
            ...state,
            [e.target.name]: value
        });
    }

    const onClick = () => {
        let query = ""

        setState({
            ...defaultState,
            loading: true
        });

        for (let key in state) {
            if (state[key] !== "" && key !== "searchResults" && key !== "loading") 
                query += `+${key}:${state[key]}`
        }
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.substring(1)}`, {
                params: {
                    key: process.env.REACT_APP_API_KEY
                }
            })
            .then(function (response) {
                const items = _.get(response, "data.items")
                setState({
                    ...state,
                    searchResults: items,
                    loading: false
                });
            })
            .catch(function (error) {
                console.error(error);
            });
        query = ""
    }
    return (
        <SearchResultsContext.Provider
            value={{
            state: state,
            onClick: onClick,
            onChange: onChange
        }}>
            {props.children}
        </SearchResultsContext.Provider>
    );
}

export default SearchResults