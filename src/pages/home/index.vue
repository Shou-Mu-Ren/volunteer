<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 轮播图 -->
    <section class="banner_section">
      <div class="swiper-container bannerSwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in swiperList"
            :key="index"
          >
            <img :src="item.img" alt="" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper_right">
          <img src="../../assets/uploads/right.png" alt="" />
        </div>
        <div class="swiper_left">
          <img src="../../assets/uploads/left.png" alt="" />
        </div>
      </div>
    </section>

    <!-- 分类区域 -->
    <section class="type_section">
      <div class="container">
        <div class="types">
          <div class="type">
            <span class="iconfont icon-xuexiao"></span>
            <em>热门学校</em>
          </div>
          <div class="type">
            <span class="iconfont icon-renshizhuanye"></span>
            <em>热门专业</em>
          </div>
          <div class="type">
            <span class="iconfont icon-diqu"></span>
            <em>热门地区</em>
          </div>
          <div class="type">
            <span class="iconfont icon-zixun"></span>
            <em>高考咨询</em>
          </div>
        </div>
      </div>
    </section>

    <!-- 学校区域 -->
    <section class="school_section" ref="school_section">
      <div class="container">
        <div class="school">
          <div class="school_hot">
            <div class="school_hot_title">
              <div class="school_hot_title_line"></div>
              热门学校
            </div>
            <div class="school_hot_content">
              <div class="school_hot_content_title">
                {{ hotSchool.name }}
              </div>
              <div class="school_hot_content_tags">
                <div class="school_hot_content_tag">
                  {{ hotSchool.type }}
                </div>
              </div>
              <div class="school_hot_content_img">
                <img :src="hotSchool.img" alt="" />
              </div>
            </div>
          </div>
          <div class="school_list">
            <div class="school_nav">
              <div
                class="school_nav_item"
                :class="schoolType == '本科' ? 'active' : ''"
                @click="changeBenke()"
              >
                本科
              </div>
              <div
                class="school_nav_item"
                :class="schoolType == '专科' ? 'active' : ''"
                @click="changeZhuanke()"
              >
                专科
              </div>
            </div>
            <div class="school_ul">
              <div
                class="school_li"
                v-for="(item, index) in schoolList"
                :key="index"
              >
                <div class="school_li_img">
                  <img :src="item.img" alt="" />
                </div>
                <div class="school_li_msg">
                  <div class="school_li_title">
                    {{ item.name }}
                  </div>
                  <div class="school_li_other">
                    <div class="school_li_tag">
                      {{ item.type }}
                    </div>
                    <div class="school_li_more">查看院校 &gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 专业区域 -->
    <section class="school_section" ref="major_section">
      <div class="container">
        <div class="school">
          <div class="school_hot">
            <div class="school_hot_title">
              <div class="school_hot_title_line"></div>
              热门专业
            </div>
            <div class="school_hot_content">
              <div class="school_hot_content_title">
                {{ hotMajor.name }}
              </div>
              <div class="school_hot_content_tags">
                <div class="school_hot_content_tag">
                  {{ hotMajor.type }}
                </div>
              </div>
              <div class="school_hot_content_img">
                <img :src="hotMajor.img" alt="" />
              </div>
            </div>
          </div>
          <div class="school_list major_list">
            <div class="school_ul">
              <div
                class="school_li"
                v-for="(item, index) in marjotList"
                :key="index"
              >
                <div class="school_li_img">
                  <img :src="item.img" alt="" />
                </div>
                <div class="school_li_msg">
                  <div class="school_li_title">
                    {{ item.name }}
                  </div>
                  <div class="school_li_other">
                    <div class="school_li_tag">
                      {{ item.type }}
                    </div>
                    <div class="school_li_more">查看院校 &gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门地区 -->
    <section class="area_section" ref="area_section">
      <div class="container">
        <div class="area">
          <div class="area_title">
            <div class="area_title_line"></div>
            热门地区
          </div>
          <div class="area_list">
            <div
              class="area_item"
              v-for="(item, index) in areaList"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <p>
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 高考资讯区域 -->
    <section class="volunteer_section" ref="volunteer_section">
      <div class="container">
        <div class="volunteer_title">
          <div class="volunteer_line"></div>
          高考资讯
        </div>
        <div class="volunteer">
          <div class="volunteer_lf">
            <div class="volunteer_lf_img">
              <img src="../../assets/uploads/home/zhiyuan.jpg" alt="" />
            </div>
            <div class="volunteer_lf_location">山东</div>
            <div class="volunteer_lf_li">志愿填报</div>
            <div class="volunteer_lf_li">高校资讯</div>
          </div>
          <div class="volunteer_rt">
            <div
              class="volunteer_item"
              v-for="(item, index) in volunteerList"
              :key="index"
            >
              <div class="volunteer_item_msg">
                <div class="volunteer_item_title">
                  {{ item.content }}
                </div>
                <div class="volunteer_item_other">
                  {{ item.author }} · {{ item.createTime }} ·
                  {{ item.lookCount }}次阅读
                </div>
              </div>
              <div class="volunteer_item_img">
                <img :src="item.img" alt="" />
              </div>
            </div>
            <!-- <Pagination
              @change="changePage"
              :current="pagination.p"
              :pageSize="pagination.pageSize"
              :total="total"
              :showQuickJumper="true"
              :showTotal="true"
              placement="right"
              v-if="pagination && total"
            /> -->
          </div>
        </div>
      </div>
    </section>

    <div class="mask" v-if="maskFlag == true"></div>

    <!-- 高考信息区域 -->
    <div class="message" v-if="messageFlag == true">
      <div class="message_hd">
        <div class="message_title">高考信息填写</div>
        <div class="message_tips">
          请填写真实高考信息，注意点击“开始分析”后，不能修改
        </div>
      </div>
      <div class="message_bd">
        <div class="message_item">
          <div class="message_label">高考省份:</div>
          <div class="message_input">
            <input
              type="text"
              placeholder="请填写高考省份"
              value="山东省"
              disabled="false"
            />
          </div>
        </div>
        <div class="message_item">
          <div class="message_label">高考年份:</div>
          <div class="message_input">
            <input
              type="text"
              placeholder="请填写高考年份"
              v-model="message.year"
            />
          </div>
        </div>
        <div class="message_item">
          <div class="message_label">高考总分:</div>
          <div class="message_input">
            <input
              type="text"
              placeholder="请填写高考总分"
              v-model="message.grand"
            />
          </div>
        </div>
        <div class="message_item">
          <div class="message_label">全省排名:</div>
          <div class="message_input">
            <input
              type="text"
              placeholder="请填写全省排名"
              v-model="message.rank"
            />
          </div>
        </div>
        <div class="message_subjects">
          <div class="message_label">高考选科:</div>
          <div class="subjects">
            <div
              class="message_subject"
              v-for="(item, index) in subjectList"
              :key="index"
              :class="item.active == true ? 'active' : ''"
              @click="changeSubject(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="message_btn" @click="anylyse">
          <div>开始分析</div>
        </div>
      </div>
    </div>

    <!-- 侧边栏区域 -->
    <aside
      class="aside_section"
      @mouseover="asideFlag = true"
      @mouseleave="asideFlag = false"
    >
      <div class="aside" @click="toFill">
        <span class="iconfont icon-tianbao"></span>
        <em v-if="asideFlag == true">热门学校</em>
      </div>
      <div class="aside" @click="tofindshool">
        <span class="iconfont icon-xuexiao"></span>
        <em v-if="asideFlag == true">热门专业</em>
      </div>
      <div class="aside" @click="tofindMajor">
        <span class="iconfont icon-renshizhuanye"></span>
        <em v-if="asideFlag == true">热门地区</em>
      </div>
      <div class="aside" @click="toMember">
        <span class="iconfont icon-gerenzhongxin"></span>
        <em v-if="asideFlag == true">高考资讯</em>
      </div>
      <div class="aside" @click="toTop">
        <span class="iconfont icon-zhiding"></span>
      </div>
    </aside>

    <!-- 尾部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入组件 以及 插件
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Pagination from "@/components/pagenation.vue";

