<template>
  <div>
    <v-title>
      <li>
        <a href="#/customerFeedback">用户反馈统计</a>
      </li>
      <li class="active" slot="name">交流</li>
    </v-title>
    <div class="bodys" style="border: none;">
        <div class="time_box">
            <span class="time">{{userFeedbackTime}}</span>
        </div>
        <div class="bodys_title">
            {{name}}:{{feedbackContent}}
        </div>
        <div>
            <textarea cols="30" rows="10" style="width: 100%" v-model="replyFeedbackContent"></textarea>
        </div>
        <div class="btns_div">
            <button class="btn btn-info" @click="back()">返回</button>
            <button class="btn btn-success" id="submitReviewBtn" @click="submitReview()">提交审核</button>
            <button class="btn btn-primary" id="sendBtn" @click="send()">发送</button>
        </div>
        <div style="margin-top:10px;text-align:center;" class="isOk">
          <p>如无需回复，请点击<a href="javascript:;" style="font-size: 20px;" @click="isOk">确定</a></p>
        </div>
    </div>
  </div>
</template>
<script>
import vTitle from '../views/vTitle'
export default {
  data(){
    return {
      userFeedbackTime: "",
      name: "",
      feedbackContent: "",
      replyFeedbackContent: "",
      relatedId: "",
      openId: ""
    }
  },
  components: {vTitle},
  mounted(){
    this.getInfo()
    this.initFlag()
  },
  computed:{
      getUserRole(){
          return this.$store.state.userRole
      }
  },
  // computed: {
  //   userType(){
  //     return this.$store.state.userType
  //   },
  //   userRole(){
  //     return this.$store.state.userRole
  //   }
  // },
  methods: {
    isOk(){
      let param = new URLSearchParams()
      param.append('feedbackId',this.$route.query.feedbackId)
      this.axios({
        method: 'post',
        url: 'FeedbackIng.do?reviseFeedback',
        data: param
      }).then(res=>{
        if(res.data.e == 0){
           this.$router.push({path:'/customerFeedback',query:{feedbackId:this.$route.query.feedbackId}})
           this.stateCommit()
        }
      })
    },
    getInfo(){
      let param = new URLSearchParams()
      param.append('feedbackId',this.$route.query.feedbackId)
      this.axios({
        method: 'post',
        url: 'FeedbackIng.do?getFeedbackPartInformation',
        data: param
      }).then(res=>{
        console.log(res.data.o)
        if(res.data.e == 0){
            this.userFeedbackTime = res.data.o.userFeedbackTime
            this.feedbackContent = res.data.o.feedbackContent
            this.relatedId = res.data.o.relatedId
            this.name = res.data.o.name
            this.openId = res.data.o.openId
            if(res.data.o.replyFeedbackContent == null){
              this.replyFeedbackContent = ""
            }else {
              this.replyFeedbackContent = res.data.o.replyFeedbackContent
            }
        }
      })
    },
    submitReview(){
      if(this.replyFeedbackContent == ""){
          this.$dialog.alert("返回内容不能为空")
          return false
      }
      let param = new URLSearchParams()
      param.append('auditContent',this.feedbackContent)
      param.append('replyText',this.replyFeedbackContent)
      param.append('relatedId',this.relatedId)
      this.axios({
        method: 'post',
        url: 'FeedbackIng.do?submitFeedbackAudit',
        data: param
      }).then(res=>{
        if(res.data.e == 2){
           this.$dialog.alert("提交审核成功")
           this.$router.push({path:'/customerFeedback'})
           this.stateCommit()
           this.stateCommit2()
        }
      })
    },
    send(){
      if(this.replyFeedbackContent == ""){
          this.$dialog.alert("返回内容不能为空")
          return false
      }
      let param = new URLSearchParams()
      param.append('feedbackContent',this.feedbackContent)
      param.append('replyFeedbackContent',this.replyFeedbackContent)
      param.append('openId',this.openId )
      param.append('feedbackId',this.$route.query.feedbackId)
      this.axios({
        method: 'post',
        url: 'FeedbackIng.do?ReplyToUserFeedbackMessage',
        data: param
      }).then(res=>{
         if(res.data.e == 3){
           this.$dialog.alert("发送成功")
           this.$router.push({path:'/customerFeedback'})
           this.stateCommit()
         }
      })
    },
    back(){
      this.$router.push({path:'/customerFeedback'})
    },
    initFlag(){
      var nformationState = this.$route.query.nformationState
      if(nformationState == "待回复"){
        $('#submitReviewBtn').attr('disabled',false)
        $('#sendBtn').attr('disabled',true)
        $('.isOk').removeClass('hide')
      }else if(nformationState == "待审核"){
        $('#submitReviewBtn').attr('disabled',true)
        $('#sendBtn').attr('disabled',true)
        $('.isOk').addClass('hide')
      }else if(nformationState == "审核通过"){
        $('#submitReviewBtn').attr('disabled',true)
        $('#sendBtn').attr('disabled',false)
        $('.isOk').addClass('hide')
      }else if(nformationState == "审核未通过"){
        $('#submitReviewBtn').attr('disabled',false)
        $('#sendBtn').attr('disabled',true)
        $('.isOk').removeClass('hide')
      }else if(nformationState == "已回复"){
        $('#submitReviewBtn').attr('disabled',true)
        $('#sendBtn').attr('disabled',true)
        $('.isOk').addClass('hide')
      }else {
        $('#submitReviewBtn').attr('disabled',true)
        $('#sendBtn').attr('disabled',true)
        $('.isOk').addClass('hide')
      }
    },
    stateCommit(){
       this.axios.get('FeedbackIng.do?StatisticalFeedbackState').then(res=>{
            if(res.data.e == 0){
                this.$store.commit('updateFeedbackNum',res.data.o)
            }
        })
        this.axios.get('informationaudit.do?FindInformationAuditTotal').then(res=>{
            if(res.data.e == 0){
                this.$store.commit('updateMessageNum',res.data.o.totalQuantity)
            }
        })
    },
    stateCommit2(){
      var auditType = ''
      if(this.getUserRole == "" || this.getUserRole == null){
        auditType = "效益评估结果审核,反馈消息审核,问卷审核"
      }else {
        auditType = this.getUserRole
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
<style scrope>
.time_box {
  text-align: center;
  color: #fff;
  margin: 20px 0;
}
.time {
  background: #888888;
  padding: 3px 5px;
  margin: 20px 0;
}
.bodys_title {
  margin: 20px 0;
}
.btns_div {
  text-align: center;
  margin: 20px 0;
}

</style>

