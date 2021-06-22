<template>
    <BaseForm @submitFunc="updateIdea">
        <template #form-content>
            <div class="form-control">
                <h3 class="input__title">イメージの挿入</h3>
                <input class="image-input" type="file" @change="uploadImage" accept="image/*">
            </div>
        </template>
    </BaseForm>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';

export default {
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
        uploadImage(event) {
            this.uploadedImage = event.target.files[0];
            if (this.uploadedImage != null) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(this.uploadedImage);
            } else {
                this.previewImage = null;
            }
        },
        updateIdea() {
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
                idea_image: this.uploadedImage,
            }
            
            asyncProcessing.putIdea(updateData, this.ideaId)
            .then( () => {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId }});
            }).catch( err => {
                console.log("error to update image: ", err);
            })
        },
    },
    data() {
        return {
            uploadedImage: null, // uploadされた画像
            previewImage: null,  // preview用の画像
        }
    },
}
</script>