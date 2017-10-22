using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataInfoController : Controller
    {
        public const string AddInfo = @"insert into TbInfo(uid,sid,title,info) values(@p0,@p1,@p2,@p3)";
        public const string QueryByIid =
@"select i.iid,i.title,i.info
	,CONVERT(varchar(50),i.createDate,120) 'createDate'
	,u.nickname,s.sname,t.tname
 from TbInfo i
 inner join TbSubject s on i.sid=s.sid
 inner join TbUser u on i.uid=u.uid
 inner join TbType t on s.tid=t.tid
 where i.iid=@p0 and i.isDelete='n'";

        public const string QueryReturnsByIid
= @"select top {0} r.content,CONVERT(varchar(50),r.createDate,120) 'createDate'
	,u.nickname from TbReturns r
 inner join TbUser u on r.uid=u.uid
 where r.iid=@p0 and r.isDelete='n' and r.rid not in 
 (select top {1} rid from TbReturns 
	where iid=@p0 and isDelete='n'
	order by createDate desc)
 order by r.createDate desc";

        public const string QueryCount = @"select count(*) from TbReturns where iid=@p0 and isDelete='n'";

        public const string InsertReturns = @"insert into TbReturns(uid,iid,content) values(@p0,@p1,@p2)";

        public ActionResult AddReturns(ReturnsModel m)
        {
            try
            {
                bool check = DataUserController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(InsertReturns, m.UserInfo["uid"],
                    m.Iid, m.Content);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult QueryInfo(InfoModel m)
        {
            try
            {
                m.InfoData = DBHelper.QueryOneDicRow(QueryByIid, m.Iid);
                m.PageInfo.Count = (int)DBHelper.QueryOne(
                    QueryCount, m.Iid);
                m.ReturnList = DBHelper.QueryDicRows(String.Format(QueryReturnsByIid, m.PageInfo.PageSize, m.PageInfo.Skip), m.Iid);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }


        public ActionResult Add(InfoModel m)
        {
            try
            {
                bool check = DataUserController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(AddInfo, m.UserInfo["uid"],
                    m.Sid, m.Title, m.Info);
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
