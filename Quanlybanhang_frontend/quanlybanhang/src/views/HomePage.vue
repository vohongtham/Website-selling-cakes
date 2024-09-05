<template>
   <body>
      <header>
         <!-- <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgb(158, 123, 73);">
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
                  <ul class="navbar-nav mr-auto" style="font-size: 25px;">
                     <li class="nav-item active">
                        <a class="nav-link text-white" href="/homepage">Trang Chủ<span class="sr-only">(current)</span></a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link text-white" href="/gioithieu">Giới Thiệu</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link text-white" href="#cacloaibanh">Các Loại Bánh</a>
                     </li>
                  </ul>
                  <div class="d-flex flex-row-reverse" style="font-size: 25px;">
                     <div class="p-2"><a href="/register"><i class="fa fa-sign-out" aria-hidden="true"></i> Đăng
                           xuất</a></div>
                     <div class="p-2 "><a class="gio-hang" href="cart.html">
                           <i class="fa fa-shopping-basket" aria-hidden="true"></i> Giỏ hàng
                        </a></div>
                     <div class="p-2"><a href="/login"><i class="fa fa-sign-in-alt" aria-hidden="true"></i> Đăng
                           nhập</a></div>
                     <div class="p-2"><a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i> Đăng
                           ký</a></div>
                  </div>
               </div>
            </div>
         </nav> -->
         <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
               <li v-for="(slide, index) in slides" :key="index" :data-target="'#carouselExampleIndicators'"
                  :data-slide-to="index" :class="{ active: index === currentIndex }"></li>
            </ol>
            <div class="carousel-inner">
               <div v-for="(slide, index) in slides" :key="index"
                  :class="['carousel-item', { active: index === currentIndex }]">
                  <img class="d-block w-100" :src="slide" :alt="'Slide ' + (index + 1)" width="400" height="500">
               </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"
               @click="prevSlide">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"
               @click="nextSlide">
               <span class="carousel-control-next-icon" ariahidden="true"></span>
               <span class="sr-only">Next</span>
            </a>
         </div>
      </header>
      <main>
         <div id="cacloaibanh" class="bg">
            <div class="text-center">
               <h1>CÁC LOẠI BÁNH NGỌT</h1>
               <div class="h1-line">
                  <div class="line1"></div>
                  <div class="line2"></div>
                  <div class="line1"></div>
               </div>
               <h6>Hãy đến và trải nghiệm những hương vị ngọt ngào.</h6>
            </div>

            

            <div class="col-md-3" style="left: 570px;">
               <InputSearch v-model="searchText" />
            </div>
           
           
            <MerchandiseListHomePage v-if="filteredMerchandisesCount > 0" :refresh-list="refreshList" 
               :merchandises="filteredMerchandises" v-model:activeIndex="activeIndex" />
         </div>
      </main>
   </body>
   <!-- Footer -->
   <footer class="text-center text-lg-start text-muted" style="background-color: rgb(112, 93, 66);">
      <!-- Section: Links  -->
      <div class="container text-center text-md-start mb-5">
         <!-- Grid row -->
         <div class="row">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto ">
               <!-- Content -->
               <a class="navbar-brand mt-3" href="/homepage"><img :src="Tiramisu" alt="" height="200" width="250"></a>
               <a class="navbar-brand mt-2" href="#"><img :src="Map" alt="" height="180" width="320"></a>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto ">
               <!-- Links -->
               <h5 class="text-uppercase fw-bold mt-3">
                  Chính Sách
               </h5>
               <p>
                  <a href="#!" class="text-reset">Chính sách và quy định chung.</a>
               </p>
               <p>
                  <a href="#!" class="text-reset">Chính sách đặt hàng, thanh toán.</a>
               </p>
               <p>
                  <a href="#!" class="text-reset">Chính sách đổi trả khi mua hàng.</a>
               </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-3 col-lg-3 col-xl-3 mx-auto ">
               <!-- Links -->
               <h5 class="text-uppercase fw-bold mt-3">Liên Hệ</h5>
               <p><i class="fas fa-home me-3 text-secondary"></i>Chi Nhánh 1: Đ. 3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần
                  Thơ, Việt Nam.</p>

               <p><i class="fas fa-home me-3 text-secondary"></i>Chi Nhánh 2: Đ. 30/4, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần
                  Thơ, Việt Nam.</p>
               <p>
                  <i class="fas fa-envelope me-3 text-secondary"></i>
                  SweetCake@gmail.com
               </p>
               <p><i class="fas fa-phone me-3 text-secondary"></i> + 84 712 532 46</p>
               <p><i class="fas fa-print me-3 text-secondary"></i> + 84 712 532 47</p>
            </div>
            <!-- Grid column -->
         </div>
         <!-- Grid row -->
      </div>
      <!-- Section: Links  -->

      <div id="footer">
         <div class="socials-list">
            <a href="https://www.facebook.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.google.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-google"></i>
            </a>
            <a href="https://www.instagram.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/" class="p-2 me-4 link-secondary">
               <i class="fab fa-github"></i>
            </a>
         </div>
         <h6 class="copyright">Powered by <a href="">Sweet Cake</a></h6>
      </div>
      <!-- Copyright -->
   </footer>
   <!-- Footer -->
