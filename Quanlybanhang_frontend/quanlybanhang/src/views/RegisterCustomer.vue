<template>
    <section style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp'); height: 750px;">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mt-3" style="font-size: 30px;">Đăng ký tài khoản</h3>
                        <Form @submit="submitRegister" :validation-schema="registerFormSchema">
                            <div class="form-outline mb-6">
                                <label class="hotenuser">Your Name</label>
                                <Field name="hotenuser" placeholder="Nhập vào Your Name" type="text" class="form-control"
                                    v-model="registerLocal.hotenuser" />
                                <ErrorMessage name="hotenuser" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-6">
                                <label class="email">Your Email</label>
                                <Field name="email" placeholder="Nhập vào Email" type="text" class="form-control"
                                    v-model="registerLocal.email" />
                                <ErrorMessage name="email" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-6">
                                <label for="diachi">Địa Chỉ</label>
                                <Field name="diachi" placeholder="Nhập địa chỉ" type="text" class="form-control"
                                    v-model="registerLocal.diachi" />
                                <ErrorMessage name="diachi" class="error-feedback" />

                            </div>
                            <div class="form-outline mb-6">
                                <label for="sdt">Số Điện Thoại</label>
                                <Field name="sdt" placeholder="Nhập số điện thoại" type="phone" class="form-control"
                                    v-model="registerLocal.sdt" />
                                <ErrorMessage name="sdt" class="error-feedback" />

                            </div>
                            <div class="form-outline mb-6">
                                <label class="password">Password</label>
                                <!-- <input type="password" id="form3Example4cg" class="form-control form-control-lg" /> -->
                                <Field name="password" placeholder="Nhập vào password" type="password" class="form-control"
                                    v-model="registerLocal.password" />
                                <ErrorMessage name="password" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-4">
                                <label class="repeatpassword" for="form3Example4cdg">Repeat your password</label>
                                <Field name="repeatpassword" placeholder="Repeat your password" type="password"
                                    class="form-control" v-model="registerLocal.repeatpassword" />
                                <ErrorMessage name="repeatpassword" class="error-feedback" />

                            </div>

                            <!-- <div class="form-check d-flex justify-content-center mb-5">
                                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                <label class="form-check-label" for="form2Example3g">
                                    I agree all statements in <a href="#!" class="text-body"><u>Terms of
                                            service</u></a>
                                </label>
                            </div> -->
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Register</button>
                            </div>
                            <p class="text-center text-muted mt-5 mb-5">Have already an account? <a href="/login"
                                    class="fw-bold text-body"><u>Login here</u></a></p>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import RegisterService from "@/services/register.service"
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:register"],
    props: {
        register: {
            type: Object,
            default: () => ({ hotenuser: '', email: '', chucvu: 'Khách hàng', diachi: '', sdt: '', password: '' }) // Provide default values here
        }
    },
    data() {
        const registerFormSchema = yup.object().shape({

            hotenuser: yup
                .string()
                .required("Nhập tên.")
                .max(50, "Tên tối đa 100 ký tự."),

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
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.") // Ensure that the password is not empty
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự.") // Require a minimum of 8 characters
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/,
                    "Mật khẩu phải chứa ít nhất một ký tự viết thường, một ký tự viết hoa, một số, và một ký tự đặc biệt."
                ),
            repeatpassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp.') // Ensure it matches the password
                .required("Nhập lại mật khẩu không được bỏ trống."), // Ensure that the repeat password is not empty
        });
        return {
            registerLocal: {
                hotenuser: this.register.hotenuser,
                email: this.register.email,
                chucvu: this.register.chucvu,
                diachi: this.register.diachi,
                sdt: this.register.sdt,
                password: this.register.password,
            },
            registerFormSchema,
        };
    },
    methods: {
        async submitRegister() {
            try {
                // Send a POST request to your server for authentication
                const response = await RegisterService.register(this.registerLocal);
                console.log(response);
                // Handle the authentication response (success or error)
                if (response.message === 'Registration successful') {
                    // Optionally, you can redirect the user to another page
                    this.$router.push('/login');
                } else {
                    // Authentication failed, display an error message
                    // You can set a data property to display an error message in the form
                    this.errorMessage = response.message;
                    alert(this.errorMessage);
                }
            } catch (error) {
                console.error('Error during register:', error);
                alert(error.response.data.message);
            }
        },
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>