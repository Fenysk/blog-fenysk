<script setup lang="ts">
import { ref } from "vue";
import { getLatestArticles } from "../services/article";
import { formatDate } from "../utils/date";

const articles = ref<any>([]);

getLatestArticles()
    .then((response) => {
        articles.value = response;
        articles.value.forEach((article: any) => {
            article.createdAt = formatDate(article.createdAt);
            article.updatedAt = formatDate(article.updatedAt);
        });
    })
    .catch((error) => { console.error(error); });

</script>

<template>
    <main class="container px-4 py-8 mx-auto">
        <h1>Le Monde de Fenysk : Développeur web et Passionné de Technologie</h1>

        <aside id="Last_Articles">
            <h2>Derniers articles</h2>
            <ul class="flex flex-col gap-4">
                <li v-for="article in articles" :key="article.id">
                    <article class="h-full p-4 border border-gray-200 rounded-md">
                        <a :href="`/blog/${article.id}`" class="flex flex-col justify-between h-full">
                            <p>{{ article.title }}</p>
                            <div class="flex">
                                <p>Le {{ article.createdAt }} par {{ article.author.username }} {{ article.updatedAt !== article.createdAt ? `(modifié le ${article.updatedAt})` : "" }}
                                </p>
                            </div>
                        </a>
                    </article>
                </li>
            </ul>
        </aside>
    </main>
</template>