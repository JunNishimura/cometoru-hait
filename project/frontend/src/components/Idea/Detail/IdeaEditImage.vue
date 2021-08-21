<template>
    <BaseForm @submitFunc="updateIdea">
        <template #form-content>
            <div class="form-control">
                <DragImageUploader :defaultImage="ideaDetail.idea_image" ref="imageUploader" />
            </div>
        </template>
    </BaseForm>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';
import DragImageUploader from '@/components/UI/DragImageUploader.vue';

export default {
    components: {
        DragImageUploader
    },
    props: {
        ideaId: {
            required: true,
        },
        userId: {
            required: true,
        },
        ideaDetail: {
            required: true,
            type: Object
        }
    },
    methods: {
        updateIdea() {
            let uploadedImage;
            if (this.$refs.imageUploader.selectedImage !== null) {
                // 新しい画像が入力されていたらそれを採用する
                uploadedImage = this.$refs.imageUploader.selectedImage;
            } else {
                uploadedImage = this.userDetail.prof_img;
            }

            const updateData = {
                user_id: this.userId,
                title: this.ideaDetail.title,
                overview: this.ideaDetail.overview,
                target: this.ideaDetail.target,
                background: this.ideaDetail.background,
                value: this.ideaDetail.value,
                passion: this.ideaDetail.passion,
                state: this.ideaDetail.state,
                deadline: this.ideaDetail.deadline,
                idea_image: uploadedImage,
            }

            console.log(updateData)
            
            asyncProcessing.putIdea(updateData, this.ideaId)
            .then( () => {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to update image: ", err);
            })
        },
    },
}
</script>