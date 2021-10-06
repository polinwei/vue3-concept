app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>          
          <span v-if="inStock">In Stock</span>
          <span v-else>Out of Stock</span>
          <p>
            {{ variants[selectedVariant].color }} Inventory: {{ variants[selectedVariant].quantity }} </p>
          </p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)" 
          class="color-circle" 
          :style="{ backgroundColor: variant.color }">
        </div>
        
        <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          v-on:click="addToCart">
          Add to Cart
        </button>
        <!-- solution -->
        <button 
        class="button" 
        :class="{ disabledButton: !inStock }" 
        :disabled="!inStock" 
        @click="removeFromCart">
        Remove Item
      </button>
      <!-- solution -->
      </div>
    </div>
  </div>`,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue3 Learning',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10, inventory: 10 },
          { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, inventory: 0 },
        ]
    }
  },
  methods: {
      addToCart() {
        this.variants[this.selectedVariant].quantity -= 1
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      // solution
      removeFromCart() {
        if (this.variants[this.selectedVariant].quantity < this.variants[this.selectedVariant].inventory) {
          this.variants[this.selectedVariant].quantity += 1
        }        
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
      },
      // solution
      updateVariant(index) {
          this.selectedVariant = index
      }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      },
      isCartEmpty() {

      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
      }
  }
})