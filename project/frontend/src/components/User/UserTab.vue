<template>
    <BaseHorizontalTab id="user__detail-tab" 
        :class="{fixed: scrollPosY > originalPosY}" 
        :isBorderBottom="true"
        justifyContentType="center"
    >
        <template #horizontal-tab>
            <li ref="userTabItem"><router-link :to="postPageLink">投稿済み</router-link></li>
            <li v-if="isMyProfile"><router-link :to="draftPageLink">下書き</router-link></li>
            <li v-if="isMyProfile"><router-link :to="stockPageLink">ストック</router-link></li>
        </template>
    </BaseHorizontalTab>
</template>

<script>
export default {
    props: {
        isMyProfile: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        postPageLink() {
            return { name: 'postIdeas'};
        },
        draftPageLink() {
            return { name: 'draftIdeas' };
        },
        stockPageLink() {
            return { name: 'stockEvents' };
        },
    },
    data() {
        return {
            originalPosY: 0,
            scrollPosY: 0,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

        // 初期状態のy軸上の位置を保存
        this.originalPosY = this.$refs.userTabItem.offsetTop;
    },
    methods: {
        handleScroll() {
            // 4rem = 64px
            this.scrollPosY = window.scrollY + 64;
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    padding: 0 1rem;
    line-height: 4rem;
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
}

li:hover {
    background-color: $color-secondary;
}

.router-link-active {
    border-bottom: 2px solid $color-primary;
}

.fixed {
    position: fixed;
    top: 4rem;
    left: 0;
    width: 100%;
    background-color: #f7f2e9;
    z-index: 3;
}
</style>