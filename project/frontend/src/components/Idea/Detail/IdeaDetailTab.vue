<template>
    <ul id="idea__detail-tab" ref="detailTab" :class="{fixed: scrollPosY > originalPosY}">
        <li><router-link :to="overviewLink">概要</router-link></li>
        <li><router-link :to="detailInfoLink">詳細</router-link></li>
        <li><router-link :to="recruitmentLink">募集</router-link></li>
        <li><router-link :to="reputationLink">評価</router-link></li>
        <li><router-link :to="feedbackLink">フィードバック</router-link></li>
    </ul>
</template>

<script>
export default {
    computed: {
        overviewLink() {
            return { name: 'overview' };
        },
        detailInfoLink() {
            return { name: 'detailInfo' };
        },
        recruitmentLink() {
            return { name: 'recruitment' };
        },
        reputationLink() {
            return { name: 'reputation' };
        },
        feedbackLink() {
            return { name: 'feedback' };
        }
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
        this.originalPosY = this.$refs.detailTab.offsetTop;
    },
    methods: {
        handleScroll() {
            // 4rem = 64px
            this.scrollPosY = window.scrollY + 64;
        }
    }
}
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    text-align: center;
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
    background-color: #ffefd1;
}

.router-link-active {
    border-bottom: 2px solid #ffbb3c;
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