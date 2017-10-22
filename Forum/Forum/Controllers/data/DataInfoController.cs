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
        
        public ActionResult QueryInfo(InfoModel m)
        {
            try
            {
                m.InfoData = DBHelper.QueryOneDicRow(QueryByIid, m.Iid);
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
