<script setup lang="ts">
</script>

<template>
    <div class="py-8">
        <nav class="container flex items-center justify-between mx-auto">
            <router-link to="/" class="text-xl font-semibold">
                Fenysk
            </router-link>
            <ul class="flex gap-8">
                <li><router-link to="/blog">Blog</router-link></li>
                <li><router-link to="/signme">Mon compte</router-link></li>
                <li><router-link to="/about">Qui est Fenysk ?</router-link></li>
            </ul>
        </nav>
    </div>
</template>