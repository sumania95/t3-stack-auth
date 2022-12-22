import { type NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import HeadCustom from "../components/HeadCustom";
import Record from './records.json'
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import Pagination from "../components/pagination/Pagination";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const Home: NextPage = () => {
  const [source,setSource] = useState("");
  const [trackName,setTrackName] = useState("");
  const [playing,setPlaying] = useState(false);
  {/* @ts-ignore */}
  const result = Record.Tracks.results
  console.log(result)
  const [currentPage, setCurrentPage] = useState(10)
  const [postsPerPage] = useState(10)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result?.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(result?.length as number /postsPerPage);
  
  return (
    <>
      <HeadCustom title="Home"/>
      <Header/>
      <div className="w-full flex flex-col items-center justify-start pt-2 bg-gray-800 h-40">
      
      </div>
      <div className="w-full flex">
        <div className="w-3/4 flex flex-col px-5 space-y-1 mt-5 pb-10">
          <div className="flex items-start justify-start px-2 text-sm font-semibold">
            <div className="w-full flex items-center justify-start gap-6 text-left">
             FILE TRACKNAME 
            </div>
            <div className="w-full">VERSION</div>
            <div className="w-60 text-right flex-nowrap">KEY/YEAR</div>
          </div>
          {/* @ts-ignore */}
          {currentPosts?.map((item, i) => (
            <div className="flex items-start justify-start p-1 px-2 border">
              <div className="w-full flex items-center justify-start gap-6 text-left">
                <div>
                    <BsFillPlayCircleFill onClick={()=> 
                    {
                      setPlaying(true)
                      setSource(`${item.publishedLowBitRateFile.url}`)
                      setTrackName(`${item.artistPrimaryName}-${item.formattedName}`)
                     }
                    } className="cursor-pointer h-5 w-full"/>
                </div>
                <div>
                  {item.name} - [{item.cleanDirty.name}]<br />{item.artistText}
                </div>
                </div>
              <div className="w-full">{item.versionType.name}</div>
              <div className="w-60 text-right flex-nowrap">{item.inKey?.camelotKey?<span className={`bg-${item.versionType.color.toLowerCase()}-700`}>{item.inKey.camelotKey}</span>:""}<br/>{item.releaseYear}</div>
            </div>
          ))}
          <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
        </div>
        <div className="w-1/4">

        </div>
      </div>
      <footer className="sticky bottom-0 z-99">
        <h3 className="w-full border-t border-rose-600 bg-white text-gray-800  px-5">{trackName}</h3>
        <AudioPlayer
          src={source}
          autoPlay
          className="w-full"
          />
          <div className="border-t border-3 border-rose-600"></div>
      </footer>
    </>
  );
};

export default Home;