<template>
    <div id="ideas__page">
        <div class="ideas__display">
            <section class="ideas__display-side">
                <IdeaVerticalTab />
            </section>
            <section class="ideas__display-content"> 
                <router-view />
            </section>
        </div>
        <FloatingButton linkTo="/post">
            <template #icon>
                <FontAwesomeIcon :icon="['far', 'lightbulb']" size="4x" />
            </template>
        </FloatingButton>
    </div>
</template>

<script>
import IdeaVerticalTab from '@/components/Idea/IdeaVerticalTab.vue';
import FloatingButton from '@/components/Idea/FloatingButton.vue';

export default {
    components: {
        IdeaVerticalTab,
        FloatingButton
    },
}
</script>

<style scoped>
#ideas__page {
    height: 100%;
}

.ideas__display {
    width: 60%;
    padding: 2rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
}

.ideas__display-side {
    position: fixed;
}

.ideas__display-content {
    margin-left: auto;
}
</style>