import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';

const scopes = ['profile', 'email'];


const loginAsync = async () => {
    try {

        const result = await Google.logInAsync({
            androidClientId: Constants.manifest.extra.googleAppId.android,
            iosClientId: Constants.manifest.extra.googleAppId.ios,
            scopes
        });

        if (result.type === 'success') {
            console.log(result.accessToken);
            return Promise.resolve(result.accessToken);
        }

        if (result.type === 'error') {
            return Promise.reject('No success');
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export const GoogleApi = {
    loginAsync
}