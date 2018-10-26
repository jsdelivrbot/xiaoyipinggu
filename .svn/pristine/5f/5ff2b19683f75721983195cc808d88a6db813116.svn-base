<template>
  <div style="height: calc(100% - 60px);">
    <div class="nav-header">
      <ul class="nav nav-tabs">
          <li v-for="(item,index) in navList"
          @click="cutNav(index)" v-bind:class='{active:index==active}'>
            <router-link :to="item.path">{{item.name}}</router-link>
            <span class="redRound" :class="{hide: reviewinfoNum==0||reviewinfoNum==null}" v-if="item.name=='审核信息'">{{reviewinfoNum}}</span>
            <span class="redRound" :class="{hide: reminderNum==0||reminderNum==null}"  v-if="item.name=='提醒信息'">{{reminderNum}}</span>
          </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scrope>
.nav-header{
    background: #F5F5F5;
    padding: 2px 2%;
    border-bottom: 1px solid #BBBBBB;
}
ul.nav-tabs {
  border: none;
}
ul.nav-tabs li{
  position:relative;
}
ul.nav-tabs li span{
    position: absolute;
    display: inline-block;
    top: 3px;
    right: 8px;
    background: red;
    color: #fff;
    text-align: center;
    min-width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 12px;
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
      navList: [],
      active: 0,
      userType:this.$route.query.userType,
      userRole:this.$route.query.userRole
    }
  },
  mounted(){
      this.getData();
      // bus.$on('auditCount',(val)=>{ 
      //     console.log(val) 
      //     $(".nav-tabs li:first-child span.redRound").text(val);
      // })
      // bus.$on('remindCount',(val)=>{ 
      //     console.log(val) 
      //     $(".nav-tabs li:last-child span.redRound").text(val);
      // })
      this.stateCommit()
      setInterval(this.stateCommit,180000)
  },
  computed: {
    reviewinfoNum(){
      return this.$store.state.reviewinfoNum
    },
    reminderNum(){
      return this.$store.state.reminderNum
    }
  },
  methods: {
    cutNav(index){
       this.active = index
    },
    getData(){
        if(this.$route.query.userType == '值班员'){
            if(this.userRole == ''){
              this.$router.push({path:'/remind',query:{userType:this.userType,userRole:this.userRole}})
              this.$set(this.navList,0,{name: '提醒信息',path:'/remind?userType='+this.userType+'&userRole='+this.userRole})
            }else {
              this.$set(this.navList,0,{name: '审核信息',path: '/review?userType='+this.userType+'&userRole='+this.userRole})
              this.$set(this.navList,1,{name: '提醒信息',path:'/remind?userType='+this.userType+'&userRole='+this.userRole})
            }
        }else{
            this.$set(this.navList,0,{name: '审核信息',path: '/review?userType='+this.userType+'&userRole='+this.userRole})
            this.$set(this.navList,1,{name: '提醒信息',path:'/remind?userType='+this.userType+'&userRole='+this.userRole})
            // this.navList=[
            //   {name: '审核信息',path: '/review?userType='+this.userType+'&userRole='+this.userRole},
            //   {name: '提醒信息',path: '/remind?userType='+this.userType+'&userRole='+this.userRole}
            // ]
        }
        console.log(this.navList)
    },
    stateCommit(){
      var auditType = ''
      if(this.$route.query.userRole == "" || this.$route.query.userRole == null){
        auditType = "效益评估结果审核,反馈消息审核,问卷审核"
      }else {
        auditType = this.$route.query.userRole
      }
      let param = new URLSearchParams();
      param.append("auditType",auditType);
      this.axios({
        method: 'post',
        url: 'informationaudit.do?FindInformationAuditCount',
        data: param
      }).then(res=>{
         if(res.data.e == 0){
           this.$store.commit('updateReviewinfoNum',res.data.o.auditNum)
           this.$store.commit('updateReminderNum',res.data.o.remindNum)
         }
      })
    }
  }
}
</script>
