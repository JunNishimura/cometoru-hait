<template>
    <BaseHorizontalTab id="idea__detail-tab" :class="{fixed: scrollPosY > originalPosY}" justifyContentType="center">
        <template #horizontal-tab>
            <li ref="detailTabItem"><a href="#idea__detail">トップ</a></li>
            <li><a href="#idea__overview-mark">概要</a></li>
            <li><a href="#idea__feedback-section">質問</a></li>
        </template>
    </BaseHorizontalTab>
</template>

<script>
export default {
    data() {
        return {
            originalPosY: 0,
            scrollPosY: 0,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);

        // 初期状態のy軸上の位置を保存
        this.originalPosY = this.$refs.detailTabItem.offsetTop;
    },
    methods: {
        handleScroll() {
            // 4rem = 64px
            this.scrollPosY = window.scrollY + 60;
        }
    }
}
</script>

<style lang="scss" scoped>
.horizontal__tab-list {
    border-bottom: 1px solid #ddd;
}

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

.fixed {
    position: fixed;
    top: 4rem;
    left: 0;
    width: 100%;
    background-color: #f7f2e9;
    z-index: 3;
}
</style>