<template>
 <div>
    <div class="container">

      <div class="row">
        
      <div style="margin-top: 20px;" class="text-right ml-auto"> <!-- Use the ml-auto class to push the content to the right -->
        <!-- Display the cart icon and link to the cart details page -->
        <router-link to="/cart">
          <h5 style="color: black;"> Giỏ hàng <i class="fa fa-shopping-cart"></i> ({{ soLuongSP.totalQuantity }})</h5>
        </router-link>

        <!-- Display the total quantity in the cart -->
        <span class="cart-quantity">{{ totalQuantity }}</span>
      </div>
    </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <h2 class="my-4">Chi Tiết Sản Phẩm</h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" :src="merchandise.hinhhanghoa">
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">{{ merchandise.tenhh }}</h4>
              <p class="card-text">Giá: {{ merchandise.gia }}</p>
              <p class="card-text">Thông tin chi tiết:</p>
              <!-- <p class="card-text">{{ merchandise.thongtinchitiet }}</p> -->
              
              <!-- Quantity Selection -->
              <div class="form-group">
                <label for="quantity">Số lượng:</label>
                <input type="number" id="quantity" v-model="quantity" min="1" class="form-control">
            </div>
              
              <!-- Add to Cart Button -->
              <button @click="addToCart" class="btn btn-dark">Thêm Vào Giỏ Hàng</button>
              <div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  </template>
  
  <script>
  import MerchandiseService from "@/services/merchandise.service";
  import OrderService from "@/services/order.service";
  import CartService from "@/services/totalCart.service";

  export default {
    data() {
        return {
            merchandise: null,
            quantity: 1,
            soLuongSP:0
          
        };
    },
    created() {
      this.retrieveTotalQuantity();
      const merchandiseId = this.$route.params.id; //id của sản phẩm khi click vào
  
      // Fetch merchandise details using MerchandiseService and merchandiseId
      this.fetchMerchandiseDetails(merchandiseId);
      
     // 
    },
    methods: {

      // ...mapActions(['addMerchandiseToCart']), // Map the action to component methods
      
      async fetchMerchandiseDetails(merchandiseId) {
        try {
          // get thông tin chi tiết sản phẩm theo id
          this.merchandise = await MerchandiseService.get(merchandiseId);
        } catch (error) {
          console.error("Error fetching merchandise details:", error);
        }
      },
      async retrieveTotalQuantity() {
      try {
        const totalQuantity = await CartService.getTotalQuantityByCustomerId(localStorage.getItem('userId'));
        this.soLuongSP = totalQuantity;
        console.log(this.soLuongSP);
      } catch (error) {
        console.error(error);
      }
    },

    async addToCart() {
    // Check if userId is present in local storage
    const mskhId = localStorage.getItem('userId');
    if (!mskhId) {
        // Display an error message and prompt the user to log in
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
        // You can also redirect the user to the login page or handle it in another way
        // For example: this.$router.push({ name: 'login' });
        return;
    }

    if (this.quantity < 1) {
        // Display an error message for invalid quantity
        alert('Số lượng không hợp lệ. Vui lòng nhập số lượng lớn hơn 0.');
        return;
    }

    const productData = {
        mshh: this.merchandise.mshh,
        tenhh: this.merchandise.tenhh,
        hinhhanghoa: this.merchandise.hinhhanghoa,
        gia: this.merchandise.gia,
        soLuong: this.quantity,
        tongGia: this.merchandise.gia * this.quantity,
    };

    try {
        // Attempt to add the product to the cart
        await OrderService.addHangHoa(mskhId, productData);
        this.message = "Đã thêm vào giỏ hàng";
        this.$router.push({ name: 'cart' });
    } catch (error) {
        console.log(error);
    }
}}

    
  };
  </script>