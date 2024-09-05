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
    <div >
        <CustomerForm :customer="this.customer" @submit:customer="addCustomer"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import CustomerForm from "@/components/CustomerForm.vue";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        CustomerForm,
    },
    props: {
        id: { type: String, required: false },
    },
    data() {
        return {
            customer: 
            {
            mskh:"",
            hotenkh:"",
            email:"",
            password:"",
            diachi:"",
            sdt:"",
            },
            message: "",
        };
    },
    methods: {
        async addCustomer(data) {
            try {
            await CustomerService.create(data);
            this.message = "Khách hàng được thêm thành công.";
            } catch (error) {
            //console.log(error);
            }
        }
    },
};
</script>