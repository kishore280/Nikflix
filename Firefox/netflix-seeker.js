// Progress Bar Seeker
window.addEventListener("netflixSeekTo", (e) => {
	const seekTime = e.detail;

	try {
		const player = netflix.appContext.state.playerApp.getAPI().videoPlayer;
		const sessionId = player.getAllPlayerSessionIds()[0];
		const videoPlayer = player.getVideoPlayerBySessionId(sessionId);
		videoPlayer.seek(seekTime);
	} catch (err) {
		console.error("[Netflix Ext] Seek failed", err);
	}
});

// Thumbnail root fetcher — runs in page context so window.netflix is accessible
window.addEventListener("netflixRequestThumbnailRoot", () => {
	try {
		const player = netflix.appContext.state.playerApp.getAPI().videoPlayer;
		const sessionId = player.getAllPlayerSessionIds()[0];
		const videoPlayer = player.getVideoPlayerBySessionId(sessionId);
		let imgRoot = null;
		if (typeof videoPlayer.getProgressImageRoot === "function") {
			imgRoot = videoPlayer.getProgressImageRoot();
		}
		window.dispatchEvent(
			new CustomEvent("netflixThumbnailRootResponse", { detail: imgRoot })
		);
	} catch (err) {
		console.error("[Netflix Ext] Get thumbnail root failed", err);
		window.dispatchEvent(
			new CustomEvent("netflixThumbnailRootResponse", { detail: null })
		);
	}
});
