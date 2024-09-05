<template>
    <div>
        <!-- <h3 class="text-center text-white pt-5">Hàng Hóa</h3> -->
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                    <Form @submit="submitCustomer" :validation-schema="customerFormSchema">
                       
                        <div class="form-group">
                            <label for="hotenuser">Tên Khách Hàng</label>
                            <Field name="hotenuser" type="text" class="form-control" v-model="customerLocal.hotenuser" />
                            <ErrorMessage name="hotenuser" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <Field name="email" placeholder="Nhập vào Email" type="text" class="form-control"
                                v-model="customerLocal.email" />
                            <ErrorMessage name="email" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <Field disabled name="password" type="password" class="form-control" v-model="customerLocal.password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="diachi">Địa Chỉ</label>
                            <Field name="diachi" type="text" class="form-control" v-model="customerLocal.diachi" />
                            <ErrorMessage name="diachi" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="sdt">Số Điện Thoại</label>
                            <Field name="sdt" class="form-control" v-model="customerLocal.sdt" />
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
    emits: ["submit:customer", "delete:customer"],
    props: {
        customer: { type: Object, required: true }
    },
    data() {
        const customerFormSchema = yup.object().shape({
          
            hotenuser: yup
                .string()
                .required("Nhập tên khách hàng.")
                .max(50, "Tên hàng hóa tối đa 100 ký tự."),
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
        return {
            customerLocal: this.customer,
            customerFormSchema,
        };
    },
    methods: {
        submitCustomer() {
            this.$emit("submit:customer", this.customerLocal);
            // console.log(this.customerLocal);
            // console.log(this.customer);
            // // console.log(merchandise);
        },
        deleteCustomer() {
            this.$emit("delete:customer", this.customerLocal.id);
        },
        // handleFileChange(event) {
        //     const selectedFile = event.target.files[0]; // Lấy tệp đã chọn

        //     if (selectedFile) {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             // Khi đọc hoàn thành, lưu giá trị Base64 vào biến merchandiseLocal.hinhhanghoa
        //             this.merchandiseLocal.hinhhanghoa = e.target.result;
        //         };
        //         reader.readAsDataURL(selectedFile);
        //     }
        // }
    }

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>