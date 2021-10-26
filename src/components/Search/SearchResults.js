import React, { useState, useEffect } from 'react'

import './SearchResults.scss'

import TrackResult from './TrackResult'
import ArtistResult from './ArtistResult'
import AlbumResult from './AlbumResult'

const TrackSearchResults = ({ searchResults, chooseTrack }) => {
	const [isSearching, setIsSearching] = useState(false)
	useEffect(() => {
		typeof searchResults.tracks !== 'string'
      && typeof searchResults.artists !== 'string'
      && typeof searchResults.albums !== 'string'
    ? setIsSearching(true) : setIsSearching(false)
	}, [searchResults])

	return (
		<div className='search-results-con'>
			<h2>Search Results:</h2>
			<div className='sub-results-con'>
				<h3 className='search-results-title'>Songs</h3>
				{isSearching ? searchResults.tracks.map((track) =>
        <TrackResult chooseTrack={chooseTrack} key={track.uri} track={track} />)
          : <h3>No tracks found</h3>}
			</div>
      <div className='sub-results-con'>
				<h3 className='search-results-title'>Artists</h3>
				{isSearching ? searchResults.artists.map((artist) =>
        <ArtistResult key={artist.uri} artist={artist} />)
          : <h3>No Artists Found</h3>}
			</div>
      <div className='sub-results-con'>
				<h3 className='search-results-title'>Albums</h3>
				{isSearching ? searchResults.albums.map((album) =>
        <AlbumResult key={album.uri} album={album} />)
          : <h3>No Albums Found</h3>}
			</div>
		</div>
	)
}

export default TrackSearchResults
