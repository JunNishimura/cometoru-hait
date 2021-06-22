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
                    <div class="form-control">
                        <label for="username">ユーザー名</label>
                        <input type="text" id="username" name="username" v-model.trim="formData.username">
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
import asyncProcessing from '@/services/asyncProcessing.js';
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
            selectedImage: null,
            previewImage: null,
            formData: {
                username: '',
                univ: '',
                major: '',
                email: null,
                intro: '',
                portfolio: '',
            },
            originalTags: [],    // 現時点でDBに格納されているtags
            inputTags: [], // ユーザーの入力を反映したtags
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
    },
    created() {
        asyncProcessing.loadUserDetail(this.userId)
        .then( res => {
            this.userDetail = res;

            return asyncProcessing.loadUserTags(this.userId);
        }).then( res => {
            // tag_nameのみを取り出す
            if (res != null) {
                this.originalTags = res.map((tag) => tag.tag_name);
                this.inputTags = this.originalTags.slice(); // 値渡し
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
            this.formData.username  = this.userDetail.username;
            this.formData.univ      = this.userDetail.univ_name == null ? '' : this.userDetail.univ_name;
            this.formData.major     = this.userDetail.major     == null ? '' : this.userDetail.major;
            this.formData.email     = this.userDetail.email     == null ? '' : this.userDetail.email;
            this.formData.intro     = this.userDetail.intro     == null ? '' : this.userDetail.intro;
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
        usernameNullCheck() {
            // usernameは空にできないため、空に書き換えられたら元々の名前を入れる
            if (this.formData.username == null) {
                this.formData.username = this.userDetail.username;
            }
        },
        reload() {
            this.$router.replace({ name: 'userprofile', params: { userId: this.userId }});   
        },
        updateTags() {
            if (this.originalTags == null && this.inputTags.length >= 1) {
                // 元々タグが未登録なら追加して終了
                const promises = [];
                for (const tag of this.inputTags) {
                    promises.push(asyncProcessing.postUserTag(this.userId, tag));
                }
                Promise.all(promises)
                .then( () => {
                    this.reload();
                }).catch( err => {
                    console.log("error to post userTag: ", err);
                })
            } else if (!utils.arrayEqual(this.originalTags, this.inputTags) ) {
                // もしタグに変更があるなら既存のタグを全削除してから、新しいタグを追加する
                asyncProcessing.deleteAllUserTag(this.userId)
                .then( () => {
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(asyncProcessing.postUserTag(this.userId, tag));
                    }

                    return Promise.all(promises)
                }).then( () => {
                    this.reload();
                }).catch(err => {
                    console.log("error to update tag: ", err)
                })
            } else {
                this.reload();
            }
        },
        updateProfile() {
            this.usernameNullCheck();

            // userDetailの更新
            const updateData = {
                userId: this.userId,
                username: this.formData.username,
                email: this.formData.email,
                prof_img: this.selectedImage,
                intro: this.formData.intro,
                univ_name: this.formData.univ,
                major: this.formData.major,
                portfolio: this.formData.portfolio,
            };
            asyncProcessing.updateUserDetail(updateData)
            .catch( err => {
                console.log("error to update user detail: ", err);
            })

            // タグの追加 / 更新
            this.updateTags();
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