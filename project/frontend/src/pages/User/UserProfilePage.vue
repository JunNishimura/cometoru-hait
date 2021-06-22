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
                    <!-- <div class="btn__outer">
                        <button  @click="showModal('message')" class="profile__message-btn">
                            メッセージを送る 
                            <FontAwesomeIcon class="icon" :icon="['fas', 'paper-plane']" />
                        </button>
                        <div class="message-modal" v-if="modalState.message">
                            <MessageModal v-model="modalState.message" :userTo="userDetail.user_id" />
                        </div>
                    </div> -->
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
                    <div class="profile__follow-links">
                        <div class="follower-link" @click="showModal('follower')">フォロワー {{ followerCount }}人</div>
                        <div class="following-link" @click="showModal('following')">フォロー中 {{ followingCount }}人</div>
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
import asyncProcessing from '@/services/asyncProcessing.js'
// import MessageModal from '@/components/Message/MessageModal.vue';
import UserTab from '@/components/User/UserTab.vue';
import UserFollowElement from '@/components/User/UserFollowElement.vue';

export default {
    components: {
        // MessageModal,
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
            return parseInt(this.$store.getters['auth/userId']);
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
            asyncProcessing.loadUserDetail(this.paramUserId) 
            .then( res => {
                this.userDetail = res;

                // userのタグを取得
                return asyncProcessing.loadUserTags(this.paramUserId);
            }).then( res => {
                this.tags = res;

                // ユーザーが投稿したアイデアのみを抽出
                return asyncProcessing.loadFilteredPostIdeas(this.paramUserId);
            }).then ( res => {
                this.postIdeas = res;

                return asyncProcessing.loadFollowers(this.paramUserId)
            }).then( res => {
                this.followIds.follower = res.map((data) => data.user_id);
            
                return asyncProcessing.loadFollowingUsers(this.paramUserId)
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
            return asyncProcessing.loadFollowers(this.paramUserId)
            .then( res => {
                this.followerCount = res.length;

                // フォロー中のユーザーを読み込み
                return asyncProcessing.loadFollowingUsers(this.paramUserId);
            }).then( res => {
                this.followingCount = res.length;
            }).catch( err => {
                console.log("error to load followers, followingUsers: ", err);
            })
        },
        follow() {
            if (this.isFollowing) {
                // フォロー済みなら、フォロー解除
                asyncProcessing.stopFollowing(this.myUserId, this.paramUserId)
                .then( () => {
                    this.loadFollowData();
                    this.isFollowing = false;
                }).catch( err => {
                    console.log("error to stop following: ", err);
                })
            } else {
                // フォローしていないなら、フォローする
                asyncProcessing.follow(this.myUserId, this.paramUserId)
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
                asyncProcessing.checkFollowing(this.myUserId, this.paramUserId)
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

<style lang="scss" scoped>
#profile-page {
    max-width: $global-max-width;
    margin: 0 auto;
    
    padding: 2rem 0;
}

.profile__header {
    margin: 3rem 0;
    display: flex;
    justify-content: flex-start;

    @include respond(phone) {
        flex-direction: column;
    }

    .profile__header-left {
        text-align: center;
        margin-right: 4.8rem; // 3 * 1.618
        
        .profile__image-box {
            margin: 0 auto;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            position: relative;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 190px;
                height: 190px;
                border-radius: 50%; 
            }
        }

        .edit-profile {
            margin-top: 3rem;

            span {
                margin-right: 1rem;
            }

            a {
                font-size: 16px;
                width: 100%;
                line-height: 2.5rem;
                display: block;
                text-decoration: none;
                color: #000;
                background-color: #6cdb51;

                &:hover {
                    background-color: #62c44a;
                }
            }
        }

        @include respond(phone) {
            width: 80%;
            margin: 0 auto;
        }
    }

    .profile__header-right {
        margin-top: 1rem;
        width: 100%;

        .profile__name {
            font-size: 14px;
            margin-bottom: 1rem;
        }

        .profile__follow-links {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            
            @include respond(phone) {
                justify-content: center;
            }
        }

        .follower-link,
        .following-link {
            color: #000;
            font-weight: 700;
            cursor: pointer;
            margin: 1rem 1rem 0 0;
        }

        .follower-link:hover,
        .following-link:hover {
            border-bottom: 1px solid #000;
        }

        .profile__sub-info {
            width: 20rem;
            margin-top: 1rem;

            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid #eee;
                color: #555;

                a {
                    text-decoration: none;
                    color: #555;
                }
            }

            @include respond(phone) {
                width: 100%;
            }
        }

        @include respond(phone) {
            width: 80%;
            margin: 0 auto;
            text-align: center;
        }
    }
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

.profile__tag {
    @include clear-float;

    .base-tag {
        background-color: #fff;
        font-size: 16px;
    }
}
</style>