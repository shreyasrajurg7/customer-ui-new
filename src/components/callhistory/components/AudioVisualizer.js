import { useRef, useState, useEffect, useCallback } from "react";
// Import WaveSurfer
import WaveSurfer from "wavesurfer.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline";

import sampleAudio from "./sample.mp3";

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
      waveColor: "#5b5773",
      progressColor: "#ffffff",
      cursorColor: "#ddd5e9",
      cursorWidth: 2,
      barWidth: 3,
      barGap: 2,
    });
    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const volumeRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const wavesurfer = useWavesurfer(containerRef, props);

  console.log({ wavesurfer });
  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // useEffect(() => {
  //   if (blobData && wavesurfer) wavesurfer.load(blobData);
  // }, [blobData, wavesurfer])

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => {
        if (typeof unsub === "function") unsub();
      });
    };
  }, [wavesurfer]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ minHeight: "80px", border: "1px solid #e2e2e2a5" }}
      />
      <img
        onClick={onPlayClick}
        style={{ marginTop: "1em" }}
        src="/icons/playPause.png"
      />
      {/* <p style={{ color: 'white'}}>Seconds played: {currentTime}</p> */}
    </>
  );
};

export const AudioVisualizer = () => {
  return (
    <>
      <WaveSurferPlayer
        height={50}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        //url={callContent?.call_audio_url} 
        url={sampleAudio}
        plugins={[Timeline.create()]}
      />
    </>
  );
};
