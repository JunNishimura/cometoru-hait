<template>
    <div class="feedback__board">
        <IdeaPropertyContainer title="投稿者からの質問">
            <template #content>
                <div class="questions">
                    <FeedbackQuestionElement
                        v-for="(question, index) in questions"
                        :key="index"
                        :question="question.question"
                        :questionId="question.feedback_question_id"
                    ></FeedbackQuestionElement>
                </div>
            </template>
        </IdeaPropertyContainer>  
    </div>
</template>

<script>
import FeedbackQuestionElement from '@/components/Idea/Detail/FeedbackQuestionElement.vue';
import IdeaPropertyContainer from '@/components/Idea/Detail/IdeaPropertyContainer.vue';

export default {
    props: ['questions'],
    components: {
        FeedbackQuestionElement,
        IdeaPropertyContainer,
    },
}
</script>

<style scoped>
.questions {
    width: 50rem;
    margin: 0 auto;
    max-height: 20rem;
}
</style>