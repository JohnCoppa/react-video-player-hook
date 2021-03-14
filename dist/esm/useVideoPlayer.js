var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect } from 'react';
import { Capacitor, Plugins } from '@capacitor/core';
import { notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import * as CVPPlugin from 'capacitor-video-player';
export const availableFeatures = {
    useVideoPlayer: isFeatureAvailable('CapacitorVideoPlayer', 'useVideoPlayer')
};
export function useVideoPlayer({ onReady, onPlay, onPause, onEnded, onExit }) {
    const { CapacitorVideoPlayer } = Plugins;
    const platform = Capacitor.getPlatform();
    const pVideoPlayer = platform === "ios" ||
        platform === "android" ? CapacitorVideoPlayer
        : CVPPlugin.CapacitorVideoPlayer;
    if (!availableFeatures.useVideoPlayer) {
        return Object.assign({ initPlayer: featureNotAvailableError, isPlaying: featureNotAvailableError, play: featureNotAvailableError, pause: featureNotAvailableError, getDuration: featureNotAvailableError, setVolume: featureNotAvailableError, getVolume: featureNotAvailableError, setMuted: featureNotAvailableError, getMuted: featureNotAvailableError, setCurrentTime: featureNotAvailableError, getCurrentTime: featureNotAvailableError, stopAllPlayers: featureNotAvailableError }, notAvailable);
    }
    useEffect(() => {
        // init listeners
        let readyListener = null;
        let playListener = null;
        let pauseListener = null;
        let endedListener = null;
        let exitListener = null;
        if (onReady && pVideoPlayer)
            readyListener =
                pVideoPlayer.addListener('jeepCapVideoPlayerReady', (e) => {
                    onReady(e.fromPlayerId, e.currentTime);
                });
        if (onPlay && pVideoPlayer)
            playListener =
                pVideoPlayer.addListener('jeepCapVideoPlayerPlay', (e) => {
                    onPlay(e.fromPlayerId, e.currentTime);
                });
        if (onPause && pVideoPlayer)
            pauseListener =
                pVideoPlayer.addListener('jeepCapVideoPlayerPause', (e) => {
                    onPause(e.fromPlayerId, e.currentTime);
                });
        if (onEnded && pVideoPlayer)
            endedListener =
                pVideoPlayer.addListener('jeepCapVideoPlayerEnded', (e) => {
                    onEnded(e.fromPlayerId, e.currentTime);
                });
        if (onExit && pVideoPlayer)
            exitListener =
                pVideoPlayer.addListener('jeepCapVideoPlayerExit', (e) => {
                    onExit(e.dismiss);
                });
        return () => {
            if (readyListener)
                readyListener.remove();
            if (playListener)
                readyListener.remove();
            if (pauseListener)
                readyListener.remove();
            if (endedListener)
                readyListener.remove();
            if (exitListener)
                readyListener.remove();
        };
    }, []);
    /**
     * Method initPlayer
     * Init the player
     * @param mode string
     * @param url string
     * @param playerId string
     * @param componentTag string
     * @param width number (optional)
     * @param height number (optional)
     */
    const initPlayer = useCallback((mode, url, playerId, componentTag, width, height) => __awaiter(this, void 0, void 0, function* () {
        let r;
        if (width && height) {
            r = yield pVideoPlayer.initPlayer({ mode: mode, url: url,
                playerId: playerId, componentTag: componentTag,
                width: width, height: height });
        }
        else {
            r = yield pVideoPlayer.initPlayer({ mode: mode, url: url,
                playerId: playerId, componentTag: componentTag });
        }
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "initPlayer",
            message: "initPlayer failed" };
    }), []);
    /**
     * Method isPlaying
     * @param playerId string
     */
    const isPlaying = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.isPlaying({ playerId: playerId });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "isPlaying",
            message: "isPlaying failed" };
    }), []);
    /**
     * Method pause
     * pause the videoplayer
     * @param playerId string
     */
    const pause = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.pause({ playerId: playerId });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "pause",
            message: "pause failed" };
    }), []);
    /**
     * Method play
     * play the videoplayer
     * @param playerId string
     */
    const play = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.play({ playerId: playerId });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "play",
            message: "play failed" };
    }), []);
    /**
     * Method getDuration
     * get the video duration
     * @param playerId string
     */
    const getDuration = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.getDuration({
            playerId: playerId
        });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "getDuration",
            message: "getDuration failed" };
    }), []);
    /**
     * Method setVolume
     * set the video volume
     * @param playerId string
     * @param volume number
     */
    const setVolume = useCallback((playerId, volume) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.setVolume({ playerId: playerId,
            volume: volume });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "setVolume",
            message: "setVolume failed" };
    }), []);
    /**
     * Method getVolume
     * get the video volume
     * @param playerId string
     */
    const getVolume = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.getVolume({
            playerId: playerId
        });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "getVolume",
            message: "getVolume failed" };
    }), []);
    /**
     * Method setMuted
     * set the video muted parameter
     * @param playerId string
     * @param muted boolean
     */
    const setMuted = useCallback((playerId, muted) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.setMuted({
            playerId: playerId, muted: muted
        });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "setMuted",
            message: "setMuted failed" };
    }), []);
    /**
     * Method getMuted
     * get the video muted parameter
     * @param playerId string
     */
    const getMuted = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.getMuted({ playerId: playerId });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "getMuted",
            message: "getMuted failed" };
    }), []);
    /**
     * Method setCurrentTime
     * set the video current time
     * @param playerId string
     * @param seektime number
     */
    const setCurrentTime = useCallback((playerId, seektime) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.setCurrentTime({
            playerId: playerId, seektime: seektime
        });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "setCurrentTime",
            message: "setCurrentTime failed" };
    }), []);
    /**
     * Method getCurrentTime
     * get the video current time
     * @param playerId string
     */
    const getCurrentTime = useCallback((playerId) => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.getCurrentTime({
            playerId: playerId
        });
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "getCurrentTime",
            message: "getCurrentTime failed" };
    }), []);
    /**
     * Method stopAllPlayers
     * stop all players
     */
    const stopAllPlayers = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        const r = yield pVideoPlayer.stopAllPlayers();
        if (r) {
            if (typeof r.result != 'undefined') {
                return r;
            }
        }
        return { result: false, method: "stopAllPlayers",
            message: "stopAllPlayers failed" };
    }), []);
    return { initPlayer, isPlaying, play, pause, getDuration,
        setVolume, getVolume, setMuted, getMuted, setCurrentTime,
        getCurrentTime, stopAllPlayers, isAvailable: true };
}
//# sourceMappingURL=useVideoPlayer.js.map