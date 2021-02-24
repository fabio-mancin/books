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
        startIndex: 0,
        totalItems: "",
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

    const nextPage = () => {
        setState({
            ...state,
            startIndex: state.startIndex+=10
        });
        
        onClick()
    }

    const onClick = () => {
        let query = ""

        setState({
            ...defaultState,
            loading: true
        });

        for (let key in state) {
            if (state[key] !== "" && key !== "searchResults" && key !== "loading" && key !== "startIndex" && key !== "totalItems") 
                query += `+${key}:${state[key]}`
        }
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.substring(1)}&startIndex=${state.startIndex}`, {
            params: {
                key: process.env.REACT_APP_API_KEY
            }
        })
        .then(function (response) {
            const result = _.get(response, "data")
            setState({
                ...state,
                searchResults: result.items,
                totalItems: result.totalItems,
                loading: false,
            })
            console.log(result)
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
                    onChange: onChange,
                    nextPage: nextPage
                }}>
            {props.children}
        </SearchResultsContext.Provider>
    );
}

export default SearchResults