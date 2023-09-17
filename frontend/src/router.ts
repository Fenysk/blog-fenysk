import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import BlogView from './views/BlogView.vue'
import ArticleView from './views/ArticleView.vue'
import SignMeView from './views/SignMeView.vue'
import AccountView from './views/AccountView.vue'

function checkAccessToken(to: any, from: any, next: any) {
    const access_token = localStorage.getItem('access_token')

    if (access_token) {
        console.log('Access token found, proceeding to account view')
        next()
    } else {
        console.log('Access token not found, redirecting to signme view')
        next('/signme')
    }
}

export default createRouter({
    history: createWebHistory(),
    routes: [
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
            name: '404',
            path: '/:pathMatch(.*)',
            redirect: '/'
        }
    ],
})
