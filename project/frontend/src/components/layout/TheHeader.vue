<template>
    <header class="header">
        <ul class="nav-links">
            <li class="nav-link title"><router-link to="/ideas">カムトル</router-link></li>
            <li class="nav-link search">
                <FontAwesomeIcon class="icon" :icon="['fas', 'search']" size="lg" />
                <BaseVerticalDropdown>
                    <template #dropdown-item>
                        <li class="dropdown-link"><router-link :to="ideasLink">アイデア</router-link></li>
                        <li class="dropdown-link"><router-link :to="eventsLink">イベント</router-link></li>
                    </template>
                </BaseVerticalDropdown>
            </li>
            <li class="nav-link auth" v-if="!isLoggedIn">
                <FontAwesomeIcon class="icon" :icon="['fas', 'sign-in-alt']" size="2x" />
                <BaseVerticalDropdown>
                    <template #dropdown-item>
                        <li class="dropdown-link"><router-link :to="signupLink">新規登録</router-link></li>
                        <li class="dropdown-link"><router-link :to="loginLink">ログイン</router-link></li>
                    </template>
                </BaseVerticalDropdown>
            </li>
            <li class="nav-link profile" v-if="isLoggedIn && loadComplete">
                <img :src="profileImage" alt="profile">
                <BaseVerticalDropdown>
                    <template #dropdown-item>
                        <li class="dropdown-link">
                            <router-link :to="userLink" class="icon-title-align">
                                <FontAwesomeIcon class="icon" :icon="['fas', 'user']" />
                                <span>マイページ</span>
                            </router-link>
                        </li>
                        <li class="dropdown-link">
                            <router-link :to="notificationLink" class="icon-title-align">
                                <FontAwesomeIcon class="icon" :icon="['fas', 'bell']" />
                                <span>通知</span>
                            </router-link>
                        </li>
                        <li class="dropdown-link">
                            <a href="#" @click="logout" class="icon-title-align">
                                <FontAwesomeIcon class="icon" :icon="['fas', 'sign-out-alt']" />
                                <span>ログアウト</span>
                            </a>
                        </li>
                    </template>
                </BaseVerticalDropdown>
            </li>
        </ul>
    </header>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
export default {
    data() {
        return {
            user: null,
            loadComplete: false,
        }
    },
    computed: {
        userId() {
            return this.$store.getters['auth/userId'];
        },
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        },
        ideasLink() {
            return { name: 'ideas' };
        },
        eventsLink() {
            return { name: 'events' };
        },
        userLink() {
            return { name: 'userprofile', params: { userId: this.userId } };
        },
        notificationLink() {
            return { name: 'notification', params: { userId: this.userId }};
        },
        signupLink() {
            return { name: 'signup' };
        },
        loginLink() {
            return { name: 'login' };
        },
        profileImage() {
            return this.user.prof_img;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
            this.$router.replace('/'); // ログイン後は/ideasへ自動的に遷移させる
        },
        loadUserDetail() {
            apiHelper.loadUserDetail(this.userId)
            .then( res => {
                this.user = res;
                this.loadComplete = true;
            }).catch( err => {
                console.log("error to get userDetail at TheHeader: ", err);
            })
        },
        handleScroll() {
            console.log(window.scrollY);
        }
    },
    watch: {
        userId() {
            this.loadUserDetail();
        }
    },
    beforeMount () {
        if (this.userId) {
            // userがセットされている時のみ
            this.loadUserDetail();
        }
    },
}
</script>

<style lang="scss" scoped>
/* height: 4rem */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    color: #000;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    font-weight: bold;
    letter-spacing: 4px;
    z-index: 100;
}

ul {
    list-style: none;
    li {
        a {
            color: #000;
            text-decoration: none;
        }
    }
}

.nav-links {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: none;
}

%header-icon-parent {
    position: relative;
    width: 50px;
    height: 50px;
}

%header-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 32px;
    cursor: pointer;
}

.nav-links {
    .search {
        @extend %header-icon-parent;

        .icon {
            @extend %header-icon;
        }
    }
    
    .auth {
        @extend %header-icon-parent;

        .icon {
            @extend %header-icon;
        }
    }

    .profile {
        @extend %header-icon-parent;

        img {
            @extend %header-icon;
        }
    }
}

.title {
    font-size: 28px;
    margin-right: auto;
}

.nav-link {
    a {
        display: block;
        line-height: 4rem;
    }

    .vertical__dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        transform: translateY(10px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease-out;
    }

    &:hover {
        .vertical__dropdown {
            transform: translate(0, 0);
            opacity: 1;
            pointer-events: auto;
        }
    }

    &:not(:nth-child(1)):not(:nth-last-child(1)) {
        margin-right: 0.5rem;
    }
}

.profile { 
    .icon-title-align {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .icon {
            width: 3rem;
        }
    }
}

.dropdown-link {
    text-align: center;

    a {
        width: 100%;
        display: block;
        line-height: 3rem;
        color: #000;
        cursor: pointer;
    }

    &:hover {
        background-color: $color-secondary;
    }
}
</style>