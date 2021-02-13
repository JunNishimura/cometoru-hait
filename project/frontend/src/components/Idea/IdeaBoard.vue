<template>
    <div class="idea__board">
        <IdeaElement
            v-for="idea in ideas"
            :key="idea.idea_id"
            :idea_id="idea.idea_id"
            :user_id="idea.user_id"
            :title="idea.title"
            :overview="idea.overview"
            :idea_date="idea.idea_date"
            :deadline="idea.deadline"
        ></IdeaElement>
    </div>
</template>

<script>
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaElement
    },
    props: ['ideas']
}
</script>

<style lang="scss" scoped>
.idea__board .idea {
    &:not(:nth-last-child(1)) {
        margin-bottom: 1.5rem;
    }
}
</style>