import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import WaveSurferTimeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import { WaveForm } from "wavesurfer-react";
import Data from "./transcript.json";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import "./CustomAudioPlayer.css";

export default function CustomAudioPlayer({ src, transcriptFilter }) {
  const wavesurferRef = useRef(null);
  const timelineRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const volumeRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [filtredTranscript, setFilteredTranscript] = useState(Data);

  useEffect(() => {
    if(transcriptFilter) {
      const response = Data.filter((res) => res.text.includes(transcriptFilter));
      setFilteredTranscript(response);
    } else {
      setFilteredTranscript(Data);
    }
  }, [transcriptFilter])
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      waveColor: "#c7bcf1",
      progressColor: "#6b42de",
      cursorWidth: 1,
      scrollParent: true,
      hideScrollbar: true,
      cursorColor: "#6b42de",
      barWidth: 2,
      barGap: 2,
      height: 100,
      normalize: true,
      responsive: true,
      backend: "WebAudio",
      mediaControls: true,
      mono: true,
      plugins: [
        WaveSurferTimeline.create({
          container: timelineRef.current,
          scrollParent: true,
        }),
      ],
    });
    wavesurfer.load(src);
    setAudioSrc(wavesurfer);
    wavesurfer.on("audioprocess", () => {
      updateTranscript(wavesurfer.getCurrentTime());
    });
    return () => {
      wavesurfer.destroy();
    };
  }, [src]);

  useEffect(() => {
    const currentTranscriptItem = document.querySelector(".highlight");
    if (currentTranscriptItem) {
      currentTranscriptItem.scrollIntoView({
        block: "center",
        inline: "nearest",
      });
    }
  }, [currentTime]);

  function updateTranscript(time) {
    setCurrentTime(time);
  }

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    audioSrc.setVolume(newVolume);
    setVolume(newVolume);
  }

  const handlePlayPause = () => {
    audioSrc.playPause();
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (remainingSeconds < 10
        ? "0" + Math.trunc(remainingSeconds)
        : Math.trunc(remainingSeconds))
    );
  }

  return (
    <div>
      <div style={{ background: "#eef0f9" }} ref={wavesurferRef} />
      <div ref={timelineRef} />
      <WaveForm
        id="waveform"
        waveSurfer={wavesurferRef.current}
        onWaveformReady={(waveform) => {
          waveform.addPlugin(
            TimelinePlugin.create({
              container: waveform.container,
              scrollParent: true,
            })
          );
        }}
        onPosChange={updateTranscript}
      />
      <div style={{ height: "4vh" }}>
        <img
          src="/icons/playPause.png"
          style={{ marginTop: ".5vh", float: "left" }}
          onClick={handlePlayPause}
        />
        <div style={{ float: "right" }}>
          <img
            src="/icons/volume.svg"
            style={{ marginTop: ".5vh", verticalAlign: "middle" }}
            onClick={handlePlayPause}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            ref={volumeRef}
            onChange={handleVolumeChange}
            style={{
              marginLeft: "1vh",
              marginTop: "1vh",
              verticalAlign: "middle",
            }}
          />
        </div>
      </div>
      <hr />
      <div style={{ overflow: "scroll", height: "48vh" }}>
        {filtredTranscript.map((item, index) => (
          <div key={index}>
            <pre>
              <b style={{ color: "#828282" }}>
                {item.speakerName} - {formatTime(item.startTime)}
              </b>
            </pre>
            <span
              id={`transcript-item-${item.id}`}
              className={`transcript-item ${
                item.startTime <= currentTime && currentTime <= item.endTime
                  ? "highlight"
                  : ""
              }`}
            >
              <p
                style={{
                  background:
                    item.speakerName === "Sandy" ? "#eef0f9" : "#f2f2f2",
                  color: item.speakerName === "Sandy" ? "#6b42de" : "#828282",
                  width: "22vw",
                  padding: "1vh",
                  borderRadius: "1vh",
                }}
              >
                {item.text}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
