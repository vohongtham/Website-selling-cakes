<template>
    <div class="justify-content-center">
      <!-- ... existing code ... -->
      <div class="mt-3 col-md-12">
        <h4 class="text-uppercase text-center">Danh sách đơn đặt hàng</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
                <th>STT</th>
            <th>Mã Đơn Hàng</th>
            <th>Email Khách Hàng</th>
            <!-- <th>Hàng Hóa</th> -->
            <th>Số Lượng Tổng</th>
            <th>Giá Tổng</th>
            <th>Ngày Đặt Hàng</th>
            <th>Phương Thức TT</th>
            <th>Trạng thái đơn hàng</th>
              <!-- Add more headers based on your data structure -->
            </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) in filteredOrders" :key="order._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            <td>{{ index + 1 }}</td>
            <td>{{ order._id }}</td>
            <td>{{ order.userEmail }}</td>
            <!-- <td>{{ order.hangHoa }}</td> -->
            <td>{{ order.soLuongTong }}</td>
            <td>{{ order.giaTong }}</td>
            <td>{{ formatDate(order.ngayDatHang) }}</td>
            <td>{{ order.phuongThucThanhToan}}</td>
            <td>{{ order.trangThaiDonHang }}</td>
            <!-- Add more columns based on your data structure -->
          </tr>
        </tbody>
        </table>
        <p v-if="filteredOrdersCount === 0">Không có đơn đặt hàng nào.</p>
        <div class="mt-3 row justify-content-around align-items-center">
          <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
          <!-- Add other buttons or actions as needed -->
        </div>
      </div>
      <!-- ... existing code ... -->
    </div>
  </template>
  
  <script>
  import MerchandiseCard from "@/components/MerchandiseCard.vue";
  import InputSearch from "@/components/InputSearch.vue";
  import MerchandiseList from "@/components/MerchandiseList.vue";
  import OrderDetailsService from "@/services/orderDetails.service"; // Import your order details service
  
  export default {
    components: {
      MerchandiseCard,
      InputSearch,
      MerchandiseList,
    },
    data() {
      return {
        orders: [], // Add an array to store orders
        activeIndex: -1,
        searchText: "",
      };
    },
    watch: {
      searchText() {
        this.activeIndex = -1;
      },
    },
    computed: {
      orderStrings() {
        return this.orders.map((order) => {
          const { _id, mskhId, hangHoa, soLuongTong, giaTong, ngayDatHang } = order;
          return [_id, mskhId, hangHoa, soLuongTong, giaTong, ngayDatHang].join("");
        });
      },
      filteredOrders() {
        if (!this.searchText) return this.orders;
        return this.orders.filter((_order, index) =>
          this.orderStrings[index].includes(this.searchText)
        );
      },
      filteredOrdersCount() {
        return this.filteredOrders.length;
      },
    },
    methods: {
      async retrieveOrders() {
        try {
          this.orders = await OrderDetailsService.getAllOrderDetails();
        } catch (error) {
          console.log(error);
        }
      },
      refreshList() {
        this.retrieveOrders();
        this.activeIndex = -1;
      },
      formatDate(dateString) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
      // ... existing methods ...
    },
    mounted() {
      this.refreshList();
      this.retrieveOrders();
    },
  };
  </script>
  
  <style scoped>
  .page {
    text-align: center;
    max-width: 1100px;
  }
  </style>
  