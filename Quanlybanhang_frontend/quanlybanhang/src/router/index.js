import { createWebHistory, createRouter } from "vue-router";
import Merchandise from "@/views/Merchandise.vue";
import Order from "@/views/Order.vue";
import Customer from "@/views/Customer.vue";
import Employee from "@/views/Employee.vue";
import HomePage from "@/views/HomePage.vue";
import Login from "@/components/Login.vue";
import Register from "@/views/RegisterCustomer.vue";
import Admin from "@/views/AdminPage.vue";
import GioiThieu from "@/views/GioiThieu.vue";
import ChiTietSanPham from "@/views/MerchandiseDetails.vue";
import DonMua from "@/views/DonMua.vue";
import DonMuaAdmin from "@/views/DonMuaAdmin.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/donmua",
        name: "donmua",
        component: DonMuaAdmin,
    },

    {
        path: "/register",
        name: "register",
        component: Register,
    },

    {
        path: "/admin",
        name: "admin",
        component: Admin,
    },
    {
        path: "/merchandisedetails/:id",
        name: "merchandisedetails",
        component: ChiTietSanPham,
    },

    {
        path: "/gioithieu",
        name: "gioithieu",
        component: GioiThieu,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/CartDetails.vue'),
      },
      {
        path: "/order-history",
        name: "order-history",
        component: DonMua,
      },

    {
        path: "/merchandise",
        name: "merchandise",
        component: Merchandise,
    },

    {
        path: "/merchandises/:id",
        name: "merchandise.edit",
        component: () => import("@/views/MerchandiseEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    // {
    //     path: "/merchandises/abc",
    //     name: "chitietsanpham",
    //     component: () => import("@/views/ChiTietSanPham.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },

    {
        path: "/merchandises/add",
        name: "merchandise.add",
        component: () => import("@/views/MerchandiseAdd.vue"),
        props: false // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/order",
        name: "order",
        component: Order,
    },

    {
        path: "/order/add",
        name: "order.add",
        component: () => import("@/views/OrderAdd.vue"),
        props: false 
    },

    {
        path: "/order/:id",
        name: "order.edit",
        component: () => import("@/views/OrderEdit.vue"),
        props: false 
    },

    {
        path: "/customer",
        name: "customer",
        component: Customer,
    },

    {
        path: "/customer/add",
        name: "customer.add",
        component: () => import("@/views/CustomerAdd.vue"),
        props: false 
    },

    {
        path: "/customer/:id",
        name: "customer.edit",
        component: () => import("@/views/CustomerEdit.vue"),
        props: true 
    },

    {
        path: "/employee",
        name: "employee",
        component: Employee,
    },

    {
        path: "/employee/add",
        name: "employee.add",
        component: () => import("@/views/EmployeeAdd.vue"),
        props: false 
    },

    {
        path: "/employee/:id",
        name: "employee.edit",
        component: () => import("@/views/EmployeeEdit.vue"),
        props: true 
    },



];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
// router.beforeEach((to, from, next) => {
//     const userRole = localStorage.getItem("userChucVu");

//     // Define a list of routes that are only accessible to "Nhân viên"
//     const allowedRoles = ["Nhân Viên"];
//     const allowedRoutes = ["admin", "employee"];

//     if (userRole && allowedRoles.includes(userRole)) {
//         // If the user has an allowed role, check if they are accessing an allowed route
//         if (allowedRoutes.includes(to.name)) {
//             next();
//         } else {
//             // Redirect to homepage or another route
//             next({ name: "homepage"});
//         }
//     } else {
//         // Allow access to the homepage, login page, and register page for all users
//         if (to.name === "homepage" || to.name === "login" || to.name === "register" || to.name === "gioithieu" 
//         || to.name ==="chitietsanpham" || to.name ==="merchandisedetails" || to.name ==="cart" || to.name ==="order-history") {
//             next();
//         } else {
//             // Handle routes for other roles or unauthorized users
//             // For example, redirect to the login page
//             next({ name: "login" });
//         }
//     }
// });
// router.beforeEach((to, from, next) => {
//     const userRole = localStorage.getItem("userChucVu");
//     const allowedRoles = ["Nhân Viên"];
//     const allowedRoutes = ["admin", "employee", "order-history", "homepage", "cart", "merchandisedetails","chitietsanpham", "customer", "merchandise",
//     "merchandise.add", "merchandise.edit" , "customer.edit", "customer.add", "donmua"];

//     if (userRole && allowedRoles.includes(userRole)) {
//         if (allowedRoutes.includes(to.name)) {
//             next();
//         } else {
//             next({ name: "homepage" });
//         }
//     } else {
        
//         if (["homepage", "login", "register", "gioithieu", "chitietsanpham", "merchandisedetails", "cart", "order-history"].includes(to.name)) {
//             next();
//         } else {
//             next({ name: "login" });
//         }
//     }
// });
router.beforeEach((to, from, next) => {
    const userRole = localStorage.getItem("userChucVu");

    const allowedRoutesAdmin = [
        "admin", 
        "employee", "employee.add", "employee.edit", 
        "order-history", 
        "homepage", 
        "cart", 
        "merchandisedetails", "chitietsanpham", 
        "customer", "merchandise", 
        "merchandise.add", "merchandise.edit", 
        "customer.edit", "customer.add", 
        "donmua",
        "gioithieu"
    ];

    const allowedRoutesEmployee = [
        "admin",
        "order-history", 
        "homepage", 
        "cart", 
        "merchandisedetails", "chitietsanpham", 
        "customer", "merchandise", 
        "merchandise.add", "merchandise.edit", 
        "customer.edit", "customer.add", 
        "donmua"
    ];

    const allowedRoutesGuest = [
        "homepage", 
        "login", 
        "register", 
        "gioithieu", 
        "chitietsanpham", 
        "merchandisedetails", 
        "cart", 
        "order-history"
    ];

    if ((userRole === "Khách hàng" || !userRole)  && allowedRoutesGuest.includes(to.name)) {
        next();
    } if (userRole === "Admin" && allowedRoutesAdmin.includes(to.name)) {
        next();
    } else if (userRole === "Nhân Viên" && allowedRoutesEmployee.includes(to.name)) {
        next();
    } else {
        next({ name: "login" });
    }
});



export default router;

