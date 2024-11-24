export namespace Getchatstream {
    export type Request = {
      content: string; // 发送的内容
    };
  
    export type Data = {
      message: string;     // 返回的消息
      messageId: string;   // 消息 ID
      parentId: string | null; // 父消息 ID，可能为 null
      end: boolean;        // 是否结束
    };
  
    export type Response = {
      code: string;  // 响应代码
      msg: string;   // 响应信息
      data: Data;    // 具体消息数据
    };
  }

  export namespace GetChatList {
    export type Request = {};
  
    export type Data = {
      messageId: string;   // 消息 ID
      content: string;
      type: string;
      createTime: string;
      updateTime: string;
    };
  
    export type Response = {
      code: string;  // 响应代码
      msg: string;   // 响应信息
      data: Data[];  // 修改为数据数组
    };
  }
  
  