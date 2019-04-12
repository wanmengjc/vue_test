<template>
  <div class="login">
    <form>
      <h1>给老子登录</h1>
      <label for="name">
        <input type="text" class="input" id="name" v-model="username" placeholder="用户名">
      </label>
      <label for="psw" class="last">
        <input type="password" class="input" id="psw" v-model="password" placeholder="密码">
        <em v-show="req">*用户名或密码错误</em>
      </label>
      <button class="loginSub" @click="login">
        登 录
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return{
        username:　'',
        password: '',
        req: false
      }
    },
    methods: {
      login(){
        this.req = false;
        setTimeout(() => {
            if (this.username === '13888888888' && this.password === '13888888888'){
              this.$router.replace("/");
            }else {
              this.req = true
            }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 994px;
    margin: 0 auto;
  }
  .login label {
    padding-left: 347px;
    font-size: 15px;
    display: block;
    text-align: left;
  }
  .login .input {
    width: 300px;
    height: 47px;
    line-height: 47px;
    box-sizing: border-box;
    border: 1px solid #d5d5d5;
    border-bottom: none;
    box-shadow: none;
    padding: 10px 8px;
    background-color: #fff;
  }
  .login .last .input {
    border-bottom: 1px solid #d5d5d5;
  }
  .login .loginSub {
    margin-top: 18px;
    width: 300px;
    height: 41px;
    line-height: 41px;
    background-color: #0f88eb;
    color: #fff;
    font-size: 15px;
    border: none;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .loginSub i {
    margin-left: 5px;
    font-size: 20px;
  }
</style>
