<template>
    <div id="idea__detail" v-if="loadComplete">
        <section class="idea__header">
            <div class="idea__settings" v-if="isMyIdea">
                <div class="setting__btn" @click="settingBtnPressed">
                    <FontAwesomeIcon class="icon" :icon="['fas', 'cog']" size="lg" />
                    <FontAwesomeIcon class="icon" :icon="['fas', 'caret-down']" size="lg" />
                </div>
                <BaseVerticalDropdown v-if="isDropdownOn">
                    <template #dropdown-item>
                        <li v-if="ideaDetail.state === 'draft'"><div class="dropdown__btn" @click="publishIdea('post')">公開する</div></li>
                        <li v-if="ideaDetail.state === 'post'"><div class="dropdown__btn" @click="publishIdea('draft')">非公開にする</div></li>
                        <li><div class="dropdown__btn" @click="showModal('edit')">編集する</div></li>
                        <li><div class="dropdown__btn" @click="showModal('delete')">削除する</div></li>
                    </template>
                </BaseVerticalDropdown>
                <!-- setting modal -->
                <BaseModal v-model="modalState" v-if="modalState">
                    <template #card>
                        <IdeaEditModal v-if="modalType === 'edit'"
                            :outerModalState="modalState"
                            :isMyIdea="isMyIdea"
                            :myUserId="myUserId"
                            :ideaId="ideaId"
                            :ideaDetail="ideaDetail"
                            :currentTags="currentTags"
                            :currentRecruitments="currentRecruitments"
                        />
                        <IdeaDeleteModal v-else-if="modalType === 'delete'"
                            :ideaId="ideaId"
                        />
                    </template>
                </BaseModal>
            </div>

            <div class="idea__title">
                <h1>{{ ideaDetail.title }}</h1>
            </div>
            <div class="idea__post-user">
                <span class="ideas__by">投稿者</span>
                <div class="user__profile-box">
                    <img :src="userDetail.prof_img">
                </div>
                <div class="user__profile-name">
                    <router-link :to="userLink">{{ userDetail.username }}</router-link>
                </div>
            </div>
            <div class="idea__header-container">
                <div class="display-tag">
                    <BaseTag v-for="(tag, key) in currentTags" :key="key" :name="tag" />
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
                <RecruitmentDisplay :currentRecruitments="currentRecruitments" />
            </div>
        </section>

        <section class="idea__body">
            <div class="idea__body-wrapper">
                <!-- 項目：概要 -->
                <IdeaContent title="概要" v-if="ideaDetail.overview.length > 0">
                    <template #content>
                        <p>{{ideaDetail.overview}}</p>
                    </template>
                </IdeaContent>
                <!-- 項目：ターゲット -->
                <IdeaContent title="ターゲット" v-if="ideaDetail.target.length > 0">
                    <template #content>
                        <p>{{ideaDetail.target}}</p>
                    </template>
                </IdeaContent>
                <!-- 項目：背景 -->
                <IdeaContent title="背景" v-if="ideaDetail.background.length > 0">
                    <template #content>
                        <p>{{ideaDetail.background}}</p>
                    </template>
                </IdeaContent>
                <!-- 項目：提供価値 -->
                <IdeaContent title="提供価値" v-if="ideaDetail.value.length > 0">
                    <template #content>
                        <p>{{ideaDetail.value}}</p>
                    </template>
                </IdeaContent>
                <!-- 項目：情熱 -->
                <IdeaContent title="一言" v-if="ideaDetail.passion.length">
                    <template #content>
                        <p>{{ideaDetail.passion}}</p>
                    </template>
                </IdeaContent>
                <!-- 項目：評価 -->
                <!-- <IdeaReputationSection
                    :ideaId="ideaId"
                /> -->
                <!-- 項目：画像 -->
                <IdeaContent title="イメージ" v-if="ideaDetail.idea_image">
                    <template #content>
                        <div class="idea__image-container">
                            <img :src="ideaDetail.idea_image" alt="idea-image">
                        </div>
                    </template>
                </IdeaContent>
                <!-- 項目：フィードバック -->
                <IdeaContent title="投稿者からの質問" v-if="feedbackQuestions.length > 0">
                    <template #content>
                        <div class="idea__feedback-questions">
                            <FeedbackQuestionElement
                                v-for="(question, index) in feedbackQuestions"
                                :key="index"
                                :question="question.question"
                                :questionId="question.feedback_question_id"
                            ></FeedbackQuestionElement>
                        </div>
                    </template>
                </IdeaContent>
            </div>
        </section>


    </div>
</template>

