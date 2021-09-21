import { flow, types, getParent } from 'mobx-state-tree';
import get from 'lodash.get';

import { baseApi, customerApiAddress } from '../api/Api';
import { UserAddressModel } from './UserAddresses';

export const CurrentUserModel = types.model('UserInfo', {
    _id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    avatarUrl: types.maybe(types.string),
    addresses: types.optional(types.array(UserAddressModel), [])
}).views(self => ({
    get auth() {
        return getParent(self)
    },
    get addressesIsEmpty() {
        return self.addresses.length === 0;
    }
})).actions(self => ({
    createAddress: flow(function* (data) {
        try {
            data.user = self.auth.info["_id"];
            const res = yield baseApi.url("api/v1/addresses")
                .auth(`Bearer ${self.auth.authToken}`)
                .post({ data }).json();
            console.log(res);
            if (res.address) {
                const address = UserAddressModel.create({
                    ...res.address,
                    geo: {
                        lng: get(res.address, ['geo', 'coords', 0]),
                        lat: get(res.address, ['geo', 'coords', 1])
                    }
                })
                self.addresses.push(address)
            }

        } catch (error) {
            throw error
        }
    }),
    getAddress: flow(function* (){

        try {
            const res = yield baseApi.url("api/v1/addresses/me")
            .auth(`Bearer ${self.auth.authToken}`)
            .get().json();

            console.log("resulting address", res["addresses"]);
            
            if(res["addresses"]){
                self.addresses.push(...res["addresses"]); 
            }
        } catch (error) {
            throw error
        }
    })
}))