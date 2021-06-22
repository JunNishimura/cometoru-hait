import asyncProcessing from '@/services/asyncProcessing.js';

export default {
    setUserData(context, payload) {
        asyncProcessing.loadUserDetailByName(payload.username)
        .then ( res => {
            context.commit('setUserData', {
                userId: res[0].user_id,
                username: res[0].username
            });
            
            // tagsもここでセットする
            context.dispatch('setTags', {
                userId: res.user_id
            });
        }).catch( err => {
            console.log("error to set myinfo detail: ", err);
        });
    },
    setTags(context, payload) {
        asyncProcessing.loadUserTags(payload.userId)
        .then( res => {
            context.commit('setTags', res);
        }).catch( err => {
            console.log("error to set myinfo tags: ", err);
        });
    },
    addEventStock(context, payload) {
        context.commit('addEventStock', payload.eventId);
    },
    removeEventStock(context, payload) {
        context.commit('removeEventStock', payload.eventId);
    },
};