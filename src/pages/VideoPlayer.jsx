import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Minimize, ChevronLeft, Download, FileText, CheckCircle, VolumeX, Settings, Subtitles, X, EyeOff } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data/courses';

const PrivacyCurtain = () => {
  const [isFocused, setIsFocused] = useState(document.hasFocus());

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Also check visibility state for tab switching
    const handleVisibilityChange = () => {
      setIsFocused(!document.hidden && document.hasFocus());
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (isFocused) return null;

  return (
    <div className="privacy-curtain">
      <div className="text-center p-8">
        <EyeOff size={48} className="mx-auto mb-4 text-primary" />
        <h2 className="text-xl font-bold text-white mb-2">Video Paused</h2>
        <p className="text-gray-400">Return to this window to continue watching.</p>
        <p className="text-xs text-gray-500 mt-4">Screen recording is restricted.</p>
      </div>
    </div>
  );
};

const DynamicWatermark = () => {
  const [position, setPosition] = useState({ top: '10%', left: '10%' });

  useEffect(() => {
    const moveWatermark = () => {
      const top = Math.floor(Math.random() * 80) + 10 + '%';
      const left = Math.floor(Math.random() * 80) + 10 + '%';
      setPosition({ top, left });
    };

    const intervalId = setInterval(moveWatermark, 5000); // Move every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="dynamic-watermark"
      style={{ top: position.top, left: position.left }}
    >
      <div className="watermark-content">
        <span className="text-xs font-bold text-white opacity-20">
          COPYRIGHT PROTECTED<br />
          {new Date().toLocaleString()}
        </span>
      </div>
    </div>
  );
};



export default function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activePdf, setActivePdf] = useState(null);

  // Player State
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [qualityLevel, setQualityLevel] = useState('default');
  const controlsTimeoutRef = useRef(null);
  const playerContainerRef = useRef(null);
  const iframeRef = useRef(null);

  // ... useEffects ...

  const toggleCaptions = () => {
    const newStatus = !captionsEnabled;
    setCaptionsEnabled(newStatus);
    if (player && player.loadModule) {
      if (newStatus) {
        player.loadModule("captions");  // Workaround for some players
        player.setOption("captions", "track", { "languageCode": "en" }); // Try to force English
      } else {
        player.unloadModule("captions");
        player.setOption("captions", "track", {});
      }
    }
  };

  const toggleQuality = () => {
    // Define supported qualities map: Internal API Value -> Display Label
    const qualityMap = [
      { val: 'default', label: 'Auto' },
      { val: 'medium', label: '360p' },
      { val: 'hd720', label: '720p' },
      { val: 'hd1080', label: '1080p' }
    ];

    // Find current index
    const currentIdx = qualityMap.findIndex(q => q.val === qualityLevel) !== -1
      ? qualityMap.findIndex(q => q.val === qualityLevel)
      : 0;

    const nextIdx = (currentIdx + 1) % qualityMap.length;
    const nextQuality = qualityMap[nextIdx];

    setQualityLevel(nextQuality.val);
    if (player && player.setPlaybackQuality) {
      player.setPlaybackQuality(nextQuality.val);
    }
  };

  const getQualityLabel = (val) => {
    if (val === 'medium') return '360p';
    if (val === 'hd720') return '720p';
    if (val === 'hd1080') return '1080p';
    if (val === 'auto' || val === 'default') return 'Auto';
    return 'Auto'; // Default fallback
  };

  // ... (existing useEffects can stay mostly same, but make sure speed persists if needed) 

  const togglePlaybackSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (player && player.setPlaybackRate) {
      player.setPlaybackRate(nextSpeed);
    }
  };

  useEffect(() => {
    const course = courses.find(c => c.id === parseInt(id));
    if (course) {
      setCurrentCourse(course);
      if (course.playlist && course.playlist.length > 0) {
        setActiveLesson(course.playlist[0]);
      }
    }
  }, [id]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => setIsApiReady(true);
    } else {
      setIsApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (activeLesson && isApiReady && !player) {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: activeLesson.videoId,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'rel': 0,
          'modestbranding': 1,
          'showinfo': 0,
          'iv_load_policy': 3
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    } else if (activeLesson && isApiReady && player) {
      // Reset state for new video
      setCurrentTime(0);
      setDuration(0);
      player.loadVideoById(activeLesson.videoId);
    }
  }, [activeLesson, isApiReady]);

  useEffect(() => {
    if (player && player.setPlaybackRate) {
      player.setPlaybackRate(playbackSpeed);
    }
  }, [player, playbackSpeed]);

  // Global event listener to block Print, Save, and Right-Click when PDF is open
  useEffect(() => {
    if (!activePdf) return;

    const handleKeyDown = (e) => {
      // Block Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }
      // Block Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }
      // Block F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Block Ctrl+Shift+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
        e.preventDefault();
      }
      // Block Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, [activePdf]);


  // Removed createPlayer function as it is no longer needed separately

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressLoop();
      // IMPORTANT: Update duration when video actually starts, 
      // as loadVideoById doesn't trigger onReady again.
      if (event.target && event.target.getDuration) {
        const dur = event.target.getDuration();
        if (dur) setDuration(dur);
      }
    } else {
      setIsPlaying(false);
      if (event.data === window.YT.PlayerState.ENDED) {
        handleNext();
      }
    }
  };

  const startProgressLoop = () => {
    if (playerInterval.current) clearInterval(playerInterval.current);
    playerInterval.current = setInterval(() => {
      if (player && player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 100);
  };

  const playerInterval = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    player.seekTo(newTime);
  };

  const handleVolume = (e) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    player.setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      player.unMute();
      player.setVolume(volume || 100);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current) {
        playerContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  const handleNext = () => {
    const currentIndex = currentCourse.playlist.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < currentCourse.playlist.length - 1) {
      setActiveLesson(currentCourse.playlist[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = currentCourse.playlist.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLesson(currentCourse.playlist[currentIndex - 1]);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const totalSeconds = Math.floor(time);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentCourse || !activeLesson) {
    return <div className="text-white text-center py-20">Loading course...</div>;
  }

  return (
    <div className="video-page">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-6">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <ChevronLeft size={20} /> Back to Courses
        </button>

        <div className="video-layout">
          <div className="main-player">
            <div
              ref={playerContainerRef}
              className={`player-container glass ${isFullScreen ? 'fullscreen' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setShowControls(false)}
            >
              <div id="youtube-player" className="absolute inset-0 w-full h-full"></div>

              {/* PRIVACY SHIELD: Blocks screen when window loses focus */}
              <PrivacyCurtain />

              {/* DYNAMIC WATERMARK: Deters recording by stamping the video */}
              <DynamicWatermark />

              {/* Click Blocker to prevent interaction with YouTube UI */}
              <div
                className="click-blocker"
                onClick={togglePlay}
              ></div>

              {/* Custom Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="video-overlay"
                  >
                    <div className="video-controls-wrapper">
                      {/* Progress Bar */}
                      <div className="progress-container">
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          step="any"
                          value={currentTime}
                          onChange={handleSeek}
                          className="seek-slider"
                        />
                      </div>

                      <div className="controls-row">
                        <div className="left-controls">
                          <button onClick={handlePrev} className="ctrl-btn"><SkipBack size={24} /></button>
                          <button onClick={togglePlay} className="ctrl-btn play-pause">
                            {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
                          </button>
                          <button onClick={handleNext} className="ctrl-btn"><SkipForward size={24} /></button>

                          <div className="volume-control">
                            <button onClick={toggleMute} className="ctrl-btn">
                              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={isMuted ? 0 : volume}
                              onChange={handleVolume}
                              className="volume-slider"
                            />
                          </div>

                          <span className="time-display">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="right-controls">
                          <button onClick={toggleCaptions} className={`ctrl-btn ${captionsEnabled ? 'text-primary' : ''}`} title="Subtitles/CC">
                            <Subtitles size={20} />
                          </button>

                          {/* Quality Button - Visual Only mostly due to YT API restrictions */}
                          <button onClick={toggleQuality} className="ctrl-btn quality-btn" title="Quality">
                            <Settings size={18} className="translate-y-[1px]" />
                            <span className="text-[10px] uppercase font-bold ml-1">{getQualityLabel(qualityLevel)}</span>
                          </button>

                          <button onClick={togglePlaybackSpeed} className="ctrl-btn speed-btn" title="Speed">
                            <span className="speed-text font-bold">{playbackSpeed}x</span>
                          </button>
                          <button onClick={toggleFullScreen} className="ctrl-btn">
                            {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="video-info mt-8">
              <h1>{activeLesson.id}. {activeLesson.title}</h1>
              <p className="text-muted mt-2">
                {currentCourse.description}
              </p>
            </div>
          </div>

          <aside className="video-sidebar glass">
            <h3>{currentCourse.title}</h3>
            <div className="lesson-list">
              {currentCourse.playlist.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`lesson-item ${activeLesson.id === lesson.id ? 'active' : ''}`}
                  onClick={() => setActiveLesson(lesson)}
                >
                  <div className="num">
                    {activeLesson.id > lesson.id ? <CheckCircle size={14} color="#4ade80" /> : lesson.id}
                  </div>
                  <div className="details">
                    <span className="title">{lesson.title}</span>
                    <span className="duration">{lesson.duration}</span>
                  </div>
                  {activeLesson.id === lesson.id && <div className="playing-indicator"></div>}
                </div>
              ))}
            </div>

            {currentCourse.materials && currentCourse.materials.length > 0 && (
              <div className="resources mt-8">
                <h3>Resources</h3>
                <div className="lesson-list">
                  {currentCourse.materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setActivePdf(material)}
                      className="resource-item w-full text-left"
                    >
                      <FileText size={18} />
                      <span>{material.title} (Read Only)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {activePdf && (
          <div
            className="pdf-modal-overlay"
            onClick={() => setActivePdf(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="pdf-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="pdf-header">
                <h3>{activePdf.title}</h3>
                <button onClick={() => setActivePdf(null)} className="close-pdf-btn">
                  <X size={24} />
                </button>
              </div>
              <div className="pdf-container">
                <div className="pdf-iframe-wrapper">
                  {/* The Shield: Blocks Right Click / Save As directly on the PDF area */}
                  <div
                    className="pdf-shield"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  ></div>
                  <iframe
                    ref={iframeRef}
                    src={`${activePdf.url}#toolbar=0&navpanes=0&view=FitH&scrollbar=0&page=1`}
                    className="pdf-iframe"
                    title={activePdf.title}
                  />
                </div>
              </div>
              <div className="pdf-footer">
                <p className="text-xs text-muted text-center italic">
                  Digital Copy Protected. For internal viewing only.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .video-page { min-height: 100vh; background: var(--bg-dark); }
        .player-container.fullscreen {
            width: 100%;
            height: 100%;
            border-radius: 0;
            border: none;
            max-height: none;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          margin-bottom: 24px;
          font-weight: 500;
        }
        .back-btn:hover { color: var(--primary); }
        .video-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }
        .player-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #000;
          border-bottom: 1px solid var(--primary);
          border-radius: 16px;
        }
        
        .click-blocker {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 5; /* Above YouTube iframe (usually z-index 0 or 1), but below controls */
            cursor: pointer;
        }
        .video-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(transparent 50%, rgba(0,0,0,0.9));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 30px;
          pointer-events: none; 
          z-index: 10; /* Ensure controls are above the blocker */
        }
        .video-controls-wrapper {
            pointer-events: auto;
            width: 100%;
        }

        .seek-slider {
            width: 100%;
            height: 4px;
            -webkit-appearance: none;
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
            cursor: pointer;
            transition: height 0.2s;
        }
        .seek-slider:hover { height: 6px; }
        .seek-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--primary);
            cursor: pointer;
        }

        .controls-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        .left-controls, .right-controls {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .ctrl-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.9;
            transition: all 0.2s;
            display: flex;
            align-items: center;
        }
        .ctrl-btn:hover {
            opacity: 1;
            color: var(--primary);
            transform: scale(1.1);
        }
        .time-display {
            font-size: 0.9rem;
            color: white;
            font-variant-numeric: tabular-nums;
        }
        
        .volume-control {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 120px;
        }
        .volume-slider {
            flex: 1;
            height: 4px;
            -webkit-appearance: none;
            background: rgba(255,255,255,0.3);
            border-radius: 2px;
        }
        .volume-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
        }

        .video-sidebar {
          padding: 30px;
          height: fit-content;
          max-height: 80vh;
          overflow-y: auto;
        }
        .video-sidebar::-webkit-scrollbar { width: 4px; }
        .video-sidebar h3 { margin-bottom: 20px; font-size: 1.1rem; }
        .lesson-list { display: flex; flex-direction: column; gap: 10px; }
        .lesson-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
          border: 1px solid transparent;
        }
        .lesson-item:hover { background: rgba(255,255,255,0.05); }
        .lesson-item.active { 
            background: rgba(212, 175, 55, 0.1); 
            border-color: var(--primary-glow); 
        }
        .lesson-item .num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .lesson-item.active .num { background: var(--primary); color: #000; }
        .lesson-item .details { flex: 1; display: flex; flex-direction: column; }
        .lesson-item .title { font-size: 0.9rem; font-weight: 500; color: white; }
        .lesson-item .duration { font-size: 0.75rem; color: var(--text-muted); }
        .resource-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          font-size: 0.9rem;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .resource-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--primary-glow);
          color: var(--primary);
        }
        .mt-8 { margin-top: 2rem; }
        .ms-auto { margin-left: auto; }
        .cursor-pointer { cursor: pointer; }

        .quality-btn {
            display: flex;
            align-items: center;
            min-width: 45px;
        }
        .speed-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.9rem;
            font-weight: 600;
            width: 40px;
            justify-content: center;
        }
        @media (max-width: 1024px) {
          .video-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .video-sidebar { 
            max-height: none;
            order: 2;
          }
          .main-player {
            order: 1;
          }
        }
        @media (max-width: 768px) {
          .video-page .max-w-7xl {
            padding-left: 16px;
            padding-right: 16px;
          }
          .player-container {
            border-radius: 12px;
          }
          .video-sidebar {
            padding: 20px;
          }
          .controls-row {
            gap: 10px;
          }
          .left-controls, .right-controls {
            gap: 10px;
          }
          .volume-control {
            width: 80px;
          }
          .time-display {
            font-size: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .back-btn {
            font-size: 0.9rem;
          }
          .video-sidebar {
            padding: 16px;
          }
          .video-sidebar h3 {
            font-size: 1rem;
          }
          .ctrl-btn {
            padding: 4px;
          }
          .volume-control {
            display: none; /* Hide volume slider on very small screens */
          }
        }

        /* Restricted PDF Viewer Styles */
        .pdf-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .pdf-modal {
          width: 95%;
          max-width: 1200px;
          height: 92vh;
          background: #1a1a1a;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--primary);
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }
        .pdf-header {
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
          background: rgba(212, 175, 55, 0.05);
        }
        .pdf-header h3 { color: var(--primary); margin: 0; font-size: 1.1rem; }
        .close-pdf-btn { 
          background: none; 
          border: none; 
          color: white; 
          cursor: pointer;
          opacity: 0.7;
          transition: 0.2s;
        }
        .close-pdf-btn:hover { opacity: 1; transform: scale(1.1); color: var(--primary); }
        .pdf-container { 
          flex: 1; 
          position: relative; 
          background: #222; 
          overflow: auto; 
          -webkit-overflow-scrolling: touch;
        }
        .pdf-iframe { 
          width: 100%; 
          height: 100%; 
          border: none;
          display: block;
        }
        .pdf-footer { 
          padding: 12px; 
          text-align: center; 
          background: #000; 
          border-top: 1px solid #333; 
        }
        .resource-item.w-full {
          border: 1px solid rgba(212, 175, 55, 0.1);
          background: rgba(212, 175, 55, 0.03);
          width: 100%;
          text-align: left;
        }
        .resource-item.w-full:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-2px);
        }

        @media print {
          body * {
            visibility: hidden;
            display: none !important;
          }
          .pdf-modal-overlay, .pdf-modal, .pdf-container, .pdf-iframe-wrapper, .pdf-iframe {
            display: none !important;
            visibility: hidden !important;
          }
        }

        .pdf-iframe-wrapper {
          position: relative;
          width: 100%;
          min-height: 20000px; /* Force large height to allow container scrolling */
          background: #222;
        }

        .pdf-shield {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 20;
          background: transparent;
          cursor: default;
        }

        .pdf-iframe { 
          width: 100%; 
          height: 20000px; /* Match wrapper height */
          border: none;
          display: block;
          pointer-events: none; /* Let clicks pass to shield but NOT to PDF internal UI */
        }

        .privacy-curtain {
            position: absolute;
            inset: 0;
            background: #000;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .dynamic-watermark {
            position: absolute;
            z-index: 50; /* Above video, below controls */
            pointer-events: none;
            transition: all 2s ease-in-out;
            user-select: none;
        }
        .watermark-content {
            background: rgba(0,0,0,0.1);
            padding: 10px;
            border-radius: 8px;
            transform: rotate(-15deg);
            backdrop-filter: blur(1px);
        }
      `}</style>
    </div>
  );
}
