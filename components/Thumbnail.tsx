import Image from "next/image";
import {HiStar , HiOutlineBookmark} from 'react-icons/hi';
import { Movie } from "../typing";

interface Props {
  movie : Movie
}

const Thumbnail = ({movie} : Props) => {
  return (
    <div className="cursor-pointer relative group">
      <div className="absolute top-2 right-2 text-lg z-10 text-black p-2 rounded-full bg-white hover:opacity-70 transition-all" >
          <HiOutlineBookmark />
      </div>
      <div className="relative h-[320px] min-w-[210px] overflow-hidden rounded-lg">
        <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} className="rounded-sm object-cover md:rounded hover:scale-125 transition duration-500" layout="fill" />
      </div>
      <h4 className="font-semibold my-2 ">{movie.title || movie.name}</h4>
      <div className="flex justify-between items-center">
        <span className="bg-[#f2db83] text-[#222] text-sm px-0.5 py-0.5 pr-2 font-semibold flex items-center">
          <HiStar className="mr-1" />
          {movie.vote_average}
        </span>
        <span className="span">{movie.release_date?.split('-')[0]}</span>
      </div>
    </div>
  )
}

export default Thumbnail;