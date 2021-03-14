import { AvailableResult } from './util/models';
interface VideoPlayerOuput {
    result?: boolean;
    method?: string;
    value?: any;
    message?: string;
}
declare type VideoPlayerProps = {
    onReady?: (fromPlayerId: string, currentTime?: number, message?: string) => void;
    onPlay?: (fromPlayerId: string, currentTime?: number, message?: string) => void;
    onPause?: (fromPlayerId: string, currentTime?: number, message?: string) => void;
    onEnded?: (fromPlayerId: string, currentTime?: number, message?: string) => void;
    onExit?: (dismiss: boolean) => void;
};
interface VideoPlayerResult extends AvailableResult {
    initPlayer: (mode: string, url: string, playerId: string, componenTag: string, width?: number, height?: number) => Promise<VideoPlayerOuput>;
    isPlaying: (playerId: string) => Promise<VideoPlayerOuput>;
    pause: (playerId: string) => Promise<VideoPlayerOuput>;
    play: (playerId: string) => Promise<VideoPlayerOuput>;
    getDuration: (playerId: string) => Promise<VideoPlayerOuput>;
    setVolume: (playerId: string, volume: number) => Promise<VideoPlayerOuput>;
    getVolume: (playerId: string) => Promise<VideoPlayerOuput>;
    setMuted: (playerId: string, muted: boolean) => Promise<VideoPlayerOuput>;
    getMuted: (playerId: string) => Promise<VideoPlayerOuput>;
    setCurrentTime: (playerId: string, seektime: number) => Promise<VideoPlayerOuput>;
    getCurrentTime: (playerId: string) => Promise<VideoPlayerOuput>;
    stopAllPlayers: () => Promise<VideoPlayerOuput>;
}
export declare const availableFeatures: {
    useVideoPlayer: boolean;
};
export declare function useVideoPlayer({ onReady, onPlay, onPause, onEnded, onExit }: VideoPlayerProps): VideoPlayerResult;
export {};
