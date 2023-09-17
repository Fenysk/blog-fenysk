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
    <main>
        <h2>BlogView</h2>

        <ul>
            <li v-for="article in articles" :key="article.id">
                {{ article.title }}
            </li>
        </ul>
    </main>
</template>