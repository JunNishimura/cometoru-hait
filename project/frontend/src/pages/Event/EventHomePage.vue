<template>
    <div id="event-home">
        <section class="side">
            <BaseTab title="イベント">
                <template #links>
                    <router-link :to="newEventLink">新着</router-link>
                    <router-link :to="comingEventLink">開催間近</router-link>
                </template>
            </BaseTab>
        </section>
        <section class="content">
            <router-view />
        </section>
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
#event-home {
    width: 80%;
    margin: 2rem auto 0;
    display: flex;
    justify-content: flex-start;
}

.content {
    width: 100%;
}
</style>