</template>
<script>
import Tiramisu from "@/img/logobanh.jpg";
import Banhngot from "@/img/the-vagabond.jpg";
import Banhnoel from "@/img/banh-kem-noel.jpg";
import Tonghopbanh from "@/img/tonghopbanh.jpg";
import MerchandiseService from "@/services/merchandise.service";
import InputSearch from "@/components/InputSearch.vue";
import Map from "@/img/map.jpg";
import MerchandiseListHomePage from "@/components/MerchandiseListHomePage.vue";


export default {
   components: {
      InputSearch,
      MerchandiseListHomePage
   },
   data() {
      return {
         currentPage: 1,  // Trang hiện tại
         itemsPerPage: 8,  // Số mục trên mỗi trang
         merchandises: [],
         activeIndex: -1,
         searchText: "",
         Tiramisu,
         slides: [
            Banhngot,
            Banhnoel,
            Tonghopbanh,
         ],
         currentIndex: 0,
         intervalId: null,
         
      };
   },
   watch: {
      // Giám sát các thay đổi của biến searchText.
      // Bỏ chọn phần tử đang được chọn trong danh sách.
      searchText() {
         this.activeIndex = -1;
      },
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

      //
      merchandiseStrings() {
         return this.merchandises.map((merchandise) => {
            const { tenhh, gia } = merchandise;
            return [tenhh, gia].join("");
         });
      },
      filteredMerchandises() {
         if (!this.searchText) return this.merchandises;
         return this.merchandises.filter((_merchandise, index) =>
            this.merchandiseStrings[index].includes(this.searchText)
         );
      },
      activeMerchandise() {
         if (this.activeIndex < 0) return null;
         return this.filteredMerchandises[this.activeIndex];
      },
      filteredMerchandisesCount() {
         return this.filteredMerchandises.length;
      },
      
   },
   methods: {
      async retrieveMerchandises() {
         try {
            this.merchandises = await MerchandiseService.getAll();
            //console.log(this.merchandise);
         } catch (error) {
            console.log(error);
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

      startCarousel() {
         this.intervalId = setInterval(() => {
            this.nextSlide();
         }, 3000); // Chuyển đổi slide sau mỗi 3 giây
      },
      nextSlide() {
         this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      },
      prevSlide() {
         this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      },
      
   },
   created() {
      this.startCarousel();
      this.retrieveMerchandises();
      
   },
   beforeDestroy() {
      // Dừng setInterval khi component bị hủy
      clearInterval(this.intervalId);
   },
   mounted() {
      
      //
   }
}
</script>
<style scoped>
@import "@/assets/form.css";


</style>
