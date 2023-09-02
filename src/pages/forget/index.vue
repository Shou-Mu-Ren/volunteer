<template>
  <div class="forget">
    <!-- 忘记密码logo -->
    <div class="forget_logo">
      <img src="../../assets/logo.png" alt="" />
    </div>

    <!-- 忘记密码表单 -->
    <div class="forget_form">
      <div class="phone">
        <input type="text" placeholder="请输入手机号" v-model="forgetDto.phone"/>
      </div>
      <div class="code">
        <input type="text" placeholder="请输入验证码" v-model="forgetDto.code"/>
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
      <div class="password">
        <input type="password" placeholder="请输入密码" v-model="forgetDto.password"/>
      </div>
      <div class="surePsd">
        <input type="password" placeholder="请再次输入密码" v-model="forgetDto.makePassword"/>
      </div>
      <div class="forget_btn" @click="changePsd">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",
  data() {
    return {
      url: "http://47.93.21.24:3001/api",
      codeTime: 60,
      codeFlag: false,
      forgetDto: {
        phone: "",
        password: "",
        makePassword: "",
        code: "",
      },
    };
  },
  methods: {
    // 获取验证码
    requireCode() {
      let _this = this;
      if (this.forgetDto.phone == "") {
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
          .post(this.url + "/user/sendForget", {
            phone: this.forgetDto.phone,
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

    // 修改密码
    changePsd() {
      let _this = this;
      if(this.forgetDto.phone == ''){
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
      }else if(this.forgetDto.code == ''){
        this.$message({
          message: "请输入验证码",
          type: "warning",
        });
      }else if(this.forgetDto.password == ''){
        this.$message({
          message: "请输入密码",
          type: "warning",
        });
      }else if(this.forgetDto.makePassword == ''){
        this.$message({
          message: "请输入确认密码",
          type: "warning",
        });
      }else if(this.forgetDto.password != this.forgetDto.makePassword){
        this.$message({
          message: "两次输入密码不同",
          type: "warning",
        });
      }else{
              this.$http
        .post(this.url + "/user/forget", {
          phone: _this.forgetDto.phone,
          password: _this.forgetDto.password,
          makePassword: _this.forgetDto.makePassword,
          code: _this.forgetDto.code,
        })
        .then(function (res) {
          if (res.data.code == 200) {
            _this.$message({
              message: res.data.msg,
              type: "success",
            });
            setTimeout(() => {
              _this.$router.push({
                name:'login'
              })
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
.forget {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/uploads/login/loginBg.jpg") no-repeat;
  background-size: cover;
  .forget_logo {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    width: 15rem;
    img {
      width: 100%;
    }
  }
  .forget_form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    .phone,
    .code,
    .password,
    .surePsd {
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
      display: flex;
      align-items: center;
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
    .forget_btn {
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
}

@media screen and (max-width: 991px) {
  .forget {
    .forget_form {
      width: 50%;
    }
  }
}
@media screen and (max-width: 660px) {
  .forget {
    .forget_form {
      width: 65%;
    }
  }
}
@media screen and (max-width: 500px) {
  .forget {
    .forget_form {
      width: 75%;
    }
  }
}
@media screen and (max-width: 420px) {
  .forget {
    .forget_form {
      width: 85%;
      .phone,
      .code,
      .password,
      .surePsd {
        height: 4rem;
      }
      .forget_btn {
        height: 4rem;
      }
    }
  }
}
</style>