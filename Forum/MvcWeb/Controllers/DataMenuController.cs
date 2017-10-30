using MvcWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcWeb.Dal.DAO;

namespace MvcWeb.Controllers
{
    public class DataMenuController : Controller
    {
        public ActionResult Query(TbMenuModel m)
        {
            try
            {
                m.MenuList = TbMenuDAO.QueryAll();
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Add(TbMenuModel m)
        {
            try
            {
                TbMenuDAO.Add(m.Menu);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

    }
}
