    <template>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>STT</th>
                
                    <th>Tên nhân viên</th>
                    <th>Email</th>
                    
                    <th>Chức Vụ</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Xóa nhân viên</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in displayedEmployees" :key="employee._id"
                    :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
                    <td>{{ index + 1 }}</td>
                
                    <td>{{ employee.hotenuser }}</td>
                    <td>{{ employee.email }}</td>
                    
                    <td>{{ employee.chucvu }}</td>
                    <td>{{ employee.diachi }}</td>
                    <td>{{ employee.sdt }}</td>
                    <td><button type="button" class="btn btn-danger" @click="deleteEmployee(employee._id)">Delete</button>
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
    import EmployeeService from "@/services/employee.service";
    export default {
        data() {
            return {
                currentPage: 1,  // Trang hiện tại
                itemsPerPage: 5,  // Số mục trên mỗi trang
            };
        },

        computed: {
            totalPages() {
                return Math.ceil(this.employees.length / this.itemsPerPage);
            },
            pages() {
                const pages = [];
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
                return pages;
            },
            displayedEmployees() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.employees.slice(start, end);
            },
        },

        props: {
            employees: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
            refreshList: { type: Function },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },

            async deleteEmployee(employeeId) {
                if (confirm("Bạn muốn xóa Nhân Viên này?")) {
                    try {
                        await EmployeeService.delete(employeeId);
                        this.$router.push({ name: "employee" });
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