<script setup lang="ts">
</script>

<template>
    <div class="px-4 py-8 bg-gray-100">
        <nav class="container flex items-center justify-between mx-auto">
            <router-link to="/" class="text-xl font-semibold">
                Fenysk
            </router-link>
            <ul class="flex gap-8">
                <li><router-link :to="{ name: 'Blog' }">Blog</router-link></li>
                <li><router-link :to="{ name: 'Account' }">Mon compte</router-link></li>
                <li><router-link :to="{ name: 'About' }">Qui est Fenysk ?</router-link></li>
            </ul>
        </nav>
    </div>
</template>