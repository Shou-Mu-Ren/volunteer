<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 背景区域 -->
    <section class="bg_section">
      <div class="bg_search">
        <input
          type="text"
          placeholder="搜索你感兴趣的专业"
          v-model="majorName"
        />
        <button @click="searchMajor">查询</button>
      </div>
    </section>

    <!-- 列表区域 -->
    <section class="list_section">
      <div class="container">
        <div class="list">
          <div class="list_subs">
            <div class="tab">门类</div>
            <div
              class="list_sub"
              v-for="(item, index) in subs"
              :key="index"
              :class="item.active == true ? 'active' : ''"
              @click="changeTab(item)"
            >
              {{ item.title }}
            </div>
          </div>
          <div class="list_items">
            <div class="tab">专业名称</div>
            <div class="list_item">
              <div class="item" v-for="(item, index) in list" :key="index">
                <div class="item_title">
                  {{ item.name }}
                </div>
                <div class="item_other">
                  <span> 专业代码：{{ item.code }} </span>
                  <span> 所属学校：{{ item.universityName }} </span>
                  <span> 学校性质：{{ item.nature }} | {{ item.type }} </span>
                </div>
                <div class="item_open" @click="collect(item)">收藏</div>
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
  name: "FindMajor",
  components: {
    Header,
    Footer,
    Pagination,
  },
  data() {
    return {
      url: "http://47.93.21.24:3001/api",
      token: "",
      subs: [
        {
          title: "本科",
          active: true,
        },
        {
          title: "专科",
          active: false,
        },
      ],
      activeSub: {
        title: "本科",
      },
      majorName: "",
      list: [],
      school: {},
      total: 30,
      pagination: {
        pageSize: 9,
        p: 1,
      },
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("X-token");
    // 获取专业
    this.getMajorList();
  },
  methods: {
    changePage(pager) {
      this.pagination.p = pager.page;
      // 分页器回调
      this.$emit("change", pager);
      this.getMajorList();
    },
    // 获取专业
    getMajorList() {
      let _this = this;
      this.$http
        .post(
          this.url + "/major/find",
          {
            name: _this.majorName,
            level: _this.activeSub.title,
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
            _this.list = res.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 切换门类
    changeTab(item) {
      for (var i = 0; i < this.subs.length; i++) {
        this.subs[i].active = false;
      }
      item.active = true;
      this.activeSub.title = item.title;
      this.getMajorList();
    },
    // 搜索专业
    searchMajor() {
      this.pagination.p = 1;
      this.getMajorList();
    },
    // 收藏
    collect(item) {
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
  },
};
</script>

<style scoped lang="less">
// 背景区域
.bg_section {
  width: 100%;
  height: 10rem;
  background: url("../../assets/uploads/major/bg.png") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .bg_search {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    input {
      width: 40%;
      height: 2.8rem;
      background-color: #fff;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
      border: 0;
      padding-left: 1rem;
    }
    button {
      width: 7%;
      height: 2.8rem;
      background-color: #427dff;
      color: #fff;
      font-weight: bolder;
      border: 0;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }
}

//列表区域
.list_section {
  margin: 2rem 0;
  .tabs {
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: 0.4rem;
    background-color: #fff;
  }
  .list {
    display: flex;
    > div {
      .tab {
        border: 0.05rem solid #ccc;
        line-height: 3rem;
        padding-left: 1rem;
        font-weight: bolder;
        font-size: 1rem;
        background-color: #fff;
      }
      &:nth-child(1) {
        width: 20%;
        background-color: #fff;
      }
      &:nth-child(2) {
        width: 80%;
        border: 0.05rem solid #ccc;
        border-top: 0;
        .list_item {
          padding: 1rem;
        }
        .item {
          position: relative;
          padding: 1.5rem 0;
          border-bottom: 0.05rem solid #ccc;
          &:last-child {
            border-bottom: 0;
          }
          .item_title {
            font-size: 1.5rem;
            font-weight: bolder;
            color: #333;
          }
          .item_other {
            display: flex;
            margin-top: 1.5rem;
            span {
              margin-right: 3rem;
              font-size: 0.9rem;
              color: #666;
            }
          }
          .item_open {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1rem;
            padding: 0.4rem 0.6rem;
            color: #427dff;
            font-weight: bolder;
            font-size: 0.9rem;
            border: 0.05rem solid #427dff;
            border-radius: 0.5rem;
          }
        }
      }
      .list_sub {
        padding: 1rem;
        border: 0.05rem solid #ccc;
        border-top: 0;
        cursor: pointer;
        &.active {
          color: #427dff;
          font-weight: bolder;
        }
      }
      .list_major {
        padding: 1rem;
        border: 0.05rem solid #ccc;
        border-top: 0;
        &.active {
          color: #427dff;
          font-weight: bolder;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .list_section {
    .list {
      flex-wrap: wrap;
      > div {
        &:nth-child(2) {
          .item {
            .item_open {
              transform: translateY(-90%);
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 420px) {
}
</style>