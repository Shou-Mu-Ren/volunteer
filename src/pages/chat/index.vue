<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 会员区域 -->
    <section class="vip_section">
      <div class="container">
        <div class="vip">
          <div class="vip_chat">
            <div class="chat-lf">
              <div class="chat-lf-search">
                <div class="chat-lf-input">
                  <span class="iconfont icon-sousuo"></span>
                  <input type="text" placeholder="搜索" />
                </div>
                <div class="chat-lf-add">+</div>
              </div>
              <div class="chat-lf-list">
                <div
                  class="chat-lf-item"
                  v-for="item in userList"
                  :key="item.id"
                  :class="item.classObj"
                >
                  <div class="chat-lf-img">
                    <img :src="item.picture" alt="" />
                    <div class="num" v-show="item.num > 0">{{ item.num }}</div>
                    <div class="nature" v-if="item.nation">
                      <img :src="item.nation" alt="" />
                    </div>
                  </div>
                  <div class="chat-lf-msg">
                    <div class="chat-lf-title">{{ item.name }}</div>
                    <div class="chat-lf-info">{{ item.message }}</div>
                  </div>
                  <div class="chat-time">{{ item.time }}</div>
                </div>
              </div>
            </div>
            <div class="chat-rt">
              <div class="chat-rt-title">晚风轻轻吹</div>
              <div class="chat-rt-con"></div>
              <div class="chat-rt-handle">
                <div class="handle-lang">
                  <div class="handle-eng">英</div>
                  <div class="handle-ch active">中</div>
                </div>
              </div>
              <div class="chat-rt-send">
                <span></span>
                <textarea cols="30" rows="10" placeholder="请输入"></textarea>
                <button>发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 尾部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件 以及 插件
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Chat",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      userList: [
        {
          id: 1,
          picture: require("../../assets/uploads/vip/logo.png"),
          name: "晚风轻轻吹",
          message: "好的",
          time: "昨天",
          nation: "",
          num: 0,
          classObj: {
            active: true,
          },
        },
      ],
      url: "http://47.93.21.24:3001/api",
      token: "",
      member:{}
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getMemberInfo();
  },
  methods: {

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
// 会员区域
.vip_section {
  margin: 2rem 0;
  .vip {
    .vip_tabs {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .vip_tab {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        font-size: 0.9rem;
        width: 30%;
        height: 3rem;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        cursor: pointer;
        &.active {
          font-size: 1.1rem;
          font-weight: bolder;
          color: #fff;
          background-color: #427dff;
        }
      }
    }
    .vip_content {
      margin-top: 1.5rem;
      padding: 2rem;
      background-color: #fff;
      box-shadow: 0 0 2rem 0 #ccc;
      border-radius: 0.5rem;
      .vip_card {
        .vip_card_title {
          font-size: 1.2rem;
          color: #333;
          font-weight: bolder;
        }
        .vip_card_item {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f7f7f7;
          border-radius: 0.5rem;
          .vip_card_item_title {
            color: #427dff;
            font-weight: bolder;
            font-size: 1rem;
          }
          .vip_card_item_msg {
            margin-top: 0.7rem;
            font-size: 0.9rem;
            color: #666;
            p {
              margin: 0.6rem 0;
            }
          }
        }
      }
      .vipList {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 1.5rem;
        .vip_item {
          margin: 0 2rem;
          width: 40%;
          padding: 1.5rem;
          background-color: #f7f7f7;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          h5 {
            font-size: 1.2rem;
            color: #333;
            font-weight: bolder;
          }
          p {
            font-size: 2rem;
            margin-top: 1rem;
            color: #427dff;
            font-weight: bolder;
            span {
              font-size: 1rem;
              margin-right: 0.2rem;
            }
          }
          em {
            text-decoration: line-through;
            font-size: 1rem;
            color: #666;
          }
          .vip_btn {
            cursor: pointer;
            margin-top: 1.2rem;
            width: 8rem;
            height: 2.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border-radius: 0.4rem;
            background-color: #427dff;
          }
        }
      }
    }
    .vip_chat {
      display: flex;
      margin-top: 1.5rem;
      padding: 2rem;
      background-color: #fff;
      box-shadow: 0 0 2rem 0 #ccc;
      border-radius: 0.5rem;
      .chat-lf {
        width: 20%;
        border: 1px solid #e6e6e7;
      }
      .chat-rt {
        width: 80%;
      }
      .chat-lf-search {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 4rem;
        padding: 0.8rem;
        border-bottom: 0.05rem solid #f7f7f7;
        background-color: #f3f0f0;
      }

      .chat-lf-input {
        position: relative;
        width: 12rem;
        height: 2.5rem;
        background-color: #fff;
      }
      .chat-lf-input span {
        position: absolute;
        top: 0.5rem;
        left: 0.4rem;
        font-size: 1rem;
        font-weight: bolder;
        color: #878787;
      }
      .chat-lf-input input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 0;
        padding-left: 1.5rem;
        font-size: 0.8rem;
      }
      .chat-lf-input input::placeholder {
        color: #878787;
        font-size: 0.8rem;
      }
      .chat-lf-add {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        background-color: #fff;
      }
      .chat-lf-add span {
        color: #848484;
        font-size: 1rem;
        font-weight: bolder;
      }
      .chat-lf-item {
        cursor: pointer;
        position: relative;
        padding: 0.9rem 0.8rem;
        display: flex;
        align-items: center;
      }
      .chat-lf-item:hover {
        background-color: #f3f0f0;
      }
      .chat-lf-item.active {
        background-color: #f3f0f0;
      }
      .chat-lf-img {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 0.3rem;
      }
      .chat-lf-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .chat-lf-msg {
        margin-left: 0.5rem;
        width: 100px;
      }
      .chat-lf-title {
        color: #282d3b;
        font-weight: 600;
        width: 5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chat-lf-info {
        font-size: 0.7rem;
        color: #878787;
        margin-top: 0.3rem;
        width: 5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chat-time {
        position: absolute;
        top: 1.25rem;
        right: 0.8rem;
        font-size: 0.8rem;
        color: #878787;
      }
      .num {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #ed4135;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        font-size: 0.7rem;
        font-weight: bolder;
      }
      .nature {
        position: absolute;
        left: -2px;
        bottom: -8px;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .chat-rt-title {
        width: 100%;
        height: 4rem;
        background: #f5f3f3;
        border-bottom: 0.05rem solid #e6e6e7;
        padding-left: 1rem;
        line-height: 4rem;
        color: #282d3b;
        font-size: 0.9rem;
        font-weight: bolder;
      }
      .chat-rt-con {
        width: 100%;
        height: 20rem;
        border-bottom: 0.05rem solid #e6e6e7;
        background-color: #f7f7f7;
      }
      .chat-rt-handle {
        display: flex;
        align-items: center;
        width: 100%;
        height: 3rem;
        background-color: #f5f3f3;
        padding-left: 0.6rem;
      }
      .handle-lang {
        display: flex;
        width: 3rem;
        height: 1.3rem;
      }
      .handle-lang div {
        cursor: pointer;
        width: 50%;
        height: 100%;
        border: 0.1rem solid #282d3b;
        text-align: center;
        line-height: 1.3rem;
      }
      .handle-lang .handle-ch {
        border-left: 0;
      }
      .handle-lang div.active {
        background-color: #282d3b;
        color: #fff;
      }
      .chat-rt-send {
        position: relative;
        width: 100%;
        height: 8rem;
        background-color: #f7f7f7;
      }
      .chat-rt-send span {
        position: absolute;
        top: 0.9rem;
        left: 0.6rem;
        display: block;
        width: 0.2rem;
        height: 1rem;
        background-color: #282d3b;
      }
      .chat-rt-send textarea {
        width: 100%;
        height: 100%;
        background-color: transparent;
        padding: 0.8rem 1rem;
        border: 0;
        resize: none;
        outline: none;
        font-size: 0.8rem;
        color: #282d3b;
        font-weight: 600;
      }
      .chat-rt-send button {
        position: absolute;
        bottom: 1.3rem;
        right: 1.3rem;
        width: 5.5rem;
        height: 2rem;
        background-color: #f3f0f0;
        color: #282d3b;
        font-size: 0.8rem;
        border: 0;
        font-weight: bolder;
      }
    }
    .vip_data {
      margin-top: 1.5rem;
      padding: 2rem;
      background-color: #fff;
      box-shadow: 0 0 2rem 0 #ccc;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 15rem;
        height: 15rem;
        object-fit: contain;
      }
      p {
        color: #333;
        font-weight: bolder;
        font-size: 2.5rem;
        margin-top: 1.5rem;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
}
@media screen and (max-width: 900px) {
  .vip_section .vip .vip_chat .chat-lf {
    width: 40%;
  }
  .vip_section .vip .vip_chat .chat-rt {
    width: 60%;
  }
}
@media screen and (max-width: 660px) {
  .vip_section .vip .vip_chat .chat-lf-input {
    width: 70%;
  }
}
@media screen and (max-width: 450px) {
  .vip_section .vip {
    min-width: 450px;
  }
}
</style>