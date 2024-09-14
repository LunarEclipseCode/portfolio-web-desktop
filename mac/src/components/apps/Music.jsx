import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PlaylistItem = ({ onClick, onPlay, imgSrc, altText, playlistName, isPlaying }) => (
  <div
    onClick={onClick}
    className="playlist-item flex group relative transition-all duration-300 hover:scale-105 overflow-hidden items-center gap-5 rounded-lg shadow-lg hover:shadow-2xl outline-none bg-gray-200 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-600/60 focus:bg-gray-100 dark:focus:bg-gray-700/70 cursor-pointer"
  >
    <div className="h-20 w-20">
      <img
        src={imgSrc}
        alt={altText}
        className="object-cover h-full w-40 rounded-lg shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
      />
    </div>
    <div className="font-semibold text-black dark:text-white block">{playlistName}</div>
    <div
      className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onPlay();
      }}
    >
      <span className="bg-[#9333e8] dark:bg-emerald-500 hover:bg-[#9333e8]/80 dark:hover:bg-emerald-400 rounded-full flex items-center justify-center text-white dark:text-black h-12 w-12 shadow-md">
        <svg viewBox="0 0 24 24" className="h-8 w-8">
          <path
            fill="currentColor"
            d={
              isPlaying
                ? "M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                : "M8 5.14v14l11-7-11-7z"
            }
          ></path>
        </svg>
      </span>
    </div>
  </div>
);

