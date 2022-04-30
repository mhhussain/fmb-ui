<template>
  <div>
    <div class="text-red-500">
      <h1 class="text-red-500">FMB Detroit</h1>
      <img src="~/assets/img/icons/user.png" :alt="user.name" />
    </div>
    <slot />
    <div>
      <div>
        <img src="~/assets/img/icons/home.png" />
        Home
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useState("user");
</script>