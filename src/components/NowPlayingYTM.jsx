import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { soundbar } from "../assets";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { HiOutlineStatusOffline } from "react-icons/hi";

const MY_USER_ID = "47855d9c-e601-4926-a185-0e89190cc440";

const NowPlayingYTM = () => {
    const [song, setSong] = useState(null);
    const [currentProgress, setCurrentProgress] = useState(0);
    const progressTimer = useRef(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const { data, error } = await supabase
                .from("now_playing")
                .select("*")
                .eq("user_id", MY_USER_ID)
                .single();

            if (!error && data) {
                setSong(data);
            }
        };

        fetchNowPlaying();

        // Real-time subscription (works in production, StrictMode kills it in dev)
        const channel = supabase
            .channel("now_playing_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "now_playing", filter: `user_id=eq.${MY_USER_ID}` },
                (payload) => {
                    setSong(payload.new);
                }
            )
            .subscribe();

        // Polling fallback (covers dev mode + any WebSocket hiccups)
        const interval = setInterval(fetchNowPlaying, 3000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(interval);
        };
    }, []);

    // Client-side progress calculation
    useEffect(() => {
        if (progressTimer.current) clearInterval(progressTimer.current);

        if (!song || !song.is_playing || !song.duration_ms) {
            setCurrentProgress(song?.progress_ms || 0);
            return;
        }

        // Calculate initial progress based on time elapsed since last update
        const updatedAt = new Date(song.updated_at).getTime();
        const elapsed = Date.now() - updatedAt;
        const initialProgress = Math.min(
            song.progress_ms + elapsed,
            song.duration_ms
        );
        setCurrentProgress(initialProgress);

        // Tick every second to animate the progress bar
        progressTimer.current = setInterval(() => {
            setCurrentProgress((prev) => {
                const next = prev + 1000;
                return next >= song.duration_ms ? song.duration_ms : next;
            });
        }, 1000);

        return () => clearInterval(progressTimer.current);
    }, [song]);

    // Check if data is stale (> 5 minutes old = probably not listening)
    const isStale = song?.updated_at
        ? Date.now() - new Date(song.updated_at).getTime() > 10 * 60 * 1000
        : true;

    if (!song) {
        return (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2b2b2e] shadow-md border border-[#3a3a3d]">
                <div className="flex-shrink-0 text-gray-500">
                    <HiOutlineStatusOffline size={24} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-400">
                        Not listening right now
                    </p>
                </div>
            </div>
        );
    }

    const isPlaying = song.is_playing && !isStale;
    const progressPercent =
        song.duration_ms > 0
            ? Math.min((currentProgress / song.duration_ms) * 100, 100)
            : 0;

    // Format ms to m:ss
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const Wrapper = song.song_url
        ? ({ children }) => (
            <a
                href={song.song_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {children}
            </a>
        )
        : ({ children }) => <div>{children}</div>;

    return (
        <Wrapper>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2b2b2e] hover:bg-[#333336] transition duration-300 shadow-md border border-[#3a3a3d] cursor-pointer">
                {/* Album Art */}
                {song.album_art && (
                    <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                            src={song.album_art}
                            alt="Album"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Track Info + Progress */}
                <div className="flex-1 overflow-hidden">
                    <p className="text-[0.45rem] md:text-xs text-[#54d5bb] mb-1">
                        {isPlaying
                            ? "🎵 Now Playing on YouTube Music"
                            : "🎵 Last Played"}
                    </p>
                    <p
                        className={`text-sm font-medium text-white truncate ${song.title?.length > 15
                            ? "animate-marquee sm:animate-none whitespace-nowrap"
                            : ""
                            }`}
                    >
                        {song.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                        {song.artist}
                    </p>

                    {/* Progress bar */}
                    {song.duration_ms > 0 && (
                        <div className="mt-1 w-full">
                            <div className="flex justify-between text-[10px] text-gray-400 mb-[2px]">
                                <span>{formatTime(currentProgress)}</span>
                                <span>{formatTime(song.duration_ms)}</span>
                            </div>
                            <div className="w-full h-[4px] bg-[#444] rounded overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-1000 ease-linear"
                                    style={{
                                        width: `${progressPercent}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 text-white">
                    {isPlaying ? (
                        <img
                            src={soundbar}
                            alt="Playing"
                            className="w-8 h-8 rounded-lg"
                        />
                    ) : (
                        <AiOutlinePauseCircle
                            size={24}
                            className="text-gray-500"
                        />
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default NowPlayingYTM;
