<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 背景区域 -->
    <section class="bg_section">院校库</section>

    <!-- 学校区域 -->
    <section class="school_section">
      <div class="container">
        <div class="school">
          <div class="school_lf">
            <div class="school_lf_select">
              <div class="select_hd">
                <div class="select_input">
                  <input
                    type="text"
                    placeholder="搜索您感兴趣的学校"
                    v-model="searchContent"
                  />
                  <button @click="search">搜索</button>
                </div>
                <span> 注：本名单未包含港澳台地区高等学校 </span>
              </div>
              <div class="select_bd">
                <div
                  class="select_item"
                  v-for="(item, index) in schoolList"
                  :key="index"
                >
                  <div class="select_item_img">
                    <img :src="item.img" alt="" />
                  </div>
                  <div class="select_item_msg">
                    <div class="select_item_title">
                      {{ item.name }}
                      <span>
                        {{ item.cityName }}
                      </span>
                    </div>
                    <div class="select_item_detail">
                      {{ item.nature }} | {{ item.type }} |
                      {{ item.f985 == 1 ? "985 ｜" : "" }}
                      {{ item.f211 == 1 ? "211" : "" }}
                    </div>
                  </div>
                  <div class="select_item_sort">全国考分 第{{ index + 1 }}</div>
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
          <div class="school_rt">
            <div class="school_rt_title">
              <img src="../../assets/uploads/school/hot.png" alt="" />
              全国考分排行榜
            </div>
            <div class="school_rt_list">
              <div class="school_rt_item">
                <img src="../../assets/uploads/school/1.png" alt="" />
                清华大学
              </div>
              <div class="school_rt_item">
                <img src="../../assets/uploads/school/2.png" alt="" />
                北京大学
              </div>
              <div class="school_rt_item">
                <img src="../../assets/uploads/school/3.png" alt="" />
                复旦大学
              </div>
              <div class="school_rt_item">
                <span>4</span>
                中国科学院大学
              </div>
              <div class="school_rt_item">
                <span> 5 </span>
                中国人民大学
              </div>
              <div class="school_rt_item">
                <span> 6 </span>
                上海交通大学
              </div>
              <div class="school_rt_item">
                <span> 7 </span>
                北京大学医学部
              </div>
              <div class="school_rt_item">
                <span> 8 </span>
                中国科学技术大学
              </div>
              <div class="school_rt_item">
                <span> 9 </span>
                上海交通大学医学院
              </div>
              <div class="school_rt_item">
                <span> 10 </span>
                南京大学
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
import Pagination from "@/components/pagenation.vue";
export default {
  name: "FindSchool",
  components: {
    Header,
    Footer,
    Pagination,
  },
  data() {
    return {
      url: "http://47.93.21.24:3001/api",
      token: "",
      searchContent: "",
      schoolList: [],
      total: 30,
      pagination: {
        pageSize: 9,
        p: 1,
      },
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    this.getSchoolList();
  },
  methods: {
    changePage(pager) {
      this.pagination.p = pager.page;
      // 分页器回调
      this.$emit("change", pager);
      this.getSchoolList();
    },
    // 搜索
    search() {
      this.pagination.p = 1;
      this.getSchoolList();
    },
    // 获取学校列表
    getSchoolList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/university/list",
          {
            name: _this.searchContent,
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
            _this.schoolList = res.data.data;
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
// 背景区域
.bg_section {
  width: 100%;
  height: 10rem;
  background: url("../../assets/uploads/school/bg.png") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bolder;
  font-size: 1.8rem;
}
// 学校区域
.school_section {
  margin: 2rem 0;
  .school {
    display: flex;
    justify-content: space-between;
    .school_lf {
      width: 80%;
      .school_lf_select {
        background-color: #fbfbfb;
        border: 0.05rem solid #efefef;
        border-radius: 0.8rem;
        padding: 1rem 2rem;
        .select_hd {
          display: flex;
          align-items: center;
          .select_input {
            position: relative;
            display: flex;
            align-items: center;
            width: 25rem;
            height: 2.5rem;
            border: 0.05rem solid #ccc;
            border-radius: 0.4rem;
            input {
              width: 100%;
              height: 100%;
              border: 0;
              padding-left: 1rem;
              background: transparent;
            }
            button {
              position: absolute;
              right: -0.2rem;
              width: 5rem;
              height: 2.6rem;
              background-color: #427dff;
              color: #fff;
              border: 0;
              border-radius: 0.4rem;
            }
          }
          span {
            color: #666;
            font-size: 0.9rem;
            margin-left: 1.5rem;
          }
        }
        .select_bd {
          margin-top: 1rem;
          .select_item {
            cursor: pointer;
            position: relative;
            border-bottom: 0.05rem solid #ccc;
            padding: 2rem 0;
            display: flex;
            &:hover {
              .select_item_msg {
                .select_item_title {
                  color: #427dff;
                }
              }
            }
            .select_item_img {
              width: 5rem;
              height: 5rem;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .select_item_msg {
              width: 80%;
              margin-left: 1rem;
              .select_item_title {
                display: flex;
                align-items: center;
                color: #333;
                font-size: 1.5rem;
                font-weight: bolder;
                transition: all 0.3s;
                span {
                  font-weight: 400;
                  color: #666;
                  font-size: 0.9rem;
                  margin-left: 2rem;
                }
              }
              .select_item_detail {
                margin-top: 1rem;
                color: #666;
                font-size: 0.9rem;
              }
            }
            .select_item_sort {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              color: #666;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
    .school_rt {
      width: 18%;
      background-color: #fbfbfb;
      border: 0.05rem solid #efefef;
      border-radius: 0.8rem;
      padding: 1rem;
      .school_rt_title {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 1.2rem;
        font-weight: bolder;
        border-bottom: 0.05rem solid #ccc;
        padding-bottom: 1rem;
        img {
          width: 1rem;
          height: 1rem;
          object-fit: cover;
          margin-right: 0.5rem;
        }
      }
      .school_rt_list {
        margin-top: 1rem;
        .school_rt_item {
          display: flex;
          align-items: center;
          margin: 0.6rem 0;
          cursor: pointer;
          img {
            width: 1rem;
            height: 1rem;
            object-fit: cover;
            margin-right: 0.6rem;
          }
          span {
            display: block;
            font-size: 1rem;
            color: #333;
            width: 1rem;
            text-align: center;
            margin-right: 0.6rem;
          }
          color: #666;
          font-size: 0.8rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
  }
}
@media screen and (max-width: 700px) {
  .school_section .school .school_lf {
    width: 70%;
  }
  .school_section .school .school_rt {
    width: 25%;
  }
  .school_section
    .school
    .school_lf
    .school_lf_select
    .select_bd
    .select_item
    .select_item_msg {
    width: 50%;
  }
}
@media screen and (max-width: 600px) {
  .school_section .school .school_lf .school_lf_select .select_hd {
    flex-wrap: wrap;
  }
  .school_section
    .school
    .school_lf
    .school_lf_select
    .select_hd
    .select_input {
    width: 100%;
    margin-bottom: 0.7rem;
  }
  .school_section .school .school_lf {
    width: 70%;
  }
  .school_section .school .school_rt {
    width: 25%;
  }
  .school_section
    .school
    .school_lf
    .school_lf_select
    .select_bd
    .select_item
    .select_item_msg {
    width: 50%;
  }
}
@media screen and (max-width: 450px) {
  .school_section .school {
    flex-wrap: wrap;
    justify-content: center;
  }
  .school_section .school .school_lf {
    width: 100%;
  }
  .school_section .school .school_rt {
    width: 50%;
    margin-top: 1rem;
  }
}
</style>