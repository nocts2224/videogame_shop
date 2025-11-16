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
          <td>$ {{ item.price * item.qty }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="remove(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="cart.length" class="text-end fs-4 fw-bold mt-3 text-white">
      Total: $ {{ totalPrice.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { useShop } from "../composables/useShop";

const { cart, removeFromCart, totalPrice } = useShop();

function remove(id) {
  removeFromCart(id);
}
</script>
