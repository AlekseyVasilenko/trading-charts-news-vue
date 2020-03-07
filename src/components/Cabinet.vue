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
        margin: 80px auto 20px;
    }
</style>
