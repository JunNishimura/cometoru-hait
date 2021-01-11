<template>
    <div class="event__board">
        <EventElement
            v-for="event in events"
            :key="event.event_id"
            :eventId="event.event_id"
            :name="event.event_name"
            :detail="event.event_detail"
            :schedule="event.event_schedule"
            :location="event.event_location"
            :url="event.event_url"
        ></EventElement>
    </div>
</template>

<script>
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        EventElement
    },
    props: ['events']
}
</script>

<style scoped>
.event__board .event:not(:nth-last-child(1)) {
    margin-bottom: 1.5rem;
}
</style>