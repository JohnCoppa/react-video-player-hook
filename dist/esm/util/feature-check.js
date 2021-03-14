import { Capacitor } from '@capacitor/core';
import { FeatureNotAvailableError } from './models';
const allTrue = {
    web: true,
    ios: true,
    android: true,
    electron: true
};
const featureMap = {
    CapacitorVideoPlayer: {
        useVideoPlayer: allTrue
    }
};
export function isFeatureAvailable(plugin, method) {
    if (Capacitor.isPluginAvailable(plugin) && !!featureMap[plugin][method][Capacitor.getPlatform()]) {
        return true;
    }
    return false;
}
export function featureNotAvailableError() {
    throw new FeatureNotAvailableError();
}
//# sourceMappingURL=feature-check.js.map