const PlaylistCard = ({
  onClick,
  onPlay,
  imgSrc,
  altText,
  playlistName,
  description,
  isPlaying
}) => (
  <div
    onClick={onClick}
    className="playlist-card p-4 flex-col items-center group relative transition-all duration-300 hover:scale-105 overflow-hidden gap-4 rounded-lg shadow-lg hover:shadow-2xl outline-none bg-gray-200 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-600/60 focus:bg-gray-100 dark:focus:bg-gray-700/70 cursor-pointer"
  >
    <div className="w-40">
      <div className="relative group mx-auto h-40 w-full flex-none shadow-lg">
        <img
          src={imgSrc}
          alt={altText}
          className="object-cover h-full w-full rounded-lg shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)]"
        />
        <div
          className="absolute right-2 bottom-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          <span className="bg-[#9333e8] dark:bg-emerald-500 hover:bg-[#9333e8]/80 dark:hover:bg-emerald-400 rounded-full flex items-center justify-center text-white dark:text-black h-12 w-12 shadow-md">
            <svg viewBox="0 0 24 24" className="h-8 w-8">
              <path
                fill="currentColor"
                d={
                  isPlaying
                    ? "M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                    : "M8 5.14v14l11-7-11-7z"
                }
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="pt-2">
        <div className="font-semibold text-black dark:text-white block truncate">
          {playlistName}
        </div>
        <div className="text-gray-500 dark:text-gray-300 text-xs">{description}</div>
      </div>
    </div>
  </div>
);

const ArtistCard = ({ onClick, onPlay, imgSrc, altText, artistName, isPlaying }) => (
  <div
    onClick={onClick}
    className="artist-card flex-col items-center group relative transition-all hover:scale-105 duration-300 overflow-hidden gap-5 rounded-lg cursor-pointer p-4 hover:bg-gray-200 dark:bg-gray-800/70 bg-transparent hover:shadow-lg"
  >
    <div className="w-40 h-40 mx-auto relative">
      <img
        src={imgSrc}
        alt={altText}
        className="object-cover h-full w-full rounded-full z-10 relative shadow-md"
      />
      <div
        className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
      >
        <span className="bg-[#9333e8] dark:bg-emerald-500 hover:bg-[#9333e8]/80 dark:hover:bg-emerald-400 rounded-full flex items-center justify-center text-white dark:text-black h-12 w-12 shadow-md">
          <svg viewBox="0 0 24 24" className="h-8 w-8">
            <path
              fill="currentColor"
              d={
                isPlaying
                  ? "M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                  : "M8 5.14v14l11-7-11-7z"
              }
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="pt-4 text-center">
      <div className="font-semibold text-black dark:text-white block truncate">
        {artistName}
      </div>
    </div>
  </div>
);

// To override default values, use title, artist, album, imgSrc
const songCollections = {
  "Linkin Park": [
    { deezerId: "3824710", album: "Transformers: Revenge Of The Fallen" },
    { deezerId: "904595", album: "Meteora" },
    { deezerId: "904599", album: "Meteora" },
    { deezerId: "1747445247", album: "Minutes to Midnight" },
    { deezerId: "1747445267", album: "Minutes to Midnight" },
    { deezerId: "1747445277", album: "Minutes to Midnight" },
    { deezerId: "690919872" },
    { deezerId: "690919922" },
    { deezerId: "690919962" },
    { deezerId: "37734411" },
    { deezerId: "37734441" },
    { deezerId: "79587436" },
    { deezerId: "362297911" }
  ],
  NewJeans: [
    // { deezerId: "2071104987" },
    { deezerId: "2813349912" },
    { deezerId: "2354707745" },
    { deezerId: "2373775145" },
    { deezerId: "1843514397" },
    { deezerId: "2813349902" },
    { deezerId: "2088671947" },
    { deezerId: "1843514387" }
  ],
  "Imagine Dragons": [
    { deezerId: "579893412" },
    { deezerId: "58071451" },
    { deezerId: "109701582" },
    { deezerId: "58071441" },
    { deezerId: "528330431" },
    { deezerId: "528330441" },
    { deezerId: "58071421" },
    { deezerId: "579893072" },
    { deezerId: "528330501" },
    { deezerId: "579892872" }
  ],
  "Alan Walker": [
    { deezerId: "140295501" },
    { deezerId: "401358872" },
    { deezerId: "597331102" },
    { deezerId: "597331112" },
    // { deezerId: "1362043042" },
    { deezerId: "645583792" },
    { deezerId: "829185532" }
  ],
  "Against The Current": [
    { deezerId: "702608072" },
    { deezerId: "94799772" },
    { deezerId: "78535035" },
    { deezerId: "559258812" },
    // { deezerId: "559258752" },
    { deezerId: "1432446692" },
    { deezerId: "1432446702" },
    { deezerId: "124654796" },
    { deezerId: "124654800" }
    // { deezerId: "124654802" },
  ],
  "Taylor Swift": [
    { deezerId: "1742732827" },
    { deezerId: "2355587855", title: "Electric Touch (Taylor's Version)" },
    { deezerId: "2300267745", album: "Midnights" },
    { deezerId: "1550966552", title: "Message In A Bottle" },
    // { deezerId: "1550966602", title: "All Too Well (10 Minute Version)" },
    // { deezerId: "1332676982" },
    // { deezerId: "1199760462", album: "evermore" },
    { deezerId: "1053765282", album: "folklore" },
    { deezerId: "737967452" },
    { deezerId: "435491572" },
    { deezerId: "435491452" },
    { deezerId: "871671962" },
    { deezerId: "871672462" }
  ],
  "Around The World": [{ deezerId: "54790571" }, { deezerId: "2210493097" }],
  Coldplay: [
    { deezerId: "1518077912" },
    { deezerId: "114811546" },
    { deezerId: "114811604" },
    { deezerId: "142706538" },
    // { deezerId: "3157972" },
    { deezerId: "3128096" },
    { deezerId: "86044539" },
    { deezerId: "3098840" },
    { deezerId: "3106505" },
    { deezerId: "14299589" }
  ],
  KPOP: [
    { deezerId: "2642635812" },
    { deezerId: "1222026962" },
    { deezerId: "1536520932" },
    { deezerId: "2247330887" },
    { deezerId: "1296219992" },
    { deezerId: "2843015982" },
    { deezerId: "1863618717" },
    { deezerId: "2714845032" }
  ],
  Journey: [
    { deezerId: "13141170" },
    { deezerId: "2441318935" },
    { deezerId: "71967077" },
    {
      deezerId: "117773340",
      title: "We Don't Talk Anymore",
      artist: "Charlie Puth, Selena Gomez"
    },
    { deezerId: "2841647652" },
    { deezerId: "1280165212" },
    { deezerId: "1758904687" },
    { deezerId: "142986206" }
  ],
  Horizon: [
    { deezerId: "2893935701" },
    { deezerId: "1620972922" },
    // { deezerId: "755330622" },
    { deezerId: "1276790572" },
    // { deezerId: "1733706307" },
    { deezerId: "1733684797" },
    { deezerId: "1736747717" },
    // { deezerId: "912354" },
    { deezerId: "2918830" },
    { deezerId: "1641651572" }
  ],
  Instrumentals: [
    { deezerId: "2522607201" },
    { deezerId: "82172106" },
    // { deezerId: "1891832077" },
    { deezerId: "1891832117" },
    { deezerId: "1891832067" },
    { deezerId: "995694672" }
    // { deezerId: "995694692" }
  ]
};

const playImages = {
  "Linkin Park": {
    frontimg: "./music/artists/lp_front.jpg",
    pageimg: "./music/artists/lp_page.jpg"
  },
  "Against The Current": {
    frontimg: "./music/artists/atc_front.jpg",
    pageimg: "./music/artists/atc_page.jpg"
  },
  "Taylor Swift": {
    frontimg: "./music/artists/ts_front.jpg",
    pageimg: "./music/artists/ts_page.jpg"
  },
  "Alan Walker": {
    frontimg: "./music/artists/alan_walker_front.jpg",
    pageimg: "./music/artists/alan_walker_page.webp"
  },
  NewJeans: {
    frontimg: "./music/artists/nj_front.webp",
    pageimg: "./music/artists/nj_page.jpg"
  },
  "Imagine Dragons": {
    frontimg: "./music/artists/id_front.jpg",
    pageimg: "./music/artists/id_page.jpg"
  }
};

const popularArtists = {
  Coldplay: {
    frontimg: "./music/artists/coldplay_cover.jpeg",
    pageimg: "./music/artists/coldplay4.jpg"
  }
};

const madeForYouPlaylists = {
  "Around The World": { frontimg: "./music/playlists/camera.jpg", pageimg: "" },
  Horizon: { frontimg: "./music/playlists/nature2.jpg", pageimg: "" },
  Instrumentals: { frontimg: "./music/playlists/instrumental.jpg", pageimg: "" },
  Journey: { frontimg: "./music/playlists/journey.jpg", pageimg: "" },
  KPOP: { frontimg: "./music/playlists/kpop2.jpg", pageimg: "" }
};

const PlaylistDetailView = ({
  playlistName,
  imgSrc,
  onBack,
  onSongSelect,
  onPlayPause,
  onShuffleToggle,
  isShuffle,
  isPlaying,
  currentSongIndex,
  songs,
  isPlayingCurrentPlaylist,
  viewedShuffle,
  isControlBarVisible
}) => {
  const artistData =
    playImages[playlistName] ||
    popularArtists[playlistName] ||
    madeForYouPlaylists[playlistName];
  const isArtistPage = artistData && artistData.pageimg !== "";
  const bannerImg = isArtistPage ? artistData.pageimg : imgSrc.frontimg;
  const shuffleIconState = isPlayingCurrentPlaylist ? isShuffle : viewedShuffle;

  const dark = useStore((state) => state.dark); // Retrieve dark mode state

  const handlePlayPauseClick = () => {
    if (isPlayingCurrentPlaylist) {
      onPlayPause();
    } else {
      onSongSelect(0, songs);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-full flex flex-col overflow-hidden custom-appscrollbar">
      {isArtistPage ? (
        <div className="relative">
          <img
            src={bannerImg}
            alt={playlistName}
            className="object-cover w-full h-56 sm:h-64 md:h-72 lg:h-96"
            style={{
              objectPosition:
                playlistName === "NewJeans" ||
                playlistName === "Linkin Park" ||
                playlistName === "Taylor Swift" ||
                playlistName === "Against The Current" ||
                playlistName === "Imagine Dragons" ||
                playlistName === "Coldplay" ||
                playlistName === "Ive"
                  ? "top"
                  : "center"
            }}
          />
          <a
            onClick={onBack}
            aria-label="go back to home page"
            className="fixed top-7 left-3 sm:top-8 sm:left-3 bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full inline-flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 cursor-pointer shadow-md z-50"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 sm:h-6 sm:w-6 text-black dark:text-white"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              ></path>
            </svg>
          </a>
          <div className="absolute bottom-2 left-4 sm:bottom-4 sm:left-6 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">{playlistName}</h1>
            <div className="flex items-center space-x-4">
              <span
                onClick={handlePlayPauseClick}
                className="mt-2 sm:mt-4 bg-[#9333e8] dark:bg-emerald-500 hover:scale-105 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-white dark:text-black h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-10 sm:w-10">
                  <path
                    fill="currentColor"
                    d={
                      isPlayingCurrentPlaylist && isPlaying
                        ? "M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                        : "M8 5.14v14l11-7-11-7z"
                    }
                  ></path>
                </svg>
              </span>

              {/* Shuffle Button with Light and Dark Mode */}
              <span
                onClick={onShuffleToggle}
                className={`mt-2 sm:mt-4 bg-[#9333e8] dark:bg-emerald-500 hover:bg-[#9333e8]/80 dark:hover:bg-emerald-400 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-white dark:text-black h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 cursor-pointer ${
                  shuffleIconState ? (dark ? "text-emerald-500" : "text-[#9333e8]") : ""
                }`}
              >
                <img
                  src={`./music/icons/${shuffleIconState ? (dark ? "shuffle-on-dark.svg" : "shuffle-on-light.svg") : dark ? "shuffle2-dark.svg" : "shuffle2-light.svg"}`}
                  alt="Shuffle"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="flex flex-row md:items-stretch gap-4 sm:gap-8 px-4 sm:px-6 mt-9 sm:mt-12 mb-4 sm:mb-6">
            <div className="h-40 w-40 sm:h-52 sm:w-52 flex-none">
              <img
                src={imgSrc}
                alt={playlistName}
                className="object-cover h-full w-full shadow-[5px_0_30px_0px_rgba(0,0,0,0.3)] rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between text-left mt-0 pt-0">
              <div className="flex flex-1 items-end text-gray-600 dark:text-gray-400">
                Playlist
              </div>
              <div>
                <h1 className="title-clamp font-bold block text-black dark:text-white text-2xl sm:text-3xl">
                  {playlistName}
                </h1>
              </div>
              <div className="flex-1 flex items-end mb-2 sm:mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <a href="#" className="hover:underline">
                    {songs.length > 0 ? "Various Artists" : songs[0].artist}
                  </a>
                  <div className="mt-1">
                    <span className="font-semibold text-gray-600 dark:text-gray-400"></span>
                    {songs.length} songs
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start space-x-3 sm:space-x-4 ">
                <span
                  onClick={handlePlayPauseClick}
                  className="bg-[#9333e8] dark:bg-emerald-500 hover:scale-105 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-white dark:text-black h-10 w-10 sm:h-14 sm:w-14 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-10 sm:w-10">
                    <path
                      fill="currentColor"
                      d={
                        isPlayingCurrentPlaylist && isPlaying
                          ? "M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                          : "M8 5.14v14l11-7-11-7z"
                      }
                    ></path>
                  </svg>
                </span>

                {/* Shuffle Button for Non-Artist Pages */}
                <span
                  onClick={onShuffleToggle}
                  className={`bg-[#9333e8] dark:bg-emerald-500 hover:scale-105 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-white dark:text-black h-10 w-10 sm:h-14 sm:w-14 cursor-pointer ${
                    shuffleIconState ? (dark ? "text-emerald-500" : "text-[#9333e8]") : ""
                  }`}
                >
                  <img
                    src={`./music/icons/${shuffleIconState ? (dark ? "shuffle-on-dark.svg" : "shuffle-on-light.svg") : dark ? "shuffle2-dark.svg" : "shuffle2-light.svg"}`}
                    alt="Shuffle"
                    className="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </span>
              </div>
            </div>
          </div>
          <a
            onClick={onBack}
            aria-label="go back to home page"
            className="fixed top-7 left-3 sm:top-8 sm:left-5 bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full inline-flex justify-center items-center h-6 w-6 sm:h-8 sm:w-8 cursor-pointer shadow-md z-50"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 sm:h-5 sm:w-5 text-black dark:text-white"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              ></path>
            </svg>
          </a>
        </div>
      )}

      <div className="bg-gray-200 dark:bg-gray-900 flex-1 rounded-lg overflow-y-auto custom-appscrollbar">
        <div className="px-1 pt-2 sm:pt-4 sm:px-3 md:px-5 2xl:px-7 pb-5">
          <table className="table-auto text-left min-w-full divide-y-2 divide-gray-200 dark:divide-gray-500/30 text-black dark:text-white">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400">
                <th className="font-normal px-3 py-2 whitespace-nowrap text-left w-8">
                  #
                </th>
                <th className="font-normal px-2 py-2 whitespace-nowrap text-left">
                  Title
                </th>
                <th className="font-normal px-2 py-2 whitespace-nowrap hidden md:table-cell">
                  Album
                </th>
                <th className="font-normal px-2 py-2 whitespace-nowrap text-right">
                  Released On
                </th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => {
                const isCurrentlyPlaying =
                  isPlayingCurrentPlaylist && currentSongIndex === index;

                return (
                  <tr
                    key={index}
                    className={`group hover:bg-[#cbd5e1] dark:hover:bg-gray-600/30 cursor-pointer ${isCurrentlyPlaying ? "bg-gray-300 dark:bg-gray-600/50" : ""}`}
                    onClick={() => onSongSelect(index, songs)}
                  >
                    <td className="whitespace-nowrap px-2 py-2 text-left relative w-8 text-sm 2xl:text-base">
                      <div className="flex items-center justify-center">
                        <span className="group-hover:opacity-0">{index + 1}</span>
                        <button
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isCurrentlyPlaying) {
                              onPlayPause();
                            } else {
                              onSongSelect(index, songs);
                            }
                          }}
                        >
                          {isCurrentlyPlaying ? (
                            isPlaying ? (
                              <svg viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                  fill="currentColor"
                                  d="M6 19h4.5V5H6v14zm7.5 0H18V5h-4.5v14z"
                                ></path>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" className="h-6 w-6">
                                <path
                                  fill="currentColor"
                                  d="M8 5.14v14l11-7-11-7z"
                                ></path>
                              </svg>
                            )
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-6 w-6">
                              <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 flex gap-2 items-center">
                      <div className="h-10 w-10 lg:h-11 lg:w-11 2xl:h-12 2xl:w-12 flex-shrink-0">
                        <img
                          src={song.imgSrc}
                          alt={song.title}
                          className="rounded-lg object-cover h-full w-full shadow-md"
                        />
                      </div>
                      <div className="leading-none">
                        <a
                          href="#"
                          className="text-black dark:text-gray-300 group-hover:text-black dark:group-hover:text-white hover:underline text-sm 2xl:text-base"
                        >
                          {song.title}
                        </a>
                        <div className="text-sm text-black dark:text-gray-300 group-hover:text-black dark:group-hover:text-white flex items-center 2xl:text-base">
                          {song.explicit && (
                            <span className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white text-xs px-1 py-0.5 rounded-sm mr-1">
                              E
                            </span>
                          )}
                          <a href="#" className="hover:underline">
                            {song.artist}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 hidden md:table-cell">
                      <a
                        href="#"
                        className="text-black dark:text-gray-300 group-hover:text-black dark:group-hover:text-white hover:underline text-sm 2xl:text-base"
                      >
                        {song.album}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-right text-sm text-black dark:text-gray-300 hover:text-black dark:hover:text-white 2xl:text-base">
                      {song.releasedOn}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .custom-appscrollbar::-webkit-scrollbar {
          height: 0.4em;
        }
        .custom-appscrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-appscrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 0.5em;
        }
        .dark .custom-appscrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
        }
        .custom-appscrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
        .dark .custom-appscrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
      `}</style>
    </div>
  );
};

const MusicControls = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onRepeatToggle,
  onShuffleToggle,
  isRepeat,
  isShuffle,
  currentTime,
  duration,
  onSeek,
  onVolumeChange
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const dark = useStore((state) => state.dark);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#cbd5e1] dark:bg-[#18212F] p-3 xl:px-5 flex items-center justify-between z-50 shadow-md">
      {/* Left Section: Album Art, Song Title, Artist */}
      <div className="flex items-center gap-4 min-w-[200px] max-w-[300px]">
        <div className="h-12 w-12 lg:h-14 lg:w-14">
          <img
            src={currentSong.imgSrc}
            alt={currentSong.title}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div className="text-black dark:text-white">
          <div className="font-semibold text-sm md:text-base">{currentSong.title}</div>
          <div className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
            {currentSong.artist}
          </div>
        </div>
      </div>

      {/* Center Section: Playback Controls and Progress Slider */}
      <div className="flex flex-col items-center justify-center w-full max-w-xl px-4">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            onClick={onShuffleToggle}
            className={`text-black dark:text-white hover:scale-110 transition-all duration-300 ${
              isShuffle ? "text-[#9333e8] dark:text-emerald-500" : ""
            }`}
          >
            <img
              src={`./music/icons/${dark ? (isShuffle ? "shuffle-control-dark.svg" : "shuffle-dark.svg") : isShuffle ? "shuffle-control-light.svg" : "shuffle-light.svg"}`}
              alt="Shuffle"
              className="h-6 w-6 md:h-7 md:w-7 xl:w-8 xl:h-8"
            />
          </button>

          <button
            onClick={onPrev}
            className="text-black dark:text-white hover:scale-110 transition-all duration-300"
          >
            <img
              src={`./music/icons/prev-${dark ? "dark" : "light"}.svg`}
              alt="Previous"
              className="h-5 w-5 sm:h-7 sm:w-7"
            />
          </button>

          <button
            onClick={onPlayPause}
            className="text-black dark:text-white hover:scale-110 transition-all duration-300"
          >
            {isPlaying ? (
              <img
                src={`./music/icons/pause-${dark ? "dark" : "light"}.svg`}
                alt="Pause"
                className="h-5 w-5 md:h-6 md:w-6 xl:w-7 xl:h-7"
              />
            ) : (
              <img
                src={`./music/icons/play-${dark ? "dark" : "light"}.svg`}
                alt="Play"
                className="h-5 w-5 sm:h-7 sm:w-7"
              />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-black dark:text-white hover:scale-110 transition-all duration-300"
          >
            <img
              src={`./music/icons/next-${dark ? "dark" : "light"}.svg`}
              alt="Next"
              className="h-5 w-5 sm:h-7 sm:w-7"
            />
          </button>

          <button
            onClick={onRepeatToggle}
            className="text-black dark:text-white hover:scale-110 transition-all duration-300"
          >
            <img
              src={`./music/icons/${dark ? (isRepeat ? "repeat-off-dark.svg" : "repeat-dark.svg") : isRepeat ? "repeat-off-light.svg" : "repeat-light.svg"}`}
              alt="Repeat"
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
          </button>
        </div>

        <div className="w-full flex items-center">
          <span className="text-gray-600 dark:text-gray-400 text-xs">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="mx-2 w-full"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => onSeek(e.target.value)}
          />
          <span className="text-gray-600 dark:text-gray-400 text-xs">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right Section: Volume Control */}
      <div className="hidden lg:flex items-center w-32 max-w-[200px]">
        <img
          src={`./music/icons/volume-${dark ? "dark" : "light"}.svg`}
          alt="Volume"
          className="h-6 w-6 mr-2"
        />
        <input
          type="range"
          min="0"
          max="100"
          className="w-full"
          onChange={(e) => onVolumeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default function Music() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // The playlist currently being viewed
  const [currentPlaylist, setCurrentPlaylist] = useState(null); // The playlist currently playing
  const [greeting, setGreeting] = useState("Good day");
  const [currentSongIndex, setCurrentSongIndex] = useState(null); // Index of the currently playing song
  const [songs, setSongs] = useState([]); // Songs in the currently viewed playlist
  const [currentPlayingSongs, setCurrentPlayingSongs] = useState([]); // Songs in the currently playing playlist
  const [isPlaying, setIsPlaying] = useState(false); // Whether or not a song is playing
  const [isShuffle, setIsShuffle] = useState(false); // Shuffle state of currently playing playlist
  const [viewedShuffle, setViewedShuffle] = useState(false); // Shuffle state of currently viewed playlist
  const [isRepeat, setIsRepeat] = useState(false); // Whether or not repeat is enabled
  const [currentTime, setCurrentTime] = useState(0); // Current time in the playing song
  const [duration, setDuration] = useState(0); // Duration of the playing song
  const [prefetchedPlaylists, setPrefetchedPlaylists] = useState({}); // Store prefetched playlists data
  const [isPrefetching, setIsPrefetching] = useState(false); // Track if prefetching is in progress
  const audioRef = useRef(null); // Reference to the audio element
  const [volume, setVolume] = useState(20); // Volume state
  const [playedSongs, setPlayedSongs] = useState([]); // Track the indices of played songs in shuffle mode
  const [lastTwoSongs, setLastTwoSongs] = useState([]); // Track the last two played songs for shuffle reset

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours < 18) {
      setGreeting("Good afternoon");
    } else if (hours < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
    prefetchPlaylists();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    // Reset played songs if shuffle is enabled but all songs have been played, and track the last two songs
    if (isShuffle && playedSongs.length >= currentPlayingSongs.length) {
      const lastTwo = playedSongs.slice(-2); // Keep track of the last two played songs
      setPlayedSongs([]);
      setLastTwoSongs(lastTwo);
    }
  }, [isPlaying, isShuffle, playedSongs, currentPlayingSongs]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        // Explicitly set the volume when the song starts
        audioRef.current.volume = (volume / 100) * 0.04;
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    if (currentSongIndex !== null && currentPlayingSongs.length > 0) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, currentPlayingSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (volume / 100) * 0.04;
    }
  }, [volume]);

  const fetchSongDetails = async (song) => {
    try {
      const response = await axios.get(
        `https://corsproxy.io/?https://api.deezer.com/track/${song.deezerId}`
      );
      const trackData = response.data;

      const img = new Image();
      img.src = trackData.album.cover_medium;

      // Format the release date
      const releaseDate = new Date(song.releasedOn || trackData.release_date);
      const formattedDate = new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(releaseDate);

      return {
        title: song.title || trackData.title,
        artist: song.artist || trackData.artist.name,
        album: song.album || trackData.album.title,
        releasedOn: formattedDate,
        imgSrc: song.imgSrc || trackData.album.cover_medium,
        mp3Src: trackData.preview,
        explicit: song.explicit !== undefined ? song.explicit : trackData.explicit_lyrics
      };
    } catch (error) {
      console.error("Error fetching Deezer track data:", error);
      return song;
    }
  };

  const preloadImage = (url) => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  };

  const prefetchPlaylists = async () => {
    setIsPrefetching(true);
    const playlistNames = Object.keys(songCollections);
    const prefetchedData = {};

    for (const playlistName of playlistNames) {
      if (prefetchedData[playlistName]) continue;

      const selectedSongs = songCollections[playlistName];
      const songsWithDetails = await Promise.all(selectedSongs.map(fetchSongDetails));
      prefetchedData[playlistName] = songsWithDetails;

      // Preload the page image
      const playlistImages =
        playImages[playlistName] ||
        madeForYouPlaylists[playlistName] ||
        popularArtists[playlistName];
      if (playlistImages && playlistImages.pageimg) {
        preloadImage(playlistImages.pageimg);
      }
    }

    setPrefetchedPlaylists(prefetchedData);
    setIsPrefetching(false);
  };

  const handlePlaylistSelect = async (playlistName) => {
    if (isPrefetching) {
      setIsPrefetching(false);
    }

    if (prefetchedPlaylists[playlistName]) {
      setSongs(prefetchedPlaylists[playlistName]);
    } else {
      const selectedSongs = songCollections[playlistName] || [];
      const songsWithDetails = await Promise.all(selectedSongs.map(fetchSongDetails));
      setSongs(songsWithDetails);
      setPrefetchedPlaylists((prev) => ({ ...prev, [playlistName]: songsWithDetails }));
    }

    setSelectedPlaylist(playlistName);
    setViewedShuffle(false); // Reset viewed shuffle state when selecting a new playlist to view

    // Resume prefetching after the immediate fetch
    if (!isPrefetching) {
      prefetchPlaylists();
    }
  };

  const handleSongSelect = (index, songsList) => {
    setCurrentPlayingSongs(songsList);
    setCurrentSongIndex(index);
    setCurrentPlaylist(selectedPlaylist);
    setIsShuffle(viewedShuffle);
    setPlayedSongs([]); // Reset played songs when starting a new playlist
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentPlayingSongs.length) % currentPlayingSongs.length
    );
    setIsPlaying(true);
  };

  const handleNextSong = () => {
    if (isShuffle) {
      // Determine the next song in shuffle mode
      let availableSongs = currentPlayingSongs
        .map((_, index) => index)
        .filter((index) => !playedSongs.includes(index) && !lastTwoSongs.includes(index));

      if (availableSongs.length === 0) {
        availableSongs = currentPlayingSongs
          .map((_, index) => index)
          .filter((index) => !playedSongs.includes(index)); // If no songs are available, allow the last two songs again
        setLastTwoSongs([]); // Reset last two songs after they've been excluded once
      }

      const nextIndex = availableSongs[Math.floor(Math.random() * availableSongs.length)];

      setPlayedSongs([...playedSongs, nextIndex]);
      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % currentPlayingSongs.length);
    }
    setIsPlaying(true);
  };

  const handleShuffleToggle = () => {
    if (selectedPlaylist === currentPlaylist) {
      setIsShuffle(!isShuffle);
      if (!isShuffle) {
        // Exclude the current song and played songs if shuffle is turned on
        setPlayedSongs([...playedSongs, currentSongIndex]);
      } else {
        setPlayedSongs([]);
      }
    } else {
      setViewedShuffle(!viewedShuffle);
    }
  };

  const handleRepeatToggle = () => {
    setIsRepeat(!isRepeat);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      audioRef.current.volume = (volume / 100) * 0.04;
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (volume) => {
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = (volume / 100) * 0.04;
    }
  };

  const handlePlaylistPlayPause = (playlistName) => {
    const songsList = prefetchedPlaylists[playlistName] || [];
    if (currentPlaylist === playlistName) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPlayingSongs(songsList);
      setCurrentPlaylist(playlistName);
      if (isShuffle) {
        const firstIndex = Math.floor(Math.random() * songsList.length);
        setPlayedSongs([firstIndex]);
        setCurrentSongIndex(firstIndex);
      } else {
        setCurrentSongIndex(0);
      }
      setIsPlaying(true);
    }
  };

  const handleMusicControlShuffleToggle = () => {
    setIsShuffle(!isShuffle);
    setPlayedSongs([]);
  };

  const isControlBarVisible = currentSongIndex !== null;
  const contentPaddingBottom = isControlBarVisible ? "pb-24" : "pb-0";
  const mainPaddingBottom = selectedPlaylist === null ? "pb-8" : "pb-0";
  const dark = useStore((state) => state.dark);

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex-1 mx-auto overflow-hidden h-full w-full custom-scrollbar ${contentPaddingBottom}`}
    >
      <div
        className={`relative h-full w-full overflow-y-auto custom-scrollbar ${mainPaddingBottom}`}
      >
        {selectedPlaylist ? (
          <PlaylistDetailView
            playlistName={selectedPlaylist}
            imgSrc={(() => {
              try {
                return (
                  playImages[selectedPlaylist] ||
                  madeForYouPlaylists[selectedPlaylist].frontimg
                );
              } catch (error) {
                return playImages[selectedPlaylist];
              }
            })()}
            onBack={() => setSelectedPlaylist(null)}
            onSongSelect={handleSongSelect}
            onPlayPause={handlePlayPause}
            onShuffleToggle={handleShuffleToggle}
            isPlaying={isPlaying}
            currentSongIndex={currentSongIndex}
            songs={songs}
            isPlayingCurrentPlaylist={currentPlaylist === selectedPlaylist}
            viewedShuffle={viewedShuffle}
            isShuffle={isShuffle}
            isControlBarVisible={isControlBarVisible}
          />
        ) : (
          <div
            id="playlist-container"
            className="relative transition-all duration-1000 bg-context pt-6 md:pt-8 xl:pt-10"
            style={{ minHeight: "300px", "--context-color": "#134e4a" }}
          >
            <div className="relative z-10 px-6">
              <div className="flex flex-col-reverse sm:flex-row justify-between mb-6">
                <h2 className="text-4xl font-bold">{greeting}</h2>
                <div className="flex items-center space-x-2 mb-3 sm:mb-0">
                  {dark ? (
                    <img
                      src="./music/icons/deezer-dark.svg"
                      alt="Deezer Logo Dark"
                      className="h-8 w-32 lg:h-11"
                    />
                  ) : (
                    <img
                      src="./music/icons/deezer-light.svg"
                      alt="Deezer Logo Light"
                      className="h-8 w-32 lg:h-11"
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-y-4 gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                {Object.keys(playImages).map((key) => (
                  <PlaylistItem
                    key={key}
                    onClick={() => handlePlaylistSelect(key)}
                    onPlay={() => handlePlaylistPlayPause(key)}
                    imgSrc={playImages[key].frontimg}
                    altText={key}
                    playlistName={key}
                    isPlaying={isPlaying && currentPlaylist === key}
                  />
                ))}
              </div>
            </div>
            <div className="px-6 relative z-10 mt-8">
              <h2 className="text-3xl font-bold">Made for you</h2>
              <div className="flex flex-wrap mt-6 gap-4">
                {Object.keys(madeForYouPlaylists).map((key) => (
                  <PlaylistCard
                    key={key}
                    onClick={() => handlePlaylistSelect(key)}
                    onPlay={() => handlePlaylistPlayPause(key)}
                    imgSrc={madeForYouPlaylists[key].frontimg}
                    altText={key}
                    playlistName={key}
                    description=""
                    isPlaying={isPlaying && currentPlaylist === key}
                  />
                ))}
              </div>
            </div>
            <div className="px-6 relative z-10 mt-8">
              <h2 className="text-3xl font-bold">Popular Artists</h2>
              <div className="flex flex-wrap mt-6 gap-4">
                {Object.keys(popularArtists).map((key) => (
                  <ArtistCard
                    key={key}
                    onClick={() => handlePlaylistSelect(key)}
                    onPlay={() => handlePlaylistPlayPause(key)}
                    imgSrc={popularArtists[key].frontimg}
                    altText={key}
                    artistName={key}
                    isPlaying={isPlaying && currentPlaylist === key}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {isControlBarVisible && (
        <>
          <MusicControls
            currentSong={currentPlayingSongs[currentSongIndex]}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onPrev={handlePrevSong}
            onNext={handleNextSong}
            onRepeatToggle={handleRepeatToggle}
            onShuffleToggle={handleMusicControlShuffleToggle}
            isRepeat={isRepeat}
            isShuffle={isShuffle}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
          />
          <audio
            ref={audioRef}
            src={currentPlayingSongs[currentSongIndex]?.mp3Src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleAudioLoaded}
            onEnded={isRepeat ? () => audioRef.current.play() : handleNextSong}
          />
        </>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0.5rem;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
        .custom-scrollbar {
          scroll-behavior: smooth;
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  );
}
