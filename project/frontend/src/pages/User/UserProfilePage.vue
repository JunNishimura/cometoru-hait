<template>
    <div id="profile-page" v-if="loadComplete">
        <div class="profile__header">
            <div class="profile__header-left">
                <div class="profile__image-box">
                    <img :src="userDetail.prof_img" alt="profile">
                </div>
                <div class="profile__btns" v-if="!isMyProfile">
                    <div class="btn__outer">
                        <button class="profile__follow-btn" @click="follow">
                            {{ followLabel }}
                            <FontAwesomeIcon class="icon" v-if="!isFollowing" :icon="['fas', 'user-plus']"  />
                            <FontAwesomeIcon class="icon" v-if="isFollowing"  :icon="['fas', 'user-minus']" />
                        </button>
                    </div>
                    <div class="btn__outer">
                        <button  @click="showModal('message')" class="profile__message-btn">
                            メッセージを送る 
                            <FontAwesomeIcon class="icon" :icon="['fas', 'paper-plane']" />
                        </button>
                        <div class="message-modal" v-if="modalState.message">
                            <MessageModal v-model="modalState.message" :userTo="userDetail.user_id" />
                        </div>
                    </div>
                </div>
                <div class="edit-profile" v-if="isMyProfile">   
                    <router-link to="/settings">
                        <span>Edit Profile</span>
                        <FontAwesomeIcon :icon="['far', 'edit']" />
                    </router-link>
                </div>
            </div>
            <div class="profile__header-right">
                <div class="profile__name">
                    <h2 class>{{ userDetail.username }}</h2>
                </div>
                <div class="profile__tag">
                    <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
                </div>
                <div class="profile__intro">
                    <p>{{ userDetail.intro }}</p>
                </div>
                <div class="profile__follow">
                    <div class="profile__follow-buttons">
                        <div class="follower-btn" @click="showModal('follower')">フォロワー {{ followerCount }}人</div>
                        <div class="following-btn" @click="showModal('following')">フォロー中 {{ followingCount }}人</div>
                    </div>
                </div>
                <div class="profile__sub-info">
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'envelope']" size="lg"/></span>
                        <span><a :href="mailAddress">{{ userDetail.email }}</a></span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'university']" size="lg"/></span>
                        <span>{{ userDetail.univ_name }}</span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'book-open']" size="lg"/></span>
                        <span>{{ userDetail.major }}</span>
                    </div>
                    <div class="info-row">
                        <span><FontAwesomeIcon :icon="['fas', 'link']" size="lg" /></span>
                        <span><a :href="userDetail.portfolio">{{ userDetail.portfolio }}</a></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <div class="follow__modal" v-if="modalState.follow">
            <BaseModal v-model="modalState.follow">
                <template #card>
                    <div class="follower-list" v-if="modalState.follower && modalState.follow">
                        <UserFollowElement
                            v-for="(ud, index) in followIds.follower"
                            :key="index"
                            :userId="ud"
                        ></UserFollowElement>
                    </div>
                    <div class="following-list" v-if="modalState.following && modalState.follow">
                        <UserFollowElement
                            v-for="(ud, index) in followIds.following"
                            :key="index"
                            :userId="ud"
                        ></UserFollowElement>
                    </div>
                </template>
            </BaseModal>
        </div>

        <section class="profile__content"> 
            <UserTab :isMyProfile="isMyProfile" />
            <router-view />
        </section>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import MessageModal from '@/components/Message/MessageModal.vue';
import UserTab from '@/components/User/UserTab.vue';
import UserFollowElement from '@/components/User/UserFollowElement.vue';

