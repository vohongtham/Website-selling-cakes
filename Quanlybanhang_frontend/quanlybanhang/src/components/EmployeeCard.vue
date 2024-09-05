<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        
        <div class="p-1">
            <strong>Tên Nhân Viên::</strong>
            {{ employee.hotenuser }}
        </div>
        <div class="p-1">
            <strong>Email::</strong>
            {{ employee.email }}
        </div>
        <div class="p-1">
            <strong>Địa Chỉ:</strong>
            {{ employee.diachi }}
        </div>
        <div class="p-1">
            <strong>Số Điện Thoại:</strong>
            {{ employee.sdt }}
        </div>
    </div>
</template>