<template>
    <div :style="{ backgroundImage: 'url(' + backGroundIMG + ')', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', marginTop: '-50px' }">
        <div id="app" class="container mt-4">
            <div class="row">
                
                <div class="col-md-3">
                    <router-link :to="{ name: 'employee' }">
                    <div class="card" style="margin-top: 100px;">
                        <div class="card-header card-1 white-header">
                            Quản lý Nhân viên
                        </div>
                        <div class="card-body">
                            <img :src="iconNhanVien" height="140" width="210">
                        </div>
                    </div>
                </router-link>
                </div>

                <!-- Thẻ 2 -->
                <div class="col-md-3">
                    <router-link :to="{ name: 'customer' }">
                    <div class="card" style="margin-top: 100px;">
                        <div class="card-header card-2 white-header">
                            Quản lý Khách hàng
                        </div>
                        <div class="card-body">
                            <img :src="iconKhachHang" height="140" width="210">
                        </div>
                    </div>
                </router-link>
                </div>

                <!-- Thẻ 3 -->
                
                <div class="col-md-3">
                    <router-link :to="{ name: 'merchandise' }">
                    <div class="card" style="margin-top: 100px;">
                        <div class="card-header card-3 white-header">
                            Quản lý Hàng Hóa
                        </div>
                        <div class="card-body">
                            <img :src="iconHangHoa" height="140" width="210">
                        </div>
                    </div>
                    </router-link>
                </div>
           

                <!-- Thẻ 4 -->
                <div class="col-md-3">
                    <router-link :to="{ name: 'donmua' }">
                    <div class="card" style="margin-top: 100px;">
                        <div class="card-header card-4 white-header">
                            Quản lý Đơn hàng
                        </div>
                        <div class="card-body">
                            <img :src="iconDonHang" height="140" width="210">
                        </div>
                    </div>
                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nen from "@/img/Anh-Welcome.jpg";
import backGroundIMG from "@/img/backgroundIMG.jpg";
import iconNhanVien from "@/img/iconNhanVien.png";

import iconKhachHang from "@/img/iconKhachHang.png";

import iconHangHoa from "@/img/iconHangHoa.jpg";
import iconDonHang from "@/img/iconDonHang.png";



export default {
    data() {
        return {
            backGroundIMG,
            iconDonHang,
            iconHangHoa,
            iconKhachHang,
            iconNhanVien
        };
    },
}
</script>

<style>
/* CSS tùy chỉnh để thêm màu sắc cho các thẻ */
.card-1 { background-color: #3498db; }
.card-2 { background-color: #e74c3c; }
.card-3 { background-color: #2ecc71; }
.card-4 { background-color: #f39c12; }
.white-header {
    background-color: #fff; /* White background color */
    color: #000; /* Black text color */
}
</style>