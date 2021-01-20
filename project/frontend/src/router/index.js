import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//---------- impport page components ----------//
// Idea pages
import HomePage from '@/pages/HomePage.vue';
import IdeasPage from '@/pages/Idea/List/IdeasPage.vue';
import NewIdeasPage from '@/pages/Idea/List/NewIdeasPage.vue';
import TagIdeasPage from '@/pages/Idea/List/TagIdeasPage.vue';
import RecommendIdeasPage from '@/pages/Idea/List/RecommendIdeasPage';
import IdeaDetailPage from '@/pages/Idea/Detail/IdeaDetailPage.vue';
import IdeaOverviewPage from '@/pages/Idea/Detail/IdeaOverviewPage.vue';
import IdeaDetailInfoPage from '@/pages/Idea/Detail/IdeaDetailInfoPage.vue';
import IdeaRecruitmentPage from '@/pages/Idea/Detail/IdeaRecruitmentPage.vue';
import IdeaReputationPage from '@/pages/Idea/Detail/IdeaReputationPage.vue';
import IdeaFeedbackPage from '@/pages/Idea/Detail/IdeaFeedbackPage.vue';
// Idea Post
import IdeaPostPage from '@/pages/Idea/Post/IdeaPostPage.vue';
import PostNewIdeaPage from '@/pages/Idea/Post/PostNewIdeaPage.vue';
import EditIdeaPage from '@/pages/Idea/Post/EditIdeaPage.vue';
// Auth pages
import AuthPage from '@/pages/Auth/AuthPage.vue';
import SignupPage from '@/pages/Auth/SignupPage.vue';
import LoginPage from '@/pages/Auth/LoginPage.vue';
// User Pages
import UserProfilePage from '@/pages/User/UserProfilePage.vue';
import SettingsPage from '@/pages/User/SettingsPage.vue';
import PostIdeasPage from '@/pages/User/PostIdeasPage.vue';
import DraftIdeasPage from '@/pages/User/DraftIdeasPage.vue';
import StockEventsPage from '@/pages/User/StockEventsPage.vue';
import FollowersPage from '@/pages/User/FollowersPage.vue';
import FollowingPage from '@/pages/User/FollowingPage.vue';
import NotificationPage from '@/pages/User/NotificationPage.vue';
import MessageDisplayPage from '@/pages/User/MessageDisplayPage.vue';
// Event pages
import EventHomePage from '@/pages/Event/EventHomePage.vue';
import NewEventsPage from '@/pages/Event/NewEventsPage';
import ComingEventsPage from '@/pages/Event/ComingEventsPage';

//---------- import vuex ----------//
import store from '@/store/index.js';

//---------- about meta ----------//
// requiresAuth: ログイン状態でのみ訪問可能なページ
// requiresUnAuth: 未ログイン状態でのみ訪問可能なページ

const routes = [
    {
        path: '/',
        component: HomePage,
        redirect: { name: 'ideas' },
        children: [
            {
                name: 'ideas',
                path: 'ideas',
                component: IdeasPage,
                redirect: { name: 'newIdeas' },
                children: [
                    { name: 'newIdeas',       path: 'new',       component: NewIdeasPage       },
                    { name: 'tagIdeas',       path: 'tag',       component: TagIdeasPage       },
                    { name: 'recommendIdeas', path: 'recommend', component: RecommendIdeasPage },
                ]
            },
            {
                // アイデア詳細画面
                name: 'ideaDetail',
                path: 'idea/:ideaId',
                component: IdeaDetailPage,
                redirect: { name: 'overview' },
                props: true,
                children: [
                    { name: 'overview',     path: 'overview',     component: IdeaOverviewPage },
                    { name: 'detailInfo',   path: 'detailInfo',   component: IdeaDetailInfoPage },
                    { name: 'recruitment', path: 'recruitment', component: IdeaRecruitmentPage },
                    { name: 'reputation',   path: 'reputation',   component: IdeaReputationPage },
                    { name: 'feedback', path: 'feedback', component: IdeaFeedbackPage },
                ]
            },
            {
                // 認証関連（新規登録、ログイン）の画面
                name: 'auth',
                path: '/auth',
                component: AuthPage,
                redirect: { name: 'signup' },
                children: [
                    { name: 'signup', path: 'signup', component: SignupPage, meta: { requiresUnAuth: true }},
                    { name: 'login',  path: 'login',  component: LoginPage,  meta: { requiresUnAuth: true }},
                ]
            },
            {
                // ユーザー画面
                name: 'userprofile',
                path: 'profile/:userId',
                component: UserProfilePage,
                props: true,
                meta: { requiresAuth: true }, 
                redirect: { name: 'postIdeas' },
                children: [
                    { name: 'postIdeas',    path: 'post',         component: PostIdeasPage    },
                    { name: 'draftIdeas',   path: 'draft',        component: DraftIdeasPage   },
                    { name: 'stockEvents',  path: 'events/stock', component: StockEventsPage  },
                    { name: 'followers',    path: 'followers',    component: FollowersPage    },
                    { name: 'following',    path: 'following',    component: FollowingPage    },
                    {
                        name: 'notification',
                        path: 'notification',
                        props: true,
                        component: NotificationPage, 
                        children: [
                            { name: 'messageDisplay', path: 'message/:messageId', component: MessageDisplayPage },
                        ]
                    },
                    
                ]
            },
            {
                // プロフィール設定画面
                name: 'settings',
                path: 'settings',
                component: SettingsPage,
                meta: { requiresAuth: true },
            },
            {
                // イベント一覧画面
                name: 'events',
                path: 'events',
                component: EventHomePage,
                redirect: { name: 'newEvents' },
                children: [
                    { name: 'newEvents', path: 'new', component: NewEventsPage },
                    { name: 'comingEvents', path: 'coming', component: ComingEventsPage }
                ]
            },
        ]
    },
    {
        // アイデア投稿画面
        name: 'post',
        path: '/post',
        component: IdeaPostPage,
        meta: { requiresAuth: true },
        redirect: { name: 'postNewIdea' },
        children: [
            { name: 'postNewIdea',  path: 'new',          component: PostNewIdeaPage },
            { name: 'editIdea',     path: 'edit/:ideaId', component: EditIdeaPage    },
        ]
    },
    {
        // それ以外はホーム画面に遷移
        path: '/:notFound(.*)',
        redirect: ''
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn'];

    // loginが必要となページへの遷移の場合はloginしているかを確認する
    if (to.matched.some( record => record.meta.requiresAuth )) {
        
        // すでにログインしている場合
        if (isLoggedIn) {
            console.log('User is already logged in, feel free to go.');
            next();
        } else {
            // 強制的にログインさせる
            forceToLoginPage(to, from, next);
        }
    } else if (to.matched.some( record => record.meta.requiresUnAuth )) {
        // loginしている場合に回避したいページへ遷移しようとした場合
        //TODO: 実装未完成
        next();
    } else {
        // loginが不必要なページへの遷移の場合はそのままページ遷移を許可する
        next();
    }
});

// ログインページに強制送還するための関数
function forceToLoginPage(to, _, next) {
    next({
        path: { name: 'login'},
        query: { next: to.fullPath },
    });
}

export default router;