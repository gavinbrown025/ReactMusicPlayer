import React, { useState, useEffect } from 'react'

import './SearchView.scss'

import { useDataLayerValue } from '../../store/DataLayer'


import TrackResult from '../Search/TrackResult'
import ArtistResult from '../Search/ArtistResult'
import AlbumResult from '../Search/AlbumResult'

const SearchView = ({ chooseTrack }) => {

    const [{ searchResults }, dispatch] = useDataLayerValue()

	return (
		<div className='search-results-con'>
			<h2>Search Results:</h2>
			<div className='sub-results-con'>
				<h3 className='search-results-title'>Songs</h3>
				{!searchResults.tracks.length === 0 ?
                    <h3>No tracks found</h3> :
                    searchResults.tracks.map((track) =>
                        <TrackResult chooseTrack={chooseTrack} key={track.track.uri} track={track} />
                    )}
			</div>
			<div className='sub-results-con'>
				<h3 className='search-results-title'>Artists</h3>
				{!searchResults.artists.length === 0 ?
                    <h3>No Artists Found</h3> :
                    searchResults.artists.map((artist) =>
                        <ArtistResult key={artist.uri} artist={artist} />
                    )}
			</div>
			<div className='sub-results-con'>
				<h3 className='search-results-title'>Albums</h3>
				{!searchResults.albums.length === 0 ?
                    <h3>No Albums Found</h3> :
                    searchResults.albums.map((album) => 
                        <AlbumResult key={album.uri} album={album} />
                    )}
			</div>
		</div>
	)
}

export default SearchView
