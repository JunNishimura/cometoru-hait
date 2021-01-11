<template>
    <div id="home__page">
        <div class="page__header">
            <TheHeader/>
        </div>
        <div class="page__body">
            <router-view />
        </div>
    </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader,
    },
}
</script>

<style scoped>
#home__page {
    min-height: 100vh;
    height: 100%;
    background-color: #f7f2e9;
}

.page__body {
    margin-top: 4rem;
}
</style>