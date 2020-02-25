<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/images/logo.png" alt=""></h1>
   <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" background-color="transparent" text-color="#fff" router>
  <template v-for="(item, index) in routes">
  <el-submenu   v-if="!item.hidden" :key="item.id" :index="index + '' "><!-- number变成string-->
    <!--一级菜单-->
    <template slot="title">
      <!-- <i :class="item.meta.icon"></i> -->
      <svg-icon :iconClass="item.meta.icon" className="item.meta.icon"/>
      <span slot="title">{{item.meta.name}}</span>
    </template>
    <!--子级菜单-->
    <el-menu-item v-for ="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
  </el-submenu>
  </template>
</el-menu>
</div>
</template>
<script>
import { reactive, ref, refs, onMounted, computed} from "@vue/composition-api";
export default {
    name: 'navMenu',
    setup(props,{root}){
      /*data数据*/
      // const isCollapse= ref(false);//设置主页菜单展开收起状态 
      const routes =reactive(root.$router.options.routes)
      // console.log(routes) 
      //computed监听
      const isCollapse = computed(()=>{
        return root.$store.state.app.isCollapse
        })
      /*函数*/
      return {
        isCollapse,
        routes
      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
  #nav-wrap {
      position:fixed;
       top:0;
       left:0;
       width:$navMenu;
       height:100vh;
       @include webkit(transition, all .3s ease 0s); @include webkit(transition, all .3s ease 0s);
        background: #344a5f;
       .el-menu-vertical-demo{
         border-right: 0 ;
       }
        svg{
    font-size:20px;
    margin-right:10px;
  }
  }
  .logo{
    text-align:center;
    img{
      width:92px;
      margin:28px auto 25px;
      @include webkit(transition, all .3s ease 0s);
    }
  }
  .open{
   #nav-wrap{
     width:$navMenu;
   } 
  }
  .close{
 #nav-wrap{width:$navMenuMin;}
   .logo img{width:70%;} 
  }
</style>