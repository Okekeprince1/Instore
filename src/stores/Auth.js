import { AsyncStorage } from 'react-native';

import { types, flow } from 'mobx-state-tree';

import { customerApi } from '../api/Api';
import { CurrentUserModel } from '../models/CurrentUser'

const TOKEN_KEY = '@instore/token';


export const AuthStore = types.model('AuthStore', {
    authToken: types.maybe(types.string),
    info: types.maybe(CurrentUserModel),
}).actions(self => ({
    setupAuth: flow(function* (){
        yield self.getAuthToken();
        yield self.getUserInfo();
    }),

    getAuthToken: flow(function* () {
        try {
            const token = yield AsyncStorage.getItem(TOKEN_KEY)

            console.log('getAuthToken', token)
            if (token) {
                self.authToken = token;
            }
            else {
                NavigationService.navigate('Auth');
            }
        } catch (error) {
            console.log('error', error)
        }

    }),

    saveToken: flow(function* (token) {
        try {
            console.log('saveToken')

            yield AsyncStorage.setItem(TOKEN_KEY, token)

        } catch (error) {
            console.log('error', error)
        }
    }),
    logout: flow(function* (){
        try{
            yield AsyncStorage.removeItem(TOKEN_KEY)
            NavigationService.navigate('Auth');
        }catch(error){
            NavigationService.navigate('Auth');
        }
    }),
    login: flow(function* (providerToken, provider) {
        try {
            const res = yield customerApi.post({
                token: providerToken,
                provider
            }).json()

            if(res.token){
                self.authToken = res.token;
                yield self.saveToken(res.token);
                yield self.getUserInfo();
            }
            console.log('result', res)
        } catch (error) {
            console.error('error', error)
            console.log('true');
        }
    }),
    getUserInfo: flow(function* () {
        try {
            const res = yield customerApi
                .url('/me')
                .headers({ Authorization: `Bearer ${self.authToken}` })
                .get()
                .json();

            self.info = res;
            console.log ("res data",res)

            NavigationService.navigate('Main');

        } catch (error) {
            console.log('error', error)
        }
    }),
})
)