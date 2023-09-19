import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import BlogView from './views/BlogView.vue'
import ArticleView from './views/ArticleView.vue'
import SignMeView from './views/SignMeView.vue'
import AccountView from './views/AccountView.vue'
import NewArticleView from './views/Admin/NewArticleView.vue'
import EditArticleView from './views/Admin/EditArticleView.vue'

function checkAccessToken(to: any, from: any, next: any) {
    const access_token = localStorage.getItem('access_token')

    console.log('checkAccessToken', access_token)
    console.log('to', to)
    console.log('from', from)

    if (access_token) {
        next()
    } else {
        next({ name: 'SignMe' })
    }
}

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomeView
    },
    {
        name: 'About',
        path: '/about',
        component: AboutView
    },
    {
        name: 'Blog',
        path: '/blog',
        component: BlogView
    },
    {
        name: 'Article',
        path: '/blog/:id',
        component: ArticleView
    },
    {
        name: 'NewArticle',
        path: '/blog/new',
        component: NewArticleView,
        beforeEnter: checkAccessToken
    },
    {
        name: 'EditArticle',
        path: '/blog/:id/edit',
        component: EditArticleView,
        beforeEnter: checkAccessToken
    },
    {
        name: 'SignMe',
        path: '/signme',
        component: SignMeView
    },
    {
        name: 'Account',
        path: '/account',
        component: AccountView,
        beforeEnter: checkAccessToken
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router