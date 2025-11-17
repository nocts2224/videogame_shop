<template>
  <div class="container py-4 text-white">

    <h2 class="fw-bold mb-4">Orders</h2>

    <!-- No Orders -->
    <div v-if="orders.length === 0" class="alert alert-info">
      No orders found.
    </div>

    <!-- Orders List -->
    <div
      v-for="order in orders"
      :key="order.id"
      class="mb-4 p-3 rounded bg-dark border border-secondary"
    >
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="fw-bold">Order #{{ order.id }}</h5>

        <!-- Cancel Button -->
        <button
          class="btn btn-sm btn-outline-danger"
          @click="openCancelModal(order.id)"
        >
          Cancel Order
        </button>
      </div>

      <p class="mb-1">Buyer: {{ order.buyer.name }} ({{ order.buyer.email }})</p>
      <p class="mb-3">Payment: {{ order.buyer.payment }}</p>

      <table class="table table-sm table-dark table-striped">
        <thead>
          <tr>
            <th>Game</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in order.cart" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.qty }}</td>
            <td>$ {{ item.price }}</td>
            <td>$ {{ (item.price * item.qty).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-end fw-bold mt-2">
        Order Total: $ {{ order.total.toFixed(2) }}
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div
      class="modal fade"
      id="cancelModal"
      tabindex="-1"
      aria-labelledby="cancelModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white border-secondary">
          
          <div class="modal-header border-secondary">
            <h5 class="modal-title fw-bold" id="cancelModalLabel">
              Confirm Cancellation
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            Are you sure you want to cancel 
            <span class="fw-bold">Order #{{ selectedOrderId }}</span>?
          </div>

          <div class="modal-footer border-secondary">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="confirmCancel"
            >
              Yes, Cancel Order
            </button>
          </div>

        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

const orders = ref([]);
const selectedOrderId = ref(null);
let modalInstance = null;

// Load orders
onMounted(() => {
  const saved = localStorage.getItem("orders");
  orders.value = saved ? JSON.parse(saved) : [];

  // Initialize modal instance
  const modalElement = document.getElementById("cancelModal");
  modalInstance = new Modal(modalElement);
});

// Open modal + store selected order
function openCancelModal(id) {
  selectedOrderId.value = id;
  modalInstance.show();
}

// Confirm delete
function confirmCancel() {
  orders.value = orders.value.filter(order => order.id !== selectedOrderId.value);
  localStorage.setItem("orders", JSON.stringify(orders.value));

  modalInstance.hide();
}
</script>
