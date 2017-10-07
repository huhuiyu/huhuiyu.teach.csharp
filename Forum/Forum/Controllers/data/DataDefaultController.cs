using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataDefaultController : Controller
    {

        public const string QUERY = @"select tid,tname,tinfo,convert(varchar(50),createDate,120) 'createDate' from TbType where isEnable='y'";

        public ActionResult Index(DefaultModel m)
        {
            try
            {
                m.TypeList = DBHelper.QueryDicRows(QUERY);
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
