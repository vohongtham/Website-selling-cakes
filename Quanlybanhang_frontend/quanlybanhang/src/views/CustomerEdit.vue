<template>
    <div v-if="customer">
        <h4 class="text-center">Hiệu chỉnh Khách Hàng</h4>
        <CustomerForm :customer="customer" @submit:customer="updateCustomer" @delete:customer="deleteCustomer" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import CustomerForm from "@/components/CustomerForm.vue";
import CustomerService from "@/services/customer.service";
export default {
    components: {
        CustomerForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            customer: null,
            message: "",
        };
    },
    methods: {
        async getCustomer(id) {
            try {
                this.customer = await CustomerService.get(id);
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
        async updateCustomer(data) {
            console.log("Updating customer:", data);

            // Destructuring assignment to exclude _id
            const { _id, ...updateData } = data;

            try {
                // Use the extracted updateData without _id
                await LoginService.updateUser(_id, updateData);
                this.message = "KH được cập nhật thành công.";
                alert("KH được cập nhật thành công!")
            } catch (error) {
                console.log("Error updating customer:", error);
            }
        },
        async deleteCustomer() {
            if (confirm("Bạn muốn xóa Khách Hàng này?")) {
                try {
                    await CustomerService.delete(this.customer._id);
                    this.$router.push({ name: "customer" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getCustomer(this.id);
        this.message = "";
    },
};
</script>