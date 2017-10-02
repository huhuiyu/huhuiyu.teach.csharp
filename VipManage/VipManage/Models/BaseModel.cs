using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VipManage.Models
{
    //基础Model类
    public class BaseModel
    {
        //所有的model都包含的控制信息
        //服务器处理是否成功
        public bool Success { get; set; }
        //服务器给客户端的消息
        public string ServerMessage { get; set; }

        public BaseModel()
        {
            Success = false; //默认是失败
            ServerMessage = "";//默认没有消息
        }
        //设置错误结果
        public void Fail(string message)
        {
            Success = false;
            ServerMessage = message;
        }
        //错误重载版本
        public void Fail(Exception ex)
        {
            Fail(ex.Message);
        }
    }
}