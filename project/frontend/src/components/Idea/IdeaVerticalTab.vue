<template>
    <BaseVerticalTab title="アイデア">
        <template #tab-link>
            <li><router-link :to="newIdeasLink">新着</router-link></li>
            <li><router-link :to="recommendIdeasLink" v-if="isLoggedIn">おすすめ</router-link></li>
            <li><router-link :to="tagIdeasLink">タグ</router-link></li>
        </template>
    </BaseVerticalTab>
</template>

<script>
export default {
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