<template>
  <footer class="footer_section">
    <div class="container">
      <div class="footer">
        <div class="footer_title">
          <h2>系统使用说明</h2>
        </div>
        <div class="footer_con">
          <p>
            1、本查询系统的信息仅供参考，具体数据请以学校官网或考试院公布为准。
          </p>
          <p>2、本站数据未经授权严禁转载，违者将依法追究责任。</p>
          <p>
            3、如对本系统或相关服务有任何疑问，可发送邮件至：lijin@eol.cn，或拨打电话400-0678-211，也可点击
            <span>【意见反馈】</span> 反馈于我们。
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.footer_section {
  .footer {
    background-color: hsla(0, 0%, 98%, 1);
    padding: 1rem;
    .footer_title {
      h2 {
        color: #333;
        font-size: 1.2rem;
      }
    }
    .footer_con {
      width: 60%;
      p {
        margin: 0.6rem 0;
        font-size: 0.9rem;
        color: #666;
        line-height: 2;
        span {
          color: #427dff;
          font-weight: bolder;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
  }
  .footer_section {
    .footer {
      .footer_con {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 991px) {
}
@media screen and (max-width: 500px) {
}
@media screen and (max-width: 420px) {
}
</style>