"use strict";(self["webpackChunkproject"]=self["webpackChunkproject"]||[]).push([[805],{9805:function(e,t,s){s.r(t),s.d(t,{default:function(){return r}});var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login"},[e._m(0),t("div",{staticClass:"login_form"},[t("div",{staticClass:"login_tabs"},e._l(e.tabList,(function(s,o){return t("div",{key:o,staticClass:"login_tab",class:1==s.active?"active":"",on:{click:function(t){return e.selectTab(s)}}},[e._v(" "+e._s(s.name)+" "),t("div",{staticClass:"login_tab_line"})])})),0),t("div",{staticClass:"login_msg"},[e._v(" 我们将根据你的报考信息，为你推荐了一些院校，现在需要你登录，以便保存的你报考志愿。 ")]),"短信登录"==e.tabType?t("div",{staticClass:"login_code_form"},[t("div",{staticClass:"phone"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneDto.phone,expression:"phoneDto.phone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.phoneDto.phone},on:{input:function(t){t.target.composing||e.$set(e.phoneDto,"phone",t.target.value)}}})]),t("div",{staticClass:"code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneDto.code,expression:"phoneDto.code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.phoneDto.code},on:{input:function(t){t.target.composing||e.$set(e.phoneDto,"code",t.target.value)}}}),t("div",{directives:[{name:"show",rawName:"v-show",value:0==e.codeFlag,expression:"codeFlag == false"}],staticClass:"require_code",on:{click:function(t){return e.requireCode()}}},[e._v(" 获取验证码 ")]),t("div",{directives:[{name:"show",rawName:"v-show",value:1==e.codeFlag,expression:"codeFlag == true"}],staticClass:"require_code"},[e._v(" "+e._s(e.codeTime)+"s后获取 ")])]),t("div",{staticClass:"code_login",on:{click:function(t){return e.phonelogin()}}},[e._v("登录")])]):e._e(),"账号登录"==e.tabType?t("div",{staticClass:"login_psd_form"},[t("div",{staticClass:"phone"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.psdDto.phone,expression:"psdDto.phone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.psdDto.phone},on:{input:function(t){t.target.composing||e.$set(e.psdDto,"phone",t.target.value)}}})]),t("div",{staticClass:"password"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.psdDto.password,expression:"psdDto.password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:e.psdDto.password},on:{input:function(t){t.target.composing||e.$set(e.psdDto,"password",t.target.value)}}})]),t("div",{staticClass:"other"},[t("div",{staticClass:"forget",on:{click:e.forgetPassword}},[e._v("忘记密码")])]),t("div",{staticClass:"psd_login",on:{click:function(t){return e.login()}}},[e._v("登录")])]):e._e(),e._m(1)])])},a=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"login_logo"},[t("img",{attrs:{src:s(6949),alt:""}})])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"code_login_tip"},[t("input",{attrs:{type:"checkbox",checked:"true"}}),e._v(" 未注册手机登录时会自动创建新账号，我已阅读并同意 "),t("span",[e._v("服务协议")]),e._v(" 和 "),t("span",[e._v("隐私权条款")])])}],i=(s(7658),{name:"Login",data(){return{url:"http://47.93.21.24:3001/api",tabType:"短信登录",codeTime:60,codeFlag:!1,tabList:[{name:"短信登录",active:!0},{name:"账号登录",active:!1}],phoneDto:{phone:"",code:""},psdDto:{phone:"",password:""}}},methods:{selectTab(e){for(var t=0;t<this.tabList.length;t++)this.tabList[t].active=!1;this.tabType=e.name,e.active=!0},forgetPassword(){this.$router.push({name:"forget"})},requireCode(){let e=this;""==this.phoneDto.phone?this.$message({message:"请填写手机号",type:"warning"}):(this.codeFlag=!0,this.timer=setInterval((()=>{this.codeTime>0?this.codeTime--:(this.codeTime=60,clearInterval(this.timer))}),1e3),this.$http.post(this.url+"/user/sendCode",{phone:this.phoneDto.phone}).then((function(t){200==t.data.code?e.$message({message:t.data.msg,type:"success"}):e.$message({message:t.data.msg,type:"warning"})})).catch((function(e){console.log(e)})))},phonelogin(){let e=this;""==this.phoneDto.phone?this.$message({message:"请填写手机号",type:"warning"}):""==this.phoneDto.code?this.$message({message:"请填写验证码",type:"warning"}):this.$http.post(this.url+"/user/loginByCode",{phone:this.phoneDto.phone,code:this.phoneDto.code}).then((function(t){200==t.data.code?(window.localStorage.setItem("X-token",t.data.data.token),e.$message({message:"登录成功",type:"success"}),setTimeout((()=>{e.$router.push({name:"index"})}),1e3)):e.$message({message:t.data.msg,type:"warning"})})).catch((function(e){console.log(e)}))},login(){let e=this;""==this.psdDto.phone?this.$message({message:"请填写手机号",type:"warning"}):""==this.psdDto.password?this.$message({message:"请填写密码",type:"warning"}):this.$http.post(this.url+"/user/loginByPassword",{phone:this.psdDto.phone,password:this.psdDto.password}).then((function(t){console.log(t),200==t.data.code?(window.localStorage.setItem("X-token",t.data.data.token),e.$message({message:"登录成功",type:"success"}),setTimeout((()=>{e.$router.push({name:"index"})}),1e3)):e.$message({message:t.data.msg,type:"warning"})})).catch((function(e){console.log(e)}))}}}),n=i,c=s(1001),p=(0,c.Z)(n,o,a,!1,null,"4780ba80",null),r=p.exports},6949:function(e,t,s){e.exports=s.p+"img/logo.57580444.png"}}]);
//# sourceMappingURL=805.3f51019d.js.map