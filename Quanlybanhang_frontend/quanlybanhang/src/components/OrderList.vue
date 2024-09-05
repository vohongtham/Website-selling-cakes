<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>STT</th>
                <th>Số đơn đặt hàng</th>
                <th>Mã số hàng hóa</th>
                <th>Mã số khách hàng</th>
                <th>Mã số nhân viên</th>
                <th>Số lương</th>
                <th>Giá đặt hàng</th>
                <th>Giảm giá</th>
                <th>Ngày đặt</th>
                <th>Ngày giao</th>
                <th>Trạng thái đặt hàng</th>
                <th>Xóa Đơn Hàng</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(order, index) in displayedOrders" :key="order._id"
                :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                <td>{{ index + 1 }}</td>
                <td>{{ order.sodondh }}</td>
                <td>{{ order.mshh }}</td>
                <td>{{ order.mskh }}</td>
                <td>{{ order.msnv }}</td>
                <td>{{ order.soluong }}</td>
                <td>{{ order.giadathang }}</td>
                <td>{{ order.giamgia}}</td>
                <td>{{ order.ngaydh}}</td>
                <td>{{ order.ngaygh}}</td>
                <td>{{ order.trangthaidh}}</td>
                <td><button type="button" class="btn btn-danger" @click="deleteOrder(order._id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="...">
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
    </nav>
</template>
<script>
// import MerchandiseList from "@/components/MerchandiseList.vue";
import OrderService from "@/services/order.service";
export default {
    // components: {
    //     MerchandiseList,
    // },
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 5,  // Số mục trên mỗi trang
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.orders.length / this.itemsPerPage);
        },
        pages() {
            const pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        },
        displayedOrders() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.orders.slice(start, end);
        },
    },

    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        refreshList: { type: Function },
        merchandises: { type: Array, default: [] },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteOrder(orderId) {
            if (confirm("Bạn muốn xóa Đơn Hàng này?")) {
                try {
                    await OrderService.delete(orderId);
                    this.$router.push({ name: "order" });
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