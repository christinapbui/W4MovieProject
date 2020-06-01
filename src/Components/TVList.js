import React from 'react'
import TVCard from './TVCard.js'
import {Container,Row,Col} from 'react-bootstrap'

//2.1 add props
export default function TVList(props) {
    // 3.1
    // const tvGenres = () => {
    //     {tvProps.genre_ids.map(id =>{
    //         let genre = genres.find(genre => {return id === genre.id;});
    //         if (genre) return <Badge variant="info" className="genre-badge">{genre.name}</Badge>
    //     })}
    // }
    return (
        <Container className="tvshow-container">
            <Row className="tvshow-row-title"><h1>On Air</h1>
            </Row>
            <Row className="tvshow-row">
            {/* 2.2 this is an array, so we need to .map it. comp is now saying that .map is undefined/null */}
            {props.tvList.map(item=>{return(
                // <div>{item.original_title}</div>
                <Col md="4"><TVCard tv={item} genresFromTvList={props.genresFromApp}  openModal={props.openModal}></TVCard></Col> // tv and genreList are props that are being passed
                
            )})}
            </Row>
        </Container>
    )
}
