import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { soundbar } from "../assets";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { HiOutlineStatusOffline } from "react-icons/hi";

const NowPlayingYTM = () => {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const { data, error } = await supabase
                .from("now_playing")
                .select("*")
                .order("updated_at", { ascending: false })
                .limit(1)
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
                { event: "*", schema: "public", table: "now_playing" },
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

    // Check if data is stale (> 5 minutes old = probably not listening)
    const isStale = song?.updated_at
        ? Date.now() - new Date(song.updated_at).getTime() > 5 * 60 * 1000
        : true;

    if (!song) {
        return (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2b2b2e] shadow-md border border-[#3a3a3d]">
                <div className="flex-shrink-0 text-gray-500">
                    <HiOutlineStatusOffline size={24} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-400">Not listening right now</p>
                </div>
            </div>
        );
    }

    const isPlaying = song.is_playing && !isStale;

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2b2b2e] hover:bg-[#333336] transition duration-300 shadow-md border border-[#3a3a3d]">
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

            {/* Track Info */}
            <div className="flex-1 overflow-hidden">
                <p className="text-xs text-[#54d5bb] mb-1">
                    {isPlaying ? "🎵 Now Playing on YouTube Music" : "🎵 Last Played"}
                </p>
                <p
                    className={`text-sm font-medium text-white truncate ${song.title?.length > 15
                        ? "animate-marquee sm:animate-none whitespace-nowrap"
                        : ""
                        }`}
                >
                    {song.title}
                </p>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                {song.duration && (
                    <p className="text-[10px] text-gray-500 mt-1">{song.duration}</p>
                )}
            </div>

            {/* Icon */}
            <div className="flex-shrink-0 text-white">
                {isPlaying ? (
                    <img src={soundbar} alt="Playing" className="w-8 h-8 rounded-lg" />
                ) : (
                    <AiOutlinePauseCircle size={24} className="text-gray-500" />
                )}
            </div>
        </div>
    );
};

export default NowPlayingYTM;
