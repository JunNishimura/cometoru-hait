<template>
    <BaseBoard>
        <template #header>
            <h1>{{ title }}</h1>
        </template>
        <template #content>
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
        </template>
    </BaseBoard>
</template>

<script>
import IdeaElement from '@/components/Idea/IdeaElement.vue';

export default {
    components: {
        IdeaElement
    },
    props: ['title', 'ideas']
}
</script>