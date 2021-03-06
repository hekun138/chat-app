import axios from 'axios';
import io from "socket.io-client";
const socket = io("ws://localhost:9093");

//获取聊天列表
const MSG_LIST = "MSG_LIST";
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatMsg: [],
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { 
        ...state, 
        chatMsg: action.payload,
        unread: action.payload.filter(v => !v.read).length
      }
    case MSG_RECV:
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.payload]
      }
    // case MSG_READ:
    default:
      return state;
  }
}

function msgList(msgs) {
  return {
    type: MSG_LIST,
    payload: msgs
  }
}

function msgReceive(msg) {
  return {
    type: MSG_RECV,
    payload: msg
  };
}

export function receiveMsg() {
  return dispatch => {
    socket.on('receivemsg', function(data){
      console.log('receivemsg', data);
      dispatch(msgReceive(data));
    }) 
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  }
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getMsgList')
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          console.log(res)
          dispatch(msgList(res.data.msg));
        }
      })
  }
}