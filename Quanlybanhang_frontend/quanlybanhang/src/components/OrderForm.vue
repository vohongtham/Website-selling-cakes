<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
                <div class="col-md-12">
                    <Form @submit="submitOrder" :validation-schema="orderFormSchema">
                        <div class="form-group">
                            <label for="sodondh">Số Đơn Đặt Hàng</label>
                            <Field name="sodondh" type="text" class="form-control" v-model="orderLocal.sodondh" />
                            <ErrorMessage name="sodondh" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="mshh">Hàng Hóa</label>
                            <Field as="select" name="mshh" class="form-control" v-model="orderLocal.mshh">
                                <option value="">Chọn hàng hóa</option>
                                <option v-for="merchandise in merchandises" :value="merchandise.mshh"
                                    :key="merchandise.mshh">
                                    {{ merchandise.mshh }} - {{ merchandise.tenhh }} - {{ merchandise.soluonghang }}
                                </option>
                            </Field>
                            <ErrorMessage name="mshh" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="mskh">Mã Số Khách Hàng</label>
                            <Field as="select" name="mskh" class="form-control" v-model="orderLocal.mskh">
                                <option value="">Chọn mã số khách hàng</option>
                                <option v-for="customer in customers" :value="customer.mskh" :key="customer.mskh">
                                    {{ customer.mskh }} - {{ customer.hotenkh }}
                                </option>
                            </Field>
                            <ErrorMessage name="mskh" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="msnv">Mã Số Nhân Viên</label>
                            <Field as="select" name="msnv" class="form-control" v-model="orderLocal.msnv">
                                <option value="">Chọn mã số nhân viên</option>
                                <option v-for="employee in employees" :value="employee.msnv" :key="employee.msnv">
                                    {{ employee.msnv }} - {{ employee.hotennv }}
                                </option>
                            </Field>
                            <ErrorMessage name="msnv" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="soluong">Số Lượng</label>
                            <Field name="soluong" type="number" class="form-control" v-model="orderLocal.soluong" />
                            <ErrorMessage name="soluong" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="giadathang">Giá Đặt Hàng</label>
                            <Field name="giadathang" class="form-control" v-model="orderLocal.giadathang" />
                            <ErrorMessage name="giadathang" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="giamgia">Giảm Giá</label>
                            <Field name="giamgia" class="form-control" v-model="orderLocal.giamgia" />
                            <ErrorMessage name="giamgia" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="ngaydh">Ngày Đặt Hàng</label>
                            <Field name="ngaydh" type="date" class="form-control" v-model="orderLocal.ngaydh" readonly />
                            <ErrorMessage name="ngaydh" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label for="ngaygh">Ngày Giao Hàng</label>
                            <Field name="ngaygh" type="date" class="form-control" v-model="orderLocal.ngaygh" />
                            <ErrorMessage name="ngaygh" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="trangthaidh">Trạng Thái Đặt Hàng</label>
                            <Field as="select" name="trangthaidh" class="form-control" v-model="orderLocal.trangthaidh">
                                <option value="Đặt hàng">Đặt hàng</option>
                                <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                                <option value="Đang giao">Đang giao</option>
                                <option value="Đã giao">Đã giao</option>
                                <option value="Đã hủy đơn hàng">Đã hủy đơn hàng</option>
                            </Field>
                            <ErrorMessage name="trangthaidh" class="error-feedback" />
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
import MerchandiseService from "@/services/merchandise.service";
import CustomerService from "@/services/customer.service";
import EmployeeService from "@/services/employee.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:order", "delete:order"],
    props: {
        order: { type: Object, required: true },
        merchandises: { type: Array, default: [] }
    },
    data() {
        const orderFormSchema = yup.object().shape({
            sodondh: yup
                .string()
                .required("Số đơn đặt hàng phải có giá trị.")
                .min(2, "Số đơn đặt hàng phải ít nhất 2 ký tự.")
                .max(50, "Số đơn đặt hàng có nhiều nhất 50 ký tự."),
            mshh: yup
                .string()
                .required("Mã hàng hóa phải có giá trị.")
                .min(2, "Mã hàng hóa phải ít nhất 2 ký tự.")
                .max(50, "Mã hàng hóa có nhiều nhất 50 ký tự."),
            mskh: yup
                .string()
                .required("Mã khách hàng phải có giá trị.")
                .min(2, "Mã khách hàng phải ít nhất 2 ký tự.")
                .max(50, "Mã khách hàng có nhiều nhất 50 ký tự."),
            msnv: yup
                .string()
                .required("Mã nhân viên phải có giá trị.")
                .min(2, "Mã nhân viên phải ít nhất 2 ký tự.")
                .max(50, "Mã nhân viên có nhiều nhất 50 ký tự."),
            soluong: yup
                .number()
                .required("Nhập số lượng hàng hóa.")
                .min(1, "Số lượng nhỏ nhất là 1.")
                .max(100, "Số lượng hàng tối đa 100.")
                .test("soluonghang", "Số lượng không được vượt quá số lượng hàng hóa", function (value) {
                    // 'this.parent' refers to the entire form values including orderLocal and merchandise
                    return value <= this.parent.merchandise.soluonghang;
                }),
            ngaygh: yup
                .date()
                .when('ngaydh', (ngaydh, schema) => {
                    return ngaydh
                        ? schema.min(ngaydh, 'Ngày giao hàng phải lớn hơn ngày đặt hàng.')
                        : schema;
                })
                .required("Ngày giao hàng không được để trống.")
        });
        return {
            orderLocal: {
                sodondh: "",
                mshh: "",
                mskh: "",
                msnv: "",
                soluong: "",
                giadathang: "",
                giamgia: "",
                ngaydh: new Date().toISOString().substr(0, 10),
                ngaygh: "",
                trangthaidh: "",

            },
            orderFormSchema,
            merchandises: [],
            customers: [],
            employee: []
        };
    },
    methods: {
        submitOrder() {
            this.$emit("submit:order", this.orderLocal);
        },
        deleteOrder() {
            this.$emit("delete:order", this.orderLocal.id);
        },
        async retrieveMerchandises() {
            try {
                this.merchandises = await MerchandiseService.getAll(); // Sử dụng MerchandiseService để tải danh sách merchandise
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveCustomers() {
            try {
                this.customers = await CustomerService.getAll();
                console.log(this.customer);
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
                console.log(this.employee);
            } catch (error) {
                console.log(error);
            }
        },

        handleMshhChange() {
            // This method will be called when the <select> value changes
            console.log("Selected Mã Số Hàng Hóa:", this.orderLocal.mshh);
        },
    },
    mounted() {
        this.retrieveMerchandises();
        this.retrieveCustomers();
        this.retrieveEmployees();
    }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>