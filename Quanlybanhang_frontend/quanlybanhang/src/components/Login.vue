    <template>
        <section style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp'); height: 750px;">
            <div class="mask d-flex align-items-center gradient-custom-3">
                <div class="container">
                    <div class="row justify-content-center align-items-center">
                        <div id="login-column" class="col-md-6">
                            <div id="login-box" class="col-md-12">
                                <h3 class="text-uppercase text-center" style="font-size: 30px; margin-top: 100px;">Đăng nhập</h3>
                                <Form @submit="submitLogin" :validation-schema="loginFormSchema">
                                    <div class="form-group">
                                        <label for="email">Email:</label>
                                        <Field name="email" placeholder="Nhập vào Email" type="text" class="form-control"
                                            v-model="loginLocal.email" />
                                        <ErrorMessage name="email" class="error-feedback" />
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password:</label>
                                        <Field name="password" placeholder="Nhập vào password" type="password"
                                            class="form-control" v-model="loginLocal.password" />
                                        <ErrorMessage name="password" class="error-feedback" />
                                    </div>
                                    <button @submit="submitLogin" class="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Sign in</button>
                                        
                                    <p class="sign-up text-center text-muted mt-5 mb-5">
                                        Don't have an account? <a href="/register" class="fw-bold text-body"><u>Create an account</u></a>
                                    </p>
                                </Form>
                            </div>
                            <div>{{ errorMessage }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </template>
    <script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import LoginService from "@/services/login.service";
    import jwt_decode from 'jwt-decode';
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:login"],
        props: {
            login: {
                type: Object,
                default: () => ({ email: '', password: '' }) // Provide default values here
            }
        },
        data() {
            const loginFormSchema = yup.object().shape({

                email: yup
                    .string()
                    .required("Email không được bỏ trống.") // Make sure email is not empty
                    .matches(
                        // Regular expression for email validation
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        "Email không hợp lệ. Vui lòng kiểm tra lại."
                    ),
                password: yup
                    .string()
                    .required("Mật khẩu không được bỏ trống.") // Ensure that the password is not empty
                    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.") // Require a minimum of 8 characters
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!]).*$/,
                        "Mật khẩu phải chứa ít nhất một ký tự viết thường, một ký tự viết hoa, một số, và một ký tự đặc biệt."
                    )
            });
            return {
                loginLocal: {
                    email: this.login.email,
                    password: this.login.password,
                },
                loginFormSchema,
                errorMessage:"",
                userEmail:""
            
            };
        },  
        methods: {
            async submitLogin() {
                try {
    // Send a POST request to your server for authentication
    const response = await LoginService.signin(this.loginLocal);
    console.log(response);

    // Handle the authentication response (success or error)
    if (response.message === 'Login successful') {
        // Authentication successful, store the user token (if applicable)
        localStorage.setItem('userToken', response.token);
        const user = this.decodeJWT(response.token);
        localStorage.setItem('userEmail', user.user.email);
        localStorage.setItem('userId', user.user._id);
        localStorage.setItem('userChucVu', user.user.chucvu);

        // Update userEmail immediately after successful login
        this.userEmail = user.user.email;

        console.log(user.user);
        if (user.user.chucvu === "Khách hàng") {
            await this.$router.push('/');
        } else {
            await this.$router.push('/admin');
        }

        location.reload();
        // alert('Đăng nhập thành công!');
    } else {
        this.errorMessage = response.message;
        alert(this.errorMessage);
    }
} catch (error) {
    console.error('Error during login:', error);
    alert(error.response.data.message);
}

    }
    ,
            decodeJWT(token) {
                try {
                    const decoded = jwt_decode(token);
                    return decoded;
                } catch (error) {
                    //console.error('Error decoding JWT:', error);
                    return null;
                }
            },

        }
    };
    </script>
    <style scoped>
    @import "@/assets/form.css";
    </style>