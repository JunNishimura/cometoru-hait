<template>
    <div id="event__home-page">
        <div class="event__display">
            <section class="event__display-side">
                <EventVerticalTab />
            </section>
            <section class="event__display-content">
                <router-view />
            </section>
        </div>
    </div>
</template>

<script>
import EventVerticalTab from '@/components/Event/EventVerticalTab.vue';

export default {
    components: {
        EventVerticalTab,
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
    justify-content: flex-start;
}

.event__display-side {
    position: fixed;
}

.event__display-content {
    margin-left: auto;
}
</style>