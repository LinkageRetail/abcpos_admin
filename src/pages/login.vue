<template>
  <div class=" width_100_p  height_100_p ">
        
    <div class="height_20_p width_100_p "></div>


    <div class="height_15_p width_100_p  text_align_center">
      <div><img src="~assets/titleLogo.png" width="65%" style="max-width:500px"/></div>
      <!-- <div class="padding_top_10 font_weight_bold font_color_pos_mobile_grey">Cloud POS</div> -->
    </div>

    <div class="height_20_p width_70_p margin_center ">
      <q-input class="height_33_p" :placeholder="$t('label_login_user_name')" v-model="userName"/>
      <q-input class="height_33_p" :placeholder="$t('label_login_password')" type="password" v-model="password"/>
      <q-select
        class="height_34_p "
        :options="option"
        v-model="lang"
      />


    </div>
    <div class="height_5_p padding_top_5 width_70_p margin_center font_size_14">
      <div class="row">
        <div class="col-6">
          <q-checkbox color="secondary" :label="$t('label_remember_account')" v-model="remember_account"/>
        </div>
        <div @click="showForgetPasswordDlg()" class="col-6 font_color_red relative-position text_align_end" v-ripple>
          {{$t('label_forget_password')}}
        </div>
      </div>
    </div>

    <div class="height_20_p width_100_p  vertical_center">
      <q-btn @click="doLogin()"
             class="bg-primary  width_70_p font_color_pos_mobile_grey font_weight_bold" :label="$t('label_login')"
             v-close-overlay/>
    </div>

    <div class="height_50 width_100_p position_absolute " style="bottom: 0px">
      <div class="row line_height_50 text_align_center">
        <div class="col-3 line_height_50"><img src="~assets/logo.png" style="margin:5px 10px" height="30px"/></div>
        <div class="col-6 font_size_14">{{version}}</div>
        <div @click="showAlert()" class="col-3 iconfont icon-zhiwen font_logo_color relative-position"
             style="font-size: 2.5em" v-ripple></div>
      </div>
    </div>
    <q-dialog
      @cancel="cancelRoleSelectDlg"
      @ok="chooseRoleId"
      prevent-close
      stack-buttons
      v-model="showRoleSelect"
    >
      <span slot="title">{{$t('label_choose_role')}}</span>
      <span slot="message">{{$t('label_choose_role_tip')}}</span>

      <div slot="body">
        <q-field>
          <q-select
            color="yellow"
            v-model="roleId"
            :options="roles"
          />
        </q-field>
      </div>
    </q-dialog>

    <!--forget password-->
    <q-dialog class="height_100_p width_100_p " v-model="showForgetPassword">
      <div class="height_20_p width_100_p "></div>


      <div class="width_100_p  text_align_center ">
        <div><img src="~assets/logo.png" width="40%"/></div>
        <div v-if="haveSendEmial">
          <div class="margin_top_10 font_size_18 font_color_pos_mobile_grey">We've send you an email</div>
          <div class="margin_top_10 font_color_pos_mobile_grey width_60_p  margin_center">Check your email and follow
          </div>
        </div>
        <div v-else>
          <div class="margin_top_10 font_size_18 font_color_pos_mobile_grey">Forget your password?</div>
          <div class="font_color_pos_mobile_grey width_60_p  margin_center">Enter the e-mail address you use and you
            will receive an e-mail contain a password
          </div>
        </div>
      </div>

      <div v-if="haveSendEmial" class="height_50_p width_70_p margin_center">
        <div class=" height_80_p"></div>
        <div class=" height_20_p width_70_p margin_center text_align_center font_color_pos_mobile_grey font_size_14">For
          any questions or problems please email us at 1196557669@qq.com
        </div>
      </div>
      <div v-else>
        <div class="height_10_p width_70_p margin_center ">
          <q-input class="margin_top_30 height_50_p" type="email" suffix="@email.com" v-model="emailAddress"/>
        </div>

        <div class="height_10_p width_100_p padding_top_15 text_align_center">
          <q-btn @click="requestResetLink()" class="border  width_70_p font_color_pos_mobile_grey"
                 style="box-shadow: none" label="Request Reset Link"/>
        </div>
      </div>

      <div class="height_50 width_100_p position_absolute " style="bottom: 0px">
        <div class="row line_height_50 text_align_center">
          <div class="col-3"></div>
          <div class="col-6 ">{{version}}</div>
          <div @click="closeForgetPassword()" class="col-3 iconfont icon-home  font_logo_color relative-position"
               style="font-size: 25px" v-ripple></div>
        </div>
      </div>


    </q-dialog>


  </div>

</template>

