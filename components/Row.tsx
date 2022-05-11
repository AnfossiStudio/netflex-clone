import { useState } from "react";
import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Movie } from "../typing";
import Thumbnail from "./Thumbnail";

interface Props {
  title : string
  movies : Movie[]
}

enum Direction {
  LEFT,
  RIGHT
}

const Row = ({title , movies} : Props) => {

  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved , setIsMoved] = useState(false)

  const handleClick = (direction : Direction) => {
    setIsMoved(true)
    if(rowRef.current){
      const {scrollLeft , clientWidth} = rowRef.current

      const scrollTo = direction === Direction.LEFT ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({left : scrollTo , behavior: 'smooth'})
    }
  }

  const handleDrag = (e : DragEvent) => {
    console.log(e)
  }


  return <div className="relative ml-4 md:ml-16 mb-16 z-30">
    <h2 className="text-white w-56 cursor-pointer mb-2 text-xl font-semibold transition duration-200 md:text-2xl">{title}</h2>
    <div className="group ">
      <HiChevronLeft onClick={() => handleClick(Direction.LEFT)} className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 transition cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100" />
      <div onDrag={() => handleDrag} className="flex pr-16 scrollbar-hide space-x-6 overflow-x-scroll md:spcae-x-2 md:p-2" ref={rowRef}>
        {movies.map(movie => <Thumbnail key={movie.id} movie={movie} />)}
      </div>
      <HiChevronRight onClick={() => handleClick(Direction.RIGHT)} className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 transition cursor-pointer opacity-0 hover:scale-125 group-hover:opacity-100" />
    </div>
  </div>
}

export default Row;