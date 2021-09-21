import  Constants  from 'expo-constants';
import * as Facebook from 'expo-facebook';

const permissions = ['public_profile', 'email'];

const appName = "InStore";
const appId = "284670935860439";

const loginAsync = async () => {
    try {
        await Facebook.initializeAsync({appId, appName});
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions });

        if (type === 'success') {
            return Promise.resolve(token);
        }

        if (type === 'error') {
            return Promise.reject('No success');
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export const FacebookApi = {
    loginAsync
}