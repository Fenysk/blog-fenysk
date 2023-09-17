<script setup lang="ts">
import { ref } from "vue";
import { getLatestArticles } from "../services/article";
import { Article } from "../types";

const articles = ref<Article[]>([]);

getLatestArticles()
    .then((response) => { articles.value = response; })
    .catch((error) => { console.error(error); });

</script>

<template>
    <main>
        <h2 class="mb-16">HomeView</h2>

        <ul class="flex flex-col gap-8">
            <li v-for="article in articles" :key="article.id">
                <p>{{ article.title }}</p>
                <p>{{ article.createdAt }}</p>
            </li>
        </ul>
    </main>
</template>