<template>
    <div v-if="employee">
        <!-- <h4 class="text-center">Hiệu chỉnh Nhân Viên</h4> -->
        <EmployeeForm :employee="employee" @submit:employee="updateEmployee" @delete:employee="deleteEmployee" />
        
        <p>{{ message }}</p>
    </div>
</template>
<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import EmployeeService from "@/services/employee.service";
import RegisterService from "@/services/register.service"
import LoginService from "@/services/login.service"
export default {
    components: {
        EmployeeForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            employee: null,
            message: "",
        };
    },
    methods: {
        async getEmployee(id) {
            try {
                this.employee = await RegisterService.getUserById(id)
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateEmployee(data) {
            console.log("Updating employee:", data);

            // Destructuring assignment to exclude _id
            const { _id, ...updateData } = data;

            try {
                // Use the extracted updateData without _id
                await LoginService.updateUser(_id, updateData);
                this.message = "Nhân viên được cập nhật thành công.";
                alert("Nhân Viên được cập nhật thành công!")
            } catch (error) {
                console.log("Error updating employee:", error);
            }
        },
        async deleteEmployee() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await EmployeeService.delete(this.employee._id);
                    this.$router.push({ name: "employee" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getEmployee(this.id);
        this.message = "";
    },
};
</script>