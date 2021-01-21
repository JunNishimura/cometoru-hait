<template>
    <div id="idea__detail" v-if="loadComplete">
        <section class="idea__header">
            <div class="idea__title">
                <h1>{{ ideaDetail.title }}</h1>
            </div>
            <div class="idea__post-user">
                <span class="ideas__by">Ideas By: </span>
                <div class="user__profile-box">
                    <img :src="userDetail.prof_img">
                </div>
                <div class="user__profile-name">
                    <router-link :to="userLink">{{ userDetail.username }}</router-link>
                </div>
            </div>
            <div class="idea__header-align">
                <div class="idea__header-left">
                    <div class="idea__header-container operation" v-if="this.isMyIdea">
                        <div class="publish" v-if="this.ideaDetail.state === 'draft'">
                            <button @click="publishIdea">公開する</button>
                        </div>
                        <div class="edit">
                            <button @click="editIdea">編集する</button>
                        </div>
                        <div class="delete">
                            <button @click="deleteIdea">削除する</button>
                        </div>
                    </div>

                    <div class="idea__header-container tags">
                        <div class="tag__header">
                            <BaseEditButton v-if="isMyIdea" @edit="editTag" />
                        </div>
                        <div class="tag-modal" v-if="modalState.tag">
                            <BaseModal v-model="modalState.tag">
                                <template #card>
                                    <BaseForm title="タグの更新">
                                        <InputTag :tags="inputTags" :maximum="5" />
                                        <BaseModalButton @clickModalBtn="updateTag" />
                                    </BaseForm>
                                </template>
                            </BaseModal>
                        </div>
                        <div class="display-tag">
                            <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag" />
                        </div>
                    </div>

                    <div class="idea__header-container">
                        <div class="idea__header-subcontainer">
                            <span class="subcontainer__icon"><FontAwesomeIcon :icon="['far', 'clock']" size="lg" /></span>
                            <h4>〆切</h4>
                        </div>
                        <div class="deadline__info">
                            <h3> {{ displayDeadline }}</h3>
                        </div>
                    </div>
                    <div class="idea__header-container">
                        <RecruitmentDisplay :ideaId="ideaId" />
                    </div>
                </div>
                <!-- <div class="idea__header-right">
                    <IdeaReputationSection
                        :ideaId="ideaId"
                    />
                </div> -->
            </div>
        </section>

        <section class="idea__body">
            <IdeaDetailTab />
            <IdeaOverviewSection 
                :overview="ideaDetail.overview"
                :target="ideaDetail.target"
                :background="ideaDetail.background"
                :value="ideaDetail.value"
                :passion="ideaDetail.passion"
            />
            <!-- <IdeaReputationSection
                :ideaId="ideaId"
            /> -->
            <IdeaFeedbackSection
                :ideaId="ideaId"
                :isMyIdea="isMyIdea"
            />
        </section>
    </div>
</template>

<script>
import utils from '@/services/utils.js';
import apiHelper from '@/services/apiHelper.js';
import IdeaDetailTab from '@/components/Idea/Detail/IdeaDetailTab.vue';
import InputTag from '@/components/Tag/InputTag.vue';
import IdeaOverviewSection from '@/components/Idea/Detail/IdeaOverviewSection.vue';
// import IdeaReputationSection from '@/components/Idea/Detail/IdeaReputationSection.vue';
import RecruitmentDisplay from '@/components/Idea/Detail/RecruitmentDisplay.vue';
import IdeaFeedbackSection from '@/components/Idea/Detail/IdeaFeedbackSection.vue';

