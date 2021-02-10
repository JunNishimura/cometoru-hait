<template>
    <BaseVerticalTab title="イベント">
        <template #tab-link>
            <li><router-link :to="newEventLink">新着</router-link></li>
            <li><router-link :to="comingEventLink">開催間近</router-link></li>
        </template>
    </BaseVerticalTab>
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