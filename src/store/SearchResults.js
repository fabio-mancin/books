import {React, useState, useEffect, useRef} from 'react'
import SearchResultsContext from './SearchResultsContext';
import Helpers from "./Helpers"
import axios from 'axios'
import _ from 'lodash'

function SearchResults(props) {
    const isInitialMount = useRef(true);

    const [state,
        setState] = useState({
        intitle: "",
        inauthor: "",
        inpublisher: "",
        insubject: "",
        startIndex: 0,
        totalItems: "",
        searchResults: [],
        loading: false
    })

    const onChange = (e) => {
        const value = e.target.value;

        setState({
            ...state,
            [e.target.name]: value
        });
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            (async() => {
                const query = Helpers.makeQuery(state)
                const response = await Helpers.getList(query, state.startIndex)
                setState({
                    ...state,
                    searchResults: response.items,
                    totalItems: response.totalItems,
                    loading: false
                })
            })();
        }
    }, [state.startIndex]);

    const changePage = (operand) => {
        setState({
            ...state,
            loading: true,
            startIndex: Helpers.addOrSubtract(state.startIndex, operand)
        })
    }

    const onClick = () => {

        setState({
            ...state,
            startIndex: 0,
            loading: true
        });

        /*Helpers.getList(Helpers.makeQuery(state), 0).then((response) => {
            setState({
                ...state,
                searchResults: response.items,
                totalItems: response.totalItems,
                loading: false
            })
        })*/

        (async() => {
            const response = await Helpers.getList(Helpers.makeQuery(state), 0)
            setState({
                ...state,
                searchResults: response.items,
                totalItems: response.totalItems,
                loading: false
            })
        })();

    }

    return (
        <SearchResultsContext.Provider
            value={{
            state: state,
            onClick: onClick,
            onChange: onChange,
            changePage: changePage
        }}>
            {props.children}
        </SearchResultsContext.Provider>
    );
}

export default SearchResults