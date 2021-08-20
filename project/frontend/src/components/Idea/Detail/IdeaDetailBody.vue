<template>
    <section class="idea__body">
        <div class="idea__body-wrapper">
            <!-- 項目：概要 -->
            <IdeaContent title="概要" v-if="overview.length > 0">
                <template #content>
                    <p>{{overview}}</p>
                </template>
            </IdeaContent>
            <!-- 項目：ターゲット -->
            <IdeaContent title="ターゲット" v-if="target.length > 0">
                <template #content>
                    <p>{{target}}</p>
                </template>
            </IdeaContent>
            <!-- 項目：背景 -->
            <IdeaContent title="背景" v-if="background.length > 0">
                <template #content>
                    <p>{{background}}</p>
                </template>
            </IdeaContent>
            <!-- 項目：提供価値 -->
            <IdeaContent title="提供価値" v-if="value.length > 0">
                <template #content>
                    <p>{{value}}</p>
                </template>
            </IdeaContent>
            <!-- 項目：情熱 -->
            <IdeaContent title="一言" v-if="passion.length">
                <template #content>
                    <p>{{passion}}</p>
                </template>
            </IdeaContent>
            <!-- 項目：評価 -->
            <!-- <IdeaReputationSection
                :ideaId="ideaId"
            /> -->
            <!-- 項目：画像 -->
            <IdeaContent title="イメージ" v-if="ideaImage">
                <template #content>
                    <div class="idea__image-container">
                        <img :src="ideaImage" alt="idea-image">
                    </div>
                </template>
            </IdeaContent>
            <!-- 項目：フィードバック -->
            <IdeaContent title="投稿者からの質問" v-if="feedbackQuestions.length > 0">
                <template #content>
                    <div class="idea__feedback-questions">
                        <FeedbackQuestionElement
                            v-for="(question, index) in feedbackQuestions"
                            :key="index"
                            :question="question.question"
                            :questionId="question.feedback_question_id"
                        ></FeedbackQuestionElement>
                    </div>
                </template>
            </IdeaContent>
        </div>
    </section>
</template>

<script>
import IdeaContent from '@/components/Idea/Detail/IdeaContent.vue';
import FeedbackQuestionElement from '@/components/Idea/Detail/FeedbackQuestionElement.vue';
// import IdeaReputationSection from '@/components/Idea/Detail/IdeaReputationSection.vue';

export default {
    components: {
        IdeaContent,
        FeedbackQuestionElement,
        // IdeaReputationSection,
    },
    props: {
        overview: String,
        target: String,
        background: String,
        value: String,
        passion: String,
        ideaImage: String,
        feedbackQuestions: Array
    },
}
</script>

<style lang="scss" scoped>
.idea__body {
    background-color: $bg-color-secondary;

    .idea__body-wrapper {
        max-width: $global-max-width;
        margin: 0 auto;

        .idea__image-container {
            text-align: center;
            
            img {
                max-width: 800px;
                max-height: 600px;
            }
        }

        .idea__feedback-questions {
            width: 100%;
            margin-right: auto;
            max-height: 20rem;
        }
    }
}
</style>