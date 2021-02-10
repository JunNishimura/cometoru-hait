<template>
    <div id="idea__overview-section">
        <div class="idea__overview-container">
            <IdeaPropertyContainer id="idea__overview-mark" title="概要">
                <template #content>
                    <p>{{ overview }}</p>
                </template>
            </IdeaPropertyContainer>
            <IdeaPropertyContainer title="ターゲット">
                <template #content>
                    <p>{{ target }}</p>
                </template>
            </IdeaPropertyContainer>
            <IdeaPropertyContainer title="背景">
                <template #content>
                    <p>{{ background }}</p>
                </template>
            </IdeaPropertyContainer>
            <IdeaPropertyContainer title="価値創造">
                <template #content>
                    <p>{{ value }}</p>
                </template>
            </IdeaPropertyContainer>
            <IdeaPropertyContainer title="情熱">
                <template #content>
                    <p>{{ passion }}</p>
                </template>
            </IdeaPropertyContainer>
        </div>
    </div>
</template>

<script>
import IdeaPropertyContainer from '@/components/Idea/Detail/IdeaPropertyContainer.vue';

export default {
    components: {
        IdeaPropertyContainer,
    },
    props: ['overview', 'target', 'background', 'value', 'passion']
}
</script>

<style lang="scss" scoped>
#idea__overview-section {
    background-color: $bg-color-secondary;
}

.idea__overview-container {
    width: 60%;
    margin: 0 auto;
    padding: 5rem 0;
}
</style>