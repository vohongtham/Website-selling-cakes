<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(158, 123, 73);">
            <div class="container">
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                  <ul class="navbar-nav " style="font-size: 25px;">
                     <li class=" p-2 nav-item">
                        <a class="nav-link text-white" href="tel:(028)39.636.888"><i class="fa fa-phone color-x"
                              aria-hidden="true"></i>0971235246</a>
                     </li>
                     <li class="p-2 nav-item">
                        <a class="nav-link text-white" href="mailto:info@dulichmaitravel.com"><i class="fa fa-envelope"
                              aria-hidden="true"></i>SweetCake@gmail.com</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         <!-- <nav>
         
         </nav> -->
         <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(254, 253, 252);">
            <div class="container">
               <a class="navbar-brand" href="/homepage"><img :src="Tiramisu" alt="" height="130" width="200"></a>
               <h2 class="text-center">Luôn luôn đặt khách hàng lên hàng đầu.</h2>
            </div>

         </nav>
         <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(158, 123, 73);">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="container">
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto" style="font-size: 20px;">
                     <li class="nav-item active">
                         <a class="nav-link text-white" href="/">Trang Chủ<span class="sr-only">(current)</span></a> 
                        <!-- <router-link to="/">Trang chủ</router-link>  -->
                    </li>
                   <!-- Trong phần template -->
<!-- <li v-if="isAdmin()" class="nav-item active">
    <a class="nav-link text-white" href="/admin">Admin Page<span class="sr-only"></span></a>
</li> -->
<li v-if="isAdmin() || userChucVu === 'Admin'" class="nav-item active">
    <a class="nav-link text-white" href="/admin">Admin Page<span class="sr-only"></span></a>
</li>

                     <li class="nav-item">
                        <a class="nav-link text-white" href="/gioithieu">Giới Thiệu</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link text-white" href="#cacloaibanh">Các Loại Bánh</a>
                     </li>
                  </ul>
                  
                  
                  <div class="d-flex justify-content-end align-items-center" style="font-size: 25px;">
                     <div class="d-flex justify-content-end align-items-center" style="font-size: 25px;">
      <div v-if="userId">
        <!-- Hiển thị khi có userId -->
        <div class="d-flex align-items-center">
          <div class="p-2"><i><img :src="Tiramisu" alt="" class="rounded-image" height="50" width="50"></i> {{ userEmail }}</div>
          <div @click="logout" class="p-2"><a href="/login"><i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất</a></div>
          <div class="p-2"><a href="/order-history"><i class="fa fa-sign-out" aria-hidden="true"></i> Đơn mua</a></div>
        </div>
      </div>
      <div v-else>
        <!-- Hiển thị khi không có userId -->
        <div class="d-flex align-items-center">
          <div class="p-2"><a href="/login"><i class="fa fa-sign-out" aria-hidden="true"></i> Đăng nhập</a></div>
          <div class="p-2"><a href="/register"><i class="fa fa-sign-in-alt" aria-hidden="true"></i> Đăng ký</a></div>
        </div>
      </div>
    </div>
    </div>
                  
               </div>
            </div>
         </nav>
    </div>
</template>
<script>
import Tiramisu from "@/img/logobanh.jpg";
import CartService from "@/services/totalCart.service"
export default{
    data(){
        return{
            Tiramisu,
            userEmail: "",
            userId:"",
            soLuongSP:"",
            userChucVu: "",

        }
    },
    created(){
            this.userEmail = localStorage.getItem('userEmail');
            this.userId = localStorage.getItem('userId');
            this.userChucVu = localStorage.getItem('userChucVu'); // Thêm dòng này để lấy giá trị userChucVu
               console.log(this.userEmail);
               console.log(this.userId);
               console.log(this.userChucVu);
        
    },
    computed:{
      
    },
    methods: {
        async logout() {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userChucVu');
             
        },
        isAdmin() {
         console.log("User Chuc Vu:", this.userChucVu);
    return this.userChucVu === "Nhân Viên";
},

        async retrieveTotalQuantity() {
        try {
            
                const totalQuantity = await CartService.getTotalQuantityByCustomerId(this.userId);
                this.soLuongSP = totalQuantity;
                console.log(this.soLuongSP);
            } catch (error) {
                console.error(error);
        }
    },
    },
    mounted(){
        this.retrieveTotalQuantity();
    }
}

</script>
<style scoped>
@import "@/assets/form.css";
.rounded-image {
  border-radius: 50%;
}
</style>

