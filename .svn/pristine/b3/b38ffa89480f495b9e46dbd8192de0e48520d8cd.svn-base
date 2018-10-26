<template>
  <div class="template">
    <div class="template_header" 
    :class="{
      'template_header1':template1,
      'template_header2':template2,
      'template_header3':template3,
      'template_header4':template4,
      'template_header5':template5
      }"
    >问卷调查
      <button class="btn btn-primary pull-left" style="margin-top: 8px;" @click="back">返回</button>
      <select name="" id="templateId":class="{
              'active1':template1,
              'active2':template2,
              'active3':template3,
              'active4':template4,
              'active5':template5}"
              @change="changeTemplate">
          <option v-for="(item,index) in tests" :value="item.value">{{item.text}}</option>
      </select>
    </div>
    <div class="template_body" 
    :class="{
      'template_body1':template1,
      'template_body2':template2,
      'template_body3':template3,
      'template_body4':template4,
      'template_body5':template5,
      }"
    >
    <div class="template_title"
        :class="{
          'template_title1':template1,
          'template_title2':template2,
          'template_title3':template3,
          'template_title4':template4,
          'template_title5':template5,
        }">

    </div>
       <div class="template_body_content">
           <div class="list" :class="{'list1':template1,
           'list2':template2,'list3':template3,'list4':template4,'list5':template5}" v-for="(item,index) in initData">
             <div class="title" v-show="template1">
                {{index + 1}}
             </div>
             <div class="topic2" v-show="template2">
                第{{ index + 1 }}题
             </div>
             <div class="topic3" v-show="template3">
               第{{ index + 1 }}题
             </div>
             <ul class="template_body_content_ul">
               <li :class="{'first_topic': template2,'first_topic3': template3,'first_topic4': template4}">{{item.questionName}}&nbsp;&nbsp;&nbsp;<span style="font-size: 12px;">({{item.questionType}}题)</span></li>
               <li v-for="item2 in item.data">
                 <input type="radio" name="name" v-if="item.answerOptions != null && item.questionType == '单选'">
                 <input type="checkbox" v-if="item.answerOptions != null && item.questionType == '多选'">
                 <label v-if="item.answerOptions != null && item.questionType == '单选'|| item.questionType == '多选'">{{item2.answerOptions}} . {{item2.answerOptionsValue}}</label>
                 <input type="text" v-if="item.fillingType == 'txt' && item.questionType == '填空'" onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))"/>
                 <br v-if="item.fillingType == 'txt' && item.questionType == '填空'"/>
                 <span v-if="item.fillingType == 'txt' && item.questionType == '填空'" style="color: grey;">(只能填写文字)</span>
                 <input type="text" v-if="item.fillingType == 'num' && item.questionType == '填空'" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
                 <br v-if="item.fillingType == 'num'  && item.questionType == '填空'"/>
                 <span v-if="item.fillingType == 'num'  && item.questionType == '填空'" style="color: grey;">(只能填写整数)</span>
                 <input type="text" v-if="item.fillingType == 'double' && item.questionType == '填空'" @keyup="clearNoNum($event)"/>
                 <br v-if="item.fillingType == 'double'  && item.questionType == '填空'"/>
                 <span v-if="item.fillingType == 'double'  && item.questionType == '填空'" style="color: grey;">(只能填写小数并且保留小数点后两位)</span>
               </li>
             </ul>
             <div class="icon" v-show="template1">

             </div>
           </div> 
           <div class="list" v-if="questionnaireNameType == '行业'" :class="{'list1':template1,
           'list2':template2,'list3':template3,'list4':template4,'list5':template5}">
             <div class="title" v-show="template1">
                反馈
             </div>
             <div class="topic2" v-show="template2">
                反馈
             </div>
             <div class="topic3" v-show="template3">
                反馈
             </div>
             <ul class="template_body_content_ul">
              <li>
                <textarea name="" id="" rows="5" :class="{'textarea_bg':template2,'textarea_bg3':template3,'textarea_bg4':template4}"></textarea>
              </li>
             </ul>
           </div>
           <div class="submit">
              <button class="btn" :class="{
              'btn_bg1':template1,
              'btn_bg2':template2,
              'btn_bg3':template3,
              'btn_bg4':template4,
              'btn_bg5':template5}"
              >提交</button>  
           </div> 
           <div style="margin: 20px 0;">
              <span>发送人员名:{{sendUserName}}</span>
           </div>
           <div>
              <span>模型名称:{{modelName}}</span>
           </div>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      template1: true,
      template2: false,
      template3: false,
      template4: false,
      template5: false,
      tests: [
        { value: 'template1', text: '风格一' },
        { value: 'template2', text: '风格二' },
        { value: 'template3', text: '风格三' },
        { value: 'template4', text: '风格四' },
        { value: 'template5', text: '风格五' }
      ],
      initData: [],
      sendUserName: '',
      modelName: '',
      questionnaireNameType: this.$route.query.questionnaireNameType
    }
  },
  mounted(){
    this.propertyChange()
    this.initTemplate()
  },
  methods: {
    propertyChange(){
       //propertychange监听input里面的字符变化,属性改变事件
        $('.tiankong').bind('input propertychange', function() {
            var $this = $(this);
            var text_length = $this.val().length;//获取当前文本框的长度
            var current_width = parseInt(text_length) *10;//该16是改变前的宽度除以当前字符串的长度,算出每个字符的长度
            if(text_length == 0){
              $this.css("width",50+"px");
            }else {
              $this.css("width",current_width+"px");
            }
            if($this.width() >= 275){
              $this.css("width",275+"px");
            }
        });
    },
    changeTemplate(){
        if($('#templateId option:selected').val() == 'template1'){
            this.$router.push({path:'/template?index=template1',query:{id:this.$route.query.id}})
            this.template1 = true
            this.template2 = false
            this.template3 = false
            this.template4 = false
            this.template5 = false
        }
        if($('#templateId option:selected').val() == 'template2'){
            this.$router.push({path:'/template?index=template2',query:{id:this.$route.query.id}})
            this.template1 = false
            this.template2 = true
            this.template3 = false
            this.template4 = false
            this.template5 = false
        }
        if($('#templateId option:selected').val() == 'template3'){
            this.$router.push({path:'/template?index=template3',query:{id:this.$route.query.id}})
            this.template1 = false
            this.template2 = false
            this.template3 = true
            this.template4 = false
            this.template5 = false
        }
        if($('#templateId option:selected').val() == 'template4'){
            this.$router.push({path:'/template?index=template4',query:{id:this.$route.query.id}})
            this.template1 = false
            this.template2 = false
            this.template3 = false
            this.template4 = true
            this.template5 = false
        }
        if($('#templateId option:selected').val() == 'template5'){
            this.$router.push({path:'/template?index=template5',query:{id:this.$route.query.id}})
            this.template1 = false
            this.template2 = false
            this.template3 = false
            this.template4 = false
            this.template5 = true
        }
    },
    back(){
      this.$router.push({path:'/questionnaireManage',query:{index:1}})
    },
    initTemplate(){
      let param = new URLSearchParams()
      param.append('id',this.$route.query.id)
      this.axios({
          method: 'post',
          url: 'questionBank.do?PreviewQuestionnaire',
          data: param,
      }).then(res=>{
          if(res.data.e == 0){
             for(var i = 0;i < res.data.o.length;i++){
              if(res.data.o[i].questionType != "填空"){
                  var answerOptions = res.data.o[i].answerOptions
                  if(answerOptions != null){
                    var answerOptionsArr = answerOptions.split(',')
                    var answerOptionsValue = res.data.o[i].answerOptionsValue
                    var answerOptionsValueArr = answerOptionsValue.split(',')
                  }
                  var data = []
                  for(var j = 0;j<answerOptionsArr.length;j++){
                      data.push({"answerOptions":answerOptionsArr[j],"answerOptionsValue":answerOptionsValueArr[j]})
                  }
                  // var data = [
                  //     {"answerOptions":answerOptionsArr[0],"answerOptionsValue":answerOptionsValueArr[0]},
                  //     {"answerOptions":answerOptionsArr[1],"answerOptionsValue":answerOptionsValueArr[1]},
                  //     {"answerOptions":answerOptionsArr[2],"answerOptionsValue":answerOptionsValueArr[2]},
                  //     {"answerOptions":answerOptionsArr[3],"answerOptionsValue":answerOptionsValueArr[3]},
                  //     {"answerOptions":answerOptionsArr[4],"answerOptionsValue":answerOptionsValueArr[4]}
                  //   ]
                  res.data.o[i].data= data
                }else {
                  var data = [
                    {
                      "answerOptions":null,"answerOptionsValue":null,"fillingType":res.data.o[i].fillingType
                    }
                  ]
                  res.data.o[i].data= data
                }
                this.initData = res.data.o
                this.sendUserName = res.data.two.发送人员名
                this.modelName = res.data.two.模型名称.split('=').join('*')
              }
          }else {
             this.$dialog.alert("当前问卷为空 不能进行预览").then(()=>{
                this.$router.push({path:'/questionnaireManage',query:{index:1}})
             })
          }
      })
    },
    clearNoNum(event){
        event.currentTarget.value = event.currentTarget.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
        event.currentTarget.value = event.currentTarget.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
        event.currentTarget.value = event.currentTarget.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
        event.currentTarget.value = event.currentTarget.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
        if(event.currentTarget.value.indexOf(".")< 0 && event.currentTarget.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
            event.currentTarget.value= parseFloat(event.currentTarget.value); 
        } 
    }
  }
}
</script>
<style scoped>
.template {
  width: 100%;
  height: 100%;
}
.template_header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 2%;
  text-align: center;
  font-size: 16px
}
.template_header1 {
  color: #fff;
  background: rgb(239,156,88);
}
.template_header2 {
  color: #fff;
  background: rgb(18,156,193);
}
.template_header3 {
  color: #000;
  background: #fff;
}
.template_header4 {
  color: #000;
  background: #fff;
}
.template_header5 {
  color: #000;
  background: #fff;
}
#templateId {
  float: right;
  margin-top: 12px;
}
#templateId.active1 {
  border: 1px solid #fff;
  color: #fff;
  background: rgb(239,156,88);
}
#templateId.active2 {
  border: 1px solid #fff;
  color: #fff;
  background: rgb(18,156,193);
}
#templateId.active3 {
  border: 1px solid #000;
  color: #000;
  background: #fff;
}
#templateId.active4 {
  border: 1px solid #000;
  color: #000;
  background: #fff;
}
#templateId.active5 {
  border: 1px solid #000;
  color: #000;
  background: #fff;
}

