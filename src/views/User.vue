<template>
    <div class="user-body">
<!--      <div class="login-form">-->
<!--        <div class="header"><h2>登录</h2></div>-->
<!--        <div class="user-phone">-->
<!--          <div style="line-height: .3rem; width: 1.2rem">手机号：</div><input typeof="text" v-model="userPhone"/>-->
<!--        </div>-->
<!--        <div class="user-password"></div>-->
<!--          密码:<input v-model="password"/>-->
<!--      </div>-->
      <div class="header">
        <div @click="$router.push('index')" class="back">
          <span class="iconfont">&#xe626;</span>
        </div>
        <div class="music-icon">
        <div>
          <span class="iconfont" id="musicIcon">&#xe628;</span>
        </div>
        <div class="header-title">
          <span>Music</span>
        </div>
      </div>
      </div>
      <div class="user-center" v-if="Object.keys(this.$store.state.user).length !== 0">
        <div class="user-profile" v-if="user.profile">
          <div class="user-avatar">
            <van-image
              round
              width="1rem"
              height="1rem"
              :src="this.$store.state.user.profile.avatarUrl"
            />
          </div>
          <div class="profile-nickname">{{user.profile.nickname}}</div>
        </div>
        <div class="playlist-group" @click="clickCreatedPlaylistsExpandOrCollapse" >
          <div>
            创建的歌单
          </div>
          <div style="margin-left: .5rem">
            <span v-if="CreatedPlaylistsExpandOrCollapse" class="iconfont">&#xe64b;</span>
            <span v-else class="iconfont">&#xe667;</span>
          </div>
        </div>
        <div v-for="item in playlist" :key="item.index">
          <div v-if="item.creator.userId === user.account.id && CreatedPlaylistsExpandOrCollapse === true">
            <UserSongListDesc :playlist="item"></UserSongListDesc>
          </div>
        </div>
        <div class="playlist-group" @click="clickCollectPlaylistsExpandOrCollapse">
          <div>
            收藏的歌单
          </div>
          <div style="margin-left: .5rem">
            <span v-if="CollectPlaylistsExpandOrCollapse" class="iconfont">&#xe64b;</span>
            <span v-else class="iconfont">&#xe667;</span>
          </div>
        </div>
        <div v-for="item in playlist" :key="item.index">
          <div v-if="item.creator.userId !== user.account.id && CollectPlaylistsExpandOrCollapse">
            <UserSongListDesc :playlist="item"></UserSongListDesc>
          </div>
        </div>
        <div class="blank" style="height: .8rem"></div>
        <div class="logout">
          <van-button type="default" @click="clickLogout" size="large">退出登录</van-button>
<!--          <input type="submit" value="退出登录"  @click="clickLogout">-->
        </div>
        <div class="blank" style="height: 1.2rem"></div>
      </div>
      <div class="row" v-else>
        <div class="col-md-4 col-md-offset-4">

          <!-- Start Sign In Form -->
          <form action="#" class="fh5co-form animate-box" data-animate-effect="fadeIn">
            <h2>登录</h2>
            <div class="form-group">
              <label for="username" class="sr-only">手机号</label>
              <input type="text" v-model="userPhone" class="form-control" id="username" placeholder="手机号" autocomplete="off">
            </div>
            <div class="form-group">
              <label for="password" class="sr-only">密码</label>
              <input type="password" v-model="password" class="form-control" id="password" placeholder="密码" autocomplete="off">
            </div>
            <div class="form-group">
              <input type="submit" value="登录" class="btn btn-primary" @click="clickLogin">
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import UserSongListDesc from '../components/UserSongList/UserSongListDesc'
export default {
  name: 'User',
  components: {
    UserSongListDesc
  },
  inject: ['reload'],
  data () {
    return {
      user: this.$store.state.user,
      userPhone: '',
      password: '',
      playlist: [],
      CreatedPlaylistsExpandOrCollapse: true,
      CollectPlaylistsExpandOrCollapse: true
    }
  },
  mounted () {
    this.getSongLists()
  },
  methods: {
    clickCreatedPlaylistsExpandOrCollapse () {
      this.CreatedPlaylistsExpandOrCollapse = !this.CreatedPlaylistsExpandOrCollapse
    },
    clickCollectPlaylistsExpandOrCollapse () {
      this.CollectPlaylistsExpandOrCollapse = !this.CollectPlaylistsExpandOrCollapse
    },
    getSongLists () {
      if (this.user !== '') {
        this.$axios.get(this.$musicApi + '/user/playlist?uid=' + this.user.account.id).then(this.getSongListsSucc)
      }
    },
    getSongListsSucc (res) {
      this.playlist = res.data.playlist
    },
    clickLogin () {
      this.$axios.get(this.$musicApi + '/login/cellphone?phone=' + this.userPhone + '&password=' + this.password).then(this.getLoginUserInfoSucc)
    },
    getLoginUserInfoSucc (res) {
      if (res.data.code === 200) {
        this.user = res.data
        sessionStorage.setItem('vue-music-user', JSON.stringify(this.user))
        this.$store.dispatch('setUser', JSON.stringify(this.user))
        this.password = ''
        this.reload()
      }
    },
    clickLogout () {
      sessionStorage.setItem('vue-music-user', '')
      this.$store.dispatch('setUser', '')
      // location.reload()
      this.$router.push('index')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .playlist-group
    height .6rem
    line-height .6rem
    padding-left .2rem
    display flex
    flex-direction row
  .user-profile
    display flex
    flex-direction row
    width 96%
    background #FDEDEC
    //background-image: linear-gradient(#FDEDEC, #FEF9F9);
    margin-left 2%
    border-radius .15rem
    height 1.4rem
    .user-avatar
      margin-left .4rem
      margin-top .2rem
      margin-right .4rem
    .profile-nickname
      line-height 1rem
      text-align center
      font-size .32rem
  .header
    display flex
    flex-direction row
    .back
      color white
      line-height .8rem
      margin-left .25rem
      position absolute
      span
        font-size .4rem
        font-weight 100
        color #222222
    .music-icon
      width 100%
      height .8rem
      flex-direction row
      display: flex;
      justify-content: center;
      align-items: center;
      #musicIcon
        font-size .5rem
      .header-title
        margin-left .2rem
        font-size .35rem
        font-family: 'Montserrat', sans-serif;
  .login-form
    position: absolute;
    /*垂直居中*/
    top: 50%;
    /*水平居中*/
    left: 50%;
    transform: translate(-50%,-50%)
    .user-phone
      width 4rem
      display flex
      flex-direction row
    .header
      line-height 1rem
      h2
        text-align center
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .fh5co-form h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 20px;
    margin: 0 0 30px 0;
    color: #000000;
  }
  .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .fh5co-form {
    padding: 30px;
    margin-top: 4em;
    -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .fh5co-form .form-group {
    margin-bottom: 30px;
  }
  .fh5co-form label {
    font-weight: 300;
    font-size: 14px;
    font-weight: 300;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .fh5co-form .form-control {
    font-size: 16px;
    font-weight: 300;
    height: 50px;
    padding-left: 0;
    padding-right: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -o-box-shadow: none;
    box-shadow: none;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    -ms-border-radius: 0px;
    border-radius: 0px;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  button, html input[type=button], input[type=reset], input[type=submit] {
    -webkit-appearance: button;
    cursor: pointer;
  }
  .btn-primary {
    height: 50px;
    padding-right: 20px;
    padding-left: 20px;
    border: none;
    background: #33cccc;
    color: #ffffff;
    -webkit-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    -moz-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    -o-box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
    box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
  }
</style>
