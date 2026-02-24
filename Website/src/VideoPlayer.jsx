import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ videoUrl, onVideoEnd }) => {
  const playerRef = useRef(null); // Reference for YouTube player instance
  const [isPlayerReady, setIsPlayerReady] = useState(false); // Track player readiness
  const [error, setError] = useState(false);

  useEffect(() => {
    const initializePlayer = () => {
      // Check if YouTube API script is already loaded
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // When the YouTube Iframe API is ready, create the player
        window.onYouTubeIframeAPIReady = () => createPlayer(videoUrl);
      } else {
        // If API is already loaded, directly create the player
        createPlayer(videoUrl);
      }
    };

    const createPlayer = (url) => {
      const videoId = extractVideoId(url);

      // Create a new player only if it doesn't already exist
      if (!playerRef.current) {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId,
          events: {
            onReady: () => setIsPlayerReady(true), // Set player readiness
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onVideoEnd(url); // Call onVideoEnd when video finishes
              }
            },
          },
        });
      } else if (isPlayerReady && videoId) {
        // Load new video only if the player is ready
        playerRef.current.loadVideoById(videoId);
      } else {
        console.error("YouTube Player is not ready.");
      }
    };

    const extractVideoId = (url) => {
      // Extract YouTube video ID from various URL formats
      const match = url.match(/(?:v=|embed\/|youtu.be\/)([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    };

    // Initialize the player
    initializePlayer();
  }, [videoUrl, onVideoEnd, isPlayerReady]);

  return (
    <div className="w-full h-full">
      {error ? (
        <p className="text-white text-center text-xl">
          Unable to load video. Please check the video URL or try again later.
        </p>
      ) : (
        <div id="youtube-player" className="w-full h-full"></div>
      )}
    </div>
  );
};

export default VideoPlayer;
