<template>
  <div>
    <div>Login</div>
    <p>Username:</p>
    <input type="text" v-model="username" placeholder="username" />
    <p>Password:</p>
    <input type="text" v-model="password" placeholder="password" />
    <button class="border=4" @click="login()">Login</button>
  </div>
</template>

<script setup>
const username = ref("");
const password = ref("");

const login = async () => {
  const { data } = await useFetch(`/api/user/${username}`);
  const user = useState("user", () => data);
  return navigateTo({ path: "/" });
};
</script>