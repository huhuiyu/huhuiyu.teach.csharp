using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataAdminController : Controller
    {
        public const string SESSION_USER = "login_user";

        public const string LOGIN = "select uid,username,nickname from TbUser where username=@p0 and password=@p1 and isAdmin='y' and isEnable='y'";

        public ActionResult Login(AdminModel m)
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
            IDictionary<string, object> user = DBHelper.QueryOneDicRow(LOGIN, m.Username, m.Password);
            if (user.Count == 0)
            {
                //思考作业题：用户名不存在，密码错误，账号被冻结分开不同的提示
                m.Fail(503, "用户名或者密码错误，登陆失败");
                return Json(m);
            }
            //保存用户信息到session中
            Session.Add(SESSION_USER, user);
            m.Success = true;
            return Json(m);
        }

        public ActionResult GetUserInfo(AdminModel m)
        {
            m.Success = !CheckUser(Session, m);
            return Json(m);
        }

        public ActionResult Logout(AdminModel m)
        {
            Session.Remove(SESSION_USER);
            m.Success = true;
            return Json(m);
        }

        public static bool CheckUser(HttpSessionStateBase session, BaseModel m)
        {
            IDictionary<string, object> user = (IDictionary<string, object>)session[SESSION_USER];
            m.UserInfo = user;
            if (user == null) //统一的用户信息不存在错误信息
            {
                m.ServerCode = 1000;
                m.ServerMessage = "请登录";
            }
            return user == null;
        }

    }
}