<script>
  import storage from '../model/storage.js'
  import SysUtil from "../utils/SysUtil";
  import { mapState } from "vuex";

  export default {

    data() {
      return {
        option: [
          {label: this.$t('label_language_en'), value: 'en-us'},
          {label: this.$t('label_language_ch'), value: 'zh-hans'},
        ],
        lang: this.$q.lang,
        haveSendEmial: false,
        showForgetPassword: false,
        showRoleSelect: false,
        remember_account: false,
        userName: '',
        emailAddress: "",
        password: '',
        shopId: '',
        roleId: 'paris',
        roles: [],
        version: "1.0",
        screenWidth: "",
        screenHeight: ""
      };
    },
    mounted() {
      this.lang = storage.get("lang");
    },

    computed: {
      ...mapState({
        setting : state => state.base.setting,
      }),
    },

    methods: {
      closeForgetPassword() {
        this.showForgetPassword = false;
        this.haveSendEmial = false;
      },

      requestResetLink() {
        this.haveSendEmial = true;
      },

      showForgetPasswordDlg() {
        this.showForgetPassword = true;
      },

      cancelRoleSelectDlg() {
        this.showRoleSelect = false;
      },

      chooseRoleId() {
        //call choose Role Id api
        this.$axios.get('/user/role', {
          params: {roleId: this.roleId}
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              this.showRoleSelect = false;
              this.$router.replace({//点击OK按钮后，会跳转到sales_point.vue
                path: '/sales_point',
                // path: '/sales_point_pad',
                query: {shopId: this.shopId}
              })
            } else {
              SysUtil.showError("ERROR", "chooseRoleId",this.$t('label_choose_role_fail'));
            }
          } else {
            SysUtil.showError("ERROR", "chooseRoleId",this.$t('label_choose_role_fail'));
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "chooseRoleId",this.$t('label_choose_role_error'));
          console.log(error);
        })
      },

      doLogin() {
        if (SysUtil.isNull(this.userName)){
          SysUtil.showError("ERROR", "doLogin", "Login user cannot be empty!");
          return;
        }
        let map = SysUtil.objToStrMap(this.setting.userShopTerm);
        if (map.has(this.userName)){
          let shopTerm = map.get(this.userName);
          this.shopId = shopTerm.shopId;
          this.termId = shopTerm.termId;
          this.login();
        } else {
          this.$axios.get('/anon/getDefaultShopAndTerm',{
            params:{coCode:'C01',userId:this.userName}
          }).then(res => {
            if (res.status == 200) {
              if (res.data != null && res.data.code == 1) {
                this.shopId = res.data.data.shopCode;
                this.termId = res.data.data.termId;
                this.login();
              } else if (res.data != null) {
                SysUtil.showError("ERROR", "setDefaultShopAndTermId", res.data.msg);
              } else {
                SysUtil.showError("ERROR", "setDefaultShopAndTermId", "Failed to get user default login shop！");
              }
            }
          })
        }
      },
      login() {
        //调用登录接口
        this.$axios.post('/login', {
          params: {
            userId: this.userName,
            password: this.password,
            remember: this.remember_account,
            shopId: this.shopId,
            termId: this.termId,
            coCode:'C01'
          }, withCredentials: true
        }).then(res => {
          if (res.status == 200) {
            if (res.data != null && res.data.code == 1) {
              console.log(res.data.data);
              this.$store.commit("base/setSysObject", res.data.data);
              let user = res.data.data;
              this.getFunctions();
              this.$router.replace({//点击OK按钮后，会跳转到sales_point.vue
                path: '/admin'
              })

            } else if (res.data != null) {
              SysUtil.showError("ERROR", "login", res.data.msg);
            } else {
              SysUtil.showError("ERROR", "login", this.$t('label_login_fail'));
            }
          } else {
            SysUtil.showError("ERROR", "login", this.$t('label_login_fail'));
          }
        }).catch(error => {
          SysUtil.showError("ERROR", "login", this.$t('label_login_error'));
          console.log(error);
        })
      },

      getFunctions() {
        this.$axios.get('/user/functions').then(res => {
          this.$store.commit('base/setFunctions', res.data.data);
        });
      },
      showAlert() {
        // this.$q.notify({
        //   color: 'orange',
        //   message: 'function is developing',
        //   position: 'top',
        //   icon: 'warning',
        //   actions: [{label: 'Reply', handler: () => console.log('Clicked on a notification handler')}],
        //   timeout: 500
        // })
      },
    },
    watch: {

      lang(lang) {
        storage.set("lang", lang);
        this.$i18n.locale = lang;
        this.$i18n.silentTranslationWarn = true;
        console.log(this.$i18n.locale);
      }
    },

  };
</script>

<style scoped>


</style>

