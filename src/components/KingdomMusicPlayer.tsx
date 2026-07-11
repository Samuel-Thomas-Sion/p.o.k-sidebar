import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2, VolumeX, Search } from 'lucide-react';

function formatTime(s: number) {
  if (isNaN(s) || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

export default function KingdomMusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState("ALL");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const playerRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const [playlist, setPlaylist] = useState([
    { title: "Imagine Dragons - Believer", id: "igulXNL1Kz0" },
    { title: "Imagine Dragons - Thunder", id: "GtEvysh1654" },
    { title: "Imagine Dragons - Demons", id: "MA0aCUxItYA" },
    { title: "Imagine Dragons - Radioactive", id: "vJao1u2uBqY" },
    { title: "Imagine Dragons - Whatever It Takes", id: "UsuF4jJ4sgA" },
    { title: "Imagine Dragons - It’s Time", id: "NASqUELHjPE" },
    { title: "Imagine Dragons - On Top of the World", id: "cxmMD5OvYRQ" },
    { title: "Imagine Dragons - Next to Me", id: "axS6L0NX7VE" },
    { title: "Imagine Dragons - Natural", id: "V5M2WZiAy6k" },
    { title: "Imagine Dragons - Shots", id: "N-awc3YAncM" },
    { title: "Alan Walker - Faded", id: "qdpXxGPqW-Y" },
    { title: "Alan Walker - Sing Me to Sleep", id: "K7UGaydx7NI" },
    { title: "Alan Walker - Alone", id: "bPs0xFd4skY" },
    { title: "Alan Walker - Darkside", id: "sdAOoB5ML0Q" },
    { title: "Alan Walker - The Spectre", id: "qHDJSRlNhVs" },
    { title: "Alan Walker - All Falls Down", id: "KJZsy_8Lyws" },
    { title: "Alan Walker & K-391 - Ignite", id: "zrwTYozyzYA" },
    { title: "Alan Walker - Diamond Heart", id: "c9R9VsK54ZQ" },
    { title: "Alan Walker - Tired", id: "YnaEoCY_vzc" },
    { title: "Alan Walker - On My Way", id: "fm-nXA-K0Dg" },
    { title: "Alan Walker & Ava Max - Alone, Pt. II", id: "GPvBmcoriNo" },
    { title: "Alan Walker - Heading Home", id: "HFuVhJySO2o" },
    { title: "Alan Walker - Believers", id: "LClEtrHvxfo" },
    { title: "Alan Walker - Lost Control", id: "-Ed-GNq2EyU" },
    { title: "Alan Walker - Play", id: "yDk7k06-E4w" },
    { title: "Alan Walker, K-391 & Emelie Hollow - Lily", id: "ox4tmEV6-QU" },
    { title: "Alan Walker, K-391 & Boy In Space - Paradise", id: "TG_0_OdkwN0" },
    { title: "Alan Walker & Sofia Carson - Different World", id: "6ow6MueyJOQ" },
    { title: "K-391, Alan Walker & Ahrix - End of Time", id: "CaZXdZGZfb0" },
    { title: "Alan Walker - Live Fast", id: "eABUCA8BmTg" },
    { title: "American Authors - Best Day of My Life", id: "vJ9KFEJVISo" },
    { title: "American Authors - Go Big or Go Home", id: "iZzFmnx4QmA" },
    { title: "X Ambassadors - Renegades", id: "8j741TUIET0" },
    { title: "The Script - Superheroes", id: "xP3LUSHj2J0" },
    { title: "Coldplay - Adventure of a Lifetime", id: "y6y8bfyUWOw" },
    { title: "Coldplay - A Sky Full of Stars", id: "VPRjCeoBqrI" },
    { title: "OneRepublic - Love Runs Out", id: "KkVID7tMUbE" },
    { title: "OneRepublic - Counting Stars", id: "mgT0N3tMP74" },
    { title: "Bastille - Pompeii", id: "cvQ2LF3hyuY" },
    { title: "Fall Out Boy - My Songs Know What You Did in the Dark", id: "i0oSTgq7Bvc" },
    { title: "Top of the World", id: "sjLRh-QPM9c" },
    { title: "Wolves", id: "s2uLELuQvjw" },
    { title: "Who I Am", id: "PFs7egR2iDE" },
    { title: "Only One King", id: "3BFuQicL2WI" },
    { title: "Money Run Low", id: "facc6KUJYcM" },
    { title: "Legends Are Made", id: "i2hL_NuodtU" },
    { title: "Life Force", id: "bkjchS0PTl0" },
    { title: "Montage Rugada", id: "Hd5nXTyaXZg" },
    { title: "Born For This", id: "aJ5IzGBnWAc" },
    { title: "Glory", id: "i3ucSSVJTL4" },
    { title: "Stronger", id: "cNld-AHw-Wg" },
    { title: "Rise", id: "fB8TyLTD7EE" },
    { title: "The Phoenix", id: "5JqY-6q-RNA" },
    { title: "Warriors", id: "wPQEeBAXou0" },
    { title: "The Resistance", id: "SKnRdQiH3-k" },
    { title: "Hall Of Fame", id: "3Kxf2dHlDpQ" },
    { title: "Montagem Xonada", id: "JjPtDl6EJ3o" },
    { title: "No Batidao", id: "GXioir-fujY" },
    { title: "Papa Roach – Born for Greatness", id: "WFZVaycG-7I" },
    { title: "Linkin Park – Battle Symphony", id: "D7ab595h0AU" },
    { title: "Coldplay – Viva la Vida", id: "y4zdDXPYo0I" },
    { title: "Twenty One Pilots – Heathens", id: "zq2pagG8_ok" },
    { title: "Muse – Uprising", id: "itUJUs95LqU" },
    { title: "Fall Out Boy – Immortals", id: "UmyGVS5krMs" },
    { title: "Skillet – Feel Invincible", id: "J4JisubEvSI" },
    { title: "AWOLNATION – Run (Wake Up)", id: "NQPDm-GdmAs" },
    { title: "OneRepublic – I Lived", id: "KINfQbfZwik" },
    { title: "Macklemore & Ryan Lewis – Can’t Hold Us", id: "qWMNO8gq_cg" },
    { title: "Macklemore – Glorious (ft. Skylar Grey)", id: "GTyEsIMefzc" },
    { title: "Rachel Platten – Fight Song", id: "-a1qTzh16hY" },
    { title: "Welshly Arms – Legendary", id: "4yTB3Cu8W0g" },
    { title: "Demi Lovato – Skyscraper", id: "QiTJ0658WvE" },
    { title: "Beyoncé – Halo", id: "pCSL48AI_Ms" },
    { title: "Queen – We Will Rock You", id: "y3Ca3c6J9N4" },
    { title: "Queen – We Are the Champions", id: "d5GkgVhFeZY" },
    { title: "AC/DC – Thunderstruck", id: "skwZ5MQ7CfE" },
    { title: "Smash Mouth – I’m a Believer", id: "bWqmc8qxEps" },
    { title: "U2 – Elevation", id: "19KstSgU-c0" },
    { title: "U2 – Beautiful Day", id: "hJ_burYdegk" },
    { title: "Avenged Sevenfold – Carry On", id: "rXNlFiMaPMA" },
    { title: "P!nk – Just Like Fire", id: "k0ZmztU-X2I" },
    { title: "Train – Drive By", id: "maklLfjCO90" },
    { title: "Flo Rida – Good Feeling", id: "EO6ZFcBd3hg" },
    { title: "Pitbull – Give Me Everything (ft. Ne-Yo)", id: "3MqUW5txLjs" },
    { title: "The Chainsmokers & Coldplay – Something Just Like This", id: "fZUfdnmtg4Y" },
    { title: "Ellie Goulding – Burn", id: "VRcQsgjo7ZQ" },
    { title: "Justin Timberlake – Can’t Stop The Feeling!", id: "0Ui-QzihJGo" },
    { title: "Bruno Mars – Just The Way You Are", id: "u7XjPmN-tHw" },
    { title: "Rachel Platten – Stand By You", id: "-urmcz2RSwI" },
    { title: "Imagine Dragons – I Bet My Life", id: "KKgwLVqJbho" },
    { title: "Imagine Dragons – Warriors", id: "wPQEeBAXou0" },
    { title: "The Script – Hall of Fame (ft. Will.I.Am)", id: "dtgoDXEOxTM" },
    { title: "Shinedown – Get Up", id: "2hbqY9kQ6ho" },
    { title: "Nickelback – Burn It to the Ground", id: "ZHuogY04SbI" },
    { title: "Eminem – Not Afraid (Clean Version)", id: "_uuXpXSZYMk" },
    { title: "OneRepublic – All the Right Moves", id: "eYYcQYXMkKU" },
    { title: "Coldplay – Paradise", id: "ymMvDs15htc" },
    { title: "Thirty Seconds to Mars – Kings and Queens", id: "VSiTrGCAbt8" },
    { title: "Avicii – Wake Me Up", id: "5y_KJAg8bHI" },
    { title: "Kygo – Firestone (ft. Conrad Sewell)", id: "XUUjliDBAmk" },
    { title: "Zedd – The Middle (ft. Maren Morris)", id: "Lj6Y6JCu-l4" },
    { title: "David Guetta – Titanium (ft. Sia)", id: "Xn_kp8OZtc8" },
    { title: "Sia – Unstoppable", id: "oS07d8Gr4tw" },
    { title: "Maroon 5 – Maps", id: "Y7ix6RITXM0" },
    { title: "OneRepublic – Good Life", id: "-Bo4oWK22bk" },
    { title: "Phillip Phillips – Home", id: "jevGL7i1BVQ" },
    { title: "Rachel Platten – Fight Song", id: "XbxNtPiCBK8" },
    { title: "Sara Bareilles – Brave", id: "4Ny_LX3byp8" },
    { title: "Kelly Clarkson – Stronger (What Doesn’t Kill You)", id: "RjZzySx7TmM" },
    { title: "Katy Perry – Rise", id: "2cvB35A3pRU" },
    { title: "Walk The Moon – Shut Up and Dance", id: "0CGH3zm2R7c" },
    { title: "Coldplay – Viva La Vida", id: "y4zdDXPYo0I" },
    { title: "Queen – Don’t Stop Me Now", id: "MHi9mKq0slA" },
    { title: "Macklemore & Ryan Lewis – Can’t Hold Us (ft. Ray Dalton)", id: "xHRkHXjZcg0" },
    { title: "Imagine Dragons – Monster", id: "SWdJdGYfYPw" },
    { title: "Bastille – World Gone Mad", id: "I6IaW8MiuRo" },
    { title: "OneRepublic – Seasons", id: "Ymts4ldfPws" },
    { title: "Journey - Don't Stop Believin'", id: "1k8craCGpgs" },
    { title: "Survivor - Eye of the Tiger", id: "btPJPFnesV4" },
    { title: "Bon Jovi - It's My Life", id: "vx2u5uUu3DE" },
    { title: "Van Halen - Jump", id: "SwYN7mTi6HM" },
    { title: "Swedish House Mafia ft. John Martin - Don't You Worry Child", id: "1y6smkh6c-0" },
    { title: "Maroon 5 ft. Christina Aguilera - Moves Like Jagger", id: "iEPTlhBmwRg" },
    { title: "Journey - Any Way You Want It", id: "atxUuldUcfI" },
    { title: "Aerosmith - Dream On", id: "89dGC8de0CA" },
    { title: "Michael Jackson - Man in the Mirror", id: "PivWY9wn5ps" },
    { title: "Katy Perry - Firework", id: "QGJuMBdaqIw" }
  ]);

  const filteredPlaylist = playlist.map((song, index) => ({ ...song, index })).filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const stateRef = useRef({ currentSongIndex, repeatMode, isPlaying });
  useEffect(() => {
    stateRef.current = { currentSongIndex, repeatMode, isPlaying };
  }, [currentSongIndex, repeatMode, isPlaying]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = document.createElement("div");
    wrapperRef.current.appendChild(el);

    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player(el, {
        height: "100%",
        width: "100%",
        videoId: playlist[stateRef.current.currentSongIndex].id,
        host: 'https://www.youtube.com',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          enablejsapi: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            if (stateRef.current.isPlaying) event.target.playVideo();
            else event.target.pauseVideo();
            event.target.setVolume(parseInt(window.localStorage.getItem('musicVolume') || '60', 10));
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
               setIsPlaying(true);
               setDuration(event.target.getDuration());
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
               setIsPlaying(false);
            } else if (event.data === (window as any).YT.PlayerState.ENDED) {
               const { currentSongIndex, repeatMode } = stateRef.current;
               let nextIndex = currentSongIndex;
               if (repeatMode === "ALL") {
                 nextIndex = (currentSongIndex + 1) % playlist.length;
               } else if (repeatMode === "ONE") {
                 // stay on same index
               }
               setCurrentSongIndex(nextIndex);
               playerRef.current.loadVideoById(playlist[nextIndex].id);
            }
          },
          onError: (event: any) => {
             console.error("YouTube Player Error:", event.data);
             const { currentSongIndex } = stateRef.current;
             let nextIndex = (currentSongIndex + 1) % playlist.length;
             setCurrentSongIndex(nextIndex);
          }
        }
      });
    };

    if (!(window as any).YT && !document.getElementById("youtube-api-script")) {
      const tag = document.createElement("script");
      tag.id = "youtube-api-script";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      const old = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
         if (old) old();
         initPlayer();
      };
    }
    
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById({ videoId: playlist[currentSongIndex].id });
      if (stateRef.current.isPlaying) {
         setTimeout(() => {
            if (playerRef.current && playerRef.current.playVideo) {
               playerRef.current.playVideo();
            }
         }, 100);
      }
    }
  }, [currentSongIndex, playlist]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && isPlaying) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);
  
  const togglePlay = () => {
     if (playerRef.current && playerRef.current.playVideo) {
         if (isPlaying) {
             playerRef.current.pauseVideo();
         } else {
             playerRef.current.playVideo();
         }
     }
  };

  const shufflePlaylist = () => {
    const currentSong = playlist[currentSongIndex];
    const newPlaylist = [...playlist];
    for (let i = newPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPlaylist[i], newPlaylist[j]] = [newPlaylist[j], newPlaylist[i]];
    }
    const newIndex = newPlaylist.findIndex(song => song.id === currentSong.id);
    setPlaylist(newPlaylist);
    setCurrentSongIndex(newIndex !== -1 ? newIndex : 0);
  };
  
  const skipForward = () => {
    let nextIndex = currentSongIndex;
    if (repeatMode === "ALL") {
      nextIndex = (currentSongIndex + 1) % playlist.length;
    } else {
      nextIndex = Math.min(currentSongIndex + 1, playlist.length - 1);
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    let prevIndex = currentSongIndex;
    if (repeatMode === "ALL") {
      prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    } else {
       prevIndex = Math.max(currentSongIndex - 1, 0);
    }
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
     const rect = e.currentTarget.getBoundingClientRect();
     const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
     setVolume(val * 100);
     setIsMuted(false);
     window.localStorage.setItem('musicVolume', (val * 100).toString());
  };
  
  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
     if (playerRef.current && playerRef.current.seekTo && duration > 0) {
       const rect = e.currentTarget.getBoundingClientRect();
       const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
       playerRef.current.seekTo(val * duration, true);
       setCurrentTime(val * duration);
     }
  };

  const toggleRepeatMode = () => {
     setRepeatMode(prev => prev === "ALL" ? "ONE" : "ALL");
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="p-1 h-[400px] flex flex-col font-sans">
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-lg p-3 border border-[#4a3c2b] shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(255,215,0,0.05)] mb-3 relative overflow-hidden shrink-0">
         <div ref={wrapperRef} className="w-full aspect-[16/9] rounded-md overflow-hidden mb-3 bg-black pointer-events-auto relative z-[1]" />
         <div className="flex items-center gap-2 mb-3 relative z-[1]">
             <button
                 onClick={shufflePlaylist}
                 className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white transition-all text-xs"
             >
                 <Shuffle size={12} />
             </button>
             <button
                 onClick={skipBackward}
                 className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white transition-all text-xs"
             >
                 <SkipBack size={12} />
             </button>
             <button
                 onClick={togglePlay}
                 className="w-9 h-9 rounded-full bg-gradient-to-b from-[#b8860b] to-[#8b6508] border border-[#ffd700] cursor-pointer flex items-center justify-center shadow-[0_2px_8px_rgba(184,134,11,0.5)] text-white transition-transform active:scale-95 relative"
             >
                 {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-1" />}
             </button>
             <button
                 onClick={skipForward}
                 className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer flex items-center justify-center text-white transition-all text-xs"
             >
                 <SkipForward size={12} />
             </button>
             <div
                 onClick={handleProgressChange}
                 className="flex-1 h-1.5 bg-black/40 border border-white/5 rounded-full relative cursor-pointer mx-1"
             >
                 <div
                     className="h-full bg-gradient-to-r from-[#8b6508] to-[#ffd700] rounded-full relative transition-[width] duration-100 ease-linear"
                     style={{ width: `${progressPercent}%` }}
                 >
                     <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                 </div>
             </div>
             <button
                 onClick={toggleRepeatMode}
                 className={`w-7 h-7 rounded-full border cursor-pointer flex items-center justify-center transition-all text-xs ${repeatMode === "ONE" ? "bg-[#b8860b]/20 border-[#b8860b]/50 text-[#ffd700]" : "bg-white/5 border-white/10 text-white/60"}`}
             >
                 <Repeat size={12} />
                 {repeatMode === "ONE" && <span className="absolute text-[6px] font-bold mt-1">1</span>}
             </button>
             <div className="min-w-[60px] text-[9px] font-bold text-white/80 text-right tabular-nums">
                 {formatTime(currentTime)} / {formatTime(duration)}
             </div>
         </div>
         <div className="flex items-center justify-center gap-2 relative z-[1]">
             <span onClick={toggleMute} className={`text-sm cursor-pointer ${isMuted || volume === 0 ? "text-white/40" : "text-white/90"}`}>
                 {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
             </span>
             <div
                 onClick={handleVolumeChange}
                 className="relative w-24 h-1.5 bg-black/40 border border-white/5 rounded-full cursor-pointer"
             >
                 <div className="absolute h-full bg-gradient-to-r from-[#8b6508] to-[#ffd700] rounded-full pointer-events-none" style={{ width: `${isMuted ? 0 : volume}%` }} />
                 <div className="absolute -top-1 w-1.5 h-3.5 bg-white rounded-sm shadow-[0_0_4px_rgba(255,215,0,0.6)] pointer-events-none" style={{ left: `calc(${isMuted ? 0 : volume}% - 3px)` }} />
             </div>
         </div>
      </div>
      
      <div className="relative mb-2 shrink-0">
         <input
             type="text"
             placeholder="Search tracks..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full py-1.5 pr-3 pl-7 bg-black/30 border border-white/10 rounded-md text-white text-[10px] outline-none focus:border-[#b8860b] transition-colors"
         />
         <Search size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
      </div>
      
      <div className="flex flex-col gap-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
         {filteredPlaylist.length > 0 ? filteredPlaylist.map((song) => (
             <div
                 key={song.id}
                 onClick={() => {
                     if (currentSongIndex === song.index) {
                         togglePlay();
                         return;
                     }
                     setCurrentSongIndex(song.index);
                     setIsPlaying(true);
                 }}
                 className={`px-2 py-1.5 cursor-pointer rounded-md flex items-center gap-2 transition-all text-[10px] ${
                     currentSongIndex === song.index 
                         ? "bg-[#b8860b]/15 border border-[#b8860b]/30 text-white font-bold" 
                         : "bg-white/5 border border-transparent text-white/70 font-normal hover:bg-white/10"
                 }`}
             >
                 <div className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold shrink-0 ${
                     currentSongIndex === song.index 
                         ? "bg-gradient-to-b from-[#b8860b] to-[#8b6508] text-white" 
                         : "bg-white/10 text-white/50"
                 }`}>
                     {currentSongIndex === song.index && isPlaying ? <Play size={6} fill="currentColor" /> : `${song.index + 1}`}
                 </div>
                 <div className="flex-1 flex flex-col truncate">
                    <span className="truncate">{song.title}</span>
                    <span className={`text-[8px] ${currentSongIndex === song.index ? "text-[#ffd700]" : "text-white/30"}`}>Kingdom Audio Library</span>
                 </div>
                 {currentSongIndex === song.index && isPlaying && (
                     <div className="flex gap-[2px] h-2.5 items-end shrink-0">
                         <div className="w-[1.5px] bg-[#ffd700] animate-pulse h-1.5" />
                         <div className="w-[1.5px] bg-[#ffd700] animate-pulse h-2.5 delay-75" />
                         <div className="w-[1.5px] bg-[#ffd700] animate-pulse h-1.5 delay-150" />
                     </div>
                 )}
             </div>
         )) : (
             <div className="p-2 text-center text-white/40 text-[10px]">No tracks found.</div>
         )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b6508;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b8860b;
        }
      `}} />
    </div>
  );
}
