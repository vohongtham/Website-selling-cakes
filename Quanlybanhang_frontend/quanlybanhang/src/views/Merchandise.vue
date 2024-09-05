<template>
    <!-- <nav class="navbar navbar-dark bg-dark">
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
    </nav> -->
    <div class="justify-content-center">
        <div class="container">
            <!-- <div class="col-md-12 ">
                <InputSearch v-model="searchText" />
            </div> -->
            <div class="mt-3 col-md-12">
                <h4 class="text-uppercase text-center">
                    Danh sách hàng hóa
                </h4>
                <MerchandiseList v-if="filteredMerchandisesCount > 0" :refresh-list="refreshList"
                    :merchandises="filteredMerchandises" v-model:activeIndex="activeIndex" />
                <p v-else>Không có hàng hóa nào.</p>
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
    </div>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <div v-if="activeMerchandise">
                <h4>
                    Chi tiết Hàng Hóa
                    <i class="fas fa-address-card"></i>
                </h4>
                <!-- hiện chỉnh Hàng Hóa  -->
                <MerchandiseCard :merchandise="activeMerchandise" />
                <router-link :to="{
                    name: 'merchandise.edit',
                    params: { id: activeMerchandise._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh hàng hóa</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import MerchandiseCard from "@/components/MerchandiseCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import MerchandiseList from "@/components/MerchandiseList.vue";
import MerchandiseService from "@/services/merchandise.service";
export default {
    components: {
        MerchandiseCard,
        InputSearch,
        MerchandiseList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            merchandises: [],
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
        merchandiseStrings() {
            return this.merchandises.map((merchandise) => {
                const { mshh, tenhh} = merchandise;
                return [ mshh, tenhh].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
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
                console.log(this.merchandises);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveMerchandises();
            this.activeIndex = -1;
        },
        async removeAllMerchandises() {
            if (confirm("Bạn muốn xóa tất cả Hàng Hóa?")) {
                try {
                    await MerchandiseService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAdd() {
            this.$router.push({ name: "merchandise.add" });
        },
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
