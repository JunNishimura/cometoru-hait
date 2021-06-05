<template>
    <div id="home__page">
        <div class="page__header" v-if="isAnimFinished">
            <TheHeader/>
        </div>
        <div class="page__description" v-if="!isAnimFinished">
            <div class="site-title">
                <h1>カムトル</h1>
                <h5>Make Your Idea Come True.</h5>  
            </div>
        </div>
        <div class="page__about" v-if="isAboutDisplay & isAnimFinished">
            <div class="page__about-container">
                <div class="page__about-sentence">
                    <h3>カムトルはアイデアを実現するために必要となる人が出会える場所です。</h3>
                </div>
                <div class="image-container">
                    <img src="@/assets/images/cycle.png">
                </div>
            </div>
        </div>
        <div class="page__body" v-if="isAnimFinished">
            <router-view />
        </div>
    </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader,
    },
    data() {
        return {
            isLoggedIn: false,
            isAnimFinished: false,
        }
    },
    computed: {
        isAboutDisplay() {
            const curPath = this.$route.path;
            return !this.isLoggedIn 
                & (curPath === '/ideas/new')
                    || curPath === '/ideas/tag'
                    || curPath === '/ideas/recommend'
                    || curPath === '/events/new'
                    || curPath === '/events/coming'
        }
    },
    created() {
        const myUserId = this.$store.getters['auth/userId'];
        this.isLoggedIn = myUserId != null;

        console.log(this.$route.path)
    },
    mounted() {
        this
            .$anime
            .timeline()
            .add({
                targets:'.site-title h1, .site-title h5',
                translateY: -50,
                opacity: [0, 1],
                easing: 'easeOutElastic',
                duration: 1000,
                delay: 1000,
            })
            .add({
                targets:'.site-title h1, .site-title h5',
                opacity: [1, 0],
                easing: 'linear',
                duration: 500,
                complete: ()=> {
                    this.isAnimFinished = true;
                }
            })

    },
}
</script>

<style lang="scss" scoped>
#home__page {
    min-height: 100vh;
    height: 100%;
    background-color: $bg-color-primary;
}

.page__header {
    margin-bottom: $header-height;
}

.page__description {
    width: 100%;
    height: 100vh;
    background-color: $bg-color-secondary;
    position: relative;

    .site-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: center;
        text-align: center;

        h1, h5 {
            opacity: 0;
        }

        h1 {
            color: $title-color-primary;
            font-size: 4rem;
        }
        h5 {
            color: $title-color-secondary;
            font-size: 1.1rem;
            transform: translateY(-18px);
        }
    }
}

.page__about {
    width: 100%;
    background-color: #fff;

    .page__about-container {
        max-width: $global-max-width;
        margin: 0 auto;
        padding: 171.8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include respond(tablet) {
            margin: 0 2.47rem; // tabletの場合左右にmarginを入れる
        }

        .page__about-sentence {
            max-width: 414.2px; //256 * 1.618

            @include respond(tablet) {
                max-width: 100%;
            }

            h3 {
                font-weight: normal;
                font-size: 2.5rem;
            }
        }

        .image-container {
            max-width: 256px;

            img {
                width: 100%;
                height: auto;
            }

            @include respond(tablet) {
                display: none;
            }
        }
    }
}
</style>