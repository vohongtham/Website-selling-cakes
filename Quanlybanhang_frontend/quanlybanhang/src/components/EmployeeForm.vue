<template>
    <div>
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="mt-3 col-md-6">
                    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
                        <h4 class="text-center">{{ isEditing ? 'Hiệu chỉnh Nhân Viên' : 'Thêm Nhân Viên' }}</h4>
                        
                        <div  class="form-group">
                            <label for="hotenuser">Tên Nhân Viên</label>
                            <Field name="hotenuser" type="text" class="form-control" v-model="employeeLocal.hotenuser" />
                            <ErrorMessage name="hotenuser" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <Field name="email"
                                :readonly="isEditing" 
                                placeholder="Nhập vào Email" type="text" class="form-control"
                                v-model="employeeLocal.email" />
                            <ErrorMessage name="email" class="error-feedback" />
                        </div>
                        <div v-if="!isEditing" class="form-group">
                            <label for="password">Password</label>
                            <Field v-if="!isEditing" name="password" type="password" class="form-control" v-model="employeeLocal.password" />
                    <ErrorMessage v-if="!isEditing" name="password" class="error-feedback" />
                        </div>
                       
                        <div class="form-group">
                            <label for="diachi">Địa Chỉ</label>
                            <Field name="diachi" class="form-control" v-model="employeeLocal.diachi" />
                            <ErrorMessage name="diachi" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="sdt">Số Điện Thoại</label>
                            <Field name="sdt" class="form-control" v-model="employeeLocal.sdt" />
                            <ErrorMessage name="sdt" class="error-feedback" />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">submit</button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:employee", "delete:employee"],
    props: {
        employee: { type: Object, required: true }
    },
    data() {
        const isEditing = Boolean(this.employee._id);
        const employeeFormSchema = yup.object().shape({
           
            hotenuser: yup
                .string()
                .required("Nhập tên nhân viên.")
                .max(50, "Tên nhân viên tối đa 100 ký tự."),
            email: yup
                .string()
                .required("Email không được bỏ trống.") // Make sure email is not empty
                .matches(
                    // Regular expression for email validation
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Email không hợp lệ. Vui lòng kiểm tra lại."
                ),
          
            diachi: yup
                .string()
                .required("Nhập địa chỉ.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            sdt: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),

        });
        const passwordSchema = yup.string().when("isEditing", {
            is: 1,
            then: yup.string(), // No validation if isEditing is true
            otherwise: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/,
                    "Mật khẩu phải chứa ít nhất một ký tự viết thường, một ký tự viết hoa, một số, và một ký tự đặc biệt."
                ),
        });

        return {
            isEditing,
            employeeLocal: this.employee,
            employeeFormSchema,
            passwordDisabled: isEditing,
            passwordSchema
        };
    },
    methods: {
        submitEmployee() {
            this.$emit("submit:employee", this.employeeLocal);
        },
        
        deleteEmployee() {
            this.$emit("delete:employee", this.employeeLocal.id);
        },
    }

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>