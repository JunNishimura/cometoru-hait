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

<style lang="scss" scoped>
#event__home-page {
    min-height: 100vh;
}

.event__display {
    max-width: $global-max-width;
    padding: 2.47rem 0;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;

    @include respond(tablet) {
        margin: 0 2.47rem; // tabletの場合左右にmarginを入れる
    }
}

.event__display-side {
    @include respond(phone) {
        display: none;
    }
}

.event__display-content {
    width: 100%;
    margin-left: auto;
}
</style>