/*
 * @Author: zhushixian@ybm100.com
 * @Descripttion: WECHAT CONNECT
 * @Date: 2022-06-24 16:55:49
 */
export const HEART_BEAT = 5005;
export const RECV_TXT_MSG = 1;
export const RECV_PIC_MSG = 3;
export const USER_LIST = 5000;
export const GET_USER_LIST_SUCCSESS = 5001;
export const GET_USER_LIST_FAIL = 5002;
export const TXT_MSG = 555;
export const PIC_MSG = 500;
export const AT_MSG = 550;
export const CHATROOM_MEMBER = 5010;
export const CHATROOM_MEMBER_NICK = 5020;
export const PERSONAL_INFO = 6500;
export const DEBUG_SWITCH = 6000;
export const PERSONAL_DETAIL = 6550;
export const DESTROY_ALL = 9999;
export const NEW_FRIEND_REQUEST = 37;//微信好友请求消息
export const AGREE_TO_FRIEND_REQUEST = 10000;//同意微信好友请求消息
export const ATTATCH_FILE = 5003;


//////////////////////////////// HANDLE MESSAGE ////////////////////////////////////
export function getid() {
  const id = Date.now();
  return id.toString();
}
export function get_personal_info() {
  const j = {
    id: getid(),
    type: PERSONAL_INFO,
    wxid: "null",
    roomid: "null",
    content: "null",
    nickname: "null",
    ext: "null",
  };
  return JSON.stringify(j);
}
export function get_personal_detail(wxid) {
  const j = {
    id: getid(),
    type: PERSONAL_DETAIL,
    content: "op:personal detail",
    wxid: wxid,
  };
  return JSON.stringify(j);
}
export function get_contact_list() {
  const j = {
    id: getid(),
    type: USER_LIST,
    roomid: "null", //null
    wxid: "null", //not null
    content: "null", //not null
    nickname: "null",
    ext: "null",
  };
  return JSON.stringify(j);
}
/**
 * 发送文本消息
 * @param wxid 微信id或者群id
 * @param content 发送的内容
 * @returns {string}
 */
export function send_txt_msg(wxid, content) {
  //必须按照该json格式，否则服务端会出异常
  const j = {
    id: getid(),
    type: TXT_MSG,
    wxid: wxid, //roomid或wxid,必填
    roomid: "null", //此处为空
    content: content,
    nickname: "null", //此处为空
    ext: "null", //此处为空
  };
  return JSON.stringify(j);
}
/**
 * 发送@的文本消息
 * @param wxid 自己的微信id
 * @param roomid 群聊id
 * @param content 发送的内容
 * @param nickname 要@人的昵称
 * @returns {string}
 */
export function send_at_msg(wxid, roomid, content, nickname) {
  const j = {
    id: getid(),
    type: AT_MSG,
    roomid, //not null
    wxid, //not null
    content, //not null
    nickname,
    ext: "null",
  };
  return JSON.stringify(j);
}
/**
 * 发送图片信息
 * @param wxid 自己的微信id
 * @param roomid 群聊id
 * @param content 发送的内容
 * @param nickname 要@人的昵称
 * @returns {string}
 */
export function send_pic_msg(wxid, roomid, content, nickname) {
  const j = {
    id: getid(),
    type: PIC_MSG,
    wxid: wxid,
    roomid: roomid,
    content: content,
    nickname: nickname,
    ext: "null",
  };
  return JSON.stringify(j);
}
/**
 * 获得群成员的昵称
 * @param s_wxid
 * @param s_roomid
 * @returns {string}
 */
export function get_chat_nick_p(s_wxid, s_roomid) {
  const j = {
    id: getid(),
    type: CHATROOM_MEMBER_NICK,
    wxid: s_wxid,
    roomid: s_roomid,
    content: "null",
    nickname: "null",
    ext: "null",
  };
  return JSON.stringify(j);
}
export function get_chatroom_memberlist() {
  const j = {
    id: getid(),
    type: CHATROOM_MEMBER,
    roomid: "null", //null
    wxid: "null", //not null
    content: "null", //not null
    nickname: "null",
    ext: "null",
  };
  return JSON.stringify(j);
}