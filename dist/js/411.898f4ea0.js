"use strict";(self["webpackChunkproject"]=self["webpackChunkproject"]||[]).push([[411],{8411:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"forget"},[e._m(0),t("div",{staticClass:"forget_form"},[t("div",{staticClass:"phone"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.forgetDto.phone,expression:"forgetDto.phone"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:e.forgetDto.phone},on:{input:function(t){t.target.composing||e.$set(e.forgetDto,"phone",t.target.value)}}})]),t("div",{staticClass:"code"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.forgetDto.code,expression:"forgetDto.code"}],attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.forgetDto.code},on:{input:function(t){t.target.composing||e.$set(e.forgetDto,"code",t.target.value)}}}),t("div",{directives:[{name:"show",rawName:"v-show",value:0==e.codeFlag,expression:"codeFlag == false"}],staticClass:"require_code",on:{click:function(t){return e.requireCode()}}},[e._v(" 获取验证码 ")]),t("div",{directives:[{name:"show",rawName:"v-show",value:1==e.codeFlag,expression:"codeFlag == true"}],staticClass:"require_code"},[e._v(" "+e._s(e.codeTime)+"s后获取 ")])]),t("div",{staticClass:"password"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.forgetDto.password,expression:"forgetDto.password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:e.forgetDto.password},on:{input:function(t){t.target.composing||e.$set(e.forgetDto,"password",t.target.value)}}})]),t("div",{staticClass:"surePsd"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.forgetDto.makePassword,expression:"forgetDto.makePassword"}],attrs:{type:"password",placeholder:"请再次输入密码"},domProps:{value:e.forgetDto.makePassword},on:{input:function(t){t.target.composing||e.$set(e.forgetDto,"makePassword",t.target.value)}}})]),t("div",{staticClass:"forget_btn",on:{click:e.changePsd}},[e._v("确认修改")])])])},a=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"forget_logo"},[t("img",{attrs:{src:s(6949),alt:""}})])}],r=(s(7658),{name:"Forget",data(){return{url:"http://47.93.21.24:3001/api",codeTime:60,codeFlag:!1,forgetDto:{phone:"",password:"",makePassword:"",code:""}}},methods:{requireCode(){let e=this;""==this.forgetDto.phone?this.$message({message:"请填写手机号",type:"warning"}):(this.codeFlag=!0,this.timer=setInterval((()=>{this.codeTime>0?this.codeTime--:(this.codeTime=60,clearInterval(this.timer))}),1e3),this.$http.post(this.url+"/user/sendForget",{phone:this.forgetDto.phone}).then((function(t){200==t.data.code?e.$message({message:t.data.msg,type:"success"}):e.$message({message:t.data.msg,type:"warning"})})).catch((function(e){console.log(e)})))},changePsd(){let e=this;""==this.forgetDto.phone?this.$message({message:"请填写手机号",type:"warning"}):""==this.forgetDto.code?this.$message({message:"请输入验证码",type:"warning"}):""==this.forgetDto.password?this.$message({message:"请输入密码",type:"warning"}):""==this.forgetDto.makePassword?this.$message({message:"请输入确认密码",type:"warning"}):this.forgetDto.password!=this.forgetDto.makePassword?this.$message({message:"两次输入密码不同",type:"warning"}):this.$http.post(this.url+"/user/forget",{phone:e.forgetDto.phone,password:e.forgetDto.password,makePassword:e.forgetDto.makePassword,code:e.forgetDto.code}).then((function(t){200==t.data.code?(e.$message({message:t.data.msg,type:"success"}),setTimeout((()=>{e.$router.push({name:"login"})}),1e3)):e.$message({message:t.data.msg,type:"warning"})})).catch((function(e){console.log(e)}))}}}),i=r,n=s(1001),g=(0,n.Z)(i,o,a,!1,null,"70b350fe",null),d=g.exports},6949:function(e,t,s){e.exports=s.p+"img/logo.57580444.png"}}]);
//# sourceMappingURL=411.898f4ea0.js.map