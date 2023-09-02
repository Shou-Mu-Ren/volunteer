<template>
  <div class="fill_section">
    <!-- 头部组件 -->
    <Header></Header>

    <div class="container2">
      <div class="fill">
        <div class="fill_aside">
          <div class="fill_school_title">
            <span class="iconfont icon-xuexiao"></span>
            筛选学校
          </div>
          <div class="fill_school_input">
            <input
              type="text"
              placeholder="输入意向学校名"
              v-model="schoolContent"
              @keydown.enter="searchSchool"
            />
          </div>
          <div class="fill_school_list">
            <div
              class="fill_school_item"
              @mouseover="selectScreen1()"
              @mouseleave="leaveScreen1()"
            >
              所在地
              <span class="iconfont icon-gengduo"></span>
              <div class="fill_school_item_mask" v-if="cityFlag == true">
                <h4>省份:</h4>
                <p>
                  <em
                    v-for="(item, index) in provinceList"
                    :key="index"
                    :class="activeProvince.name == item.name ? 'active' : ''"
                    @click="changeProvince(item)"
                    >{{ item.name }}</em
                  >
                </p>
                <h4>城市:</h4>
                <p>
                  <em v-for="(item, index) in cityList" :key="index">
                    {{ item.name }}
                  </em>
                </p>
              </div>
            </div>
            <div
              class="fill_school_item"
              @mouseover="selectScreen2()"
              @mouseleave="leaveScreen2()"
            >
              学校层次
              <span class="iconfont icon-gengduo"></span>
              <div class="fill_school_item_mask" v-if="cengciFlag == true">
                <p>
                  <em @click="selectBen" :class="activeCenci == '本科'"
                    >本科</em
                  >
                  <em @click="selectZhuan" :class="activeCenci == '专科'"
                    >专科</em
                  >
                </p>
              </div>
            </div>
            <div
              class="fill_school_item"
              @mouseover="selectScreen4()"
              @mouseleave="leaveScreen4()"
            >
              学校类型
              <span class="iconfont icon-gengduo"></span>
              <div class="fill_school_item_mask" v-if="schoolType == true">
                <p>
                  <em v-for="(item, index) in schoolTypeList" :key="index">{{
                    item
                  }}</em>
                </p>
              </div>
            </div>
          </div>
          <div class="fill_major_title">
            <span class="iconfont icon-renshizhuanye"></span>
            筛选专业
          </div>
          <div class="fill_major_input">
            <input
              type="text"
              placeholder="输入意向专业"
              v-model="majorcontent"
              @keydown.enter="searchMajor"
            />
          </div>
          <div class="fill_major_list">
            <div
              class="fill_major_item"
              @mouseover="selectScreen3()"
              @mouseleave="leaveScreen3()"
            >
              专业层次
              <span class="iconfont icon-gengduo"></span>
              <div class="fill_school_item_mask" v-if="majorFlag == true">
                <p>
                  <em> 本科 </em>
                  <em> 专科 </em>
                </p>
              </div>
            </div>
          </div>
        </div>
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
                <div class="fill_btn" @click="care(item)">收藏</div>
              </div>
            </div>
            <Pagination
              @change="changePage"
              :current="pagination.p"
              :pageSize="pagination.pageSize"
              :total="total"
              :showQuickJumper="true"
              :showTotal="true"
              placement="right"
              v-if="pagination && total"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 尾部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件 以及 插件
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Pagination from "@/components/pagenation.vue";
export default {
  name: "Fill",
  components: {
    Header,
    Footer,
    Pagination,
  },
  data() {
    return {
      // 筛选学校
      cityFlag: false,
      cengciFlag: false,
      schoolType: false,
      //  筛选专业
      majorFlag: false,
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
      url: "http://47.93.21.24:3001/api",
      token: "",
      provinceList: [],
      activeProvince: {},
      activeCenci: "本科",
      schoolTypeList: [],
      cityList: [],
      schoolContent: "",
      majorcontent: "",

      fillList: [],
      total: 30,
      pagination: {
        pageSize: 9,
        p: 1,
      },
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getProvince();
    this.getSchoolType();
    this.getFillList();
  },
  methods: {
    // 获取省份
    getProvince() {
      let _this = this;
      this.$http
        .post(
          this.url + "/province/list",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].active = false;
            }
            _this.provinceList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取学校类型
    getSchoolType() {
      let _this = this;
      this.$http
        .get(this.url + "/university/type", {
          headers: {
            Authorization: _this.token,
          },
        })
        .then(function (res) {
          if (res.data.code == 200) {
            _this.schoolTypeList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取城市
    getCityList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/city/list",
          {
            provinceName: _this.activeProvince.name,
          },
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.cityList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 筛选省份
    changeProvince(item) {
      this.activeProvince = item;
      this.getCityList();
    },

    // 筛选学校层次
    selectBen() {
      this.activeCenci = "本科";
    },

    // 筛选学校层次
    selectZhuan() {
      this.activeCenci = "本科";
    },

    changePage(pager) {
      this.pagination.p = pager.page;
      // 分页器回调
      this.$emit("change", pager);
      this.getFillList();
    },

    // 获取填充列表
    getFillList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/major/find",
          {
            name: _this.majorName,
            level: _this.activeCenci,
            pageSize: _this.pagination.p,
            pageNum: _this.pagination.pageSize,
          },
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.total = res.data.count;
            _this.fillList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 关注
    care(item) {
      let _this = this;
      this.$http
        .post(
          this.url + "/user/collect",
          {
            majorId: item.id,
            state: 0,
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
                  message: "收藏成功",
                  type: "success",
                });
          } else {
            this.$message({
              message: "收藏失败",
              type: "warning",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 搜索学校
    searchSchool() {
      this.majorName = this.schoolContent;
      this.getFillList();
    },

    // 搜索专业
    searchMajor() {
      this.majorName = this.majorcontent;
      this.getFillList();
    },

    selectScreen1() {
      this.cityFlag = true;
    },
    leaveScreen1() {
      this.cityFlag = false;
    },
    selectScreen2() {
      this.cengciFlag = true;
    },
    leaveScreen2() {
      this.cengciFlag = false;
    },
    selectScreen4() {
      this.schoolType = true;
    },
    leaveScreen4() {
      this.schoolType = false;
    },
    selectScreen3() {
      this.majorFlag = true;
    },
    leaveScreen3() {
      this.majorFlag = false;
    },
  },
};
</script>

<style lang="less">
.container2 {
  width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
}
// 筛选学校区域
.fill {
  display: flex;
  justify-content: space-between;
  padding-top: 2.5rem;
  //   筛选功能左侧
  .fill_aside {
    width: 15%;
    background-color: #fff;
    box-shadow: 0 0 1rem 0.8rem #eee;
    border-radius: 0.5rem;
    padding: 0.6rem;
    // 筛选学校
    .fill_school_title {
      width: 100%;
      height: 3rem;
      border-radius: 0.5rem;
      background: rgba(68, 185, 121, 0.1);
      color: #44b979;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-right: 0.5rem;
      }
    }
    .fill_school_input {
      width: 100%;
      height: 2rem;
      border: 0.05rem solid #ccc;
      border-radius: 0.4rem;
      margin-top: 1rem;
      input {
        background: transparent;
        width: 100%;
        height: 100%;
        border: 0;
        padding-left: 0.6rem;
      }
    }
    .fill_school_list {
      .fill_school_item {
        position: relative;
        cursor: pointer;
        padding: 1rem;
        border-bottom: 0.05rem solid #ccc;
        font-size: 0.9rem;
        font-weight: bolder;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fill_school_item_mask {
          position: absolute;
          min-width: 30rem;
          max-width: 40rem;
          padding: 2rem;
          left: 100%;
          top: 0;
          background-color: #fff;
          border-radius: 0.8rem;
          box-shadow: 0 0 2rem 0 #ccc;
          h4 {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #333;
          }
          p {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
            em {
              margin: 0.5rem 1rem;
              color: #666;
              &.active {
                color: #427dff;
              }
            }
          }
        }
        &:hover {
          span {
            transform: translateX(0.6rem);
          }
        }
        span {
          font-size: 0.7rem;
          transition: all 0.3s;
        }
      }
    }

    // 筛选专业
    .fill_major_title {
      width: 100%;
      height: 3rem;
      border-radius: 0.5rem;
      background: rgba(255, 105, 0, 0.1);
      color: #ff6900;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
      span {
        margin-right: 0.5rem;
      }
    }
    .fill_major_input {
      width: 100%;
      height: 2rem;
      border: 0.05rem solid #ccc;
      border-radius: 0.4rem;
      margin-top: 1rem;
      input {
        background: transparent;
        width: 100%;
        height: 100%;
        border: 0;
        padding-left: 0.6rem;
      }
    }
    .fill_major_list {
      padding: 0 1rem;
      .fill_major_item {
        position: relative;
        cursor: pointer;
        padding: 1rem 0;
        border-bottom: 0.05rem solid #ccc;
        font-size: 0.9rem;
        font-weight: bolder;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fill_school_item_mask {
          position: absolute;
          min-width: 20rem;
          max-width: 40rem;
          padding: 2rem;
          left: 120%;
          top: 0;
          background-color: #fff;
          border-radius: 0.8rem;
          box-shadow: 0 0 2rem 0 #ccc;
          h4 {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: #333;
          }
          p {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.8rem;
            em {
              margin: 0 1rem;
              color: #666;
            }
          }
        }
        &:hover {
          span {
            transform: translateX(0.6rem);
          }
        }
        span {
          font-size: 0.7rem;
          transition: all 0.3s;
        }
      }
    }
  }
  // 筛选功能右侧
  .fill_right {
    width: 82%;
    background-color: #fff;
    box-shadow: 0 0 1rem 0.8rem #eee;
    border-radius: 0.5rem;
    overflow: hidden;

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
@media screen and (max-width: 1200px) {
}
@media screen and (max-width: 991px) {
}
@media screen and (max-width: 500px) {
}
@media screen and (max-width: 420px) {
}
</style>