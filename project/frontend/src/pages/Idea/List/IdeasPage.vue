<template>
    <div id="ideas-page">
        <div class="ideas-display">
            <section class="side">
                <BaseTab title="アイデア">
                    <template #links>
                        <router-link :to="newIdeasLink">新着</router-link>
                        <router-link :to="recommendIdeasLink" v-if="isLoggedIn">おすすめ</router-link>
                        <router-link :to="tagIdeasLink">タグ</router-link>
                    </template>
                </BaseTab>
            </section>
            <section class="content"> 
                <router-view />
            </section>
        </div>
        <FloatingButton linkTo="/post" bgColor="orange">
            <template #icon>
                <FontAwesomeIcon :icon="['far', 'lightbulb']" size="4x" />
            </template>
        </FloatingButton>
    </div>
</template>

<script>
import FloatingButton from '@/components/Idea/FloatingButton.vue';
export default {
    components: {
        FloatingButton
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        },
        newIdeasLink() {
            return { name: 'newIdeas' };
        },
        tagIdeasLink() {
            return { name: 'tagIdeas' };
        },
        recommendIdeasLink() {
            return { name: 'recommendIdeas' };
        }
    },
}
</script>

<style scoped>
#ideas-page {
    height: 100%;
}

.ideas-display {
    /* background-color: #f00; */
    width: 60%;
    padding: 2rem 0;
    margin: 0 auto;  
    display: flex;
    justify-content: flex-start;
}
</style>