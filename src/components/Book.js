import { React } from "react"
import error404 from "../img/404.jpg"

function Book(props) {
    const data = props.info
    return (
        <div className="book">
            <img class="book-detail-img" src={data.imageLinks !== undefined ? data.imageLinks.thumbnail : error404}></img>
            <p>Title: <strong>{data.title}</strong></p>
            <p>Subtitle: <strong>{data.subtitle}</strong></p>
            <p>Author(s): <strong>{data.authors}</strong></p>
            <p>Description: <strong>{data.description}</strong></p>
            <p>Publisher: <strong>{data.publisher}</strong></p>  
            <p>Published date: <strong>{data.publishedDate}</strong></p>         
            <p>Page count: <strong>{data.pageCount}</strong></p>
        </div>
    )
}

export default Book