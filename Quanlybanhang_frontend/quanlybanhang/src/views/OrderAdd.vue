<template>
    <nav class="navbar navbar-dark bg-dark">
        <a href="/admin" class="navbar-brand">HomePage Admin</a>
        <div class="navbar-nav d-flex flex-row-reverse">
            <li class="p-2 nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link">
                    Đơn Đặt Hàng
                    <i class="fas fa-shopping-cart"></i>
                </router-link>
            </li>
            <li class="p-2 nav-item">
                <router-link :to="{ name: 'merchandise' }" class="nav-link">
                    Danh Sách Hàng Hóa
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
            <li class="p-2 nav-item">
                <router-link :to="{ name: 'customer' }" class="nav-link">
                    Danh Sách Khách Hàng
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
            <li class="p-2 nav-item">
                <router-link :to="{ name: 'employee' }" class="nav-link">
                    Danh Sách Nhân Viên
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
        </div>
    </nav>
    <div>
        <h3 class="text-uppercase text-center mt-3">Thêm Đơn Đặt Hàng</h3>
        <OrderForm :order="this.order" :merchandises="merchandises" @submit:order="addOrder"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import OrderForm from "@/components/OrderForm.vue";
import OrderService from "@/services/order.service";
import MerchandiseService from "@/services/merchandise.service";
export default {
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: false },
    },
    data() {
        return {
            order: 
            {
            sodondh:"",
            mshh:"",
            mskh:"",
            msnv:"",
            soluong:"",
            giadathang:"",
            giamgia:"",
            ngaydh:"",
            ngaygh:"",
            trangthaidh:""
            },
            message: "",
            merchandises: [],
        };
    },
    methods: {
        async addOrder(data) {
            try {
            await OrderService.create(data);
            this.message = "Đơn hàng được thêm thành công.";
            } catch (error) {
            console.log(error);
            }
        },
        async retrieveMerchandises() {
            try {
                this.merchandises = await MerchandiseService.getAll();
                console.log(this.merchandises);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>