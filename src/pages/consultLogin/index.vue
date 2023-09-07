<template>
  <div class="login">
    <!-- logo区域 -->
    <div class="login_logo">
      <img src="../../assets/logo.png" alt="" />
    </div>
    <!-- 表单区域 -->
    <div class="login_form">
        <div class="login_title">
            咨询师登录
        </div>
      <!-- 登录方式切换 -->
      <div class="login_tabs">
        <div
          class="login_tab"
          v-for="(item, index) in tabList"
          :key="index"
          :class="item.active == true ? 'active' : ''"
          @click="selectTab(item)"
        >
          {{ item.name }}
          <div class="login_tab_line"></div>
        </div>
      </div>

      <!-- 短信登录 -->
      <div class="login_code_form" v-if="tabType == '短信登录'">
        <div class="phone">
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="phoneDto.phone"
          />
        </div>
        <div class="code">
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="phoneDto.code"
          />
          <div
            class="require_code"
            @click="requireCode()"
            v-show="codeFlag == false"
          >
            获取验证码
          </div>
          <div class="require_code" v-show="codeFlag == true">
            {{ codeTime }}s后获取
          </div>
        </div>
        <div class="code_login" @click="phonelogin()">登录</div>
      </div>

      <!-- 账号登录 -->
      <div class="login_psd_form" v-if="tabType == '账号登录'">
        <div class="phone">
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="psdDto.phone"
          />
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="请输入密码"
            v-model="psdDto.password"
          />
        </div>
        <div class="other">
          <div class="forget" @click="forgetPassword">忘记密码</div>
        </div>
        <div class="psd_login" @click="login()">登录</div>
      </div>

      <div class="code_login_tip">
        <input type="checkbox" checked="true" />
        未注册手机登录时会自动创建新账号，我已阅读并同意
        <span>服务协议</span> 和 <span>隐私权条款</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      url: "http://47.93.21.24:3001/api",
      tabType: "短信登录",
      codeTime: 60,
      codeFlag: false,
      tabList: [
        {
          name: "短信登录",
          active: true,
        },
        {
          name: "账号登录",
          active: false,
        },
      ],
      phoneDto: {
        phone: "",
        code: "",
      },
      psdDto: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    // 切换登录方式
    selectTab(item) {
      for (var i = 0; i < this.tabList.length; i++) {
        this.tabList[i].active = false;
      }
      this.tabType = item.name;
      item.active = true;
    },

    // 忘记密码
    forgetPassword() {
      this.$router.push({
        name: "forget",
      });
    },

    // 获取验证码
    requireCode() {
      let _this = this;
      if (this.phoneDto.phone == "") {
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
      } else {
        this.codeFlag = true;
        this.timer = setInterval(() => {
          if (this.codeTime > 0) {
            this.codeTime--;
          } else {
            this.codeTime = 60;
            clearInterval(this.timer);
          }
        }, 1000);
        this.$http
          .post(this.url + "/result/sendCode", {
            phone: this.phoneDto.phone,
          })
          .then(function (res) {
            if (res.data.code == 200) {
              _this.$message({
                message: res.data.msg,
                type: "success",
              });
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    // 手机号登录
    phonelogin() {
      let _this = this;
      if (this.phoneDto.phone == "") {
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
      } else if (this.phoneDto.code == "") {
        this.$message({
          message: "请填写验证码",
          type: "warning",
        });
      } else {
        this.$http
          .post(this.url + "/user/loginByCode", {
            phone: this.phoneDto.phone,
            code: this.phoneDto.code,
          })
          .then(function (res) {
            if (res.data.code == 200) {
              window.localStorage.setItem("X-token", res.data.data.token);
              _this.$message({
                message: "登录成功",
                type: "success",
              });
              setTimeout(() => {
                _this.$router.push({
                  name: "chat",
                });
              }, 1000);
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    // 登录
    login() {
      let _this = this;
      if (this.psdDto.phone == "") {
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
      } else if (this.psdDto.password == "") {
        this.$message({
          message: "请填写密码",
          type: "warning",
        });
      } else {
        this.$http
          .post(this.url + "/user/loginByPassword", {
            phone: this.psdDto.phone,
            password: this.psdDto.password,
          })
          .then(function (res) {
            console.log(res)
            if (res.data.code == 200) {
              window.localStorage.setItem("X-token", res.data.data.token);
              _this.$message({
                message: "登录成功",
                type: "success",
              });
              setTimeout(() => {
                _this.$router.push({
                  name: "chat",
                });
              }, 1000);
            } else {
              _this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/uploads/chat/bg.jpg") no-repeat;
  background-size: cover;
  //   logo区域
  .login_logo {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    width: 15rem;
    img {
      width: 100%;
    }
  }
  //   表单区域
  .login_form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    .login_title{
        text-align: center;
        font-size: 1.5rem;
        font-weight: bolder;
        margin-bottom: 1rem;
        color: #333;
    }
    .login_tabs {
      display: flex;
      justify-content: center;
      .login_tab {
        cursor: pointer;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.6rem;
        color: #333;
        &.active {
          font-weight: bolder;
          .login_tab_line {
            display: block;
          }
        }
        .login_tab_line {
          display: none;
          width: 4rem;
          height: 0.4rem;
          border-radius: 0.4rem;
          background-color: #427dff;
        }
      }
    }
    .login_msg {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #666;
    }
    .login_code_form {
      .phone {
        width: 100%;
        height: 3rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.4rem;
        margin-top: 1.5rem;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: transparent;
          padding-left: 1rem;
          font-size: 0.9rem;
        }
      }
      .code {
        position: relative;
        width: 100%;
        height: 3rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.4rem;
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: transparent;
          padding-left: 1rem;
          font-size: 0.9rem;
        }
        .require_code {
          position: absolute;
          right: 1rem;
          padding: 0.2rem 0.5rem;
          border: 0.05rem solid #427dff;
          color: #427dff;
          font-size: 0.8rem;
          border-radius: 0.2rem;
        }
      }
      .other {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        span {
          margin-left: 0.5rem;
          color: #999;
        }
      }
      .code_login {
        width: 100%;
        height: 3rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #427dff;
        color: #fff;
        font-weight: bolder;
        cursor: pointer;
        margin-top: 1rem;
      }
    }
    .login_psd_form {
      .phone {
        width: 100%;
        height: 3rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.4rem;
        margin-top: 1.5rem;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: transparent;
          padding-left: 1rem;
          font-size: 0.9rem;
        }
      }
      .password {
        position: relative;
        width: 100%;
        height: 3rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.4rem;
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: transparent;
          padding-left: 1rem;
          font-size: 0.9rem;
        }
      }
      .other {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1rem;
        .remember {
          display: flex;
          align-items: center;
          span {
            margin-left: 0.5rem;
            color: #999;
          }
        }
        .forget {
          color: #427dff;
          font-size: 0.8rem;
        }
      }
      .psd_login {
        width: 100%;
        height: 3rem;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #427dff;
        color: #fff;
        font-weight: bolder;
        cursor: pointer;
        margin-top: 1rem;
      }
    }
    .code_login_tip {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #999;
      input {
        margin-right: 0.3rem;
      }
      span {
        color: #427dff;
        font-weight: bolder;
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .login {
    .login_form {
      width: 60%;
    }
  }
}
@media screen and (max-width: 600px) {
  .login {
    .login_form {
      width: 70%;
    }
  }
}
@media screen and (max-width: 500px) {
  .login {
    .login_form {
      width: 80%;
      .login_code_form {
        .phone {
          height: 4rem;
        }
        .code {
          height: 4rem;
        }
        .code_login {
          height: 4.2rem;
        }
      }
      .login_psd_form {
        .phone {
          height: 4rem;
        }
        .password {
          height: 4rem;
        }
        .psd_login {
          height: 4.2rem;
        }
      }
    }
  }
}
@media screen and (max-width: 420px) {
  input[type="checkbox"] {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }
  input[type="checkbox"]::after {
    width: 1.5rem !important;
    height: 1.5rem !important;
  }

  input[type="checkbox"]:checked::after {
    font-size: 0.8rem !important;
  }
}

input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: 1rem;
  height: 1rem;
  font-size: 0.9rem;
  visibility: hidden;
}
input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  color: #666;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
  content: " ";
  border-radius: 50%;
  border: 0.05rem solid #ccc;
}

input[type="checkbox"]:checked::after {
  content: "✓";
  font-size: 0.9rem;
  font-weight: bold;
}
</style>