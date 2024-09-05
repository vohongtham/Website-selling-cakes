<template>
    <body>
        
        <main>
            <div class="gt">
                <div class="container ">
                    <img :src="Cuahang" alt="" height="500" width="1100" style="margin: 15px;">
                    <h7>Giới Thiệu Về Cửa Hàng</h7>
                    <h3 class="mt-2" style="margin: 15px 0 0 15px; line-height: 1.5;">Sweet Cake là thương hiệu bánh ngọt của công ty cổ phần bánh ngọt Sweet Cake. Được
                        thành lập từ năm
                        2020 tại đường 3/2 quận, phường Xuân Khánh, quận Ninh Kiều, TP. Cần Thơ. Trải qua hơn 2 năm phát
                        triển, đến nay Sweet Cake
                        đã
                        có 2 cơ sở kinh doanh. Các sản phẩm Sweet Cake được
                        làm
                        từ các nguyên liệu nhập khẩu của các nước có truyền thống làm bánh như: Newzeland, Mỹ, Pháp, Bỉ. Với
                        hương
                        vị thơm ngon đặc trưng của các loại kem, bơ, sữa, phô mai, hạt hạnh nhân, chocolate... dưới bàn tay
                        khéo
                        léo
                        của những người thợ làm bánh giàu kinh nghiệm. Quy mô xưởng sản xuất rộng hơn 1000m2 với các thiết
                        bị
                        tiên
                        tiến hiện đại theo tiêu chuẩn ISO 2018, toàn bộ nhà máy được sơn phủ bởi sơn EPOXY đặc biệt. Sweet
                        Cake
                        luôn mang đến cho khách hàng những sản phẩm chất lượng nhất, đảm bảo tuyệt đối về an toàn vệ sinh
                        thực
                        phẩm.
                    </h3>
                </div>
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
                    <a class="navbar-brand mt-2" href="#"><img :src="Map" alt=""  height="180" width="320"></a>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto ">
                    <!-- Links -->
                    <h5 class="text-uppercase fw-bold mt-3">
                        Chính Sách
                    </h5>
                    <p>
                        <a href="#!" class="text-reset">Chính sách và quy định chung</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Chính sách đặt hàng, thanh toán</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Chính sách đổi trả</a>
                    </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto ">
                    <!-- Links -->
                    <h5 class="text-uppercase fw-bold mt-3">Liên Hệ</h5>
                    <p><i class="fas fa-home me-3 text-secondary"></i>Chi Nhánh 1: Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần
                        Thơ, Việt Nam</p>

                    <p><i class="fas fa-home me-3 text-secondary"></i>Chi Nhánh 2: Đ. 30/4, Xuân Khánh, Ninh Kiều, Cần
                        Thơ, Việt Nam</p>
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
import MerchandiseService from "@/services/merchandise.service";
import InputSearch from "@/components/InputSearch.vue";
import Map from "@/img/map.jpg";
import Cuahang from "@/img/cua-hang.jpg";

export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            merchandises: [],
            activeIndex: -1,
            searchText: "",
            Tiramisu,
            Cuahang
        };
    },
    computed: {

    },
    methods: {
        async retrieveMerchandises() {
            try {
                this.merchandises = await MerchandiseService.getAll();
                console.log(this.merchandise);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveMerchandises();
    }
}
</script>
<style scoped>
@import "@/assets/form.css";
</style>
 