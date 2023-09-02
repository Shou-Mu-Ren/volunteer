<template>
  <div :class="[`m-pagination`, { hidden: hideOnSinglePage && total<=pageSize }]">
    <div class="m-pagination-wrap">
      <span class="u-item" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)">
        上一页
      </span>
      <span :class="['u-item', { active: currentPage === 1 }]" @click="changePage(1)">1</span>
      <span
        class="m-arrow"
        ref="forward"
        v-show="forwardMore"
        @click="onForward"
        @mouseenter="forwardArrow = true"
        @mouseleave="forwardArrow = false">
        <span v-show="!forwardArrow" class="u-ellipsis">···</span>
        <svg v-show="forwardArrow" class="u-icon" viewBox="64 64 896 896" data-icon="double-left" aria-hidden="true" focusable="false"><path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path></svg>
      </span>
      <span :class="['u-item', { active: currentPage === page }]" v-show="page!==1 && page!==totalPage" v-for="(page, index) in pageList" :key="index" @click="changePage(page)">{{ page }}</span>
      <span
        class="m-arrow"
        ref="backward"
        v-show="backwardMore"
        @click="onBackward"
        @mouseenter="backwardArrow = true"
        @mouseleave="backwardArrow = false">
        <span v-show="!backwardArrow" class="u-ellipsis">•••</span>
        <svg v-show="backwardArrow" class="u-icon" viewBox="64 64 896 896" data-icon="double-right" aria-hidden="true" focusable="false"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path></svg>
      </span>
      <span v-show="totalPage!==1" :class="['u-item', { active: currentPage === totalPage }]" @click="changePage(totalPage)">{{ totalPage }}</span>
      <span class="u-item" :class="{ disabled: currentPage === totalPage }" @click="changePage(currentPage + 1)">
          下一页
      </span>
      <span class="u-jump-page" v-if="showQuickJumper">跳转至<input type="text" v-model="jumpNumber" />页</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageListNum: {
      type: Number,
      default: 5
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      currentPage: this.current,
      jumpNumber: '',
      forwardMore: false,
      backwardMore: false,
      forwardArrow: false,
      backwardArrow: false 
    }
  },
  computed: {
    totalPage () { 
      return Math.ceil(this.total / this.pageSize) 
    },
    pageList () { 
      return this.dealPageList(this.currentPage)
    }
  },
  watch: {
    current (to) {
      this.currentPage = to
    },
    currentPage (to) {
      this.loading = true
      this.$emit('change', {
        page: to,
        pageSize: this.pageSize
      })
    }
  },
  created () {
    // 监听键盘Enter按键
    document.onkeydown = (e) => {
      const ev = e || window.event
      if (ev && ev.keyCode === 13 && this.jumpNumber) {
        this.jumpPage(this.jumpNumber)
      }
    }
  },
  methods: {
    dealPageList (curPage) {
      var resList = []
      var offset = Math.floor(this.pageListNum / 2) // 向下取整
      var pager = {
        start: curPage - offset,
        end: curPage + offset
      }
      if (pager.start < 1) {
        pager.end = pager.end + (1 - pager.start)
        pager.start = 1
      }
      if (pager.end > this.totalPage) {
        pager.start = pager.start - (pager.end - this.totalPage)
        pager.end = this.totalPage
      }
      if (pager.start < 1) {
        pager.start = 1
      }
      if (pager.start > 1) {
        this.forwardMore = true
      } else {
        this.forwardMore = false
      }
      if (pager.end < this.totalPage) {
        this.backwardMore = true
      } else {
        this.backwardMore = false
      }
      for (let i = pager.start; i <= pager.end; i++) {
        resList.push(i)
      }
      return resList
    },
    onForward () {
      this.currentPage = this.currentPage - this.pageListNum > 0 ? this.currentPage - this.pageListNum : 1
    },
    onBackward () {
      this.currentPage = this.currentPage + this.pageListNum < this.totalPage ? this.currentPage + this.pageListNum : this.totalPage
    },
    jumpPage (jumpNum) {
      if (Number(jumpNum)) {
        if (Number(jumpNum) < 1) {
          jumpNum = 1
        }
        if (Number(jumpNum) > this.totalPage) {
          jumpNum = this.totalPage
        }
        this.changePage(Number(jumpNum))
      }
      this.jumpNumber = '' // 清空跳转输入框
    },
    changePage (pageNum) {
      if (pageNum === 0 || pageNum === this.totalPage + 1) {
        return false
      }
      if (this.currentPage !== pageNum) {
        this.currentPage = pageNum
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-pagination {
  margin: 16px auto;
  text-align: center;
  margin-top: 50px;
}
.hidden {
  display: none;
}
.m-pagination-wrap {
  display: inline-block;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  .mr8 {
    margin-right: 8px;
  }
  .u-item {
    min-width: 30px;
    height: 42px;
    padding: 0 17px;
    display: inline-block;
    user-select: none; // 禁止选取文本
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s;
    color: #000;
    background-color: #fff;
    &:hover {
      .active();
    }
    .u-arrow {
      fill: rgba(0, 0, 0, 0.65);
      width: 12px;
      height: 12px;
      transition: all .3s;
    }
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .active { // 悬浮/选中样式
    font-weight: 500;
        border: 1px solid #000;
    .u-arrow {
      fill: #000;
    }
  }
  .disabled {
    // pointer-events: none; // 禁用鼠标事件
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    border-color: #d9d9d9;
    cursor: not-allowed;
    &:hover {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      border-color: #000;
      .u-arrow {
        fill: rgba(0, 0, 0, 0.25);
      }
    }
    .u-arrow {
      fill: rgba(0, 0, 0, 0.25);
    }
  }
  .m-arrow {
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    min-width: 42px;
    height: 42px;
    letter-spacing: 2px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
    transition: all .3s;
    cursor: pointer;
    .u-ellipsis {
      transition: all .3s;
    }
    .u-icon {
      fill: #000;
      width: 12px;
      height: 12px;
    }
  }
  .u-jump-page {
    margin-left: 8px;
    line-height: 32px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    input {
      vertical-align: top;
      width: 42px;
      height: 42px;
      padding: 5px 11px;
      margin: 0 8px;
      background-color: #fff;
      border-radius: 4px;
      text-align: left;
      outline: none;
      transition: all 0.3s;
      border: 0;
      &:hover {
        border: 1px solid #000
      }
      &:focus {
        border: 1px solid #000;
      }
    }
  }
}
</style>