<script>
import asyncProcessing from '@/services/asyncProcessing.js';
import RecruitmentDisplay from '@/components/Idea/Detail/RecruitmentDisplay.vue';
import IdeaEditModal from '@/components/Idea/Detail/IdeaEditModal.vue';
import IdeaDeleteModal from '@/components/Idea/Detail/IdeaDeleteModal.vue';
import IdeaContent from '@/components/Idea/Detail/IdeaContent.vue';
import FeedbackQuestionElement from '@/components/Idea/Detail/FeedbackQuestionElement.vue';
// import IdeaReputationSection from '@/components/Idea/Detail/IdeaReputationSection.vue';
export default {
    components: {
        // InputTag,
        RecruitmentDisplay,
        IdeaEditModal,
        IdeaDeleteModal,
        IdeaContent,
        FeedbackQuestionElement,
        // IdeaReputationSection,
    },
    data() {
        return {
            // general
            loadComplete: false,
            // user
            userDetail: null,
            // idea
            isDropdownOn: false,
            isMyIdea: false,
            ideaDetail: null,
            ideaId: null,
            // tag
            currentTags: [], // 現時点でDBに格納されているtags
            currentRecruitments: [], // 現時点でDBに格納されているrecruitments
            // modal
            modalState: false,
            modalType: '', // 'edit' or 'delete'
            // idea content
            feedbackQuestions: [],
        };
    },
    computed: {
        userLink() {
            return { name: 'userprofile', params: { userId: this.userDetail.user_id }};
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
        settingBtnPressed() {
            this.isDropdownOn = !this.isDropdownOn;
        },
        showModal(_modalType) {
            this.modalType = _modalType;
            this.modalState = true;
            this.isDropdownOn = false;
        },
        publishIdea(_state) {
            const updateData = {
                user_id: this.myUserId,
                title: this.ideaDetail.title,
                overview: this.ideaDetail.overview,
                target: this.ideaDetail.target,
                background: this.ideaDetail.background,
                value: this.ideaDetail.value,
                passion: this.ideaDetail.passion,
                state: _state,
                deadline: this.ideaDetail.deadline,
                idea_image: this.ideaDetail.idea_image,
            }

            asyncProcessing.putIdea(updateData, this.ideaId)
            .then(() => {
                this.$router.go({name: 'ideas', params: {ideaId: this.ideaId}});
            }).catch( err => {
                console.log("error to publish idea: ", err);
            })

            this.isDropdownOn = false;
        },
        clearModalState() {
            // modalを画面から消す
            this.modalState = false;
        }
    },
    created() {
        // router paramsより本アイデアのideaIdを取得
        this.ideaId = this.$route.params['ideaId'];

        asyncProcessing.loadIdeaDetail(this.ideaId)
        .then( res => {
            // idea情報を取得
            this.ideaDetail = res;

            // 取得したアイデア情報より、自分のアイデアかを確認
            if (this.myUserId == this.ideaDetail.user_id) {
                this.isMyIdea = true;
            }

            // tag情報を取得
            return asyncProcessing.loadIdeaTags(this.ideaId);
        }).then( res => {
            // tag名をtags配列に格納する
            this.currentTags = res.map( (tag) => tag.tag_name );

            // recruitments情報を取得
            return asyncProcessing.loadRecruitments(this.ideaId);
        }).then( res => {
            if (res != null) {
                for (const item of res) {
                    const kind = item.kind;
                    const number = item.number;
                    this.currentRecruitments.push({
                        kind: kind,
                        number: number,
                    });
                }
            }
            return asyncProcessing.loadUserDetail(this.ideaDetail.user_id);
        }).then( res => {
            // user情報を取得
            this.userDetail = res;

            return asyncProcessing.loadFeedbackQuestions(this.ideaId);
        }).then( res => {
            // feedback questionsの取得
            this.feedbackQuestions = res;

            // 必要なロードが完了
            this.loadComplete = true;
        }).catch( err => {
            console.log("error to load idea detail: ", err);
        });
    },
    beforeRouteLeave(to, from, next) {
        // 他のページに遷移する前にmodalを全てfalseにする
        // でないとstateが残ってしまう
        this.clearModalState();
        next();
    }
}
</script>

<style lang="scss" scoped>
.idea__header {
    max-width: $global-max-width;
    padding-top: 6.47rem; // $header-height * 1.618
    margin: 0 auto;
    text-align: left;
    color: #000;

    .idea__header-container {
        margin-bottom: 1rem;
    }

    .idea__settings {
        display: flex;
        align-items: center;
        position: relative; // dropdown's position is relative to this setting
    }

    .setting__btn {
        margin-left: auto;
        cursor: pointer;
    }

    .vertical__dropdown {
        padding: 0;
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 90;
    }

    .dropdown__btn {
        line-height: 3rem;
        color: #000;
        cursor: pointer;

        &:hover {
            background-color: $color-secondary;
        }
    }

    .idea__title {
        border-bottom: 1px solid #ccc;
        font-size: 26px;
        letter-spacing: 5px;
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
        margin-right: 0.5rem;
        position: relative;

        img {
            width: 35px;
            height: 35px;    
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .user__profile-name {
        a {
            text-decoration: none;
            color: #000;

            &:hover {
                border-bottom: 1px solid #000;
            }
        }
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

        h3 {
            color: #fa2e27;
        }
    }

    .tag__header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 1rem;

        h3 {
            margin-right: 0.5rem;
        }
    }

    .display-tag {
        @include clear-float;

        .base-tag {
            font-size: 16px;
            background-color: #fff;
        }
    }
    
    .display-tag .base-tag {
        font-size: 16px;
        background-color: #fff;
    }
}

.idea__body {
    background-color: $bg-color-secondary;

    .idea__body-wrapper {
        max-width: $global-max-width;
        margin: 0 auto;

        .idea__image-container {
            text-align: center;
            
            img {
                max-width: 800px;
                max-height: 600px;
            }
        }

        .idea__feedback-questions {
            width: 100%;
            margin-right: auto;
            max-height: 20rem;
        }
    }
}
</style>