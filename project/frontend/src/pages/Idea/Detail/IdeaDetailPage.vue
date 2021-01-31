<template>
    <div id="idea__detail" v-if="loadComplete">
        <section class="idea__header">
            <div class="idea__settings" v-if="this.isMyIdea">
                <div class="setting__btn" @click="settingBtnPressed">
                    <FontAwesomeIcon class="icon" :icon="['fas', 'cog']" size="lg" />
                    <FontAwesomeIcon class="icon" :icon="['fas', 'caret-down']" size="lg" />
                </div>
                <div class="setting__dropdown" v-if="isDropdownOn">
                    <ul>
                        <li v-if="this.ideaDetail.state === 'draft'"><button @click="publishIdea">公開する</button></li>
                        <li><button @click="showModal">編集する</button></li>
                        <li><button @click="deleteIdea">削除する</button></li>
                    </ul>
                </div>
                <div class="setting__modal" v-if="modalState">
                    <BaseModal v-model="modalState">
                        <template #card>
                            <HeaderModalCard 
                                :myUserId="myUserId"
                                :ideaId="ideaId"
                                :currentTitle="ideaDetail.title"
                                :currentTags="currentTags"
                                :currentState="ideaDetail.state"
                                :currentDeadline="ideaDetail.deadline"
                                :currentRecruitments="currentRecruitments"
                            />
                            <!-- <BaseForm title="タグの更新">
                                <InputTag :tags="inputTags" :maximum="5" />
                                <BaseModalButton @clickModalBtn="updateTag" />
                            </BaseForm> -->
                        </template>
                    </BaseModal>
                </div>
            </div>
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
            <!-- <div class="idea__header-right">
                <IdeaReputationSection
                    :ideaId="ideaId"
                />
            </div> -->
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
import apiHelper from '@/services/apiHelper.js';
import IdeaDetailTab from '@/components/Idea/Detail/IdeaDetailTab.vue';
// import InputTag from '@/components/Tag/InputTag.vue';
import IdeaOverviewSection from '@/components/Idea/Detail/IdeaOverviewSection.vue';
// import IdeaReputationSection from '@/components/Idea/Detail/IdeaReputationSection.vue';
import RecruitmentDisplay from '@/components/Idea/Detail/RecruitmentDisplay.vue';
import IdeaFeedbackSection from '@/components/Idea/Detail/IdeaFeedbackSection.vue';
import HeaderModalCard from '@/components/Idea/Detail/HeaderModalCard.vue';

export default {
    components: {
        IdeaDetailTab,
        // InputTag,
        IdeaOverviewSection,
        // IdeaReputationSection,
        RecruitmentDisplay,
        IdeaFeedbackSection,
        HeaderModalCard,
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
        showModal() {
            this.modalState = true;
            this.isDropdownOn = false;
        },
        publishIdea() {
            apiHelper.publishIdea(this.ideaDetail, this.ideaId)
            .then(() => {
                this.$router.replace('/');
            }).catch( err => {
                console.log("error to publish idea: ", err);
            })

            this.isDropdownOn = false;
        },
        deleteIdea() {
            apiHelper.deleteIdea(this.ideaId)
            .then(() => {
                // 削除後はideasページに遷移
                this.$router.replace({ name: 'ideas' });
            }).catch( err => {
                console.log("error to delete idea: ", err);
            })

            this.isDropdownOn = false;
        },
        clearModalState() {
            this.modalState = false;
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
            return apiHelper.loadIdeaTags(this.ideaId);
        }).then( res => {
            // tag名をtags配列に格納する
            this.currentTags = res.map( (tag) => tag.tag_name );

            // recruitments情報を取得
            return apiHelper.loadRecruitments(this.ideaId);
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

.idea__settings {
    display: flex;
    align-items: center;
    position: relative;
}

.setting__btn {
    margin-left: auto;
    cursor: pointer;
}

.setting__dropdown {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    width: 10rem;
    top: 100%;
    right: 0;
    z-index: 90;
    position: absolute;
}

.setting__dropdown ul {
    list-style: none;
    text-align: center;
}

.setting__dropdown button {
    font-size: 14px;
    width: 100%;
    height: 2rem;
    outline: none;
}

.setting__dropdown button:hover {
    background-color: #ffe0a7;
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