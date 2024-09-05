<template>
     <div class="container mt-3">
        <div class="row">
      <div class="text-right ml-auto"> <!-- Use the ml-auto class to push the content to the right -->
        <!-- Display the cart icon and link to the cart details page -->
        <router-link to="/cart">
          <h7 style="color: black;"> Giỏ hàng <i class="fa fa-shopping-cart"></i> ({{ soLuongSP.totalQuantity }})</h7>
        </router-link>

        <!-- Display the total quantity in the cart -->
        <span class="cart-quantity">{{ totalQuantity }}</span>
      </div>
    </div>
    <div class="row">
        
      <div class="col-xl-3 col-md-6 col-sm-12 mb-3" v-for="(merchandise, index) in displayedMerchandises"
        :key="merchandise._id" :class="{ active: index === activeIndex }">
        <div  class="card" style="width: 270px;">
          <!-- Đặt sự kiện click trên hình ảnh -->
          <img @click="redirectToProductDetails(merchandise._id)" class="card-img-top" :src="merchandise.hinhhanghoa" alt="" width="60" height="200"
                />
          <div class="card-body text-center">
            <h4 class="card-title">{{ merchandise.tenhh }}</h4>
            <h4>Giá: {{ merchandise.gia }}</h4>
            <button @click="redirectToProductDetails(merchandise._id)" class="btn btn-dark">
      Xem chi tiết 
    </button>
    
    <div style="margin-top: 10px;">
      <button @click="addToCart(merchandise)" class="btn btn-warning" >
        Mua hàng <i class="fas fa-shopping-cart"></i>
      </button>
    </div>
    
          </div>
        </div>
      </div>
    </div>
  </div>
    <nav aria-label="..." style="background-color: rgb(236, 233, 186); font-size: 20px;">
        <ul class="container pagination d-flex justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link text-dark" style="background-color: rgb(236, 233, 186);" @click="prevPage" href="#"
                    tabindex="-1">Previous</a>
            </li>
            <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link text-dark" style="background-color: rgb(236, 233, 186);" @click="goToPage(page)"
                    href="#">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link text-dark" style="background-color: rgb(236, 233, 186);" @click="nextPage"
                    href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
// import MerchandiseList from "@/components/MerchandiseList.vue";
import MerchandiseService from "@/services/merchandise.service";
import OrderService from "@/services/order.service";
import CartService from "@/services/totalCart.service"
export default {
    // components: {
    //     MerchandiseList,
    // },
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 8,  // Số mục trên mỗi trang
            merchandise: {},
            quantity: 1,
            soLuongSP:""
            
        };
    },
    

    computed: {
        totalPages() {
            return Math.ceil(this.merchandises.length / this.itemsPerPage);
        },
        pages() {
            const pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        },
        //
        displayedMerchandises() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.merchandises.slice(start, end);
        },
    },

    props: {
        merchandises: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        refreshList: { type: Function },
    },
    emits: ["update:activeIndex"],
    created(){
        this.retrieveTotalQuantity();
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteMerchandise(merchandiseId) {
            if (confirm("Bạn muốn xóa Hàng Hóa này?")) {
                try {
                    await MerchandiseService.delete(merchandiseId);
                    this.$router.push({ name: "merchandise" });
                    await this.refreshList();
                    // window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        redirectToProductDetails(merchandiseId) {
            this.$router.push({ name: "merchandisedetails", params: { id: merchandiseId } });
        },
        async addToCart(merchandise) {
            if (!localStorage.getItem('userId')) {
                alert("Vui lòng đăng nhập để thực hiện chức năng này!")
        // Handle the case where localStorage.userId is not present (e.g., show a message)
        console.log("User is not logged in. Please log in to add items to the cart.");
        
    }else{
        console.log(merchandise);
                const productData = {
                    mshh: merchandise.mshh,
                    tenhh: merchandise.tenhh,
                    hinhhanghoa: merchandise.hinhhanghoa,
                    gia: merchandise.gia,
                    soLuong: 1,
                    tongGia: merchandise.gia * 1,
                };
            console.log(productData);
    // Get the user ID from localStorage
    const mskhId = localStorage.getItem('userId');

    try {
        // Add the product to the cart using the OrderService
        await OrderService.addHangHoa(mskhId, productData);
        this.retrieveTotalQuantity();
        console.log(productData);
        alert("Đã thêm vào giỏ hàng thành công!");
        // this.message = "đã thêm vào giỏ hàng";
        // alert("Đã thêm vào giỏ hàng thành công!");
        
    } catch (error) {
        console.log(error);
    }
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
      }

    },
};
</script>
<style scoped>@import "@/assets/form.css";
/* Thêm hiệu ứng hover vào thẻ card */
.card:hover {
  transform: scale(1.02); /* Tăng kích thước khi di chuột vào */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng */
  transition: transform 0.3s, box-shadow 0.3s; /* Thời gian hoàn thành hiệu ứng */
}

/* Tùy chỉnh màu nền khi hover vào thẻ card */
.card:hover {
  background-color: #f0f0f0;
}
</style>

