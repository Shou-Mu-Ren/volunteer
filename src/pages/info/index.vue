<template>
  <div class="info">
    <!-- 头部区域 -->
    <div class="container">
      <div class="header">
        <div class="logo">
          <router-link to="/index">
            <img src="../../assets/logo.png" alt="" />
          </router-link>
        </div>
        <div class="back" @click="backHome">
          返回上一页
          <span class="iconfont icon-fanhui"></span>
        </div>
      </div>

      <!-- 功能切换区域 -->
      <div class="functions">
        <div
          class="function"
          v-for="(item, index) in functionList"
          :key="index"
          :class="item.active == true ? 'active' : ''"
          @click="selectFunction(item)"
        >
          {{ item.title }}
        </div>
      </div>

      <!-- 个人信息 -->
      <div class="member" v-if="functionType == '个人信息'">
        <div class="member_province">
          <label for=""> 高考省份: </label>
          <input
            type="text"
            placeholder="请输入高考省份"
            value="山东"
            disabled="false"
          />
        </div>
        <div class="member_province">
          <label for=""> 高考地区: </label>
          <input
            type="text"
            placeholder="请输入高考地区"
            v-model="member.place"
            :disabled="changeFlag == false ? true : false"
          />
        </div>
        <div class="member_province">
          <label for=""> 毕业中学: </label>
          <input
            type="text"
            placeholder="请输入毕业中学"
            v-model="member.school"
            :disabled="changeFlag == false ? true : false"
          />
        </div>
        <div class="member_province">
          <label for=""> 高考年份: </label>
          <input
            type="text"
            placeholder="请输入高考年份"
            v-model="member.year"
            :disabled="changeFlag == false ? true : false"
          />
        </div>
        <div class="member_subjects">
          <label for=""> 高考选科: </label>
          <div class="subjects">
            <div
              class="member_subject"
              v-for="(item, index) in subject"
              :key="index"
              :class="item.active == true ? 'active' : ''"
              @click="selectSubject(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="member_bodys">
          <label for=""> 身体状况: </label>
          <div class="bodys">
            <div
              class="member_body"
              v-for="(item, index) in bodyList"
              :key="index"
              :class="item.active == true ? 'active' : ''"
              @click="changeBody(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="member_phone">
          <label for=""> 手机号: </label>
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="member.phone"
            :disabled="changeFlag == false ? true : false"
          />
        </div>
        <div class="member_change" v-if="changeFlag == false" @click="tochange">
          修改信息
        </div>
        <div class="member_sure" v-if="changeFlag == true" @click="surechange">
          修改完成
        </div>
      </div>

      <!-- 我的收藏 -->
      <div class="star" v-if="functionType == '我的收藏'">
        <div class="fill_right">
          <div class="fill_right_tabs">
            <div
              class="fill_right_tab"
              v-for="(item, index) in tabList"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="fill_right_list">
            <div
              class="fill_right_item"
              v-for="(item, index) in fillList"
              :key="index"
            >
              <div class="fill_right_item_line">
                <h5><span>1</span>%</h5>
                <p>风险极大</p>
                <div class="recom_tag">冲</div>
              </div>
              <div class="fill_right_item_line">
                <h5>{{ item.name }}</h5>
                <p>({{ item.type }} | {{ item.nature }})</p>
                <span>
                  代码: <em>{{ item.code }}</em>
                </span>
              </div>
              <div class="fill_right_item_line">
                <h4>{{ item.universityName }}</h4>
                <span> ({{ item.universityLevel }}) </span>
                <p>
                  代码： <em>{{ item.universityCode }}</em>
                  {{ item.f211 == 1 ? "| 211" : "" }} /
                  {{ item.f985 == 1 ? "| 985" : "" }} /
                  {{ item.level == "本科" ? "保研" : "" }}
                  {{ item.f211 == 1 && item.f985 == 1 ? "/ 国重点" : "" }} |
                  {{ item.provinceName }}
                </p>
              </div>
              <!-- <div class="fill_right_item_line">
                <h5><span>3</span>人</h5>
                <p><span>4年</span> <span>¥6500</span></p>
                <p>不限</p>
              </div>
              <div class="fill_right_item_line">
                <div class="fill_item_line_td">录取人数</div>
                <div class="fill_item_line_td">计划人数</div>
                <div class="fill_item_line_td">最低分</div>
                <div class="fill_item_line_td">最低位次</div>
              </div>
              <div class="fill_right_item_line">
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">624</div>
                <div class="fill_item_line_td">4972</div>
              </div>
              <div class="fill_right_item_line">
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">624</div>
                <div class="fill_item_line_td">4972</div>
              </div>
              <div class="fill_right_item_line">
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">4</div>
                <div class="fill_item_line_td">624</div>
                <div class="fill_item_line_td">4972</div>
              </div> -->
              <div class="fill_right_item_line">
                <div class="fill_btn" @click="dontcare(item)">取消收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      functionType: "个人信息",
      functionList: [
        {
          title: "个人信息",
          active: true,
        },
        {
          title: "我的收藏",
          active: false,
        },
      ],

      // 高考科目
      subject: [
        {
          title: "物理",
          active: false,
        },
        {
          title: "化学",
          active: false,
        },
        {
          title: "生物",
          active: false,
        },
        {
          title: "政治",
          active: false,
        },
        {
          title: "历史",
          active: false,
        },
        {
          title: "地理",
          active: false,
        },
      ],

      // 身体状况
      bodyList: [
        {
          name: "色盲色弱",
          active: false,
        },
        {
          name: "近视",
          active: false,
        },
        {
          name: "健康",
          active: false,
        },
        {
          name: "其他",
          active: false,
        },
      ],

      url: "http://47.93.21.24:3001/api",
      token: "",
      // 个人信息
      member: {},

      changeFlag: false,
      subjectNum: 3,
      updateDto: {
        year: "",
        subject: "",
        place: "",
        school: "",
        state: "",
      },
      //   列表头
      tabList: [
        {
          name: "录取概率",
        },
        {
          name: "专业",
        },
        {
          name: "院校",
        },
        // {
        //   name: "2023年招生计划",
        // },
        // {
        //   name: "历年",
        // },
        // {
        //   name: "2022",
        // },
        // {
        //   name: "2021",
        // },
        // {
        //   name: "2020",
        // },
        {
          name: "填报",
        },
      ],
      fillList: [],
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getMember();
    this.getMyStar();
  },
  methods: {
    // 返回上一页
    backHome() {
      this.$router.push({
        name: "index",
      });
    },

    // 获取个人信息
    getMember() {
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
            let subjects = res.data.data.subject.split("/");
            for (var i = 0; i < _this.subject.length; i++) {
              for (var j = 0; j < subjects.length; j++) {
                if (subjects[j] == _this.subject[i].title) {
                  _this.subject[i].active = true;
                }
              }
            }

            for (var i = 0; i < _this.bodyList.length; i++) {
              if (res.data.data.state == _this.bodyList[i].name) {
                _this.bodyList[i].active = true;
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取我的收藏
    getMyStar() {
      let _this = this;
      this.$http
        .post(
          this.url + "/major/collectList",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.fillList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 关注
    dontcare(item) {
      let _this = this;
      this.$http
        .post(
          this.url + "/user/collect",
          {
            majorId: item.id,
            state: 1,
          },
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.$message({
              message: "取消关注成功",
              type: "success",
            });
            _this.getMyStar();
          } else {
            this.$message({
              message: "取消关注失败",
              type: "warning",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    tochange() {
      this.changeFlag = true;
    },

    // 修改个人信息
    surechange() {
      let _this = this;
      this.updateDto.place = this.member.place;
      this.updateDto.year = this.member.year;
      this.updateDto.school = this.member.school;
      let subjects = [];
      for (var i = 0; i < this.subject.length; i++) {
        if (this.subject[i].active == true) {
          subjects.push(this.subject[i].title);
        }
      }
      this.updateDto.subject = subjects.join("/");

      for (var i = 0; i < this.bodyList.length; i++) {
        if (this.bodyList[i].active == true) {
          this.updateDto.state = this.bodyList[i].name;
        }
      }

      if (this.updateDto.year == "") {
        this.$message({
          message: "请填写高考年份",
          type: "warning",
        });
      } else if (this.updateDto.place == "") {
        this.$message({
          message: "请填写高考地区",
          type: "warning",
        });
      } else if (this.updateDto.school == "") {
        this.$message({
          message: "请填写毕业中学",
          type: "warning",
        });
      } else if (this.updateDto.password == "") {
        this.$message({
          message: "请填写账号密码",
          type: "warning",
        });
      } else if (this.updateDto.state == "") {
        this.$message({
          message: "请选择身体状态",
          type: "warning",
        });
      } else if (this.updateDto.subject == "") {
        this.$message({
          message: "请选择高考科目",
          type: "warning",
        });
      } else if (this.subjectNum != 3) {
        this.$message({
          message: "请选择3门高考科目",
          type: "warning",
        });
      } else {
        this.$http
          .post(this.url + "/user/infoUpdate", _this.updateDto, {
            headers: {
              Authorization: _this.token,
            },
          })
          .then(function (res) {
            if (res.data.code == 200) {
              _this.$message({
                message: "修改信息成功",
                type: "success",
              });
              _this.changeFlag = false;
              _this.getMember();
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
    // 切换导航栏
    selectFunction(item) {
      for (var i = 0; i < this.functionList.length; i++) {
        this.functionList[i].active = false;
      }
      item.active = true;
      this.functionType = item.title;
    },
    // 选择高考科目
    selectSubject(item) {
      if (item.active == false && this.subjectNum < 3) {
        this.subjectNum++;
        item.active = true;
      } else if (item.active == true) {
        this.subjectNum--;
        item.active = false;
      }
    },
    // 选择身体状况
    changeBody(item) {
      for (var i = 0; i < this.bodyList.length; i++) {
        this.bodyList[i].active = false;
      }
      item.active = true;
    },
  },
};
</script>

<style scoped lang='less'>
.info {
  padding-bottom: 5rem;
  // 头部区域
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    .logo {
      width: 15rem;
      img {
        width: 100%;
      }
    }
    .back {
      color: #666;
      font-size: 1rem;
    }
  }

  //   功能区域
  .functions {
    display: flex;
    .function {
      width: 50%;
      height: 3rem;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-weight: bolder;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s;
      &:hover {
        font-size: 1.1rem;
      }
      &.active {
        background-color: #427dff;
        color: #fff;
      }
    }
  }

  // 个人信息区域
  .member {
    background-color: #fff;
    margin-top: 4rem;
    position: relative;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 1.5rem 0.5rem #eee;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    label {
      font-size: 0.9rem;
      color: #666;
    }
    .member_province {
      display: flex;
      align-items: center;
      width: 48%;
      height: 3rem;
      margin: 0.5rem 0;
      label {
        width: 20%;
      }
      input {
        width: 80%;
        height: 100%;
        background: transparent;
        border: 0.05rem solid #ccc;
        border-radius: 0.5rem;
        padding-left: 1rem;
      }
    }
    .member_subjects {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 1rem 0;
      label {
        width: 10%;
      }
      .subjects {
        width: 90%;
        display: flex;
        align-items: center;
      }
      .member_subject {
        padding: 0.2rem 0.5rem;
        border: 0.05rem solid #ccc;
        margin-right: 1.5rem;
        border-radius: 0.4rem;
        color: #666;
        cursor: pointer;
        font-size: 0.9rem;
        &.active {
          background-color: #427dff;
          color: #fff;
          border: 0;
        }
      }
    }
    .member_bodys {
      display: flex;
      align-items: center;
      width: 100%;
      label {
        width: 10%;
      }
      .bodys {
        display: flex;
        width: 90%;
      }
      .member_body {
        padding: 0.2rem 0.5rem;
        border: 0.05rem solid #ccc;
        margin-right: 1.5rem;
        border-radius: 0.4rem;
        color: #666;
        font-size: 0.9rem;
        &.active {
          background-color: #427dff;
          color: #fff;
          border: 0;
        }
      }
      input {
        width: 2rem;
        height: 2rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.4rem;
        margin-right: 0.8rem;
        text-align: center;
      }
    }
    .member_phone {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 1rem 0;
      height: 2.5rem;
      label {
        width: 10%;
      }
      input {
        height: 100%;
        width: 40%;
        background: transparent;
        border: 0.05rem solid #ccc;
        border-radius: 0.5rem;
        padding-left: 1rem;
      }
    }
    .member_password {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 1rem 0;
      height: 2.5rem;
      label {
        width: 10%;
      }
      input {
        height: 100%;
        width: 40%;
        background: transparent;
        border: 0.05rem solid #ccc;
        border-radius: 0.5rem;
        padding-left: 1rem;
      }
    }
    .member_change {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      width: 16rem;
      height: 3rem;
      color: #666;
      font-size: 0.9rem;
      border: 0.05rem solid #666;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.4rem;
    }
    .member_sure {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      width: 16rem;
      height: 3rem;
      color: #fff;
      background-color: #427dff;
      font-size: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.4rem;
    }
  }
  .star {
    background-color: #fff;
    margin-top: 4rem;
    position: relative;
    width: 85%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 1.5rem 0.5rem #eee;
    overflow: hidden;
    .fill_right {
      width: 100%;
      .fill_right_tabs {
        display: flex;
        justify-content: space-between;
        background-color: #fafafa;
        .fill_right_tab {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 0.8rem;
          padding: 0.8rem 0;
          &:nth-child(1) {
            width: 10%;
          }
          &:nth-child(2) {
            width: 25%;
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:nth-child(4) {
            width: 15%;
          }
          &:nth-child(5) {
            width: 5%;
          }
          &:nth-child(6) {
            width: 5%;
          }
          &:nth-child(7) {
            width: 5%;
          }
          &:nth-child(8) {
            width: 5%;
          }
          &:nth-child(9) {
            width: 10%;
          }
        }
      }
      .fill_right_list {
        .fill_right_item {
          display: flex;
          justify-content: space-between;
          border-bottom: 0.05rem solid #ccc;
          .fill_right_item_line {
            padding: 1rem 0;
            &:nth-child(1) {
              width: 10%;
              display: flex;
              flex-direction: column;
              align-items: center;
              border-right: 0.05rem solid #ccc;
              h5 {
                font-size: 0.8rem;
                color: #000;
                span {
                  font-size: 1.2rem;
                  font-weight: bolder;
                }
              }
              p {
                font-size: 0.8rem;
                color: #666;
                margin-top: 0.5rem;
              }
              .recom_tag {
                width: 1.2rem;
                height: 1.2rem;
                background: #ff6900;
                color: #fff;
                font-size: 0.7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.5rem;
              }
            }
            &:nth-child(2) {
              width: 25%;
              padding: 1rem 0.7rem;
              h5 {
                font-size: 0.9rem;
              }
              p {
                margin-top: 0.8rem;
                color: #666;
                line-height: 1.5;
                font-size: 0.9rem;
                text-align: justify;
              }
              span {
                display: block;
                margin-top: 0.8rem;
                color: #666;
                font-size: 0.7rem;
                em {
                  color: #333;
                }
              }
            }
            &:nth-child(3) {
              width: 20%;
              padding: 1rem 0.7rem;
              h4 {
                font-size: 1.1rem;
                color: #333;
                font-weight: bolder;
              }
              span {
                display: block;
                margin-top: 0.8rem;
                color: #666;
                font-size: 0.8rem;
              }
              p {
                margin-top: 0.8rem;
                color: #666;
                font-size: 0.7rem;
                em {
                  color: #333;
                }
              }
            }
            &:nth-child(4) {
              width: 15%;
              display: flex;
              flex-direction: column;
              align-items: center;
              border-right: 0.05rem solid #ccc;
              h5 {
                color: #333;
                font-size: 0.8rem;
                span {
                  font-size: 1.2rem;
                  font-weight: bolder;
                }
              }
              p {
                margin-top: 0.8rem;
                color: #666;
                font-size: 0.8rem;
                span {
                  margin: 0 0.5rem;
                }
              }
            }
            &:nth-child(5) {
              width: 5%;
              border-right: 0.05rem solid #ccc;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .fill_item_line_td {
                width: 100%;
                padding: 0.8rem 0;
                display: flex;
                justify-content: center;
                color: #666;
                font-size: 0.7rem;
                border-bottom: 0.05rem solid #ccc;
                &:last-child {
                  border-bottom: 0;
                }
              }
            }
            &:nth-child(6) {
              width: 5%;
              border-right: 0.05rem solid #ccc;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .fill_item_line_td {
                width: 100%;
                padding: 0.8rem 0;
                display: flex;
                justify-content: center;
                color: #666;
                font-size: 0.7rem;
                border-bottom: 0.05rem solid #ccc;
                &:last-child {
                  border-bottom: 0;
                }
              }
            }
            &:nth-child(7) {
              width: 5%;
              border-right: 0.05rem solid #ccc;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .fill_item_line_td {
                width: 100%;
                padding: 0.8rem 0;
                display: flex;
                justify-content: center;
                color: #666;
                font-size: 0.7rem;
                border-bottom: 0.05rem solid #ccc;
                &:last-child {
                  border-bottom: 0;
                }
              }
            }
            &:nth-child(8) {
              width: 5%;
              border-right: 0.05rem solid #ccc;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .fill_item_line_td {
                width: 100%;
                padding: 0.8rem 0;
                display: flex;
                justify-content: center;
                color: #666;
                font-size: 0.7rem;
                border-bottom: 0.05rem solid #ccc;
                &:last-child {
                  border-bottom: 0;
                }
              }
            }
            &:last-child {
              width: 10%;
              display: flex;
              justify-content: center;
              .fill_btn {
                cursor: pointer;
                width: 4rem;
                height: 2rem;
                border: 0.05rem solid #427dff;
                color: #427dff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.9rem;
                font-weight: bolder;
                border-radius: 0.4rem;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .star {
    min-width: 1020px;
    position: relative;
    left: 0;
    transform: translateX(0);
  }
}
@media screen and (max-width: 1100px) {
  .info .member {
    width: 80%;
  }
}
@media screen and (max-width: 720px) {
  .info .member {
    width: 90%;
  }
}
@media screen and (max-width: 500px) {
  .info .member .member_subjects .subjects {
    flex-wrap: wrap;
  }
  .info .member .member_bodys .bodys {
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 420px) {
  .info .member .member_province {
    width: 100%;
  }
  .info .member .member_subjects .member_subject {
    margin-bottom: 0.5rem;
  }
  .info .member .member_subjects label {
    width: 22%;
  }
  .info .member .member_bodys label {
    width: 22%;
  }
  .info .member .member_bodys .member_body {
    margin-bottom: 0.5rem;
  }
  .info .member .member_phone label {
    width: 20%;
  }
  .info .member .member_password label {
    width: 20%;
  }
  .info .member .member_phone input {
    width: 80%;
  }
  .info .member .member_password input {
    width: 80%;
  }
}
</style>