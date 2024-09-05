<template>
    <div v-if="merchandise" >
        <h4 class="text-center">Hiệu chỉnh Hàng Hóa</h4>
        <MerchandiseForm :merchandise="merchandise" :isUpdate="1" @submit:merchandise="updateMerchandise" @delete:merchandise="deleteMerchandise" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import MerchandiseForm from "@/components/MerchandiseForm.vue";
import MerchandiseService from "@/services/merchandise.service";
export default {
    components: {
        MerchandiseForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            merchandise: null,
            message: "",
        };
    },
    methods: {
        async getMerchandise(id) {
            try {
                this.merchandise = await MerchandiseService.get(id);
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
        async updateMerchandise(data) {
            try {
                await MerchandiseService.update(this.merchandise._id, data);
                this.message = "Hàng hóa được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteMerchandise() {
            if (confirm("Bạn muốn xóa Hàng Hóa này?")) {
                try {
                    await MerchandiseService.delete(this.merchandise._id);
                    this.$router.push({ name: "merchandise" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getMerchandise(this.id);
        this.message = "";
    },
};
</script>