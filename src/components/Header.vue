<template>
    <div id="container">
        <header>
           <img id="logo" :src="logoSrc" alt="">
            <div class="title">北京山洪防灾减灾效益评估系统</div>
            <div style="display: inline-block;">
                <ul class="nav_ul">
                    <li v-for="(item,index) in navlist" @click="cutNav(index)"
                    v-bind:class='{active:index==active}'>
                        <router-link :to="item.path">{{item.name}}</router-link>
                        <span></span>
                        <div class="red-circle feedBackInfo" :class="{hide: index==0 || index==1 || index==3 || feedbackNum== 0 || feedbackNum == null}">{{feedbackNum}}</div>
                    </li>
                </ul>
            </div>
            <ul class="alert_ul">
                <li v-for="(item,index) in alertUl" @click="alert(index)">
                    <router-link :to="item.path">
                        <img :src="item.imgsrc" :alt="item.name" >
                        <span style="color:#fff;">{{item.userName}}</span>
                    </router-link>
                    <div style="top: -10px;left: 10px;" class="red-circle auditNum" :class="{hide: index==1 || index==2 || messageNum == 0 || messageNum == null}">{{messageNum}}</div>
                </li>
            </ul>
        </header>
        <router-view style="height:calc(100% - 90px);overflow: auto;"></router-view>
        <div class="footer">
            版权所有：北京市气象局服务中心  技术支持：迪锐天成信息技术（北京）有限公司
        </div>
        <div class="user_center_box" v-show="personShow">
            <div id="user_center" class="add_model">
                <div class="add_title">个人中心
                    <span class="glyphicon glyphicon-remove add_model_close"
                        @click="personShow = false"></span>
                </div>
                <div class="add_con">
                    <div>
                        <span>手机号码:</span>
                        <input type="text" v-model="phoneNumber">
                    </div>
                    <div>
                        <span>新密码:</span>
                        <input type="text" v-model="newPwd">
                    </div>
                    <div>
                        <span>确认密码:</span>
                        <input type="text" v-model="newPwd2">
                    </div>
                </div>
                <div class="add_model_btns">
                    <button class="btn btn-primary" @click="modifyPwdSure">确定</button>&nbsp;
                    <button class="btn btn-danger" @click="personShow = false">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            navlist: [
                {name: '调查结果统计',path: 'surveyResults'},
                {name: '效益评估',path: 'benefitEvaluation'},
                {name: '用户反馈',path: 'customerFeedback'},
                {name: '系统管理',path: 'systemManagement'}
            ],
            active: 0,
            alertUl: [
                {imgsrc: './static/alert.png',name:'消息提示',userName:'',path:''},
                {imgsrc: './static/login.png',name:'个人中心',userName:'',path:''},
                {imgsrc: './static/quit.png',name:'退出登录',userName:'',path:'/login'},
            ],
            personShow: false,
            phoneNumber:'',
            userId:'',
            newPwd:'',
            newPwd2:'',
            userType:'',  //用户类型
            userRole:'',   //用户权限
            logoSrc: './static/logo.png'
        }
    },
    mounted(){
        this.personShow = false 
        // this.getCookie()
        this.getUserData()
        if(this.$route.query.index == 1){
            this.active = 1
        }
        this.stateCommit()
        setInterval(this.stateCommit,180000)
    },
    computed:{
        feedbackNum(){
            return this.$store.state.feedbackNum
        },
        messageNum(){
            return this.$store.state.messageNum
        }
    },
    methods: {
        cutNav(index){
            this.active = index
        },
        getUserData(){
            this.axios.get("UserManagement.do?selectedUserIdAndPhone").then(res=>{
                if(res.data==""){
                    // this.$dialog.alert("当前未登录").then(res=>{
                    //     this.$router.push("/Login");
                    // })
                    this.$router.push("/login");
                }else{
                    this.alertUl[1].userName = res.data.o.realName;
                    this.userType = res.data.o.role;         //值班员or管理员
                    this.userRole = res.data.o.quanxian;    
                    this.$store.commit('getUserType',res.data.o.role)
                    this.$store.commit('getUserRole',res.data.o.quanxian)
                    this.$store.commit('getUserName',res.data.o.realName)
                    this.alertUl[0].path='alert?userType='+this.userType+'&userRole='+this.userRole

                }
            })
        },
        alert(index){
            if(index == 0){
            }else if(index == 1){
                this.axios.get("UserManagement.do?selectedUserIdAndPhone").then(res => {
                    if (res.data.e == 0) {
                        this.phoneNumber = res.data.o.phoneNumber
                        this.userId = res.data.o.userId
                    }
                });
                this.personShow = true 
                this.newPwd = '';
                this.newPwd2 = '';
                $('.container').css('background','rgba(0,0,0,0.3)')
            }
        },
        modifyPwdSure(){
            if(this.newPwd === this.newPwd2){
                let param = new URLSearchParams()
                param.append('userId', this.userId)
                param.append('phoneNumber', this.phoneNumber)
                param.append('passWord', this.newPwd)
                this.axios({
                    method: 'post',
                    url: 'UserManagement.do?ChangePassword',
                    data: param,
                }).then(res=>{
                    if (res.data.e == 0) {
                        this.$dialog.alert("用户ID为空")
                    }else if (res.data.e == 1) {
                        this.$dialog.alert("修改密码为空")
                    }else if(res.data.e == 2){
                        this.$router.push("/Login");
                        this.$dialog.alert("密码已修改，请重新登录")
                    }
                })
            }else{
                this.$dialog.alert("两次输入密码不同")
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
        }
    }
}
</script>

