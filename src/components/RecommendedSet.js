import MovieCard from "./MovieCard";
import { v4 as uuidv4 } from 'uuid';


const RecommendedSet = ({movieSet}) => {
    return (
        <div className="movieSet">
            {movieSet?.map((eachMovie) => <MovieCard data = {eachMovie} key={uuidv4()}/>)}
        </div>
    )
}

export default RecommendedSet;