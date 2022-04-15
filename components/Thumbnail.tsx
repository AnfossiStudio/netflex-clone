import Image from "next/image";
import { Movie } from "../typing";

interface Props {
  movie : Movie
}

const Thumbnail = ({movie} : Props) => {
  return (
    <div className="cursor-pointer">
      <div className="relative h-[320px] min-w-[210px] overflow-hidden rounded-lg">
        <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className="rounded-sm object-cover md:rounded hover:scale-125 transition duration-500" layout="fill" />
      </div>
      <h4 className="font-semibold mt-2">{movie.title || movie.name}</h4>
    </div>
  )
}

export default Thumbnail;