<style scoped>
/********** 头部 *********/
header{
    background: #1975b6;
    height: 60px;
    color: #fff;
    position: relative;
}
header img#logo{
    height: 60px;
    position: absolute;
    top: 0;
    left: 3%;
}
header .title{
    font-size: 30px;
    margin-left: 10%;
    line-height: 60px;
    display: inline-block;
}
header ul.nav_ul{
    position: absolute;
    top: 0;
    right: 370px;
    line-height: 60px;
}
header ul.nav_ul li{
    float: left;
    display: block;
    position: relative;
    cursor: pointer;
}
header ul.nav_ul li a {
    color: #fff;
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;    
    padding: 0 15px;
    font-size: 16px;
}
header .nav_ul li.active span{
    width:0;
    height:0;
    border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #F6F3F4;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -10px;
}
.red-circle {
    position: absolute;
    top: 12px;
    right: 0;
    min-width: 14px;
    height: 14px;
    border-radius: 50%;
    background: red;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
}
.alert_ul{
    position: absolute;
    bottom: 3px;
    right: 50px;
}
.alert_ul li{
    display:inline-block;
    cursor: pointer;
    margin: 0 10px;
    position: relative;
}
.add_model{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 2px solid #3967AE;
    border-radius: 5px;
    background: #fff;
}
.add_title{
    color: #3967AE;
    background: #F8F8FA;
    padding: 10px 15px;
}
.add_model_close{
    float: right;
    font-size: 18px;
    cursor: pointer;
}
.add_con{
    padding: 15px;
}
.add_con div {
    margin: 10px 0;
}
.add_con div span {
    display: inline-block;
    width: 60px;
    text-align: right;
}
.add_model input,.add_model select{
    border: 1px solid #B5B5B5;
    border-radius: 3px;
    padding: 3px 10px;
}
.add_model_con_row{
    padding: 7px 0;
    font-size: 12px;
}
.add_model_btns{
    text-align: center;
    padding: 15px;
}
.user_center_box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.footer {
    width: 100%;
    height: 32px;
    background: #1975b6;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    position: absolute;
    bottom: 0px;
    left: 0;
  }
</style>