import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Pagination,
  },
  data() {
    return {
      swiperList: [],

      schoolType: "本科",
      hotSchool: {},
      schoolList: [],

      hotMajor: {},
      marjotList: [],

      areaList: [],

      volunteerList: [],

      subjectList: [
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

      maskFlag: true,
      messageFlag: true,

      total: 20,
      pagination: {
        pageSize: 9,
        p: 1,
      },

      url: "http://47.93.21.24:3001/api",
      token: "",
      member: {},
      subjectNum: 0,
      message: {
        year: "",
        grand: "",
        rank: "",
        subject: "",
      },

      asideFlag: false,
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getMemberInfo();
    this.getSchoolList();
    this.getMajorList();
    this.getAreaList();
    this.getBannerList();
    this.getNesList();

    this.$nextTick(() => {
      new Swiper(".bannerSwiper", {
        loop: true,
        autoplay: {
          delay: 5000, //1秒切换一次
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper_right",
          prevEl: ".swiper_left",
        },
        observer: true,
        observeParents: true,
      });
    });
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
            if (res.data.data.grand != null) {
              _this.maskFlag = false;
              _this.messageFlag = false;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取轮播图
    getBannerList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/img/list",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.swiperList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取学校数据
    getSchoolList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/university/heat",
          {
            level: _this.schoolType,
          },
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.schoolList = res.data.data;
            _this.hotSchool = res.data.data[0];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 切换为本科
    changeBenke() {
      this.schoolType = "本科";
      this.getSchoolList();
    },
    // 切换为专科
    changeZhuanke() {
      this.schoolType = "专科";
      this.getSchoolList();
    },

    // 获取专业数据
    getMajorList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/major/heat",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.marjotList = res.data.data;
            _this.hotMajor = res.data.data[0];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取热门地区
    getAreaList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/city/heat",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.areaList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取资讯
    getNesList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/article/list",
          {},
          {
            headers: {
              Authorization: _this.token,
            },
          }
        )
        .then(function (res) {
          if (res.data.code == 200) {
            _this.volunteerList = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    changePage(pager) {
      this.pagination.p = pager.page;
      // 分页器回调
      this.$emit("change", pager);
    },

    // 选择高考科目
    changeSubject(item) {
      if (item.active == false && this.subjectNum < 3) {
        this.subjectNum++;
        item.active = true;
      } else if (item.active == true) {
        this.subjectNum--;
        item.active = false;
      }
    },

    // 填写高考信息
    anylyse() {
      if (this.message.year == "") {
        this.$message({
          message: "请填写高考年份",
          type: "warning",
        });
      } else if (this.message.grand == "") {
        this.$message({
          message: "请填写高考总分",
          type: "warning",
        });
      } else if (this.message.grand == "") {
        this.$message({
          message: "请填写全省排名",
          type: "warning",
        });
      } else {
        let subjects = [];
        for (var i = 0; i < this.subjectList.length; i++) {
          if (this.subjectList[i].active == true) {
            subjects.push(this.subjectList[i].title);
          }
        }
        this.message.subject = subjects.join("/");
        if (this.message.subject == "") {
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
          let _this = this;
          this.$http
            .post(this.url + "/user/analyse", _this.message, {
              headers: {
                Authorization: _this.token,
              },
            })
            .then(function (res) {
              if (res.data.code == 200) {
                _this.$message({
                  message: "消息填写成功",
                  type: "warning",
                });
                _this.getMemberInfo();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },

    toFill() {
      this.$refs.school_section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },

    tofindshool() {
       this.$refs.major_section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },

    tofindMajor() {
       this.$refs.area_section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },

    toMember() {
      this.$refs.volunteer_section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },

    toTop() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style scoped lang='less'>
::v-deep .swiper-pagination-bullet-active {
  background-color: #fff;
}
::v-deep .swiper-pagination-bullet {
  width: 5rem;
  height: 0.2rem;
  border-radius: 0;
}

// 轮播图区域
.banner_section {
  position: relative;
  width: 100%;
  height: 26rem;
  .swiper_right,
  .swiper_left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border: 0.1rem solid #333;
    }
  }
  .swiper_right {
    right: 2rem;
  }
  .swiper_left {
    left: 2rem;
  }
}

// 分类区域
.type_section {
  .types {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 8rem;
    .type {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-0.5rem);
      }
      span {
        color: #666;
        font-size: 2.5rem;
      }
      em {
        color: #666;
        margin-top: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}

// 学校区域
.school_section {
  .school {
    display: flex;
    .school_hot {
      width: 25%;
      .school_hot_title {
        padding-bottom: 0.8rem;
        font-size: 1.2rem;
        font-weight: bolder;
        color: #333;
        display: flex;
        align-items: center;
        .school_hot_title_line {
          width: 0.2rem;
          height: 1rem;
          background-color: #427dff;
          margin-right: 1rem;
        }
      }
      .school_hot_content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 24rem;
        background: rgb(66, 125, 255);
        padding-top: 2rem;
        .school_hot_content_title {
          color: #fff;
          font-size: 1.4rem;
          font-weight: bolder;
        }
        .school_hot_content_tags {
          display: flex;
          margin-top: 1rem;
          .school_hot_content_tag {
            padding: 0.2rem 0.5rem;
            border: 0.05rem solid #fff;
            border-radius: 0.3rem;
            color: #fff;
            font-size: 0.8rem;
            margin: 0 0.5rem;
          }
        }
        .school_hot_content_img {
          width: 10rem;
          height: 10rem;
          margin-top: 4rem;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .school_list {
      padding-top: 0;
      width: 75%;
      &.major_list {
        padding-top: 2rem;
      }
      .school_nav {
        position: relative;
        display: flex;
        align-items: center;
        padding-bottom: 0.8rem;
        font-size: 1.2rem;
        border-bottom: 0.05rem solid #427dff;
        .school_change {
          display: flex;
          align-items: center;
          position: absolute;
          right: 1.5rem;
          top: 0.5rem;
          font-size: 0.7rem;
          color: #427dff;
          font-weight: bolder;
          cursor: pointer;
          transition: all 0.5s;
          &:hover {
            span {
              transform: rotate(120deg);
            }
          }
          span {
            margin-left: 0.5rem;
            transition: all 0.3s;
          }
        }
        .school_nav_item {
          padding: 0 0.5rem;
          font-weight: bolder;
          color: #333;
          margin-right: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #427dff;
          }
          &.active {
            color: #427dff;
          }
        }
      }
      .school_ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 1rem;
        padding-left: 1rem;
        .school_li {
          display: flex;
          align-items: center;
          width: 32%;
          height: 6rem;
          background-color: #fff;
          border-radius: 0.5rem;
          margin-bottom: 2.5rem;
          padding-left: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 0 0.75rem #e6e6e6;
          &:hover {
            transform: translateY(-0.5rem);
          }
          .school_li_img {
            width: 3.5rem;
            img {
              width: 100%;
            }
          }
          .school_li_msg {
            width: 60%;
            margin-left: 1rem;
            .school_li_title {
              font-size: 1rem;
              color: #333;
              font-weight: bolder;
            }
            .school_li_other {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 1rem;
              .school_li_tag {
                padding: 0.2rem 0.4rem;
                border: 1px solid #ccc;
                color: #666;
                font-size: 0.7rem;
                border-radius: 0.2rem;
              }
              .school_li_more {
                color: #666;
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
}

// 热门地区
.area_section {
  .area {
    .area_title {
      padding-bottom: 0.8rem;
      font-size: 1.2rem;
      font-weight: bolder;
      color: #333;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      .area_title_line {
        width: 0.2rem;
        height: 1rem;
        background-color: #427dff;
        margin-right: 1rem;
      }
    }
    .area_list {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .area_item {
        position: relative;
        cursor: pointer;
        width: 24%;
        height: 9.5rem;
        margin-bottom: 1rem;
        overflow: hidden;
        border-radius: 0.5rem;
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s linear;
        }
        p {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3rem;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          font-weight: bolder;
        }
      }
    }
  }
}

// 志愿填报区域
.volunteer_section {
  padding: 4rem 0;
  .volunteer_title {
    padding-bottom: 0.8rem;
    font-size: 1.2rem;
    font-weight: bolder;
    color: #333;
    display: flex;
    align-items: center;
    .volunteer_line {
      width: 0.2rem;
      height: 1rem;
      background-color: #427dff;
      margin-right: 1rem;
    }
  }
  .volunteer {
    display: flex;
    .volunteer_lf {
      width: 25%;
      .volunteer_lf_img {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .volunteer_lf_location {
        display: flex;
        justify-content: center;
        color: #333;
        font-size: 2rem;
        font-family: "STKaiti";
        margin-top: 1.5rem;
        font-weight: bolder;
      }
      .volunteer_lf_li {
        margin: 2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        font-size: 0.9rem;
      }
    }
    .volunteer_rt {
      width: 75%;
      padding-left: 1.5rem;
      .volunteer_item {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 0.05rem solid #ccc;
        &:hover {
          .volunteer_item_msg {
            .volunteer_item_title {
              color: #427dff;
              font-weight: bolder;
            }
          }
        }
        .volunteer_item_msg {
          width: 80%;
          .volunteer_item_title {
            font-size: 1.2rem;
            color: #333;
            transition: all 0.3s;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            /* 设置文本超出部分省略 */
            text-overflow: ellipsis;
          }
          .volunteer_item_other {
            margin-top: 2.5rem;
            font-size: 0.8rem;
            color: #666;
          }
        }
        .volunteer_item_img {
          width: 10rem;
          height: 6rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

// 遮罩层
.mask {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
// 高考信息区域
.message {
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.8rem;
  .message_hd {
    display: flex;
    align-items: center;
    .message_title {
      width: 50%;
      text-align: center;
      font-size: 1.5rem;
      color: #333;
      font-weight: bolder;
    }
    .message_tips {
      width: 50%;
      text-align: center;
      color: #666;
      font-size: 0.8rem;
    }
  }
  .message_bd {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .message_item {
      display: flex;
      align-items: center;
      width: 48%;
      margin-bottom: 1rem;
      .message_label {
        width: 5rem;
        font-size: 0.9rem;
        color: #666;
      }
      .message_input {
        width: 80%;
        height: 2.5rem;
        border: 0.05rem solid #ccc;
        border-radius: 0.5rem;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding-left: 1rem;
          font-size: 0.8rem;
          border: 0;
        }
      }
    }
    .message_subjects {
      .message_label {
        width: 5rem;
        font-size: 0.9rem;
        color: #666;
      }
      width: 100%;
      display: flex;
      align-items: center;
      .subjects {
        display: flex;
        width: 80%;
      }
      .message_subject {
        cursor: pointer;
        padding: 0.4rem 0.6rem;
        border: 0.05rem solid #ccc;
        font-size: 0.8rem;
        color: #666;
        border-radius: 0.4rem;
        margin-right: 1rem;
        &.active {
          background-color: #427dff;
          color: #fff;
        }
      }
    }
    .message_btn {
      display: flex;
      width: 100%;
      margin-top: 2rem;
      justify-content: center;
      div {
        cursor: pointer;
        width: 15rem;
        height: 3rem;
        background-color: #427dff;
        color: #fff;
        font-size: 1rem;
        font-weight: bolder;
        text-align: center;
        line-height: 3rem;
        border-radius: 0.6rem;
      }
    }
  }
}

.aside_section {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  overflow: hidden;
  .aside {
    cursor: pointer;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: all 0.3s;
    em {
      margin-left: 0.25rem;
    }
    background-color: rgba(0, 0, 0, 0.9);
    &:hover {
      background-color: #427dff;
    }
  }
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 1000px) {
  .message {
    width: 70%;
  }
}
@media screen and (max-width: 910px) {
  .school_section {
    .school {
      .school_list {
        .school_ul {
          .school_li {
            width: 32%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 850px) {
  .school_section {
    .school {
      .school_list {
        .school_ul {
          .school_li {
            width: 45%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 790px) {
  .message {
    width: 80%;
  }
}
@media screen and (max-width: 710px) {
  .type_section {
    .types {
      padding: 2rem 4rem;
    }
  }
  .area_section {
    .area {
      .area_list {
        .area_item {
          width: 45%;
        }
      }
    }
  }
}
@media screen and (max-width: 660px) {
  .message {
    width: 90%;
  }
  .school_section {
    .school {
      .school_list {
        .school_ul {
          .school_li {
            width: 48%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .school_section {
    .school {
      justify-content: center;
      flex-wrap: wrap;
      .school_hot {
        width: 90%;
      }
      .school_list {
        width: 90%;
        .school_ul {
          .school_li {
            width: 48%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 560px) {
  .type_section {
    .types {
      padding: 2rem;
    }
  }
  .volunteer_section {
    .volunteer {
      flex-wrap: wrap;
      .volunteer_lf {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .volunteer_lf_img {
          width: 60%;
        }
        .volunteer_lf_location {
          margin: 0;
          align-items: center;
        }
        .volunteer_lf_li {
          margin: 0;
        }
      }
      .volunteer_rt {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .message {
    .message_bd {
      .message_item {
        width: 100%;
        .message_input {
          height: 3.4rem;
        }
      }

      .message_subjects {
        align-items: flex-start;
        .subjects {
          flex-wrap: wrap;
        }
        .message_subject {
          margin-bottom: 0.6rem;
        }
      }
    }
  }
  .school_section {
    .school {
      .school_hot {
        width: 90%;
      }
      .school_list {
        width: 90%;
        .school_ul {
          .school_li {
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .message {
    .message_bd {
      .message_item {
        .message_label {
          width: 6rem;
        }
      }
      .message_subjects {
        .message_label {
          width: 6rem;
        }
      }
    }
  }
}
</style>