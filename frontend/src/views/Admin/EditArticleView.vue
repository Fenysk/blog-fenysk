<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticleById } from "../../services/article";
import { formatDate } from "../../utils/date";
import { updateArticle } from "../../services/article";

const route = useRoute();
const articleId = ref<number | null>(null);
const article = ref({})

const router = useRouter();

async function fetchArticle() {
    articleId.value = parseInt(route.params.id as string);

    if (articleId.value) {
        await getArticleById(articleId.value)
            .then((fetchedArticle) => {

                fetchedArticle.createdAt = formatDate(fetchedArticle.createdAt);
                fetchedArticle.updatedAt = formatDate(fetchedArticle.updatedAt);
                article.value = fetchedArticle;

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

async function handleSubmit() {
    const access_token = localStorage.getItem("access_token");
    
    await updateArticle(article.value, access_token)
        .then((updatedArticle) => {
            router.push({ name: "Article", params: { id: updatedArticle.id } });
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    fetchArticle();
});

</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h2>New Article</h2>

        <div class="grid grid-cols-2 gap-8">
            <div>
                <h3>Editor</h3>
                <form>

                    <label>Title</label>
                    <input type="text" v-model="article.title">

                    <label>Content</label>
                    <textarea class="w-full border border-gray-300 h-96" v-model="article.content"></textarea>

                    <label>Published</label>
                    <input type="checkbox" v-model="article.published">

                    <button @click.prevent="handleSubmit">Save</button>
                </form>
            </div>

            <div id="preview">
                <h3>Preview</h3>

                <h1>{{ article.title }}</h1>
                <p v-html="article.content"></p>
                <pre>{{ article }}</pre>
            </div>

        </div>
    </main>
</template>
