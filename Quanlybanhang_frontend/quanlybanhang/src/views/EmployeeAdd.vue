<template>
    
    <div >
        <!-- <h4>Thêm Nhân Viên</h4> -->
        <!-- <h4 class="text-center">Thêm Nhân Viên</h4> -->
        <EmployeeForm :employee="this.employee" @submit:employee="addEmployee"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import RegisterService from "@/services/register.service"
export default {
    components: {
        EmployeeForm,
    },
    props: {
        id: { type: String, required: false },
    },
    data() {
        return {
            employee: 
            {
            hotenuser:"",
            email:"",
            password:"",
            chucvu:"Nhân Viên",
            diachi:"",
            sdt:"",
            },
            message: "",
        };
    },
    methods: {
        async addEmployee(data) {
            try {
            await RegisterService.register(data);
            this.message = "Nhân viên được thêm thành công.";
            this.employeeLocal = {
                    hotenuser: "",
                    email: "",
                    password: "", 
                    chucvu: "Nhân Viên", 
                    diachi: "",
                    sdt: ""
                };
            alert(this.message);
            } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            }
        }
    },
};
</script>