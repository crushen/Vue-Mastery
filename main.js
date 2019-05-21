Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
      <div class="product-image">
        <img v-bind:src="image" alt="">
      </div>
      <div class="product-info">
         <h1>{{ title }}</h1>
         <p v-if="inStock">In Stock</p>
         <p v-else>Out of Stock</p>
         <p>Shipping: {{ shipping }}</p>
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
      </div>
      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>
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
      reviews: []
    }
  },   
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    },
    addReview: function(productReview) {
      this.reviews.push(productReview)
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
    },
    shipping: function() {
      if(this.premium) {
        return 'Free';
      } else {
        return 2.99;
      }
    }
  }

});

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data: function() {
    return {
      name: '',
      review: '',
      rating: ''
    }
  },
  methods: {
    onSubmit: function() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.$emit('review-submitted', productReview)
      this.name = '';
      this.review = '';
      this.rating = '';
    }
  }
})

const app = new Vue ({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id);
    }
  }
});