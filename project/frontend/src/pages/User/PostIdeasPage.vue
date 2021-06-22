<template>
    <div id="post__ideas-page" v-if="loadComplete">
        <div class="post__ideas">
            <Pagination
                :items="postIdeas"
                :itemNumPerPage="5"
            />
        </div>
    </div>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';
import Pagination from '@/components/Layout/Pagination.vue';

export default {
    components: {
        Pagination
    },
    data() {
        return {
            postIdeas: [],
            isMyProfile: false,
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        // 自分のプロフィールかを確認
        const paramUserId = this.$route.params['userId'];
        if (paramUserId == this.myUserId) {
            this.isMyProfile = true;
        }

        asyncProcessing.loadFilteredPostIdeas(paramUserId)
        .then( res => {
            this.postIdeas = res;
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get ideas at PostIdeasPage: ", err);
        })
    }
}
</script>