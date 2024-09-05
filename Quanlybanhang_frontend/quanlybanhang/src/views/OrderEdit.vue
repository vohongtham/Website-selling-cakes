<template>
    <div v-if="order" class="page">
        <h4>Hiệu chỉnh Đơn Hàng</h4>
        <OrderForm :order="order" @submit:order="updateOrder" @delete:order="deleteOrder" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import OrderForm from "@/components/OrderForm.vue";
import OrderService from "@/services/order.service";
export default {
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            order: null,
            message: "",
        };
    },
    methods: {
        async getOrder(id) {
            try {
                this.order = await OrderService.get(id);
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
        async updateOrder(data) {
            try {
                await OrderService.update(this.order._id, data);
                this.message = "Hàng hóa được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteOrder() {
            if (confirm("Bạn muốn xóa Hàng Hóa này?")) {
                try {
                    await OrderService.delete(this.order._id);
                    this.$router.push({ name: "order" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getOrder(this.id);
        this.message = "";
    },
};
</script>