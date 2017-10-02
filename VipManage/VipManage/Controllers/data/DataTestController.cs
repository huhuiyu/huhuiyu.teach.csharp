using VipManage.Dal.Util;
using VipManage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VipManage.Controllers.data
{
    public class DataTestController : Controller
    {
        public ActionResult Index(TestModel m)
        {
            try
            {
                m.ServerMessage = m.Echo;
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m,
                JsonRequestBehavior.AllowGet);
        }

        public const string ADD =
@"insert into TblTest(tinfo) values(@p0)";

        public ActionResult Add(TestModel m)
        {
            try
            {
                DBHelper.Update(ADD, m.Tinfo);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        //http://localhost:2383/DataTest?Echo=abc123

        public ActionResult DataBase(TestModel m)
        {
            string sql01 =
@"select * from TblTest where tid=@p0";
            //测试单值查询
            IDictionary<string, object> d01
                = DBHelper.QueryOneDicRow(
                sql01, 1);
            m.ServerMessage += "1:" + (d01.Count == 0);
            d01 = DBHelper.QueryOneDicRow(
                sql01, -1);
            m.ServerMessage += ",2:" + (d01.Count == 0);
            string sql02 =
                @"select top 2 * from TblTest";
            d01 = DBHelper.QueryOneDicRow(sql02);
            m.ServerMessage += ",3:" + (d01.Count == 0);
            //==================================================
            sql02 = @"select count(*) from TblTest";
            m.ServerMessage += "\r\n4:" +
                DBHelper.QueryOne(sql02);
            sql02 =
@"select top 5 tid from TblTest";

            String sb = "";
            IList<IDictionary<string, object>> r
                = DBHelper.QueryDicRows(sql02);
            foreach (IDictionary<string, object> dic in r)
            {
                foreach (string key in dic.Keys)
                {
                    sb += dic[key] + " ";
                }
                sb += "\r\n";
            }

            m.ServerMessage += "\r\n5:"+sb;
            sql02 =
@"select top 5 tid from TblTest 
  where tid not in (select top 10 tid from TblTest)";
            //size (size)*(number-1)
            m.ServerMessage += "\r\n6:" +
                DBHelper.QueryDicRows(sql02);
            m.Success = true;
            return Json(m);
        }

    }
}
