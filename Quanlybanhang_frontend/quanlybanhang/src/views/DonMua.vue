<template>
    <div style="margin: 100px;">
      <h2 class="text-center">Lịch Sử Đơn Hàng</h2>
      <div v-for="(order, index) in orderHistory" :key="index" class="order-history-item">
        <div class="order-header">
          <h3>Đơn Hàng {{ index + 1 }}</h3>
          <p><strong>Ngày Đặt Hàng:</strong> {{ formatOrderDate(order.ngayDatHang) }}</p>
        </div>
        <div class="order-header">
            <p><strong>Phương Thức Thanh Toán:</strong> {{ order.phuongThucThanhToan }}</p>
            <p><strong>Trạng Thái Đơn Hàng:</strong> {{ order.trangThaiDonHang }}</p>
        </div>
        <div class="order-header">
            <p><strong>Giảm Giá:</strong> {{ order.giamGia }}</p>
          <p><strong>Giá Đã Giảm:</strong> {{ order.giaDaGiam }}</p>
        </div>
        <div class="order-header">
            <p><strong>Tổng Số Lượng:</strong> {{ order.soLuongTong }}</p>
          <p><strong>Tổng Giá:</strong> {{ order.giaTong }}</p>
        </div>
          
  
        <h4 >Chi Tiết Đơn Hàng</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Mã Sản Phẩm</th>
              <th scope="col">Hình</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Giá</th>
              <th scope="col">Tổng Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in order.hangHoa" :key="i">
              <td>{{ item.mshh }}</td>
              <td><img :src="item.hinhhanghoa" style="height: 70px; width: 70px;" alt="Product Image" class="cart-item-image"></td>
              <td>{{ item.soLuong }}</td>
              <td>{{ item.gia }}</td>
              <td>{{ item.tongGia }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Khu vực tổng số lượng, tổng giá, giảm giá, giá đã giảm -->
        
  
        <hr  style="margin: 30px 0; color: brown; bor" />
      </div>
    </div>
  </template>

<script>
// Import your order service
import OrderDetailsService from "@/services/orderDetails.service";

export default {
  data() {
    return {
      orderHistory: [],
    };
  },
  created() {
    this.fetchOrderHistory();
  },
  methods: {
    async fetchOrderHistory() {
    try {
      // Fetch order history data using your API service
      const mskhId = localStorage.getItem('userId');
      let orderHistory = await OrderDetailsService.getAllOrderDetailsByCustomerId(mskhId);

      // Sort the order history array by date in descending order (newest to oldest)
      orderHistory.sort((a, b) => {
        const dateA = new Date(a.ngayDatHang);
        const dateB = new Date(b.ngayDatHang);
        return dateB - dateA;
      });

      // Update the component's data with the sorted order history
      this.orderHistory = orderHistory;
      console.log(this.orderHistory);
    } catch (error) {
      console.error("Error fetching or sorting order history:", error);
    }
  },
    formatOrderDate(dateString) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
  },
};
</script>

<style scoped>
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
</style>
