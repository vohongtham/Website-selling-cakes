<template>
   
    <div class="">
        <h3 class="text-center">Thêm Hàng Hóa</h3>
        <MerchandiseForm :merchandise="this.merchandise" @submit:merchandise="addMerchandise"/>
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
        id: { type: String, required: false },
    },
    data() {
        return {
            merchandise: 
            {
            mshh:"",
            tenhh:"",
            // motahh:"",
            hinhhanghoa:"",
            gia:"",
            //soluonghang:""
            // ghichu:""
            },
            message: "",
        };
    },
    methods: {
        async addMerchandise(data) {
            try {
            await MerchandiseService.create(data);
            this.message = "Hàng hóa được thêm thành công.";
            alert(this.message);
            } catch (error) {
              
            console.log(error);
                alert(error.response.data.message);
            }
        }
    },
};
</script>