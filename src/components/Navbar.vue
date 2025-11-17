<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <!-- Brand -->
      <RouterLink to="/" class="brand d-flex align-items-center gap-2">
        <img src="/logo.png" alt="GameForge Logo" class="brand-logo" />
        <span class="hero-title">GameForge</span>
      </RouterLink>

      <!-- Mobile toggle -->
      <button
        class="navbar-toggler mobile-toggle"
        type="button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ active: mobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Nav links (centered) -->
      <div
        class="collapse navbar-collapse justify-content-center nav-links-wrapper"
        :class="{ show: mobileMenuOpen }"
      >
        <RouterLink to="/" class="nav-link" @click="mobileMenuOpen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </RouterLink>

        <RouterLink to="/shop" class="nav-link" @click="mobileMenuOpen = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Shop
        </RouterLink>

        <RouterLink to="/cart" class="nav-link cart-link" @click="mobileMenuOpen = false">
          <div class="cart-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <transition name="badge">
              <span v-if="cartCount" class="cart-badge">
                {{ cartCount > 99 ? "99+" : cartCount }}
              </span>
            </transition>
          </div>
          Cart
        </RouterLink>

        <RouterLink to="/orders" class="nav-link cart-link" @click="mobileMenuOpen = false">
          <div class="cart-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <transition name="badge">
              <span v-if="totalGamesBought" class="cart-badge">
                {{ totalGamesBought > 99 ? "99+" : totalGamesBought }}
              </span>
            </transition>
          </div>
          Orders
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useShop } from "../composables/useShop";
import { RouterLink } from "vue-router";

const { cart } = useShop();
const mobileMenuOpen = ref(false);

// Cart count for the cart badge
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0));

// Orders and badge
const orders = ref([]);

// Load orders from localStorage
function loadOrders() {
  const savedOrders = localStorage.getItem("orders");
  orders.value = savedOrders ? JSON.parse(savedOrders) : [];
}

// Initial load
onMounted(() => {
  loadOrders();

  // Listen for changes in localStorage (other tabs)
  window.addEventListener("storage", () => {
    loadOrders();
  });
});

// Computed total games bought for the orders badge
const totalGamesBought = computed(() => {
  return orders.value.reduce((sum, order) => {
    return sum + order.cart.reduce((s, item) => s + item.qty, 0);
  }, 0);
});

// Call this after placing a new order to update badge immediately
function refreshOrdersBadge() {
  loadOrders();
}

</script>


<style scoped>
.brand-logo {
  width: 50px; /* adjust size */
  height: 50px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.brand:hover .brand-logo {
  transform: rotate(10deg); /* subtle hover effect */
}

/* Keep all your previous interactive CSS intact */
.hero-title {
  font-size: 3rem;
  font-weight: 800;

  /* Gradient text */
  background: linear-gradient(135deg, #cd95e7, #7b5cf7); /* dark to purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* for modern browsers */
}
.navbar {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  padding: 4px 0; /* reduces focus area */
}

/* Remove Bootstrap hover background + box */
.brand:hover,
.brand:focus,
.brand:active {
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

/* Your hover animation */
.brand:hover {
  transform: translateY(-2px);
  color: #667eea;
}

/* SVG animation */
.brand svg {
  transition: transform 0.3s ease;
}

.brand:hover svg {
  transform: rotate(5deg);
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.mobile-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link.router-link-active {
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.nav-link.router-link-active::before {
  display: none;
}

.cart-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 50px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.4);
  line-height: 1.2;
}

.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: scale(0);
}

@media (max-width: 992px) {
  .mobile-toggle {
    display: flex;
  }
}
</style>
