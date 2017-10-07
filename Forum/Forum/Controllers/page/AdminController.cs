using Forum.Controllers.data;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.page
{
    public class AdminController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Main(AdminModel m)
        {
            if (DataAdminController.CheckUser(Session, m)) //没有用户信息就跳转到登陆
            {
                return RedirectToAction("Index");
            }
            return View(m);
        }


        public ActionResult UserInfo(AdminModel m)
        {
            if (DataAdminController.CheckUser(Session, m)) //没有用户信息就跳转到登陆
            {
                return RedirectToAction("Index");
            }
            return View(m);
        }

        public ActionResult TypeInfo(AdminModel m)
        {
            if (DataAdminController.CheckUser(Session, m)) //没有用户信息就跳转到登陆
            {
                return RedirectToAction("Index");
            }
            return View(m);
        }
    }
}
