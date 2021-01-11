<template>
    <div id="event__home-page">
        <div class="event__display">
            <section class="event__display-side">
                <BaseTab title="イベント">
                    <template #links>
                        <router-link :to="newEventLink">新着</router-link>
                        <router-link :to="comingEventLink">開催間近</router-link>
                    </template>
                </BaseTab>
            </section>
            <section class="event__display-content">
                <router-view />
            </section>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        newEventLink() {
            return { name: 'newEvents' };
        },
        comingEventLink() {
            return { name: 'comingEvents' };
        }
    }
}
</script>

<style scoped>
#event__home-page {
    height: 100%;
}

.event__display {
    width: 60%;
    padding: 2rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>