.template_title {
    width: 320px;
    margin: -10px auto 20px;
}
.template_title1 {
  background: url(../../static/questionnaire1.png) no-repeat;
  background-size: 100% 100%;
  height: 150px;
}
.template_title2 {
  background: url(../../static/questionnaire2.png) no-repeat;
  background-size: 100% 100%;
  height: 125px;
}
.template_title3 {
  background: url(../../static/questionnaire3.png) no-repeat;
  background-size: 100% 100%;
  height: 125px;
}
.template_title4 {
  background: url(../../static/questionnaire4.png) no-repeat;
  background-size: 100% 100%;
  margin: -20px auto 20px;
  height: 150px;
}
.template_title5 {
  background: url(../../static/questionnaire5.png) no-repeat;
  background-size: 100% 100%;
  margin: -20px auto 20px;
  height: 125px;
}

.template_body {
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 0;
  overflow: auto;
}
.template_body1 {
  background: rgb(90,218,170);
}
.template_body2 {
  background: rgb(247,247,247);
}
.template_body3 {
  background: rgb(255,194,28);
}
.template_body4 {
  background: rgb(47,136,202);
}
.template_body5 {
  background: url(../../static/body_bg5.png) repeat-y;
  background-size: 100% 100%;
}
.template_body_content {
  width: 320px;
  margin: 0 auto;
}
.list {
  width: 100%;
  height: auto;
  margin-top: 20px;
  padding: 20px 0;
  padding-top: 40px;
  position: relative;
}
.list1 {
  background: url(../../static/bg_01.png) no-repeat;
  background-size: 100% 100%;
}
.list2 {
  background: url(../../static/bg_02.png) no-repeat;
  background-size: 100% 100%;
}
.list3 {
  background: url(../../static/bg_03.png) no-repeat;
  background-size: 100% 100%;
}
.list4 {
  background: url(../../static/bg_04.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 15px;
}
.list5 {
  background: url(../../static/bg_05.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 25px;
}
.list:nth-child(1){
  margin: 0;
}
.title {
  width: 45px;
  height: 45px;
  background: url(../../static/title.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 45px;
  text-align: center;
  position: absolute;
  top: -4px;
  left: 10px;
}
.topic2 {
  width: 200px;
  height: 45px;
  background: url(../../static/topic.png) no-repeat;
  background-size: 100% 100%;
  color: rgb(18,156,193);
  line-height: 45px;
  text-align: center;
  position: absolute;
  top: -15px;
  left: 60px;
}
.topic3 {
  width: 200px;
  height: 45px;
  background: url(../../static/topic3.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 45px;
  text-align: center;
  position: absolute;
  top: -15px;
  left: 60px;
}
.icon {
  width: 45px;
  height: 45px;
  background: url(../../static/icon.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 4px;
  right: 10px;
}
.template_body_content_ul{
  display: block;
  width: 82%;
  margin: 0 auto;
}
.template_body_content_ul li {
  padding: 8px 5px;
  color: #000;
}
.template_body_content_ul li label {
  font-weight: 400;
  cursor: pointer;
}
.template_body_content_ul li.first_topic{
  background: url(../../static/first_topic.png) no-repeat;
  background-size: 100% 100%;
}
.template_body_content_ul li.first_topic3{
  background: url(../../static/first_topic3.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.template_body_content_ul li.first_topic4{
  background: url(../../static/first_topic4.png) no-repeat;
  background-size: 100% 100%;
  color: #000;
  padding: 8px 25px;
}
.template_body_content_ul li input[type="text"] {
  width: 240px;
  height: 30px;
}

input,textarea{outline:none}
input.tiankong {
    border: none;
    border-bottom: 1px solid #000;
    width: 50px;
}
textarea {
  width: 100%;
  background: rgb(244,244,244);
  resize:none;
  border-radius: 10px;
  border: none;
  padding: 10px;
}
.textarea_bg {
  background: url(../../static/first_topic.png) no-repeat;
  background-size: 100% 100%;
}
.textarea_bg3 {
  background: url(../../static/first_topic3.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
.textarea_bg4 {
  background: url(../../static/first_topic4.png) no-repeat;
  background-size: 100% 100%;
  padding: 10px 10px 10px 30px;
}
.submit {
  margin-top: 20px;
}
.submit .btn_bg1 {
  width: 100%;
  color: #fff;
  background: rgb(239,156,88);
}
.submit .btn_bg2 {
  width: 100%;
  color: #fff;
  background: rgb(18,156,193);
}
.submit .btn_bg3 {
  width: 100%;
  color: #fff;
  background: rgb(247,57,59);
}
.submit .btn_bg4 {
  width: 100%;
  color: #000;
  background: url(../../static/btn4.png) no-repeat;
  background-size: 100% 100%;
}
.submit .btn_bg5 {
  width: 100%;
  color: #000;
  background: url(../../static/btn5.png) no-repeat;
  background-size: 100% 100%;
}
.color1 {
  color: #fff;
}
.color2 {
  color: #000;
}

</style>