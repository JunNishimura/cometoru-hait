<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('auth/autoLogin');
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;

    font-size: 87.5%; // 1rem == 14px

    @include respond(tablet) {
        font-size: 75%; // 1rem == 12px
    }

    @include respond(phone) {
        font-size: 62.5%; // 1rem == 10px 
    }
}

body {
    font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5 {
    padding: 0;
    margin: 0;
}

ul {
    padding: 0;
    margin: 0;
}
</style>