<template>
    <div class="idea" v-if="loadComplete">
        <div class="idea__header">
            <div class="idea__title">
                <router-link :to="ideaLink">{{ title }}</router-link>
            </div>
            <div class="idea__user-name">
                <router-link :to="userLink">{{ userDetail.username }}</router-link>
            </div>
            <div class="idea__user-profile">
                <img :src="profileImage" alt="profile">
            </div>
        </div>
        <div class="idea__tag">
            <BaseTag v-for="(tag, key) in tags" :key="key" :name="tag.tag_name" />
        </div>
        <div class="idea__overview">
            <p>{{ overview }}</p>
        </div>
        <div class="idea__content">
            <div class="idea__content-recruitment">
                <h5>募集</h5>
                <div class="recruitment__item" v-for="rec in recruitments"
                    :key="rec.recruitment_id"
                >
                    <span class="recruitment__item-kind">{{ rec.kind }}</span>
                    <span class="recruitment__item-number">{{ rec.number }}人</span>
                </div>
            </div>
            <div class="idea__content-deadline">
                <h5>〆切</h5>
                <h4>{{ deadlineDisplay }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['idea_id', 'user_id', 'title', 'overview', 'idea_date', 'deadline'],
    computed: {
        content() {
            // TODO overviewより文字数を制限して返す
            return this.overview;
        },
        deadlineDisplay() {
            return this.deadline == null || this.deadline === '' ? '未定' : this.deadline;
        },
        ideaLink() {
            return { name: 'ideaDetail', params: { ideaId: this.idea_id } };
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.user_id } };
        },
        profileImage() {
            return this.userDetail.prof_img === null ? require('@/assets/images/person.png') : this.userDetail.prof_img;
        },
        loadComplete() {
            return this.load.tag && this.load.user && this.load.recruitments;
        },
    },
    data() {
        return {
            userDetail: null,
            tags: [],
            recruitments: [],
            load: {
                user: false,
                tag: false,
                recruitments: false,
            }
        }
    },
    created() {
        // user_idよりユーザー情報を取得
        apiHelper.loadUserDetail(this.user_id)
        .then( res => {
            this.userDetail = res;
            this.load.user = true;
        }).catch( err => {
            console.log("error to load userDetail at IdeaElement: ", err);
        });

        // idea_idよりタグを取得
        apiHelper.loadIdeaTags(this.idea_id) 
        .then( res => {
            this.tags = res;
            this.load.tag = true;
        }).catch( err => {
            console.log("error to load idea tags at IdeaElement: ", err);
        });

        // idea_idよりrecruitmentsを取得
        apiHelper.loadRecruitments(this.idea_id)
        .then( res => {
            this.recruitments = res;
            this.load.recruitments = true;
        }).catch( err => {
            console.log("error to load recruitments at ideaElement: ", err);
        })
    },
}
</script>

<style scoped>
.idea {
    width: 35rem;
    background-color: #fff;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dddddd;
}

.idea__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.idea__title a {
    color: #000;
    display: block;
    text-decoration: none;
    font-size: 22px;
    font-weight: bold;
}

.idea__user-name {
    margin-left: auto;
}

.idea__user-name a {
    display: block;
    color: #000;
    text-decoration: none;
}

.idea__title a:hover,
.idea__user-name a:hover {
    border-bottom: 1px solid #000;
}

.idea__user-profile {
    position: relative;
    width: 50px;
    height: 50px;
}

.idea__user-profile img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.idea__tag::after {
    content: "";
    display: block;
    clear: both;
}

.idea__overview {
    margin-top: 1.5rem;
    text-align: left;
    font-size: 14px;
}

.idea__content {
    background-color: #eee;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
}

.idea__content-recruitment,
.idea__content-deadline {
    padding: 1rem 0;
    text-align: center;
}

.idea__content-recruitment {
    border-right: 1px solid #bbb;
    width: 100%;
}

.recruitment__item {
    margin: 0.1rem 1rem 0;
    border-bottom: 1px solid #bbb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.idea__content-deadline {
    width: 10rem;
}
</style>