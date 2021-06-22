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
import asyncProcessing from '@/services/asyncProcessing.js';
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
        asyncProcessing.loadFeedbackQuestions(this.ideaId)
        .then( res => {
            this.questions = res;

            this.loadComplete = true;
        }).catch( err => {
            console.log("error to get idea data at IdeaFeedbackPage: ", err);
        })
    }
}
</script>