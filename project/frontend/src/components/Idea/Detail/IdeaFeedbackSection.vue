<template>
    <div id="idea__feedback-section">
        <div class="idea__feedback-container">
            <FeedbackBoard 
                :questions="questions" 
                :ideaId="ideaId" 
                :isMyIdea="isMyIdea"    
            />
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import FeedbackBoard from '@/components/Idea/Detail/FeedbackBoard.vue';

export default {
    components: {
        FeedbackBoard,
    },
    props: ['ideaId', 'isMyIdea'],
    data() {
        return {
            questions: [],
            loadComplete: false,
        }
    },
    created() {
        apiHelper.loadFeedbackQuestions(this.ideaId)
        .then( res => {
            this.questions = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaFeedbackPage: ", err);
        })
    }
}
</script>

<style lang="scss" scoped>
#idea__feedback-section {
    background-color: $bg-color-quaternary;
}

.idea__feedback-container {
    width: 60%;
    margin: 0 auto;
    padding: 2rem 0;
}
</style>