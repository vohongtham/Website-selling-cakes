<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2 class="my-4">Chi Tiết Giỏ Hàng</h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div v-if="cartDetails && cartDetails.length > 0" class="row">
        <div class="col-md-12">
          <h4 class="text-right">Tổng số lượng giỏ hàng: {{ soLuongSP.totalQuantity }}</h4>
          <br/>
          <table class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th scope="col">Hình Ảnh</th>
                <th scope="col">Tên Hàng Hóa</th>
                <th scope="col">Giá</th>
                <th></th>
                <th scope="col">Số Lượng</th>
                <th></th>
                <th scope="col">Tổng Giá</th>
                <th></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartDetails" :key="item.mshh">
                <td>{{index + 1 }}</td>
                <td><img :src="item.hinhhanghoa" alt="Product Image" class="cart-item-image"></td>
                <td>{{ item.tenhh }}</td>
                <td>{{ item.gia }}</td>
                <td> 
                  <button
                    class="btn btn-sm btn-secondary"
                    @click="decrementQuantity(item)"
                    :disabled="isQuantityOne"
                  >
                    -
                  </button>
                </td>
                <td class="text-center">
                  <span>{{ item.soLuong }}</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-secondary" @click="incrementQuantity(item)">
                    +
                </button>
                  </td>
               
                <td>{{ item.tongGia }}</td>
                <td><button class="btn btn-warning" @click="removeItem(item.mshh)">Xóa</button></td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <strong>Tổng Số Tiền: {{ calculateTotalAmount() }}</strong>
            <button class="btn btn-primary ml-2" @click="purchaseItems" :disabled="cartDetails.length === 0">Mua Hàng</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Giỏ hàng của bạn trống rỗng.</p>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/order.service";
import CartService from "@/services/totalCart.service"
import OrderDetailsService from "@/services/orderDetails.service";

export default {
  data() {
    return {
      cartDetails: [],
      soLuongSP:"",
      cart:[]
    };
  },
  created() {
    this.fetchCartDetails();
    this.retrieveTotalQuantity();
  },
  computed: {
  isQuantityOne() { 
    return this.cartDetails.every(item => item.soLuong === 1);
  },
},
  methods: {
    async fetchCartDetails() {
      const mskhId = localStorage.getItem('userId');

      try {
        const response = await OrderService.getOrdersByCustomerId(mskhId);
        console.log('API Response:', response);

        // Adjust this line
        this.cartDetails = response[0].hangHoa;
        this.cart = response[0]
        
        console.log(this.cartDetails);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    },
    calculateTotalAmount() {
      return this.cartDetails.reduce((total, item) => total + item.tongGia, 0).toFixed(2);
    },
    async removeItem(mshh) {
      try {
        const mskhId = localStorage.getItem('userId');
        await OrderService.removeHangHoa(mskhId, mshh);
        console.log(`Item with mshh: ${mshh} removed successfully.`);
        
        // After removing the item, refresh the cart details
       this.fetchCartDetails();
       this.retrieveTotalQuantity();
      } catch (error) {
        console.error(`Error removing item with mshh ${mshh}:`, error);
      }
    },
    async incrementQuantity(item) {
      try {
        const mskhId = localStorage.getItem('userId');
        const updatedItem = await OrderService.increaseQuantity(mskhId, item.mshh, 1);
        
        // Update the local cartDetails with the updated item
        const updatedIndex = this.cartDetails.findIndex(cartItem => cartItem.mshh === updatedItem.mshh);
        if (updatedIndex !== -1) {
          this.$set(this.cartDetails, updatedIndex, updatedItem); 
        }
        this.fetchCartDetails();
        this.retrieveTotalQuantity();
      } catch (error) {
        console.error(`Error incrementing quantity for item with mshh ${item.mshh}:`, error);
      }
    },
    async decrementQuantity(item) {
  try {
    // Check if the quantity is already 1, if yes, return without making API call
    if (item.soLuong === 1) {
      return;
    }

    const mskhId = localStorage.getItem('userId');
    item.soLuong = item.soLuong - 1;

    const updatedItem = await OrderService.decreaseQuantity(mskhId, item.mshh, 1);

    // Update the local cartDetails with the updated item
    const updatedIndex = this.cartDetails.findIndex(cartItem => cartItem.mshh === updatedItem.mshh);
    if (updatedIndex !== -1) {
      this.$set(this.cartDetails, updatedIndex, updatedItem);
    }
    this.fetchCartDetails();
    this.retrieveTotalQuantity();
  } catch (error) {
    console.error(`Error decrementing quantity for item with mshh ${item.mshh}:`, error);
  }
},

    async retrieveTotalQuantity() {
        try {
            // Gọi dịch vụ để lấy tổng số lượng sản phẩm dựa trên mskhId
               // const mskhId = this.userId; // Sử dụng userId của người dùng
               // const cartService = new CartService();
                //const totalQuantity = await cartService.getTotalQuantityByCustomerId(mskhId);

                const totalQuantity = await CartService.getTotalQuantityByCustomerId(localStorage.getItem('userId'));
                // Gán giá trị lấy được cho biến soLuongSP
                this.soLuongSP = totalQuantity;
                console.log(this.soLuongSP);
            } catch (error) {
                console.error(error);
        }
      },
      async purchaseItems() {
  try {
    // Lấy dữ liệu từ giỏ hàng và chuẩn bị payload cho API createOrderDetails
    // const orderPayload = {
    //   mskhId: localStorage.getItem('userId'),
    //   hangHoa: this.cartDetails,
    //   // Các thông tin khác có thể cần thiết
    // };

    // Gọi API createOrderDetails
    this.cart.mskhId = localStorage.getItem('userId');
    this.cart.phuongThucThanhToan = "Tiền mặt";
    this.cart.trangThaiDonHang = "Đã mua hàng";
    this.cart.ngayDatHang = new Date();
    this.cart.userEmail = localStorage.getItem('userEmail');
    
    const response = await OrderDetailsService.addOderDetails(this.cart);

    // Kiểm tra phản hồi từ API, và thực hiện các bước khác nếu cần
    console.log('API Response from createOrderDetails:', response);

    // Sau khi mua hàng, có thể xóa giỏ hàng hoặc thực hiện các bước khác

    // Ví dụ: Xóa giỏ hàng và cập nhật lại chi tiết giỏ hàng
    await this.clearCart();
    alert("Đơn hàng đã được đặt (mua hàng) thành công !!");
   
    this.cartDetails = [];

      // Optionally, you can also reset the total quantity
    this.soLuongSP = { totalQuantity: 0 };

    
    
  } catch (error) {
    console.error("Lỗi khi mua hàng:", error);
  }
},

async clearCart() {
    try {
      const mskhId = localStorage.getItem('userId');
      // Gọi API hoặc dịch vụ để xóa giỏ hàng
      await OrderService.clearCart(mskhId);

      // Cập nhật lại chi tiết giỏ hàng sau khi xóa giỏ hàng
      this.fetchCartDetails();
      this.retrieveTotalQuantity();
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  },

  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  margin-bottom: 20px;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
}
</style>
