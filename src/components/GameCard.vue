<template>
  <div class="game-card">
    <div class="image-container">
      <img :src="game.image" :alt="game.title" class="game-image" />
      <div class="overlay">
        <button class="quick-view-btn" @click="add()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>

    <div class="card-content">
      <h3 class="game-title">{{ game.title }}</h3>
      <div class="card-footer-content">
        <span class="price">${{ game.price.toFixed(2) }}</span>
        <button class="add-btn" @click="add()" :class="{ added: added }">
          <span v-if="!added">Add</span>
          <span v-else class="checkmark">✓</span>
        </button>
      </div>
    </div>

    <transition name="toast">
      <div v-if="added" class="toast-notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Added to cart!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useShop } from "../composables/useShop";

const props = defineProps({ game: Object });
const { addToCart } = useShop();
const added = ref(false);

function add() {
  addToCart(props.game);
  added.value = true;
  setTimeout(() => (added.value = false), 2000);
}
</script>

<style scoped>
.game-card {
  position: relative;
  background: linear-gradient(145deg, #1a1a1a, #2c0e4b);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.game-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.image-container {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
}

.game-card:hover .game-image {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .overlay {
  opacity: 1;
}

.quick-view-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.quick-view-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.card-content {
  padding: 16px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.game-title {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  min-height: 50px;
}

.card-footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.add-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  min-width: 80px;
}

.add-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.add-btn.added {
  background: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.checkmark {
  font-size: 18px;
  animation: checkmark 0.4s ease;
}

.toast-notification {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #10b981;
  color: #fff;
  padding: 10px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  z-index: 10;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.8);
}
</style>
