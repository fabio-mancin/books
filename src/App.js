import './styles/App.css';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


import Search from './components/Search'
import Results from './store/Results'
import SearchResults from './store/SearchResults'


import _ from 'lodash'

function App() {
    return (
        <SearchResults>
            <div className="app">
                <Search />
                <Results />
            </div>
        </SearchResults>
    );
}

export default App;
