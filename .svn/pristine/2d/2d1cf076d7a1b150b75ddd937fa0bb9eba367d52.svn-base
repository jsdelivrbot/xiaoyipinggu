<template>
  <div id="feedBack">
    <div class="title">意见反馈</div>
    <div class="bodys">
      <textarea  id="feedBackText" placeholder="请填写反馈内容" style="resize:none" ></textarea>
      <button class="btn btn-info" @click="submitFeedback" style="padding:">提交</button>
    </div>
    <div class="success_box" v-show="success_box">
      <div class="success">
        <div class="success_info">
          <img src="../../static/submit_success.png" alt="">
        </div>
        <div class="success_button">
          <button class="btn btn-success" @click="success_ok">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      openId: '',
      success_box:false
    }
  },
  mounted(){
    this.initWx()
    this.getOpenId()
  },
  methods: {
    getOpenId(){
      let param = new URLSearchParams()
      param.append('code',this.GetQueryString('code'))
      this.axios({
          method: 'post',
          url: 'FeedbackIng.do?selectedopenId',
          data: param,
      }).then(res=>{
        if(res.data.e == 0){
          this.openId = res.data.o
        }
      })
    },
    submitFeedback(){
      if($('#feedBackText').val() == ""){
        this.$dialog.alert("反馈内容不可为空")
        return false
      }
      let param = new URLSearchParams()
      param.append('text',$('#feedBackText').val())
      param.append('openId',this.openId)
      this.axios({
          method: 'post',
          url: 'FeedbackIng.do?SubmitFeedbackMenuContents',
          data: param,
      }).then(res=>{
        if(res.data.e == 1){
          // this.$dialog.alert("提交成功").then(function(){
          //     wx.closeWindow();
          // })
          this.success_box = true
        }
      })
    },
    initWx(){
      var url=location.href.split('#')[0];
      $.ajax({
              type: "POST",
              url: "JsLogin.do?JsValidate",
              data: {
              "url": url
              },
              dataType: "json",
              async:false,
              success: function (data) {
                console.log(data);
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: [
                      'checkJsApi',
                      'onMenuShareTimeline',
                      'onMenuShareAppMessage',
                      'onMenuShareQQ',
                      'onMenuShareWeibo',
                      'onMenuShareQZone',
                      'hideMenuItems',
                      'showMenuItems',
                      'hideAllNonBaseMenuItem',
                      'showAllNonBaseMenuItem',
                      'translateVoice',
                      'startRecord',
                      'stopRecord',
                      'onVoiceRecordEnd',
                      'playVoice',
                      'onVoicePlayEnd',
                      'pauseVoice',
                      'stopVoice',
                      'uploadVoice',
                      'downloadVoice',
                      'chooseImage',
                      'previewImage',
                      'uploadImage',
                      'downloadImage',
                      'getNetworkType',
                      'openLocation',
                      'getLocation',
                      'hideOptionMenu',
                      'showOptionMenu',
                      'closeWindow',
                      'scanQRCode',
                      'chooseWXPay',
                      'openProductSpecificView',
                      'addCard',
                      'chooseCard',
                      'openCard'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
      });
      wx.ready(function(){
        // wx.checkJsApi1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage'
            ],
            success: function (res) {
              console.log(res);
            }
          });

        //隐藏浏览器中右上角的三个点内的菜单
          wx.hideMenuItems({
            menuList: [
              'menuItem:readMode', // 阅读模式
              'menuItem:copyUrl', // 复制链接
              'menuItem:share:timeline',
              'menuItem:share:appMessage',
              'menuItem:share:qq',
              'menuItem:share:QZone',
              'menuItem:openWithQQBrowser',
              'menuItem:share:email',
              'menuItem:favorite',
              'menuItem:openWithSafari'
            ],
            success: function (res) {
              //alert('已隐藏“阅读模式”，“复制链接”等按钮');
              console.log('已隐藏“阅读模式”，“复制链接”等按钮')
            },
            fail: function (res) {
              //alert(JSON.stringify(res));
               console.log(JSON.stringify(res))
            }
          });
      });
      wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          //发生错误就是ticket失效了，重新调用ajax访问后台获取信的凭借接口
          var url=location.href.split('#')[0];
          $.ajax({
            type: "Get",
            url: "JsLogin.do?jsTicket?",
            async:false,
            success: function (data) {
              $.ajax({
                type: "POST",
                url: "http://szty.z798.cn/Create/qixi/servlet.do?",
                data: {
                  "url": url
                },
                dataType: "json",
                async:false,
                success: function (data) {
                      console.log(data);
                      wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: [
                              'checkJsApi',
                              'onMenuShareTimeline',
                              'onMenuShareAppMessage',
                              'onMenuShareQQ',
                              'onMenuShareWeibo',
                              'onMenuShareQZone',
                              'hideMenuItems',
                              'showMenuItems',
                              'hideAllNonBaseMenuItem',
                              'showAllNonBaseMenuItem',
                              'translateVoice',
                              'startRecord',
                              'stopRecord',
                              'onVoiceRecordEnd',
                              'playVoice',
                              'onVoicePlayEnd',
                              'pauseVoice',
                              'stopVoice',
                              'uploadVoice',
                              'downloadVoice',
                              'chooseImage',
                              'previewImage',
                              'uploadImage',
                              'downloadImage',
                              'getNetworkType',
                              'openLocation',
                              'getLocation',
                              'hideOptionMenu',
                              'showOptionMenu',
                              'closeWindow',
                              'scanQRCode',
                              'chooseWXPay',
                              'openProductSpecificView',
                              'addCard',
                              'chooseCard',
                              'openCard'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                  }
              });
            }
          });
      });
    },
    GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
     if(r!=null)return  unescape(r[2]); return null;
    },
    success_ok(){
       this.success_box = false
       wx.closeWindow();
    }
  }
}
</script>

<style scoped>
#feedBack {
  text-align: center;
  background: #f3f3f3;
  width: 100%;
  height: 100%;
}
#feedBack .title {
  font-weight: bold;
  font-size: 16px;
  padding: 5px 0;
}
.bodys {
  border: none;
  width: 88%;
  height: calc(100% - 32px);
  background: #f3f3f3;
}
.body_title {
  text-align: left;
  padding: 5px 0;
}
textarea {
  width: 100%;
  background: #fff;
  height: 300px;
  font-size: 16px;
}
button {
  width: 100%;
  margin-top: 100px;
  padding: 12px 0;
  font-size: 16px;
}
.success_box {
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  background: rgba(0,0,0,0.4);
}
.success {
  width: 320px;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -155px;
  margin-left: -160px;
}
.success_info {
  text-align: center;
  padding: 20px 20px 0px 20px;
}
.success_info img {
  width: 220px;
}
.success_button {
  text-align: center;
  padding: 10px;
}
</style>
