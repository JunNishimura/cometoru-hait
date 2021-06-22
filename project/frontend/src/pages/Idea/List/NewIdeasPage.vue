<template>
    <IdeaBoard
        v-if="loadComplete"
        title="新着アイデア"
        :ideas="ideas"
    />
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';
import IdeaBoard from '@/components/Idea/IdeaBoard.vue';

export default {
    components: {
        IdeaBoard,
    },
    data() {
        return {
            ideas: [],
            loadComplete: false,
        }
    },
    created() {
        asyncProcessing.loadPostIdeas()
        .then( res => {
            this.ideas = res;

            this.loadComplete = true;        
        }).catch( err => {
            console.log(err);
        });
    }
}
</script>