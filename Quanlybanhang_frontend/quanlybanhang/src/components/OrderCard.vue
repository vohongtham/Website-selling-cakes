<script>
export default {
    props: {
        order: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Số Đơn Đặt Hàng:</strong>
            {{ order.sodondh }}
        </div>
        <div class="p-1">
            <strong>Mã Số Hàng Hóa:</strong>
            {{ order.mshh }}
        </div>
        <div class="p-1">
            <strong>Mã số khách hàng:</strong>
            {{ order.mskh }}
        </div>
        <div class="p-1">
            <strong>Mã số nhân viên:</strong>
            {{ order.sodondh }}
        </div>
        <div class="p-1">
            <strong>Số Lượng:</strong>
            {{ order.soluong }}
        </div>
        <div class="p-1">
            <strong>Giảm Giá:</strong>
            {{order.giamgia}}
        </div>
        <div class="p-1">
            <strong>Ngày Đặt Hàng:</strong>
            {{order.ngaydh}}
        </div>
        <div class="p-1">
            <strong>Ngày Giao Hàng:</strong>
            {{order.ngaygh}}
        </div>
    </div>
</template>