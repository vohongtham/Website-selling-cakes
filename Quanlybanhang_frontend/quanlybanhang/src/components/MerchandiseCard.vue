<script>
export default {
    props: {
        merchandise: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã Hàng Hóa:</strong>
            {{ merchandise.mshh }}
        </div>
        <div class="p-1">
            <strong>Tên Hàng Hóa:</strong>
            {{ merchandise.tenhh }}
        </div>
        <!-- <div class="p-1">
            <strong>Mô Tả Hàng Hóa:</strong>
            {{ merchandise.motahh }}
        </div> -->
        <div class="p-1">
            <strong>Giá:</strong>
            {{ merchandise.gia }}
        </div>
        <!-- <div class="p-1">
            <strong>Số Lượng Hàng:</strong>
            {{ merchandise.soluonghang }}
        </div> -->
        <!-- <div class="p-1">
            <strong>Ghi Chú:</strong>
            {{merchandise.ghichu }}
        </div> -->

    </div>
</template>