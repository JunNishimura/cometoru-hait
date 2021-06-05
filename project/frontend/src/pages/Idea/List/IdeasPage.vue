<template>
    <div id="ideas__page">
        <div class="ideas__display">
            <section class="ideas__display-side">
                <select v-model="selectedTab" class="select-tab">
                    <option v-for="(t, i) in tabs" :value=t :key=i>{{t.label}}</option>
                </select>
                <IdeaVerticalTab class="idea__vertical-tab" />
            </section>
            <section class="ideas__display-content"> 
                <router-view />
            </section>
        </div>
        <FloatingButton linkTo="/post">
            <template #icon>
                <FontAwesomeIcon :icon="['far', 'lightbulb']" size="4x" />
            </template>
        </FloatingButton>
    </div>
</template>

<script>
import IdeaVerticalTab from '@/components/Idea/IdeaVerticalTab.vue';
import FloatingButton from '@/components/Idea/FloatingButton.vue';

export default {
    components: {
        IdeaVerticalTab,
        FloatingButton
    },
    data() {
        return {
            selectedTab: {val: 'new', label: '新着'},
            tabs: [
                {val: 'new', label: '新着'},
                {val: 'recommend', label: 'レコメンド'},
                {val: 'tag', label: 'タグ'},
            ],
        }
    },
    watch: {
        selectedTab(newOption) {
            if (newOption.val === 'new') {
                this.$router.push({name: 'newIdeas'});
            } else if (newOption.val === 'recommend') {
                this.$router.push({name: 'recommendIdeas'});
            } else if (newOption.val === 'tag') {
                this.$router.push({name: 'tagIdeas'});
            }
        }
    },
}
</script>

<style lang="scss" scoped>
#ideas__page {
    min-height: 100vh;
}

.ideas__display {
    color: #000;
    max-width: $global-max-width;
    padding: 2.47rem 0;  // 2.47 = 4(line height of header) / 1.618
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;

    @include respond(tablet) {
        margin: 0 2.47rem; // tabletの場合左右にmarginを入れる
    }

    @include respond(phone) {
        flex-direction: column;
    }
}

.ideas__display-side {
    margin-right: 3rem;
    @include respond(phone) {
        margin-right: 0;
    }

    .select-tab {
        display: none;
        width: 100%;
        border: none;
        margin-bottom: 1.52rem; // 2.47 / 1.618
        height: 20px;

        @include respond(phone) {
            display: block;
        }
    }

    .idea__vertical-tab {
        @include respond(phone) {
            display: none;
        }
    }
}

.ideas__display-content {
    width: 100%;
    margin-left: auto;
}
</style>