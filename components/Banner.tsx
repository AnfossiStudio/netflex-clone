import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import { Movie } from "../typing"
import { baseUrl } from "../utils/config"
import {BiPlay} from 'react-icons/bi'

interface Props {
  netflixOriginals : Movie[]
}

const Banner = ({netflixOriginals} : Props) => {
  const [movie , setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, []);
  return (
    <div className="flex flex-col space-y-2md:space-y-4 lg:h-[75vh] lg:justify-end relative">
      <div className="absolute top-0 left-0 h-screen w-full">
        <Image objectFit="cover" layout="fill" src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}/>
      </div>
      <div className="h-screen absolute w-full top-0 left-0 bg-gradient-to-b z-20">

      </div>
      <div className="z-30 p-16 ">
        <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold mb-10 max-w-[50%]">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:2xl max-line">{movie?.overview}</p>
      <div className="flex mt-4">
        <button className="bannerButton bg-white text-black" >
          <BiPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton">More Info</button>
      </div>
      </div>
    </div>
  )
}

export default Banner