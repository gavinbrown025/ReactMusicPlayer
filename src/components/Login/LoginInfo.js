const LoginInfo = () => {
	return (
		<div className='app-desc'>
			<h1 className='hidden'>Welcome to Alto</h1>
			<p>
				Alto is a App developed by yours truly as a demonstration of my work with React.js thus far. Powered by the Spotify Developers' API, Alto allows you to access your music, playlist, as well as
				recommendations from your Spotify account.
			</p>
			<h3>Features include:</h3>
			<ul>
				<li>An automatically built playlist based on your recent preferences.</li>
				<li>Tracks picked played from Searches or Dashboard automatically build a playlist based on the selection.</li>
				<li>Search for Songs, Artists, Albums.</li>
				<li>Go To artist Page and see their Top Tracks and Recent Albums.</li>
				<li>Select and play whole Albums and Playlists.</li>
				<li>Lyrics available of current song playing in queue.</li>
			</ul>
		</div>
	)
}

export default LoginInfo
