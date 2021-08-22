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
            // upload image
            let uploadedImage = null;
            if (this.$refs.imageUploader.selectedImage !== null) {
                // 新しい画像が入力されていたらそれを採用する
                uploadedImage = this.$refs.imageUploader.selectedImage;
            }

            // deadline
            let deadline;
            if (this.ideaDetail.deadline === null) {
                // deadlineがnullのままだとputに失敗するため値を適当に入力する
                // deadlineが未指定の場合はデフォルトで1カ月後にする
                const today = new Date();
                const nextMonth = new Date(today.setMonth(today.getMonth()+1));
                deadline = nextMonth.toISOString();
            } else {
                // ISO extended formatでないとエラーになる
                deadline = new Date(this.ideaDetail.deadline).toISOString();
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
                deadline: deadline,
                idea_image: uploadedImage
            };

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