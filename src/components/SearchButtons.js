import {React, useContext} from "react"
import searchResultsContext from "../store/SearchResultsContext"
import {Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faForward, faBackward} from '@fortawesome/free-solid-svg-icons'
import {useMediaQuery} from 'react-responsive'

const SearchButtons = () => {
    const SearchResultsContext = useContext(searchResultsContext)
    //hacky way to know if the app will show the pagination buttons or not
    const enableNextButton = (parseInt(SearchResultsContext.state.totalItems) - parseInt(SearchResultsContext.state.startIndex) >= 10)
    const enablePrevButton = SearchResultsContext.state.startIndex >= 10
    //changing from text to icons when on mobile
    const isMobile = useMediaQuery({query: '(max-device-width: 600px)'})

    return (
        /* https://reactjs.org/docs/fragments.html#short-syntax */
        <> 
            {enablePrevButton
                ? <Button
                        variant="warning"
                        onClick={() => SearchResultsContext.changePage("subtract")}>
                        {isMobile ? <FontAwesomeIcon icon={faBackward}/> : "Prev"}
                    </Button>
                :   ""}

            {enableNextButton
                ?   <Button
                        variant="warning"
                        onClick={() => SearchResultsContext.changePage("add")}>
                        {isMobile ? <FontAwesomeIcon icon={faForward}/> : "Next"}
                    </Button>
                :   ""} 

            <Button onClick = {SearchResultsContext.onClick} > 
                <FontAwesomeIcon icon={faSearch}/>
                {isMobile ? "" : <span> Search </span>} 
            </Button> 
            
        </>    
    )
}

export default SearchButtons