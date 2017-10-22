using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataUserController : Controller
    {
        public const string UserLoginKey = "session_login_userinfo";
        public const string CheckUserName = @"select count(*) from TbUser where username=@p0";
        public const string RegUser = @"insert into TbUser(username,password,nickname) values(@p0,@p1,@p2)";
        public const string UserLogin = @"select uid,username,nickname from TbUser where username=@p0 and password=@p1 and isEnable='y'";

        public ActionResult GetUserInfo(UserInfoModel m)
        {
            m.Success = !CheckUser(Session, m);
            return Json(m);
        }

        public static bool CheckUser(HttpSessionStateBase session, BaseModel m)
        {
            IDictionary<string, object> user = (IDictionary<string, object>)session[UserLoginKey];
            m.UserInfo = user;
            if (user == null) //统一的用户信息不存在错误信息
            {
                m.ServerCode = 1000;
                m.ServerMessage = "请登录";
            }
            return user == null;
        }

        public ActionResult Logout(UserInfoModel m)
        {
            try
            {
                Session.Remove(UserLoginKey);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Login(UserInfoModel m)
        {
            try
            {
                m.UserInfo = DBHelper.QueryOneDicRow(UserLogin, m.Username, m.Password);
                if (m.UserInfo == null || m.UserInfo.Count == 0)
                {
                    m.Fail("登陆失败。。。");
                    return Json(m);
                }
                Session.Add(UserLoginKey, m.UserInfo);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Reg(UserInfoModel m)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(m.Username))
                {
                    m.Fail(501, "用户名必须填写");
                    return Json(m);
                }
                if (string.IsNullOrWhiteSpace(m.Password))
                {
                    m.Fail(502, "密码必须填写");
                    return Json(m);
                }
                if (string.IsNullOrWhiteSpace(m.Nickname))
                {
                    m.Fail(503, "昵称必须填写");
                    return Json(m);
                }
                int count = (int)DBHelper.QueryOne(CheckUserName, m.Username);
                if (count != 0)
                {
                    m.Fail(504, "用户名存在");
                    return Json(m);
                }
                DBHelper.Update(RegUser, m.Username, m.Password, m.Nickname);
                m.Success = true;
                m.ServerMessage = "用户注册成功。";
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

    }
}
