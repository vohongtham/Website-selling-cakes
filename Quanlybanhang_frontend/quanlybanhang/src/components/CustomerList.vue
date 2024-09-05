<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>STT</th>
          
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Xóa khách hàng</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(customer, index) in displayedCustomers" :key="customer._id"
                :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                <td>{{ index + 1 }}</td>
                
                <td>{{ customer.hotenuser }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.chucvu }}</td>
                <td>{{ customer.diachi }}</td>
                <td>{{ customer.sdt }}</td>
                <td><button type="button" class="btn btn-danger" @click="deleteCustomer(customer._id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" @click="prevPage" href="#" tabindex="-1">Previous</a>
            </li>
            <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" @click="goToPage(page)" href="#">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" @click="nextPage" href="#">Next</a>
            </li>
        </ul>
    </nav> -->
</template>
<script>
import CustomerService from "@/services/customer.service";
export default {
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 5,  // Số mục trên mỗi trang
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.customers.length / this.itemsPerPage);
        },
        pages() {
            const pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        },
        displayedCustomers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.customers.slice(start, end);
        },
        displayedCustomers() {
            // Filter customers based on their role
            const filteredCustomers = this.customers.filter(customer => customer.chucvu === 'Khách hàng');

            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            
            // Return only the portion of customers to be displayed
            return filteredCustomers.slice(start, end);
        },
    },

    props: {
        customers: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        refreshList: { type: Function },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteCustomer(customerId) {
            if (confirm("Bạn muốn xóa khách hàng này?")) {
                try {
                    await CustomerService.delete(customerId);
                    this.$router.push({ name: "customer" });
                    await this.refreshList();
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
    },
};
</script>