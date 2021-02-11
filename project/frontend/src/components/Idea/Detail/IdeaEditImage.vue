<template>
    <BaseForm @submitFunc="updateImage">
        <template #form-content>
            <div class="form-control">
                <h3 class="input__title">イメージの挿入</h3>
                <input class="image-input" type="file" @change="uploadImage" accept="image/*">
            </div>
        </template>
    </BaseForm>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: {
        ideaId: {
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        userId: {
            required: true,
        },
        state: {
            type: String,
            required: true
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
        updateImage() {
            const data = {
                user_id: this.userId,
                title: this.title,
                state: this.state,
                idea_image: this.uploadedImage,
            }
            
            apiHelper.putImage(data, this.ideaId)
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