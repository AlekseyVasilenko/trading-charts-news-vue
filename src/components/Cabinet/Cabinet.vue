<template>
  <div class="card">
    <div class="card-body">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-top: 50px;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.2);
  }
</style>
