<template>
  <div class="container py-4">
    <h2 class="fw-bold mb-4 text-white">Your Cart</h2>

    <div v-if="cart.length === 0" class="alert alert-info">Your cart is empty.</div>

    <table v-else class="table table-dark table-striped table-borderless">
      <thead>
        <tr>
          <th>Game</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.qty }}</td>
          <td>$ {{ item.price }}</td>
          <td>$ {{ (item.price * item.qty).toFixed(2) }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="remove(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="cart.length" class="text-end fs-4 fw-bold mt-3 text-white">
      Total: $ {{ totalPrice.toFixed(2) }}
    </div>

    <!-- Buy Button -->
    <div v-if="cart.length" class="text-end mt-3">
      <button class="btn btn-success px-4" @click="openModal">
        Buy Now
      </button>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>

    <!-- BUY MODAL -->
    <div class="modal fade" id="buyModal" tabindex="-1" aria-hidden="true" ref="buyModalRef">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">Complete Your Purchase</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="submitPurchase">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" v-model="buyer.name" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input type="email" v-model="buyer.email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Payment Method</label>
                <select v-model="buyer.payment" class="form-select" required>
                  <option disabled value="">Select Payment</option>
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>GCash</option>
                </select>
              </div>

              <button class="btn btn-primary w-100">Submit Order</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useShop } from "../composables/useShop";

const { cart, removeFromCart, totalPrice } = useShop();
const buyer = ref({ name: "", email: "", payment: "" });
const successMessage = ref("");

// Modal reference and instance
const buyModalRef = ref(null);
let modalInstance = null;

// Initialize modal on mount
onMounted(() => {
  modalInstance = new bootstrap.Modal(buyModalRef.value, {});
});

function remove(id) {
  removeFromCart(id);
}

function openModal() {
  modalInstance.show();
}

function closeModal() {
  modalInstance.hide();
}

function submitPurchase() {
  const order = {
    id: Date.now(),
    buyer: { ...buyer.value },
    cart: [...cart.value],
    total: totalPrice.value,
    created_at: new Date().toISOString()
  };

  // Save order to localStorage
  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  existingOrders.push(order);
  localStorage.setItem("orders", JSON.stringify(existingOrders));

  // Clear cart & form
  cart.value = [];
  buyer.value = { name: "", email: "", payment: "" };

  // Hide modal safely
  closeModal();

  // Show success message
  successMessage.value = "Order successfully placed!";
  setTimeout(() => (successMessage.value = ""), 3000);
}
</script>
