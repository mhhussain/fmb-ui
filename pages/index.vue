<template>
  <NuxtLayout name="user">
    <h1>Menu</h1>
    <div>
      <button>&lsaquo;</button>
      <h2>This Week</h2>
      <button>&rsaquo;</button>
      <div class="border-2">
        <ul>
          <li v-for="(f, i) in fillings" :index="i" :key="i">
            {{ f.WeekStart }}
          </li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const user = useState("user");
if (user.value.type != "itsId") {
  navigateTo({ path: "/login" });
}

const { data: fillings } = await useFetch("/api/thaali/fillings");
</script>