export default {
    components: {
        IdeaDetailTab,
        InputTag,
        IdeaOverviewSection,
        // IdeaReputationSection,
        RecruitmentDisplay,
        IdeaFeedbackSection,
    },
    data() {
        return {
            // general
            loadComplete: false,
            // user
            userDetail: null,
            // idea
            isMyIdea: false,
            ideaDetail: null,
            ideaId: null,
            // tag
            tags: [], // 現時点でDBに書くのされているtags
            inputTags: [], // ユーザーの入力を反映したtags
            // modal
            modalState: {
                tag: false,
                message: false,
            },
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
        },
        editLink() {
            return { name: 'editIdea', params: { ideaId: this.ideaId }};
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        displayDeadline() {
            return this.ideaDetail.deadline == null || this.ideaDetail.deadline.length === 0
                ? '未定' : this.ideaDetail.deadline;
        }
    },
    methods: {
        editTag() {
            this.modalState.tag = true;
        },
        showMessageModal() {
            this.modalState.message = true;
        },
        updateTag() {
            // 入力タグがなければ終了
            if (this.inputTags.length == 0) {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
            }

            // もしタグが未登録の場合はそのまま登録
            if(this.tags.length === 0) {
                const promises = [];
                for (const tag of this.inputTags) {
                    promises.push(apiHelper.postIdeaTag(this.ideaId, tag));
                }

                Promise.all(promises)
                .then( () => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
                }).catch( err => {
                    console.log("error to post new idea: ", err);
                });
            } else if (!utils.arrayEqual(this.tags, this.inputTags) ) {
                // もし元々のタグから変更があるなら全部消してから全てを追加する
                apiHelper.deleteAllIdeaTag(this.ideaId)
                .then(() => {
                    const promises = [];
                    for (const tag of this.inputTags) {
                        promises.push(apiHelper.postIdeaTag(this.ideaId, tag));
                    }

                    return Promise.all(promises)
                }).then( () => {
                    this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
                }).catch(err => {
                    console.log("error to update tag: ", err)
                })
            } else {
                this.$router.go({ name: 'ideaDetail', params: { ideaId: this.ideaId } });
            }
        },
        publishIdea() {
            apiHelper.publishIdea(this.ideaDetail, this.ideaId)
            .then(() => {
                this.$router.replace('/');  
            }).catch( err => {
                console.log("error to publish idea: ", err);
            })
        },
        editIdea() {
            // アイデア編集ページに遷移する
            this.$router.replace(this.editLink);
        },
        deleteIdea() {
            apiHelper.deleteIdea(this.ideaId)
            .then(() => {
                // 削除後はideasページに遷移
                this.$router.replace({ name: 'ideas' });
            }).catch( err => {
                console.log("error to delete idea: ", err);
            })
        },
        clearModalState() {
            this.modalState.tag = false;
            this.modalState.message = false;
        }
    },
    created() {
        // router paramsより本アイデアのideaIdを取得
        this.ideaId = this.$route.params['ideaId'];

        apiHelper.loadIdeaDetail(this.ideaId)
        .then( res => {
            // idea情報を取得
            this.ideaDetail = res;

            // 取得したアイデア情報より、自分のアイデアかを確認
            if (this.myUserId == this.ideaDetail.user_id) {
                this.isMyIdea = true;
            }

            // tag情報を取得
            return apiHelper.loadIdeaTags(this.ideaDetail.idea_id);
        }).then( res => {
            // tag名をtags配列に格納する
            this.tags = res.map( (tag) => tag.tag_name );
            this.inputTags = this.tags.slice(); // 値渡し

            return apiHelper.loadUserDetail(this.ideaDetail.user_id);
        }).then( res => {
            // user情報を取得
            this.userDetail = res;

            // 必要なロードが完了
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load idea detail: ", err);
        });
    },
    beforeRouteLeave(to, from, next) {
        // 他のページに遷移する前にmodalを全てfalseにする
        this.clearModalState();
        next();
    }
}
</script>

<style scoped>
.idea__detail {
    width: 100%;
}

.idea__header {
    width: 60%;
    padding: 3rem 0 0;
    margin: 0 auto;
    text-align: left;
    color: #000;
}

.idea__header-container {
    margin-bottom: 1rem;
}
/* 
.idea__header-align {
    display: flex;
    justify-content: space-between;
} */

.idea__title {
    border-bottom: 1px solid #ccc;
}

.idea__post-user {
    display: flex;
    align-items: center;
}

.ideas__by {
    margin-left: auto;
    margin-right: 1rem;
}

.user__profile-box {
    width: 40px;
    height: 40px;
    position: relative;
    margin-right: 0.5rem;
}

.user__profile-box img {
    width: 35px;
    height: 35px;    
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.user__profile-name a {
    text-decoration: none;
    color: #000;
}

.user__profile-name a:hover {
    border-bottom: 1px solid #000;
}

.idea__header-subcontainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.subcontainer__icon {
    width: 2rem;
    text-align: center;
}

.deadline__info {
    margin: 0.5rem 0 0 1rem;
}

.deadline__info h3 {
    color: #fa2e27;
}

.idea__title {
    font-size: 26px;
    letter-spacing: 5px;
}

.idea__header .edit {
    margin: 1rem 0;
}

.idea__header .operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.idea__header button {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    margin-right: 1rem;
}

.idea__header .publish button {
    background-color: #ffbb3c;
}

.idea__header .publish button:hover {
    background-color: #d89e32;
}

.idea__header .edit button {
    background-color: #12da00;
}

.idea__header .edit button:hover {
    background-color: #0fb800;
}

.idea__header .delete button {
    background-color: #da0000;
}

.idea__header .delete button:hover {
    background-color: #b80000;
}

.tag__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
}

.tag__header h3 {
    margin-right: 0.5rem;
}

.display-tag::after {
    content: "";
    display: block;
    clear: both;
}
 
.display-tag .base-tag {
    font-size: 16px;
    background-color: #fff;
}
</style>