<template>
    <div style="height: 100%;">
        <img src="../../static/loginBg.jpg" alt="" style="width: 100%;height: 100%;">
        <div class="login_container">
            <div class="login_title">防灾减灾效益评估系统</div>
            <div class="login_box">
                <div class="login_box_div">
                    <div class="login_row">
                        <span>用户名</span>
                        <input type="text" placeholder="请输入用户名" id="userName" v-model="userName">
                    </div>
                    <div class="login_row">
                        <span>密码</span>
                        <input type="password" style="width:305px" placeholder="请输入密码" id="userPwd" v-model="userPwd">
                    </div>
                    <!-- <div class="login_row">
                        <span></span>
                        <input type="checkbox" name="">记住密码
                    </div> -->
                    <div class="login_row">
                        <button class="login_submit" @click.enter="login">登录</button>
                    </div>
                </div>
            </div>
            <!--微信登录-->
            <!-- <div class="login_footer">
                <img src="../../static/hr_left.jpg" alt="">
                <span>微信登录</span>
                <img src="../../static/hr_right.jpg" alt="">
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          userName:'',
          userPwd:''
      }
  },
  mounted(){
    this.userName = '';
    this.userPwd = '';
  },
  methods: {
    login() {
      let param = new URLSearchParams();
      param.append("name", this.userName);
      param.append("password", this.userPwd);
      this.axios({
        method: "post",
        url: "UserLogin.do?JudgeLogin",
        data: param
      }).then(res => {
        if (res.data.e == 0) {
          this.$dialog.alert("账号为空")
        }else if (res.data.e == 1) {
          this.$dialog.alert("密码为空")
        }else if(res.data.e == 2){
          this.$dialog.alert("账号不存在")
        }else if(res.data.e == 3){
          this.$dialog.alert("密码错误")
        }else{
          this.$router.push("/surveyResults");
        }
      });
    }
  }
};
</script>
<style scoped>
.login_container {
  position: absolute;
  top: 25%;
  right: 10%;
  width: 450px;
}
.login_title {
  color: #fff;
  font-size: 32px;
  margin-bottom: 15px;
  letter-spacing: 3px;
}
.login_box {
  background: #ebebeb;
  padding: 10px;
  border-radius: 5px;
}
.login_box_div {
  background: #fff;
  padding: 20px;
}
.login_row {
  padding: 13px 0;
}
.login_row span {
  display: inline-block;
  width: 60px;
  text-align: right;
  margin-right: 15px;
}
.login_row input[type="text"] {
  width: 305px;
}
.login_footer {
  color: #fff;
  padding: 10px 0;
}
.login_footer img {
  vertical-align: middle;
  width: 38.5%;
}
.login_footer span {
  margin: 0 10px;
  font-size: 18px;
}
.login_submit {
  width: 100%;
  background: #0586e2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 0;
}
</style>

