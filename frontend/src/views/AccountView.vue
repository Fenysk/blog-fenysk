<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMe, deleteMe } from "../services/user";
import { getMyArticles } from "../services/article";

// User

const user = ref<any>({});
const access_token: any = localStorage.getItem("access_token");

const getUser = async () => {
    await getMe(access_token)
        .then((userData) => {
            user.value = userData;
            user.value.createdAt = new Date(userData.createdAt).toLocaleString("fr-FR");
            user.value.updatedAt = new Date(userData.updatedAt).toLocaleString("fr-FR");
        })
        .catch((error) => { console.log(error); });
};

const handleDelete = async () => {
    await deleteMe(access_token)
        .then(() => {
            localStorage.removeItem("access_token");
            location.reload();
        })
        .catch((error) => { console.log(error); });
};

const handleLogout = () => {
    localStorage.removeItem("access_token");
    location.reload();
};



// Articles
const articles = ref<any>([]);

const getUserArticles = async () => {
    await getMyArticles(access_token)
        .then((fetchedArticles) => {
            articles.value = fetchedArticles;
        })
        .catch((error) => { console.log(error); });
};

onMounted(() => {
    getUser();
    getUserArticles();
});
</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h2>AccountView</h2>

        <section class="mb-8" id="articles">
            <h3>My articles</h3>
            <button v-if="user && (user.role === 'ADMIN') || (user.role === 'REDACTOR')">
                <router-link to="/blog/new">Create new article</router-link>
            </button>
            <ul class="list-disc" v-if="articles.length > 0">
                <li v-for="article in articles" :key="article.id">
                    <article class="flex gap-4">
                        <router-link class="text-blue-500 underline" :to="{ name: 'Article', params: { id: article.id } }">
                            {{ article.title }}
                        </router-link>
                        <a :href="`/blog/${article.id}/edit`">Edit</a>
                    </article>
                </li>
            </ul>
        </section>

        <form>
            <label>Username</label>
            <input type="text" v-model="user.username" disabled>

            <label>Email</label>
            <input type="text" v-model="user.email" disabled>

            <label>Role</label>
            <input type="text" v-model="user.role" disabled>

            <label>Created at</label>
            <input type="text" v-model="user.createdAt" disabled>

            <label>Updated at</label>
            <input type="text" v-model="user.updatedAt" disabled>

            <button @click.prevent="handleDelete">Delete</button>
            <button @click.prevent="handleLogout">Logout</button>
        </form>
    </main>
</template>