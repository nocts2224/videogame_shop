<template>
  <div class="app-wrapper">
    <Navbar />

    <!-- Main content wrapper -->
    <main class="main-content bg-dark">
      <div class="container">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Optional: Footer -->
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="hero-title">GameForge</span>
          </div>
          <p class="footer-text">Your ultimate gaming destination</p>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 GameShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
.hero-title {
  font-size: 3rem;
  font-weight: 800;

  /* Gradient text */
  background: linear-gradient(135deg, #cd95e7, #7b5cf7); /* dark to purple */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* for modern browsers */
}
.main-content {
  background: linear-gradient(120deg, #0d0d0d, #1a1a1a, #0d0d0d);
  background-size: 200% 200%;
  animation: gradientMove 10s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


/* Global resets and base styles */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.app-wrapper {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: relative;
}

/* Main content area */
.main-content {
  flex: 1;
  padding: 3rem 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.content-container {
  /* Use Bootstrap container - remove custom max-width */
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Footer styles */
.app-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: rgba(255, 255, 255, 0.85);
  padding: 3rem 0 1.5rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.footer-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2rem;
}

.app-footer .container {
  /* Bootstrap container handles width */
}

.footer-content {
  text-align: center;
  margin-bottom: 2rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
}

.footer-brand svg {
  color: #667eea;
}

.footer-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    padding: 2rem 0;
  }

  .app-footer {
    padding: 2rem 0 1rem;
  }

  .footer-inner {
    padding: 0 1.5rem;
  }

  .footer-brand {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1.5rem 0;
  }
}

/* Utility classes for consistent spacing */
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

/* Grid layouts for cards - works with Bootstrap grid */
.row.game-grid {
  --bs-gutter-x: 2rem;
  --bs-gutter-y: 2rem;
}

@media (max-width: 768px) {
  .row.game-grid {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 1.5rem;
  }
}

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .section-title {
    font-size: 1.75rem;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Loading state (optional) */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>