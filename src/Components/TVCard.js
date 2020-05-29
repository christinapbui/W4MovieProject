import React from 'react'
import {Card,ListGroup,ListGroupItem,Badge} from 'react-bootstrap'

export default function TVCard(props) {
    let tvProps = props.tv
    let genres = props.genresFromTvList

    return (
        <div className="container">
            <div className="row tv-shows">
                <div className="col tv-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${tvProps.poster_path}`} />
                        <Card.Body>
                            <Card.Title>{tvProps.original_name}</Card.Title>
                            <Card.Text>
                            {tvProps.overview}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Genre: 
                                {tvProps.genre_ids.map(id =>{
                                    let genre = genres.find(genre => {return id === genre.id;});
                                    if (genre) return <Badge variant="info" className="genre-badge">{genre.name}</Badge>
                                })}
                            </ListGroupItem>
                            <ListGroupItem>Original Language: {tvProps.original_language}</ListGroupItem>
                            <ListGroupItem>First Air Date: {tvProps.first_air_date}</ListGroupItem>
                            <ListGroupItem>Rating: {tvProps.vote_average}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}
