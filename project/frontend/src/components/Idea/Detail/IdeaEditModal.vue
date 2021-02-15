<template>
    <div class="modal__content">
        <IdeaModalTab
            @setEditPage="setEditPage"
        ></IdeaModalTab>
        <div class="edit__content">
            <IdeaEditBasic v-if="currentEditPage=='basic'"
                :myUserId="myUserId"
                :ideaId="ideaId"
                :currentTitle="ideaDetail.title"
                :currentTags="currentTags"
                :currentState="ideaDetail.state"
                :currentDeadline="deadline"
                :currentRecruitments="currentRecruitments"
            />
            <IdeaEditDetail v-if="currentEditPage=='detail'"
                :myUserId="myUserId"
                :ideaId="ideaId"
                :currentTitle="ideaDetail.title"
                :currentOverview="ideaDetail.overview"
                :currentTarget="ideaDetail.target"
                :currentBackground="ideaDetail.background"
                :currentValue="ideaDetail.value"
                :currentPassion="ideaDetail.passion"
                :currentState="ideaDetail.state"
            />
            <IdeaEditImage v-if="currentEditPage=='image'"
                :userId="myUserId"
                :title="ideaDetail.title"
                :state="ideaDetail.state"
                :ideaId="ideaId"
            />
            <IdeaEditQuestion v-if="currentEditPage=='question'"
                :ideaId="ideaId"
                :isMyIdea="isMyIdea"
                :myUserId="myUserId"
                :userId="myUserId"
                :title="ideaDetail.title"
                :state="ideaDetail.state"
            />
        </div>
    </div>
</template>

<script>
import IdeaModalTab from '@/components/Idea/Detail/IdeaModalTab.vue';
import IdeaEditBasic from '@/components/Idea/Detail/IdeaEditBasic.vue';
import IdeaEditDetail from '@/components/Idea/Detail/IdeaEditDetail.vue';
import IdeaEditImage from '@/components/Idea/Detail/IdeaEditImage.vue';
import IdeaEditQuestion from '@/components/Idea/Detail/IdeaEditQuestion.vue';

export default {
    props: {
        isMyIdea: {
            type: Boolean
        },
        myUserId: {
            required: true,
        }, 
        ideaId: {
            required: true,
            type: String,
        },
        ideaDetail: {
            required: true,
            type: Object,
        }, 
        deadline: {
            required: true,
            type: Date,
        }, 
        currentTags: {
            type: Array
        }, 
        currentRecruitments: {
            type: Array,
        },
    },
    components: {
        IdeaModalTab,
        IdeaEditBasic,
        IdeaEditDetail,
        IdeaEditImage,
        IdeaEditQuestion
    },
    data() {
        return {
            currentEditPage: 'basic',
        }
    },
    methods: {
        setEditPage(page) {
            this.currentEditPage = page;                    
        },
    },
}
</script>

<style lang="scss" scoped>
.edit__content {
    min-width: 50rem;
    max-height: 30rem;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        background-color: #fff;
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-button {
        display: none;
    }
}
</style>