export default {
    components: {
        MessageModal,
        UserTab,
        UserFollowElement
    },
    data() {
        return {
            userDetail: null,
            loadComplete: false,
            isMyProfile: false,
            postIdeas: [],
            tags: [],
            followerCount: 0,
            followingCount: 0,
            followIds: {
                follower: [],   // フォローされているユーザーのidのリスト
                following: [],  // フォローしているユーザーのidのリスト
            },
            isFollowing: false,
            modalState : {
                follow: false,
                follower: false,
                following: false,
                message: false,
            }
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        mailAddress() {
            return "mailto:" + this.userDetail.contact;
        },
        paramUserId() {
            return this.$route.params['userId'];
        },
        followLabel() {
            return this.isFollowing ? 'フォロー解除' : 'フォロー';
        },
    },
    methods: {
        showModal(type) {
            if (type === 'message') {
                this.modalState.message = true;
            } else if(type === 'follower') {
                this.modalState.follow = this.modalState.follower = true;
                this.modalState.following = false;
            } else if (type === 'following') {
                this.modalState.follow = this.modalState.following = true;
                this.modalState.follower = false;
            }
        },
        loadUserData() {
            apiHelper.loadUserDetail(this.paramUserId) 
            .then( res => {
                this.userDetail = res;

                // userのタグを取得
                return apiHelper.loadUserTags(this.paramUserId);
            }).then( res => {
                this.tags = res;

                // ユーザーが投稿したアイデアのみを抽出
                return apiHelper.loadFilteredPostIdeas(this.paramUserId);
            }).then ( res => {
                this.postIdeas = res;

                return apiHelper.loadFollowers(this.paramUserId)
            }).then( res => {
                this.followIds.follower = res.map((data) => data.user_id);
            
                return apiHelper.loadFollowingUsers(this.paramUserId)
            }).then( res => {
                this.followIds.following = res.map((data) => data.following_user_id);
                
                // ロード完了
                this.loadComplete = true;
            }).catch ( err => {
                console.log("error to load user profile: ", err);
            });
        },
        loadFollowData() {
            // フォロワーの読み込み
            return apiHelper.loadFollowers(this.paramUserId)
            .then( res => {
                this.followerCount = res.length;

                // フォロー中のユーザーを読み込み
                return apiHelper.loadFollowingUsers(this.paramUserId);
            }).then( res => {
                this.followingCount = res.length;
            }).catch( err => {
                console.log("error to load followers, followingUsers: ", err);
            })
        },
        follow() {
            if (this.isFollowing) {
                // フォロー済みなら、フォロー解除
                apiHelper.stopFollowing(this.myUserId, this.paramUserId)
                .then( () => {
                    this.loadFollowData();
                    this.isFollowing = false;
                }).catch( err => {
                    console.log("error to stop following: ", err);
                })
            } else {
                // フォローしていないなら、フォローする
                apiHelper.follow(this.myUserId, this.paramUserId)
                .then( () => {
                    this.loadFollowData();
                    // フォローなう
                    this.isFollowing = true;
                }).catch( err => {
                    console.log("error to follow: ", err);
                })
            }
        },
        pageLoad() {
            // ローカルに保存しているuserIdと比較して、自分のページか否かを確かめる
            if (this.paramUserId == this.myUserId) {
                // 自分のページであるならtrue
                this.isMyProfile = true;
            } else {
                this.isMyProfile = false;

                // 自分のページでない場合、訪問中のユーザーを既にフォローしているかを確認
                apiHelper.checkFollowing(this.myUserId, this.paramUserId)
                .then( res => {
                    this.isFollowing = res;
                }).catch( err => {
                    console.log("error to check following: ", err);
                })
            }

            this.loadUserData();
            this.loadFollowData();
        }
    },
    created() {
        this.pageLoad();
    },
    beforeRouteLeave(to, from, next) {
        this.modalState.follow  = false;
        this.modalState.follower = false;
        this.modalState.following = false;
        this.modalState.message = false;
        next();
    }, 
    watch: {
        // urlのパラメータが変わる度にリロード
        paramUserId() {
            this.pageLoad();
        }
    }
}
</script>

<style scoped>
#profile-page {
    width: 60%;
    margin: 0 auto;
    padding: 2rem 0;
}

.profile__header {
    margin: 5rem 0;
    display: flex;
    justify-content: flex-start;
}

.profile__header-left {
    /* background-color: #f00; */
    text-align: center;
    margin-right: 2rem;
}

.profile__image-box {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
}

.profile__image-box img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 190px;
    height: 190px;
    border-radius: 50%; 
}

.profile__follow-btn,
.profile__message-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.25rem 0.5rem;
    background-color: #fff;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 4px;
}

.profile__follow-btn:hover,
.profile__message-btn:hover {
    background-color: #eee  ;
}

.profile__tag::after {
    content: "";
    display: block;
    clear: both;
}

.profile__name {
    margin-bottom: 1rem;
}

.profile__tag .base-tag {
    background-color: #fff;
    font-size: 16px;
}

.profile__follow-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;   
}

.follower-btn,
.following-btn {
    color: #000;
    font-weight: 700;
    cursor: pointer;
    margin: 1rem 1rem 0 0;
}

.follower-btn:hover,
.following-btn:hover {
    border-bottom: 1px solid #000;
}

.profile__sub-info {
    width: 20rem;
    margin-top: 1rem;
}

.profile__sub-info .info-row {   
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    color: #555;
}

.profile__sub-info .info-row a {
    text-decoration: none;
    color: #555;
}

.edit-profile {
    margin-top: 3rem;
}

.edit-profile span {
    margin-right: 1rem;
}

.edit-profile a {
    font-size: 16px;
    width: 100%;
    line-height: 2.5rem;
    display: block;
    text-decoration: none;
    color: #000;
    background-color: #6cdb51;
}

.edit-profile a:hover {
    background-color: #62c44a;
}
</style>