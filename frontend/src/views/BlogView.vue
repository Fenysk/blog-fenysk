<script setup lang="ts">
import { ref } from "vue";
import { getArticles } from "../services/article";
import { Article } from "../types";

const articles = ref<Article[]>([]);

getArticles()
    .then((response) => { articles.value = response; })
    .catch((error) => { console.error(error); });

</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h2>BlogView</h2>

        <ul class="flex flex-col gap-8">
            <li v-for="article in articles" :key="article.id">
                <p>{{ article.title }}</p>
                <p>{{ article.createdAt }}</p>
            </li>
        </ul>
    </main>
</template>