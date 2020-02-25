<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'oopen']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import { computed} from "@vue/composition-api";
import LayoutHeader from './components/Header'
import LayoutMain from './components/Main'
import LayoutNav from './components/Nav'
export default {
      name: 'layout',
      components: { LayoutHeader,LayoutMain,LayoutNav},
      setup(props,{root}){
          const menuStatus= computed(()=>{
            return root.$store.state.app.isCollapse
          })
          return {
            menuStatus 
          }
      }
}
</script>

<style lang="scss" scoped>
    #layout{
      background: #f7f7f7;
    }
</style>