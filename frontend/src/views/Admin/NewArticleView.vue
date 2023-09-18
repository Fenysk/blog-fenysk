<script setup lang="ts">
import { nextTick, ref } from "vue";
import { createArticle } from "../../services/article";
import { useRouter } from "vue-router";
const router = useRouter()

const article = ref<any | undefined>({
    title: "Mon titre d'article",
    content: "Mon contenu d'article",
    published: true,
})

async function handleSubmit() {
    const access_token = localStorage.getItem("access_token")

    await createArticle(article.value, access_token)
        .then((article) => {
            nextTick(() => {
                router.push({ name: "Article", params: { id: article.id } })
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

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

                    <button @click.prevent="handleSubmit">Create</button>
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