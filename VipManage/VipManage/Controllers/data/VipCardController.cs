using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using VipManage.Dal.Util;
using VipManage.Models;

namespace VipManage.Controllers.data
{
    public class VipCardController : Controller
    {

        public const string DELETE
= @"delete from TblVipCard where vcid=@p0";

        public ActionResult Delete(VipCardModel m)
        {
            try
            {
                DBHelper.Update(DELETE, m.Vcid);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }



        public const string Insert =
@"insert into TblVipCard
  (username,phone,cardno,balance)
   values(@p0,@p1,@p2,@p3)";

        public ActionResult Add(VipCardModel m)
        {
            try
            {
                DBHelper.Update(Insert, m.Username
                    , m.Phone, m.Cardno, m.Balance);
                m.Success = true;
                m.ServerMessage = "会员开通成功";
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        private const string QUERY =
@"select * from TblVipCard where 1=1";

        public const string COUNT
= @"select count(*) from TblVipCard where isenable='y' {0}";

        public const string PAGE_QUERY
= @"select top {0} * from TblVipCard where isenable='y'
  {2} and vcid not in 
 (select top {1} vcid from TblVipCard where isenable='y' {2})";

        public ActionResult PageQuery(
            VipCardModel m)
        {
            //Thread.Sleep(5000);

            try
            {
                string where = "";
                IList<object> param =
                    new List<object>();
                if (!string.IsNullOrWhiteSpace(
                    m.Username))
                {
                    where += " and username like @p" + param.Count;
                    param.Add("%" + m.Username + "%");
                }
                if (!string.IsNullOrWhiteSpace(
                    m.Phone))
                {
                    where += " and phone like @p" + param.Count;
                    param.Add("%" + m.Phone + "%");
                }
                string csql = string.Format(COUNT, where);
                m.PageInfo.Count = (int)DBHelper.QueryOne(
                    csql, param.ToArray<object>());
                string qsql = string.Format(PAGE_QUERY,
                    m.PageInfo.PageSize, m.PageInfo.Skip, where);
                m.ServerMessage = qsql;
                m.VipCardList = DBHelper.QueryDicRows(qsql
                    , param.ToArray<object>());
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }


        public ActionResult Query(VipCardModel m)
        {
            // select top 5 * from TblVipCard
            // where username like '%' and vcid not in
            // (select top 5 vcid from TblVipCard 
            // where username like '%' )

            try
            {
                string sql = QUERY;
                //where 1=1
                // and username like @pn
                // and phone like @pn
                IList<object> param =
                    new List<object>();
                if (!string.IsNullOrWhiteSpace(
                    m.Username))
                {
                    sql += " and username like @p"
                        + param.Count;
                    param.Add("%" + m.Username + "%");
                }
                if (!string.IsNullOrWhiteSpace(
                    m.Phone))
                {
                    sql += " and phone like @p"
                        + param.Count;
                    param.Add("%" + m.Phone + "%");
                }

                m.VipCardList
                    = DBHelper.QueryDicRows(sql
, param.ToArray<object>());

                m.Success = true;
                m.ServerMessage = sql;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public const string UPDATE =
@"update TblVipCard set username=@p0,phone=@p1
   ,cardno=@p2,balance=@p3 where vcid=@p4";

        public ActionResult Modify(VipCardModel m)
        {
            try
            {
                DBHelper.Update(UPDATE, m.Username
, m.Phone, m.Cardno, m.Balance, m.Vcid);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public const string DELETE_1
            = @"update TblVipCard set isenable='n'
  where vcid=@p0";

        public ActionResult Delete1(VipCardModel m)
        {
            try
            {
                DBHelper.Update(DELETE_1, m.Vcid);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult DeleteAll(VipCardModel m)
        {
            try
            {
                //偷懒的方式处理删除多笔记录
                //使用用户名作为删除的id集合
                if (!string.IsNullOrWhiteSpace(
                    m.Username)) 
                {
                    string[] ids = 
                        m.Username.Split(',');
                    foreach (string id in ids)
                    {
                        DBHelper.Update(DELETE_1, id);                        
                    }
                }
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
