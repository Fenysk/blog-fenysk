<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMe, deleteMe } from "../services/user";

const user = ref({});
const token = localStorage.getItem("access_token");

const getUser = async () => {
    await getMe(token)
        .then((userData) => {
            user.value = userData;
            user.value.createdAt = new Date(userData.createdAt).toLocaleString("fr-FR");
            user.value.updatedAt = new Date(userData.updatedAt).toLocaleString("fr-FR");
            console.log(user);
        })
        .catch((error) => { console.log(error); });
};

const handleDelete = async () => {
    await deleteMe(token)
        .then(() => {
            localStorage.removeItem("access_token");
            location.reload();
        })
        .catch((error) => { console.log(error); });
};

const handleLogout = () => {
    localStorage.removeItem("access_token");
    location.reload();
};

onMounted(getUser);
</script>

<template>
    <main>
        <h2>AccountView</h2>

        <form>

            <label>Username</label>
            <input type="text" v-model="user.username" disabled>

            <label>Email</label>
            <input type="text" v-model="user.email" disabled>

            <label>Role</label>
            <input type="text" v-model="user.role" disabled>

            <label>Created at</label>
            <input type="text" v-model="user.createdAt" disabled>

            <label>Updated at</label>
            <input type="text" v-model="user.updatedAt" disabled>

            <button @click.prevent="handleDelete">Delete</button>
            <button @click.prevent="handleLogout">Logout</button>
        </form>
    </main>
</template>