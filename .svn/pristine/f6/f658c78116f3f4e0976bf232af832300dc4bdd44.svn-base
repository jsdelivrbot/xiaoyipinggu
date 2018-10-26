<template>
  <div>
    <div class="nav-header">
      <ul class="nav nav-tabs">
          <li v-for="(item,index) in navList"
          @click="cutNav(index)" v-bind:class='{active:index==active}'>
            <router-link :to="item.path">{{item.name}}</router-link>
          </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<style>
.nav-header{
    background: #F5F5F5;
    padding: 2px 2%;
    border-bottom: 1px solid #BBBBBB;
}
ul.nav-tabs {
  border: none;
}
ul.nav-tabs li a {
  text-decoration: none;
}
ul.nav-tabs li a:hover {
   background: #ddd;
}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus{
  width: 100%;
  border: none;
  border-radius: 5px;
}
</style>
<script>
export default {
  data(){
    return {
      navList: [
        {name: '题库管理',path: '/questionManage'},
        {name: '问卷管理',path: '/questionnaireManage'},
        {name: '模型管理',path: '/modelManage'},
        {name: '类型管理',path: '/questionTypeManage'},
        {name: '用户管理',path: '/userManage'},
        {name: '答题排行榜',path: '/answerManage'},
        {name: '日志管理',path: '/logManage'}
      ],
      active: 0
    }
  },
  mounted(){
    if(this.$route.query.index == 1){
       this.active = 1
    }
  },
  methods: {
    cutNav(index){
       this.active = index
    }
  }
}
</script>


