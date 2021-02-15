<template>
    <div id="settings">
        <BaseCard v-if="loadComplete">
            <BaseForm @submitFunc="updateProfile" headerTitle="プロフィール編集">
                <template #form-header>
                    <div class="form-control profile-image">
                        <img :src="previewImage" alt="profile">
                        <input class="image-input" type="file" @change="imageSelect" accept="image/*">
                    </div>
                </template>
                <template #form-content>
                    <div class="form-control" :class="{invalid: !formData.username.isValid}">
                        <label for="username">ユーザー名</label>
                        <p v-if="!formData.username.isValid">ユーザー名は必須項目です</p>
                        <input type="text" id="username" name="username" v-model.trim="formData.username.val" @blur="clearValidity('username')">
                    </div>
                    <div class="form-control">
                        <label for="univ">大学</label>
                        <input type="text" id="univ" name="univ" v-model.trim="formData.univ">
                    </div>
                    <div class="form-control">
                        <label for="major">学部・専攻</label>
                        <input type="text" id="major" name="major" v-model.trim="formData.major">
                    </div>
                    <div class="form-control">
                        <label for="email">メールアドレス</label>
                        <input type="email" id="email" name="email" v-model.trim="formData.email">
                    </div>
                    <div class="form-control">
                        <label for="intro">一言</label>
                        <ResizableTextarea idea="intro" v-model="formData.intro"/>
                    </div>
                    <div class="form-control">
                        <label for="portfolio">ポートフォリオ</label>
                        <input type="url" id="portfolio" name="portfolio" placeholder="https://example.com" pattern="https://.*" size="30" v-model="formData.portfolio">
                    </div>
                    <div class="form-control">
                        <InputTag tagLabel="タグ" :tags="inputTags" :maximum="5"/>
                    </div>
                </template>
            </BaseForm>
        </BaseCard>
    </div>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js';
import InputTag from '@/components/Tag/InputTag.vue';
import ResizableTextarea from '@/components/UI/ResizableTextarea.vue';

export default {
    components: {
        InputTag,
        ResizableTextarea
    },
    data() {
        return {
            loadComplete: false,
            isFormValid: true,
            selectedImage: null,
            previewImage: null,
            formData: {
                username: {
                    val: '',
                    isValid: true,
                },
                univ: '',
                major: '',
                email: null,
                intro: '',
                portfolio: '',
            },
            tags: [],    // 現時点でDBに格納されているtags
            inputTags: [], // ユーザーの入力を反映したtags
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
    },
    created() {
        apiHelper.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            return apiHelper.loadUserTags(this.userId);
        }).then( res => {
            // tag_nameのみを取り出す
            if (res != null) {
                this.tags = res.map((tag) => tag.tag_name);
                this.inputTags = this.tags.slice(); // 値渡し
            }

            this.initUserForm();
            this.loadComplete = true;
        }).catch (err => {
            console.log("error to load user detail at setting page: ", err);
        })
    },
    methods: {
        initUserForm() {
            // すでに登録されている情報をフォームに反映する
            this.formData.username.val = this.userDetail.username;
            this.formData.univ = this.userDetail.univ_name == null ? '' : this.userDetail.univ_name;
            this.formData.major = this.userDetail.major == null ? '' : this.userDetail.major;
            this.formData.email = this.userDetail.email == null ? '' : this.userDetail.email;
            this.formData.intro = this.userDetail.intro == null ? '' : this.userDetail.intro;
            this.formData.portfolio = this.userDetail.portfolio == null ? '' : this.userDetail.portfolio;

            if (this.userDetail.prof_img != null) {
                this.previewImage = this.userDetail.prof_img;
            }
        }, 
        imageSelect(event) {
            this.selectedImage = event.target.files[0];

            if (this.selectedImage != null) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(this.selectedImage);
            } else {
                this.previewImage = this.userDetail.prof_img;
            }
        },
        clearValidity(input) {
            this.formData[input].isValid = true;
        },
        formValidation() {
            this.isFormValid = true;

            if (this.formData.username.val === '') {
                this.formData.username.isValid = false;
                this.isFormValid = false;
            }
        },
        updateProfile() {
            this.formValidation();

            if (!this.isFormValid) {
                return;
            }

            const updateData = {
                userDetail: null,
                userId: this.userId,
                username: this.formData.username.val,
                email: this.formData.email,
                prof_img: this.selectedImage,
                intro: this.formData.intro == null ? '' : this.formData.intro,
                univ_name: this.formData.univ == null ? '' : this.formData.univ,
                major: this.formData.major == null ? '' : this.formData.major,
                portfolio: this.formData.portfolio == null ? '' : this.formData.portfolio,
            };
            
            // userDetailの更新
            apiHelper.updateUserDetail(updateData)
            .catch( err => {
                console.log("error to update user detail: ", err);
            })

            // タグの追加 / 更新
            if (this.inputTags == null) return;

            // もしタグ未登録なら追加して終了
            if (this.tags == null) {
                const promises = [];
                for (const tag of this.inputTags) {
                    promises.push(apiHelper.postUserTag(this.userId, tag));
                }
                Promise.all(promises)
                .then( () => {
                    // reload
                    this.$router.go({ name: 'userprofile', params: { userId: this.userId }});   
                }).catch( err => {
                    console.log("error to post userTag: ", err);
                })
            } else if (!utils.arrayEqual(this.tags, this.inputTags) ) {
                // もしタグに変更があるなら既存のタグを全削除してから、新しいタグを追加する
                apiHelper.deleteAllUserTag(this.userId)
                .then( () => {
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(apiHelper.postUserTag(this.userId, tag));
                    }

                    return Promise.all(promises)
                }).then( () => {
                    // reload
                    this.$router.go({ name: 'userprofile', params: { userId: this.userId }});
                }).catch(err => {
                    console.log("error to update tag: ", err)
                })
            } else {
                // reload
                this.$router.go({ name: 'userprofile', params: { userId: this.userId }});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#settings {
    padding: 2rem 0;
}

.card {
    max-width: 40rem;
    padding: 2rem
}

.profile-image {
    margin: 2rem 0;

    img {
        width: 128px;
        height: 128px;
        border-radius: 128px;
    }

    input {
        margin: 0 auto;
        display: block;
    }
}
</style>