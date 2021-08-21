<template>
    <div class="drag__image-uploader">
        <div class="dragDropArea" :style="{borderColor: borderColor}" 
            @dragover.prevent="changeDragState(true)" 
            @dragleave.prevent="changeDragState(false)" 
            @drop.prevent="uploadImage($event)"
            v-if="preview == null"
        >
            <p class="title">Drag & Drop to Upload File</p>
            <p class="or">OR</p>
            <div class="upload-image">
                <label for="upload-image-input" class="upload-image-btn"><span>browse image</span></label>
                <input id="upload-image-input" type="file" accept="image/*" @change="uploadImage($event)">
            </div>
        </div>
        <div class="preview" v-else-if="preview">
            <img :src="preview" alt="profile">
            <div class="delete-btn" @click="deletePreview">
                <span>&times;</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        defaultImage: String
    },
    data() {
        return {
            dragState: false, // true if dragOver
            imageSet: false, // true if image is set
            borderColor: "#dfdfdf",
            preview: null,
            selectedImage: null,
        }
    },
    created() {
        if (this.defaultImage !== null) {
            this.preview = this.defaultImage;
        }
    },
    methods: {
        uploadImage(event) {
            const files = event.target.files ? event.target.files : event.dataTransfer.files;
            const file  = files[0];
            this.selectedImage = file;
            if (file !== null) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.preview = e.target.result;
                }
                reader.readAsDataURL(file);
            } else {
                this.preview = this.defaultImage;
            }
            
            document.getElementById("upload-image-input").files = files;
        },
        changeDragState(flag) {
            this.dragState = flag;
            if (this.dragState) {
                this.borderColor = "#ade6fffc";
            } else {
                this.borderColor = "#dfdfdf";
            }
        },
        deletePreview() {
            this.preview = null;
        },
    },
    watch: {
        preview(val) {
            this.imageSet = val !== null;
        }
    }
}
</script>

<style scoped lang="scss">
.drag__image-uploader {
    max-width: 680px;
    position: relative;
    
    .dragDropArea {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fafafa;
        border-width: 2px;
        border-style: dashed;
        text-align: center;
        min-height: 420px; // 420 = 680 / 1.618
        .title {
            font-size: 20px;
            font-weight: bold;
        }
        .or {
            font-size: 12.36px; // 12.36 = 20 / 1.618
            margin: 7.64px 0; // 7.64 = 12.36 / 1.618
        }
        .upload-image {
            .upload-image-btn {
                border: 1px solid #dfdfdf;
                background-color: #fff;
                padding: 5px 8px;
                cursor: pointer;
                span {
                    font-size: 14px;
                }
                &:hover {
                    background-color: darken($color: #fff, $amount: 16.18%);
                }
            }
            #upload-image-input {
                display: none;
            }
        }
    }
    .preview {
        img {
            width: 100%;
            -webkit-filter: brightness(100%);
            &:hover {
                -webkit-filter: brightness(61.8%);
                -webkit-transition: all 0.1618s ease;
                -moz-transition: all 0.1618s ease;
                -o-transition: all 0.1618s ease;
                -ms-transition: all 0.1618s ease;
                transition: all 0.1618s ease;
            }
        }
        .delete-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>