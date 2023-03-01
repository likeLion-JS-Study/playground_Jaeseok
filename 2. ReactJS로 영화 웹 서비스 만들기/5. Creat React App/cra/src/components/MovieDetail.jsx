function MovieDetail({title, src, description, rating, geners}) {
  return (
    <>
      <img src={src} alt={title} />
      <h2>{title}</h2>
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Rating</h3>
      <p>{rating}</p>
      <div>
        <h3>Genres</h3>
        <ul>
          {geners.map(genre => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MovieDetail