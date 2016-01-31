/**
 * Utility class for environment related code.
 */

class Env {
    
    getApiHost() {
        return __DEV__ ? 'http://192.168.1.2:3000' : 'https://www.wordsfromwords.com';
    }
    
}

module.exports = new Env();
