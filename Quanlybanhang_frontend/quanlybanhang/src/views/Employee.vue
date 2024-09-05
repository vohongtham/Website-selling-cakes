<template>
    
    <div class="justify-content-center">
        <div class="container">
            <div class="col-md-12">
                <InputSearch v-model="searchText" />
            </div>
            <div class="mt-3 col-md-12">
                <h4 class="text-uppercase text-center">
                    Danh sách Nhân Viên
                </h4>

                <EmployeeList v-if="filteredEmployeesCount > 0" :refresh-list="refreshList" :employees="filteredEmployees"
                    v-model:activeIndex="activeIndex"  />

                <p v-else>Không có nhân viên nào.</p>
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
            <div v-if="activeEmployee">
                <h4>
                    Chi tiết Nhân Viên
                    <i class="fas fa-address-card"></i>
                </h4>
                <!-- hiện chi nhân viên  -->
                <EmployeeCard :employee="activeEmployee" />
                <router-link :to="{
                    name: 'employee.edit',
                    params: { id: activeEmployee._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh Nhân Viên</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import EmployeeCard from "@/components/EmployeeCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        EmployeeCard,
        InputSearch,
        EmployeeList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            employees: [],
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
        employeeStrings() {
            return this.employees.map((employee) => {
                const {  hotenuser,email, diachi, sdt } = employee;
                return [ hotenuser,email, diachi, sdt].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredEmployees() {
            if (!this.searchText) return this.employees;
            return this.employees.filter((_employee, index) =>
                this.employeeStrings[index].includes(this.searchText)
            );
        },
        activeEmployee() {
            if (this.activeIndex < 0) return null;
            return this.filteredEmployees[this.activeIndex];
        },
        filteredEmployeesCount() {
            return this.filteredEmployees.length;
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
                // console.log(this.employee);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeIndex = -1;
        },
        goToAdd() {
            this.$router.push({ name: "employee.add" });
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
