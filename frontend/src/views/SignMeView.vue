<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { login, register } from "../services/auth";

const router = useRouter();

const email = ref("admin@admin.admin");
const password = ref("admin");
const username = ref("Admin");

const wantToConnect = ref(true);

const handleLogin = async () => {
    await login(email.value, password.value)
        .then((access_token) => {
            localStorage.setItem("access_token", access_token);
            console.log(access_token);
            nextTick(() => {
                router.push({ name: "Account" });
            });
        })
        .catch((error) => { console.log(error); });
};

const handleSignup = async () => {
    await register(username.value, email.value, password.value)
        .then((access_token) => {
            localStorage.setItem("access_token", access_token);
            console.log(access_token);
            nextTick(() => {
                router.push({ name: "Account" });
            });
        })
        .catch((error) => { console.log(error); });
};

</script>

<template>
    <main>
        <h2>SignView</h2>

        <form>
            <h3>{{ wantToConnect ? "Connexion" : "Inscription" }}</h3>

            <label v-if="!wantToConnect" for="username">Username</label>
            <input v-if="!wantToConnect" type="text" v-model="username">

            <label for="email">Email</label>
            <input type="text" v-model="email">

            <label for="password">Password</label>
            <input type="password" v-model="password">

            <button v-if="wantToConnect" @click.prevent="handleLogin">Se connecter</button>
            <button v-else @click.prevent="handleSignup">S'inscrire</button>
        </form>

        <button @click.prevent="wantToConnect = !wantToConnect">
            {{ wantToConnect ? "Je souhaite m'inscrire" : "Je souhaite me connecter" }}
        </button>
    </main>
</template>