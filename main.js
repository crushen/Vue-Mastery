Vue.component('product', {
  template: `
  <div class="product">
      <div class="product-image">
        <img v-bind:src="image" alt="">
      </div>
      <div class="product-info">
         <h1>{{ title }}</h1>
         <p v-if="inStock">In Stock</p>
         <p v-else>Out of Stock</p>
         <ul>
           <li v-for="detail in details">{{ detail }}</li>
         </ul>
         <div v-for="(variant, index) in variants" 
              v-bind:key="variant.variantId"
              class="color-box"
              v-bind:style="{backgroundColor: variant.variantColor}"
              v-on:mouseover="updateProduct(index)">
         </div>
         <button v-on:click="addToCart" 
                 v-bind:disabled="!inStock"
                 v-bind:class="{disabledButton: !inStock}">Add to cart</button>
         <div class="cart">
           <p>Cart: {{ cart }}</p>
         </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      details: ["80% Cotton", "20% Polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0
        }
      ],
      cart: 0
    }
  },   
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title: function() {
      return this.brand + ' ' + this.product;
    },
    image: function() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock: function() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }

});

const app = new Vue ({
  el: '#app',

});