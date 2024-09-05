<script >
//import AppHeader from "@/components/AppHeader.vue";
// import Login from "@/components/Login.vue";
//import Merchandise from "@/views/Merchandise.vue";
import HeaderPage from '@/views/Header.vue';
import HomePage from '@/views/HomePage.vue';

export default {
  components: {
    HeaderPage
    //AppHeader,
    //  Login,
    // Merchandise,
    ,
    HomePage
},
};
</script>

<template>
 <div >
   
      <header>
        <HeaderPage/>
      </header>
      <div>
      <router-view/>
      </div>
      <footer>

      </footer>
    </div>
  
</template>

<style >
.page {
  max-width: 100px;
  margin: auto;
}
</style>
