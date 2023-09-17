<script setup lang="ts">
import { ref } from "vue";
import { getLatestArticles } from "../services/article";
import { Article } from "../types";
import { formatDate } from "../utils/date";

const articles = ref<Article[]>([]);

getLatestArticles()
    .then((response) => {
        articles.value = response;
        articles.value.forEach((article) => {
            article.updatedAt = formatDate(article.updatedAt);
        });
    })
    .catch((error) => { console.error(error); });

</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h1>Le Monde de Fenysk : Développeur et Passionné de Technologie</h1>

        <aside id="Last_Articles">
            <h2>Derniers articles</h2>
            <ul class="flex flex-col gap-4">
                <li v-for="article in articles" :key="article.id">
                    <article class="h-full p-4 border border-gray-200 rounded-md">
                        <a :href="`/blog/${article.id}`" class="flex flex-col justify-between h-full">
                            <p>{{ article.title }}</p>
                            <p>{{ article.updatedAt }}</p>
                        </a>
                    </article>
                </li>
            </ul>
        </aside>
    </main>
</template>