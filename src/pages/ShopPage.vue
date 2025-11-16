<template>
  <div class="container py-4">
    <h2 class="fw-bold mb-4 text-white hero-title">Game Shop</h2>

    <div class="row g-4">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="game in games"
        :key="game.id"
      >
        <GameCard :game="game" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShop } from "../composables/useShop";
import GameCard from "../components/GameCard.vue";

const { games } = useShop();
</script>
<style scoped>
.hero-title {
  font-size: 3rem;
  font-weight: 800;

  /* Gradient text */
  background: linear-gradient(135deg, #667eea, #764ba2); /* dark to purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* for modern browsers */
}
</style>