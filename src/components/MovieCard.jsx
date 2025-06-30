function MovieCard({ movie }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <img src={movie.poster} alt={movie.title} className="rounded mb-2" />
      <h2 className="text-lg font-semibold">{movie.title}</h2>
      <p>{movie.year}</p>
    </div>
  );
}

export default MovieCard;
