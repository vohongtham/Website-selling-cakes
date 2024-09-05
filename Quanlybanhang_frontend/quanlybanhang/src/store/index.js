import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: [],
    },
  },
  mutations: {
    addToCart(state, merchandise) {
      state.cart.items.push(merchandise);
    },
  },
  actions: {
    async addMerchandiseToCart({ commit }, merchandise) {
      commit('addToCart', merchandise);
    },
  },
  getters: {
    cartItems: (state) => state.cart.items,
  },
});
