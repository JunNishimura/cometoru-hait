<template>
    <div id="idea__image-section">
        <div class="idea__image-container">
            <IdeaPropertyContainer title="イメージ">
                <template #content>
                    <div class="idea__image-box">
                        <img :src="image" alt="idea-image" v-show="imageOn">
                    </div>
                </template>
            </IdeaPropertyContainer>
        </div>
    </div>
</template>

<script>
import IdeaPropertyContainer from '@/components/Idea/Detail/IdeaPropertyContainer.vue';

export default {
    props: ['image'],
    components: {
        IdeaPropertyContainer,
    },
    computed: {
        imageOn() {
            return this.image != null ? true : false;
        }
    }
}
</script>

<style lang="scss" scoped>
.idea__image-box {
    text-align: center;
    
    img {
        max-width: 800px;
        max-height: 600px;
    }
}
</style>