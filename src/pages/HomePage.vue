<template>
  <div class="container py-5">
    <!-- HERO SECTION -->
    <section class="hero-section position-relative">
      <img src="/images/bgGame.gif" class="hero-bg" alt="background gif" />
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1 class="fw-bold hero-title">Welcome to GameForge</h1>
        <p class="lead text-light">Discover and buy your favorite games instantly.</p>
        <RouterLink to="/shop" class="btn outline-btn mt-3">Browse Games</RouterLink>
      </div>
    </section>

    <!-- BEST GAMES CAROUSEL -->
    <h2 class="fw-bold hero-title text-white mb-4 mt-5">Best Selling Games</h2>

    <div v-if="loading" class="text-center text-white py-4">Loading best games...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="!loading && !error && bestGames.length" id="bestGamesCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">

        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(chunk, index) in chunkedBestGames"
          :key="index"
        >
          <div class="row g-4 justify-content-center">
            <div class="col-12 col-sm-6 col-md-3" v-for="game in chunk" :key="game.id">
              <GameCard :game="game" />
            </div>
          </div>
        </div>

      </div>

      <!-- Carousel Controls (outside cards) -->
      <button class="carousel-control-prev" type="button" data-bs-target="#bestGamesCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#bestGamesCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import GameCard from "../components/GameCard.vue";
import { fetchBestGames } from "../api/games";

const bestGames = ref([]);
const loading = ref(true);
const error = ref(null);

// Split games into chunks for carousel slides (4 per slide)
const chunkedBestGames = computed(() => {
  const size = 4;
  const result = [];
  for (let i = 0; i < bestGames.value.length; i += size) {
    result.push(bestGames.value.slice(i, i + size));
  }
  return result;
});

onMounted(async () => {
  try {
    bestGames.value = await fetchBestGames();
  } catch (err) {
    error.value = "Failed to load best games.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hero-title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 2px;

  /* Gradient text */
  background: linear-gradient(135deg, #667eea, #764ba2); /* dark to purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* for modern browsers */
}

/* HERO BUTTON */
.outline-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  color: #fff !important;
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 50px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.outline-btn:hover {
  border-color: #0d6efd;
  background: rgba(13, 110, 253, 0.2);
  transform: scale(1.05);
}

/* HERO SECTION */
.hero-section {
  position: relative;
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 40px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px) brightness(0.6);
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
}

.hero-content p {
  font-size: 1.2rem;
}

/* BEST GAMES HEADER */
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

/* CAROUSEL CONTROLS OUTSIDE */
#bestGamesCarousel .carousel-control-prev,
#bestGamesCarousel .carousel-control-next {
  width: 50px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 10px;
  z-index: 5;
  transition: all 0.3s ease;
}

#bestGamesCarousel .carousel-control-prev {
  left: -25px;
}

#bestGamesCarousel .carousel-control-next {
  right: -25px;
}

#bestGamesCarousel .carousel-control-prev:hover,
#bestGamesCarousel .carousel-control-next:hover {
  background: rgba(157, 13, 253, 0.8);
  transform: translateY(-50%) scale(1.1);
}

#bestGamesCarousel .carousel-control-prev-icon,
#bestGamesCarousel .carousel-control-next-icon {
  filter: invert(1);
}
</style>
