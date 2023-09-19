<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getArticleById } from "../services/article";
import { formatDate } from "../utils/date";

const route = useRoute();
const articleId = ref<number | undefined>();
const article = ref<any>();

async function fetchArticle() {
    articleId.value = parseInt(route.params.id as string);

    if (articleId.value) {
        await getArticleById(articleId.value)
            .then((fetchedArticle: any) => {

                fetchedArticle.createdAt = formatDate(fetchedArticle.createdAt);
                fetchedArticle.updatedAt = formatDate(fetchedArticle.updatedAt);
                article.value = fetchedArticle;

            })
            .catch((error) => {
                console.error(error);
            });
    }
}

onMounted(() => {
    fetchArticle();
});
</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h1 class="text-xl text-center">{{ article?.title }}</h1>

        <article class="mt-8">
            <p v-html="article?.content"></p>
        </article>

        <p class="mt-8 text-xs">Parution le {{ article?.createdAt }} {{ article?.updatedAt !== article?.createdAt ? ' - Dernière mise à jour le ' + article?.updatedAt : '' }}.</p>

    </main>
</template>
