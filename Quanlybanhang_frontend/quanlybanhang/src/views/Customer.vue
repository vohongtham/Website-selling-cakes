<template>
   
    <div class="justify-content-center">
        <div class="container">
            <div class="col-md-12">
                <InputSearch v-model="searchText" />
            </div>
            <div class="mt-3 col-md-12">
                <h4 class="text-uppercase text-center">
                    Danh sách khách hàng
                </h4>
                <CustomerList v-if="filteredCustomersCount > 0" :refresh-list="refreshList" :customers="filteredCustomers"
                    v-model:activeIndex="activeIndex" />
                <p v-else>Không có khách hàng nào.</p>
                <div class="mt-3 row justify-content-around align-items-center">
                    <button class="btn btn-sm btn-primary" @click="refreshList()">
                        <i class="fas fa-redo"></i> Làm mới
                    </button>
                    <!-- <button class="btn btn-sm btn-success" @click="goToAdd()">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button> -->
                </div>
            </div>
        </div>

        <div class="mt-3 col-md-12">
            <div v-if="activeCustomer">
                <h4>
                    Chi tiết khách hàng
                    <i class="fas fa-address-card"></i>
                </h4>
                <!-- hiện chi khách hàng  -->
                <CustomerCard :customer="activeCustomer" />
                <router-link :to="{
                    name: 'customer.edit',
                    params: { id: activeCustomer._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh Khách Hàng</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CustomerCard from "@/components/CustomerCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import CustomerList from "@/components/CustomerList.vue";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        CustomerCard,
        InputSearch,
        CustomerList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            customers: [],
            activeIndex: -1,
            searchText: "",
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
        customerStrings() {
            return this.customers.map((customer) => {
                const { hotenuser, email, diachi, sdt } = customer;
                return [hotenuser, email, diachi, sdt].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredCustomers() {
            if (!this.searchText) return this.customers;
            return this.customers.filter((_customer, index) =>
                this.customerStrings[index].includes(this.searchText)
            );
        },
        activeCustomer() {
            if (this.activeIndex < 0) return null;
            return this.filteredCustomers[this.activeIndex];
        },
        filteredCustomersCount() {
            return this.filteredCustomers.length;
        },
    },
    methods: {
        async retrieveCustomers() {
            try {
                this.customers = await CustomerService.getAll();
                console.log(this.customer);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCustomers();
            this.activeIndex = -1;
        },
        // async removeAllCustomers() {
        //     if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        //         try {
        //             await CustomerService.deleteAll();
        //             this.refreshList();
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },
        goToAdd() {
            this.$router.push({ name: "customer.add" });
        },
    },
    mounted() {
        this.refreshList();
    }

};
</script>
<style scoped>
.page {
    text-align: center;
    max-width: 1100px;
}
</style>
