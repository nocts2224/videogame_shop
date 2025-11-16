import { ref, computed } from "vue";

// --- GLOBAL STATE (shared by all components) ---
const games = ref([
  { id: 1, title: "Elden Ring", price: 59.99, image: "public/images/eldenring.jpg" },
  { id: 2, title: "Cyberpunk 2077", price: 49.99, image: "public/images/cyberpunk.jpg" },
  { id: 3, title: "Assassin's Creed Unity", price: 39.99, image: "public/images/acunity.jpg" },
  { id: 4, title: "Spider-Man 2", price: 69.99, image: "public/images/spiderman2.jpg" },
  { id: 5, title: "Red Dead Redemption 2", price: 96.99, image: "public/images/rdr2.jpg" },
  { id: 6, title: "God of War", price: 59.99, image: "/images/gow.jpg" },
  { id: 7, title: "Horizon Forbidden West", price: 54.99, image: "/images/horizon.jpg" },
  { id: 8, title: "Ghost of Tsushima", price: 49.99, image: "/images/ghost.jpg" },
  { id: 9, title: "The Witcher 3", price: 29.99, image: "/images/witcher3.jpeg" },
  { id: 10, title: "Starfield", price: 15.99, image: "/images/starfield.jpg" },
  { id: 11, title: "Resident Evil", price: 39.99, image: "/images/resident.jpg" },
  { id: 12, title: "Mirrors Edge", price: 29.99, image: "/images/edge.jpg" },
]);

const cart = ref([]); // shared cart

// --- FUNCTION ---
export function useShop() {
  function addToCart(game) {
    const existing = cart.value.find((i) => i.id === game.id);

    if (existing) {
      existing.qty++;
    } else {
      cart.value.push({ ...game, qty: 1 });
    }
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter((i) => i.id !== id);
  }

  const totalPrice = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0));

  return {
    games,
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
  };
}
