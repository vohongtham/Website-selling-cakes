<script>
export default {
    props: {
        customer: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã Khách Hàng:</strong>
            {{ customer.mskh }}
        </div>
        <div class="p-1">
            <strong>Tên Hàng Hóa:</strong>
            {{ customer.hotenkh }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ customer.email }}
        </div>
      
        <div class="p-1">
            <strong>Địa Chỉ:</strong>
            {{ customer.diachi }}
        </div>
        <div class="p-1">
            <strong>Số Điện Thoại:</strong>
            {{ customer.sdt }}
        </div>
    </div>
</template>