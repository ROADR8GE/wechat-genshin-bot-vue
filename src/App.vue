<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row type="flex" justify="space-between">
          <el-col :span="4">
            <div class="title">GENSHIN IMPACT</div>
          </el-col>
          <el-col :span="4">
            <div class="status">
              CONNECT STATUS
              <el-switch
                v-model="connectStatus"
                active-color="#13ce66"
                style="margin-left: 10px"
                @change="on_change"
              />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-descriptions
            class="margin-top"
            title="BOT INFO"
            :column="3"
            border
          >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                BOT NAME
              </template>
               {{ wx_name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                BOT CODE
              </template>
              {{ wx_code }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time"></i>
                UPDATE TIME
              </template>
              {{ wx_time }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px">
          <el-row type="flex">
            <div class="title" style="margin-bottom: 10px">SYSTEM LOG</div>
          </el-row>
          <el-row type="flex">
            <el-col :span="24">
              <el-input
                type="textarea"
                v-model="systemLog"
                :rows="8"
                disabled
              ></el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  PERSONAL_INFO,
  HEART_BEAT,
  RECV_TXT_MSG,
  RECV_PIC_MSG,
} from "@/wechat.js";
export default {
  name: "App",
  data() {
    return {
      connectStatus: false,
      wx_code: "null",
      wx_name: "null",
      wx_time: "null",
      systemLog: "",
      wsClient: null,
    };
  },
  mounted() {},
  methods: {
    // 输出控制台信息
    sout(val) {
      this.systemLog += "[INFO] " + val + "\r\n";
    },
    soutMsg(val, id) {
      this.systemLog += "[RECV] WXID ： " + id + " MSG : " + val + "\r\n";
    },
    /**
     * 总开关开火关闭都会触发此方法
     * @param val
     */
    on_change(val) {
      if (val) {
        this.sout("SYSTEM TRY CONNECT ···");
        this.wsClient = new WebSocket("ws://127.0.0.1:5555");
        this.wsClient.onopen = this.ws_on_open;
        this.wsClient.onclose = this.ws_on_close;
        this.wsClient.onerror = this.ws_on_error;
        this.wsClient.onmessage = this.ws_on_message;
      } else {
        this.sout("SYSTEM SHUTDOWM！");
        this.wsClient.close();
        this.wsClient = null;
        this.wx_code = "";
        this.wx_name = "";
        this.connectStatus = false;
        this.wx_time = "";
      }
    },
    // ws初始化回调函数
    ws_on_open() {
      //在与微信建立连接的时候发送一条获取个人信息
      this.wsClient.send(this.get_personal_info());
      //this.wsClient.send(get_contact_list());
      //this.wsClient.send(get_chatroom_memberlist());
      //this.wsClient.send(send_at_msg('wxid_disnthp8qixe22', '17569152823@chatroom', '666', 'yunni'));
    },
    /**
     * 主动与微信断开连接的回调函数
     * @param ev
     */
    ws_on_close(ev) {
      this.sout(ev.data);
      this.sout("CONNECT TO WECHAT CLOSE ···")
      this.connectStatus = false;
    },
    /**
     * 与微信连接发生错误的回调函数
     * @param ev
     */
    ws_on_error(ev) {
      this.sout(ev.data);
      this.sout("CONNECT TO WECHAT ERROR ···")
      this.connectStatus = false;
    },
    /**
     * 收到微信传来的消息的回调函数
     * @param ev
     */
    ws_on_message(ev) {
      const data = JSON.parse(ev.data);
      console.log(data);
      switch (data.type) {
        case PERSONAL_INFO: //收到个人信息
          var content = JSON.parse(data["content"]);
          this.wx_code = content["wx_code"];
          this.wx_name = content["wx_name"];
          this.wx_time = data["time"];
          this.login_status = data["status"];
          break;
        case HEART_BEAT: //收到心跳
          break;
        case RECV_TXT_MSG: //收到文字消息
          this.handle_recv_msg(data);
          break;
        case RECV_PIC_MSG: //收到图片消息
          //不予理会
          break;
        default:
          break;
      }
    },
    /**
     * 处理文字消息
     * @param j json数据
     */
    handle_recv_msg(j) {
      const content = j.content;
      const wxid = j.wxid;
      // const reg = /\d{11}@chatroom/;
      this.soutMsg(content, wxid);
    },
  },
};
</script>

<style>
#app {
  font-family: "微软雅黑";
  line-height: 1.7;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1%;
}
.title {
  font-weight: bold;
}
</style>
