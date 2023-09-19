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
        component: HomeView,
        meta: {
            title: 'Fenysk - Développeur web et passionné de nouvelles technologies !'
        }
    },
    {
        name: 'About',
        path: '/about',
        component: AboutView,
        meta: {
            title: 'Qui est Fenysk ?'
        }
    },
    {
        name: 'Blog',
        path: '/blog',
        component: BlogView,
        meta: {
            title: 'Articles - Fenysk.fr'
        }
    },
    {
        name: 'Article',
        path: '/blog/:id',
        component: ArticleView,
        meta: {
            title: 'Fenysk.fr'
        }
    },
    {
        beforeEnter: checkAccessToken,
        name: 'NewArticle',
        path: '/blog/new',
        component: NewArticleView,
        meta: {
            title: 'Nouvel article - Fenysk.fr'
        }
    },
    {
        beforeEnter: checkAccessToken,
        name: 'EditArticle',
        path: '/blog/:id/edit',
        component: EditArticleView,
        meta: {
            title: 'Modifier un article - Fenysk.fr'
        }
    },
    {
        name: 'SignMe',
        path: '/signme',
        component: SignMeView,
        meta: {
            title: 'Connexion - Fenysk.fr'
        }
    },
    {
        beforeEnter: checkAccessToken,
        name: 'Account',
        path: '/account',
        component: AccountView,
        meta: {
            title: 'Mon compte - Fenysk.fr'
        }
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