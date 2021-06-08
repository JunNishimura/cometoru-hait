<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('auth/autoLogin');
    },
    mounted() {
        const routeInstance = this.$route;
        this.createTitleDesc(routeInstance);
    },
    methods: {
        createTitleDesc(routeInstance) {
            if (routeInstance.meta.title) {
                const setTitle = routeInstance.meta.title + ' | カムトル';
                document.title = setTitle;
            } else {
                document.title = 'カムトル'
            }

            if (routeInstance.meta.desc) {
                const setDesc = routeInstance.meta.desc + ' | カムトル'
                document.querySelector("meta[name='description']").setAttribute('content', setDesc)
            } else {
                document.querySelector("meta[name='description']").setAttribute('content', 'description is not set')
            }
        }
    },
    watch: {
        '$route' (routeInstance, from) {
            console.log(from)
            this.createTitleDesc(routeInstance);
        }
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