<template>
  <header class="header_section">
    <div class="header_hd">
      <div class="container">
        <div class="header_hd_con">
          <div class="logo">
            <router-link to="/index">
            <img src="../assets/logo.png" alt="" /></router-link>
          </div>
          <div class="member" @click="tomember">
            <div class="member_subject">
              山东
              <span>{{member.subject}}</span>
            </div>
            <div class="member_score">
              成绩：
              <span>{{member.grand}}分/{{member.rank}}名</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_bd">
      <div class="container">
        <div class="header_bd_con">
          <ul class="header_bd_nav">
            <li>
              <router-link to="/index"> 首页 </router-link>
            </li>
            <li>
              <router-link to="/fill"> 模拟填报 </router-link>
            </li>
            <li>
              <router-link to="/findschool"> 找大学 </router-link>
            </li>
            <li>
              <router-link to="/findmajor"> 查专业 </router-link>
            </li>
            <li>
              <router-link to="/vip"> VIP专区 </router-link>
            </li>
            <li>
              <router-link to="/consultLogin"> 咨询师登录 </router-link>
            </li>
          </ul>
          <div class="header_bd_mobile_nav">
            <el-menu
              default-active="1-4-1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-unfold"></i>
                  <span slot="title"></span>
                </template>
                <el-menu-item index="1-1">
                  <router-link to="/index" style="color: #666">
                    首页
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/fill" style="color: #666">
                    模拟填报
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <router-link to="/findschool" style="color: #666">
                    找大学
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-4">
                  <router-link to="/findmajor" style="color: #666">
                    查专业
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-5">
                  <router-link to="/vip" style="color: #666">
                    VIP专区
                  </router-link>
                </el-menu-item>
                 <el-menu-item index="1-5">
                  <router-link to="/consultLogin" style="color: #666">
                    咨询师登录
                  </router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <div class="header_bd_function">
            <div class="header_fun_search">
              <input type="text" placeholder="请输入搜索内容" />
              <span class="iconfont icon-sousuo"></span>
            </div>
            <div class="header_fun_member" @click="tomember">
              <span class="iconfont icon-iconfontgerenzhongxin"></span>
              <em v-if="loginFlag == false">去登录</em>
              <em v-if="loginFlag == true">{{member.name == null?'用户':member.name}}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      url: "http://47.93.21.24:3001/api",
      token:"",
      isCollapse: true,
      member:{},
      loginFlag:false,
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getMemberInfo();
  },
  methods: {
    tomember() {
      this.$router.push({
        name: "info",
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取个人信息
    getMemberInfo() {
      let _this = this;
      this.$http
        .get(this.url + "/user/info", {
          headers: {
            Authorization: _this.token,
          },
        })
        .then(function (res) {
          if (res.data.code == 200) {
            _this.member = res.data.data;
            _this.loginFlag = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="less">
::v-deep .el-menu {
  width: 100%;
  height: 100%;
  border: 0;
}
::v-deep .el-submenu {
  width: 100%;
  height: 100%;
}
::v-deep .el-submenu__title {
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.header_hd {
  width: 100%;
  height: 6rem;
  .header_hd_con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
  }
  .logo {
    width: 15rem;
    img {
      width: 100%;
    }
  }
  .member {
    display: flex;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    span {
      margin-left: 0.2rem;
    }
    .member_subject {
      margin-right: 1.5rem;
    }
  }
}
.header_bd {
  background-color: #fff;
  height: 3rem;
  .header_bd_con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    .header_bd_nav {
      display: flex;
      align-items: center;
      height: 100%;
      li {
        height: 100%;
        display: flex;
        align-items: center;
        a {
          color: #333;
          padding: 0 0.7rem;
          display: block;
          height: 80%;
          line-height: 3rem;
          display: flex;
          align-items: center;
          border-radius: 2rem;
          &.current {
            color: #fff;
            font-weight: bolder;
            background-color: #1451d4;
          }
        }
        margin-right: 2rem;
      }
    }
    .header_bd_mobile_nav {
      display: none !important;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .header_bd_function {
      display: flex;
      align-items: center;
      .header_fun_search {
        position: relative;
        display: flex;
        align-items: center;
        width: 12rem;
        height: 2rem;
        border-radius: 2rem;
        border: 0.05rem solid #ccc;
        margin-right: 1rem;
        input {
          border: 0;
          width: 70%;
          height: 100%;
          background: transparent;
          padding-left: 1rem;
          font-size: 0.8rem;
          text-overflow: ellipsis;
        }
        span {
          position: absolute;
          right: 0.5rem;
          cursor: pointer;
          font-size: 1.2rem;
        }
      }
      .header_fun_member {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #666;
        font-size: .8rem;
        span {
          font-size: 1.5rem;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .header_bd {
    .header_bd_con {
      .header_bd_nav {
        display: none;
      }
      .header_bd_mobile_nav {
        display: block !important;
      }
    }
  }
}
@media screen and (max-width: 500px) {
}
@media screen and (max-width: 450px) {
}
</style>