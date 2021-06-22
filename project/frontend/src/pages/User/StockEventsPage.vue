<template>
    <div id="stock__events-page">
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
import asyncProcessing from '@/services/asyncProcessing.js';
import EventElement from '@/components/Event/EventElement.vue';

export default {
    components: {
        EventElement,
    },
    data() {
        return {
            eventIDs: [],
            events: [],
            isMyProfile: false,
            loadComplete: false,
        }
    },
    computed: {
        myEventIDs() {
            return this.$store.getters['myData/myEventIDs'];
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        // 自分のプロフィールかを確認
        const paramUserId = this.$route.params['userId'];
        if (paramUserId == this.myUserId) {
            this.isMyProfile = true;
        }

        if (this.myEventIDs != null) {
            this.eventIDs = this.myEventIDs;

            const promises = [];
            for (const id of this.eventIDs) {
                promises.push(asyncProcessing.loadEventDetail(id));
            }

            Promise.all(promises)
            .then( results => {
                for (const res of results) {
                    this.events.push(res);
                }

                this.loadComplete = true;
            }).catch( err => {
                console.log("error to load stock events at StockEventsPage: ", err);
            })
        }
    }
}
</script>