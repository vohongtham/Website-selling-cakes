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
    <div class="justify-content-center">
        <div class="container">
            <div class="col-md-12">
                <InputSearch v-model="searchText" />
            </div>
            <div class="mt-3 col-md-12">
                <h4 class="text-uppercase text-center">
                    Đơn Hàng Đã Đặt
                </h4>
                <OrderList v-if="filteredOrdersCount > 0" :refresh-list="refreshList" :orders="filteredOrders"
                    :merchandises="merchandises" v-model:activeIndex="activeIndex" />
                <p v-else>Không có đơn hàng nào.</p>
                <div class="mt-3 row justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    <button class="btn btn-sm btn-success" @click="goToAdd()">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </div>
            </div>
        </div>
            <div class="mt-3 col-md-12">
                <div v-if="activeOrder">
                    <h4>
                        Chi tiết Đơn Hàng
                        <i class="fas fa-address-card"></i>
                    </h4>

                    <OrderCard :order="activeOrder" />
                    <router-link :to="{
                        name: 'order.edit',
                        params: { id: activeOrder._id },
                    }">
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh đơn hàng</span>
                    </router-link>
                </div>
            </div>
        </div>
</template>
<script>
import OrderCard from "@/components/OrderCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import OrderList from "@/components/OrderList.vue";
import OrderService from "@/services/order.service";
//import MerchandiseService from "@/services/merchandise.service";
export default {
    components: {
        OrderCard,
        InputSearch,
        OrderList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            orders: [],
            activeIndex: -1,
            searchText: "",
            //merchandises: [],
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
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        orderStrings() {
            return this.orders.map((order) => {
                const { sodondh, mshh, mskh, msnv, soluong, giadathang } = order;
                return [sodondh, mshh, mskh, msnv, soluong, giadathang].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredOrders() {
            if (!this.searchText) return this.orders;
            return this.orders.filter((_order, index) =>
                this.orderStrings[index].includes(this.searchText)
            );
        },
        activeOrder() {
            if (this.activeIndex < 0) return null;
            return this.filteredOrders[this.activeIndex];
        },
        filteredOrdersCount() {
            return this.filteredOrders.length;
        },
    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await OrderService.getAll();
                console.log(this.orders);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
        async removeAllOrders() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await OrderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAdd() {
            this.$router.push({ name: "order.add" });
        },

        // async retrieveMerchandises() {
        //     try {
        //         this.merchandises = await MerchandiseService.getAll(); // Sử dụng MerchandiseService để tải danh sách merchandise
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    },
    mounted() {
        this.refreshList();
        //this.retrieveMerchandises();
    }

};
</script>
<style scoped>
.page {
    text-align: center;
    max-width: 1100px;
}
</style>
