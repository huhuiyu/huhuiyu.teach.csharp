using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataTypeController : Controller
    {

        public const string QUERY = @"select tid,tname,tinfo,isEnable,convert(varchar(50),createDate,120) 'createDate' from TbType";

        public const string ADD = @"insert into TbType(tname,tinfo) values(@p0,@p1)";

        public const string MODIFY = @"update TbType set tname=@p0,tinfo=@p1,isEnable=@p2 where tid=@p3";

        public ActionResult Index(TypeMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                m.TypeList = DBHelper.QueryDicRows(QUERY);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Add(TypeMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(ADD, m.Tname, m.Tinfo);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Modify(TypeMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(MODIFY, m.Tname, m.Tinfo, m.IsEnable, m.Tid);
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
