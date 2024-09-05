<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã số hàng hóa</th>
                <th>Tên hàng hóa</th>
                <!-- <th>Mô tả hàng hóa</th> -->
                <th>Hình hàng hóa</th>
                <th>Giá</th>
                <!-- <th>Số lượng hàng hóa</th>  -->
                <!-- <th>Ghi chú</th> -->
                <th>Xóa Hàng Hóa</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(merchandise, index) in displayedMerchandises" :key="merchandise._id"
                :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                <td>{{ index + 1 }}</td>
                <td>{{ merchandise.mshh }}</td>
                <td>{{ merchandise.tenhh }}</td>
                <!-- <td>{{ merchandise.motahh }}</td> -->
                <td>
                    <img :src="merchandise.hinhhanghoa" width="70" height="70">
                </td>
                <td>{{ merchandise.gia }}</td>
                <!-- <td>{{ merchandise.soluonghang }}</td> -->
                <!-- <td>{{ merchandise.ghichu }}</td> -->
                <td><button type="button" class="btn btn-danger" @click="deleteMerchandise(merchandise._id)">Delete</button>
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
import MerchandiseService from "@/services/merchandise.service";
export default {
    // components: {
    //     MerchandiseList,
    // },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            merchandises: [], 
        };
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
    },

    props: {
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async deleteMerchandise(merchandiseId) {
            if (confirm("Bạn muốn xóa Hàng Hóa này?")) {
                try {
                    await MerchandiseService.delete(merchandiseId);
                    this.$router.push({ name: "merchandise" });
                    await this.refreshList();
                    // window.location.reload();
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
        async retrieveMerchandises() {
            try {
                this.merchandises = await MerchandiseService.getAll();
                console.log(this.merchandises);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveMerchandises();
            this.activeIndex = -1;
        },
    },
    mounted() {
    //this.refreshList();
    this.retrieveMerchandises();
    },

};
</script>