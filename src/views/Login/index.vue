<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current }" v-for="item in menuTab" :key="item.id" @click="toggltMenu(item)" >{{ item.text }}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium" >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlengh="6" maxlength="20" ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-show=" model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlengh="6" maxlength="20" ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled=" codeButtonStatus.status" >{{ codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus" >{{ model==='login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, refs, onMounted } from "@vue/composition-api";
import {stripscript,validateEmail,validatePass,validateVcode} from "@/utils/validate";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      //如果模块值为login直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //这里放置data数据、生命周期、自定义的函数
    /* 声明数据*/
    const menuTab = reactive([
      { text: "登录", current: true, type: "login" },
      { text: "注册", current: false, type: "register" }
    ]);
    //模块值
    const model = ref("login");
    //登录按钮定义状态
    const loginButtonStatus = ref(false);
    //验证码按钮状态
    //  const codeButtonStatus = ref(false)
    //  const codeButtonText = ref('获取验证码')
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    //倒计时
    const timer = ref(null);
    //表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    //表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

  /*1.不建议一个方法内做多件不同事件（尽可能只做自己的事，不要做其他人的事情）
   * 2.尽量把相同的事情封装在一个方法里边，通过调用函数执行

    /*声明函数 */
    /*切换模块 */
    const toggltMenu = data => {
      console.log(data);
      menuTab.forEach((elem, index) => {
        //预先清除
        elem.current = false;
      });
      //再添加高光
      data.current = true;
      //修改模块值
      model.value = data.type;
      // console.log(model.value)
      resetFromData();
      clearCountDown();
    };
    /*清除表单数据 */
    const resetFromData =(()=>{
        // 重置表单
      //2.0写法 this.$refs[formName].resetFields();
      refs.loginForm.resetFields();
    })
    /*更新按钮的状态*/
    const updateButtontatus =((params)=>{
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    })

    /*获取验证码*/
    const getSms = () => {
      // 进行提示
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      console.log(validateVcode(ruleForm.username));
      // 请求的接口
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //修改获取验证码状态 调用
      updateButtontatus({
        status:true,
        text:'发送中'
      })
      setTimeout(() => {
        //延时多长时间
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            //弹出提示框
            root.$message({
              message: data.message,
              type: "success"
            });
            //启用登录或注册按钮
            loginButtonStatus.value = false;
            //调定时器 倒计时
            countDown(60);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 5000);
    };
    /*;提交表单*/
    /* 登录*/
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "login"
      };
      //登录接口
      Login(requestData)
        .then(response => {
          console.log("登录成功");
          console.log(response);
        })
        .catch(() => {});
    };
    /* 注册*/
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      //注册接口
      Register(requestData)
        .then(response => {
          //console.log(response)
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //模拟注册成功
          toggltMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {});
    };
    const submitForm = formName => {
      console.log(model.value);
      refs[formName].validate(valid => {
        //表单验证通过
        if (valid) {
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /* 倒计时*/
    const countDown = number => {
      //判断定时器是否存在  存在清除
      if (timer.value) {
        clearInterval(timer.value);
      }
      //60和0 不见了。故意留bug
      //setTimeout:clearTimeout(变量) 只执行一次
      //setInterval:clearInterval(变量) 只执行一次
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updateButtontatus({
          status:false,
          text:'重新发送'
            })
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    /* 清除倒计时*/
    const clearCountDown = (() => {
      //还原验证码按钮默认状态
        updateButtontatus({
          status:false,
          text:'获取验证码'
          })
      //清除倒计时
      clearInterval(timer.value);
    });
    /*生命周期 */
    //挂载完成后
    onMounted(() => {});
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      timer,
      toggltMenu,
      submitForm,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: 0 auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
