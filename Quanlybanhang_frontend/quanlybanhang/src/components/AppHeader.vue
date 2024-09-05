<template>
    <nav class="navbar navbar-expand navbar-dark bg-success">
        <a href="/" class="navbar-brand">Ứng dụng Quản Lý Đặt Hàng</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'merchandise' }" class="nav-link">
                    Danh Sách Hàng Hóa
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link">
                    Đặt Hàng 
                    <i class="fas fa-shopping-cart"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'customer' }" class="nav-link">
                    Danh Sách Khách Hàng
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'employee' }" class="nav-link">
                    Danh Sách Nhân Viên
                    <i class="fas fa-bars"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template> 