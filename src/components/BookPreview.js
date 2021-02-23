import {React} from "react"
import {BrowserRouter as Route, Link} from "react-router-dom"

function BookPreview(props) {

    return (

        <div className="book-preview">
            <Link to={`/books/${props.info.id}`}>
                <div className="book-preview-thumbnail">
                    <img src={props.info.imageLink}/>
                </div>
                <div className="book-preview-details-container">
                    <div className="book-preview-details">{props.info.author}:</div>
                    <div className="book-preview-details">{props.info.title}</div>
                </div>
            </Link>
            <hr />
        </div>
    )
}

export default BookPreview