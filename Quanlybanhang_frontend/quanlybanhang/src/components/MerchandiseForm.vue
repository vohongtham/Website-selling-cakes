<template>
    <div>
        <!-- <h3 class="text-center text-white pt-5">Hàng Hóa</h3> -->
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div>
                    <div class="col-md-12">
                        <Form @submit="submitMerchandise" :validation-schema="merchandiseFormSchema">
                            <!-- <h3 class="text-center">Hàng hóa</h3> -->
                            <div class="form-group">
        <label for="mshh">Mã Hàng Hóa</label>
        <Field
            name="mshh"
            type="text"
            class="form-control"
            v-model="merchandiseLocal.mshh"
            :disabled="isUpdate === 1"
        />
        <ErrorMessage name="mshh" class="error-feedback" />
    </div>
                            <div class="form-group">
                                <label for="tenhh">Tên Hàng Hóa</label>
                                <Field name="tenhh" type="text" class="form-control" v-model="merchandiseLocal.tenhh" />
                                <ErrorMessage name="tenhh" class="error-feedback" />
                            </div>
                            <!-- <div class="form-group">
                                <label for="motahh">Mô Tả Hàng Hóa</label>
                                <Field name="motahh" type="text" class="form-control" v-model="merchandiseLocal.motahh" />
                                <ErrorMessage name="motahh" class="error-feedback" />
                            </div> -->
                            <div class="form-group">
                                <label for="gia">Giá</label>
                                <Field name="gia" class="form-control" v-model="merchandiseLocal.gia" />
                                <ErrorMessage name="gia" class="error-feedback" />
                            </div>
                            <!-- <div class="form-group">
                                <label for="soluonghang">Số Lượng Hàng</label>
                                <Field name="soluonghang" class="form-control" v-model="merchandiseLocal.soluonghang" />
                                <ErrorMessage name="soluonghang" class="error-feedback" />
                            </div> -->
                            <!-- <div class="form-group">
                                <label for="ghichu">Ghi Chú</label>
                                <Field name="ghichu" type="text" class="form-control" v-model="merchandiseLocal.ghichu" />
                                <ErrorMessage name="ghichu" class="error-feedback" />
                            </div> -->
                            <div class="form-group">
                                <label for="hinhhanghoa">Thêm hình ảnh</label><br>
                                <input name="hinhhanghoa" type="file" data-show-upload="false" data-show-caption="true"
                                    @change="handleFileChange" />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">submit</button>
                        </Form>
                    </div>
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
    emits: ["submit:merchandise", "delete:merchandise"],
    props: {
        merchandise: { type: Object, required: true },
        isUpdate: { type: Number, required: true },
    },
    data() {
        const merchandiseFormSchema = yup.object().shape({
            mshh: yup
                .string()
                .required("Mã hàng hóa phải có giá trị.")
                .min(2, "Mã hàng hóa phải ít nhất 2 ký tự.")
                .max(50, "Mã hàng hóa có nhiều nhất 50 ký tự."),
            tenhh: yup
                .string()
                .required("Nhập tên hàng hóa.")
                .max(50, "Tên hàng hóa tối đa 50 ký tự."),
            gia: yup
                .number()
                .min(1000, "Giá hàng hóa ít nhất 1000.")
                .max(1000000, "Giá hàng hóa tối đa 1000000."),
            // soluonghang: yup
            //     .number()
            //     .required("Nhập số lượng.")
            //     .min(1, "Số lượng hàng hóa ít nhất là 1.")
        });
        return {
            merchandiseLocal: this.merchandise,
            merchandiseFormSchema,
        };
    },
    methods: {
        submitMerchandise() {
            this.$emit("submit:merchandise", this.merchandiseLocal);
            console.log(this.merchandiseLocal);
            console.log(this.merchandise);
            // console.log(merchandise);
        },
        deleteMerchandise() {
            this.$emit("delete:merchandise", this.merchandiseLocal.id);
        },
        handleFileChange(event) {
            const selectedFile = event.target.files[0]; // Lấy tệp đã chọn

            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Khi đọc hoàn thành, lưu giá trị Base64 vào biến merchandiseLocal.hinhhanghoa
                    this.merchandiseLocal.hinhhanghoa = e.target.result;
                };
                reader.readAsDataURL(selectedFile);
            }
        }
    }

};
</script>
<style scoped>
@import "@/assets/form.css";
</style>