<template>
    <div class="feedback__board">
        <IdeaPropertyContainer title="投稿者からの質問">
            <template #content>
                <!-- <div class="question-modal" v-if="modalState.question">
                    <BaseModal v-model="modalState.question">
                        <template #card>
                            <BaseForm title="質問投稿">
                                <input type="text" id="question" name="question" placeholder="質問を入力" v-model.trim="inputQuestion">
                                <BaseModalButton @clickModalBtn="addQuestion" />
                            </BaseForm>
                        </template>
                    </BaseModal>
                </div> -->
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
import apiHelper from '@/services/apiHelper.js';
import FeedbackQuestionElement from '@/components/Idea/Detail/FeedbackQuestionElement.vue';
import IdeaPropertyContainer from '@/components/Idea/Detail/IdeaPropertyContainer.vue';

export default {
    props: ['questions', 'ideaId', 'isMyIdea'],
    components: {
        FeedbackQuestionElement,
        IdeaPropertyContainer,
    },
    data() {
        return {
            modalState: {
                question: false,
            },
            inputQuestion: '',
        }
    },
    methods: {
        editQuestion() {
            this.modalState.question = true;
        },
        addQuestion() {
            apiHelper.addQuestion(this.ideaId, this.inputQuestion) 
            .then( () => {
                this.$router.go({name: 'feedback', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to add question: ", err);
            })
        }
    },
    beforeRouteLeave(to, from, next) {
        // 他のページに遷移する前にmodalを全てfalseにする
        this.modalState.question = false;
        next();
    }
}
</script>

<style scoped>
.question-modal input {
    font-size: 18px;
    line-height: 2rem;
    padding-left: 0.5rem;
    width: 100%;
    outline: none;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    margin-bottom: 1rem;
}

.input-tag input:focus {
    border: 1px solid #444;
}

.questions {
    width: 50rem;
    margin: 0 auto;
    max-height: 20rem;
    /* background: #fff; */
    /* overflow: scroll; */
}

/* .questions::-webkit-scrollbar {
    background-color: #fff;
    width: 10px;
}

.questions::-webkit-scrollbar-thumb {
    background-color: #eaeaea;
    border-radius: 8px;
}

.questions::-webkit-scrollbar-button {
    display: none;
} */
</style>