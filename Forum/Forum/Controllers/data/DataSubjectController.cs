using Forum.Dal.Util;
using Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Forum.Controllers.data
{
    public class DataSubjectController : Controller
    {

        public const string QUERY_TYPE = @"select tid,tname,tinfo from TbType where isEnable='y'";
        public const string QUERY = @"
 select top {0} s.sid,s.sname,s.sinfo,s.isEnable,CONVERT(varchar(50),s.createDate,120) 'createDate',t.tid,t.tname 
 from TbSubject s
 inner join TbType t on s.tid=t.tid
 where s.sid not in 
 (select top {1} sid from TbSubject)";
        public const string QUERY_COUNT = @"select count(*) from TbSubject";

        public const string ADD = @"insert into TbSubject(sname,sinfo,tid) values(@p0,@p1,@p2)";

        public const string MODIFY = @"update TbSubject set sname=@p0,sinfo=@p1,isEnable=@p2,tid=@p3 where sid=@p4";

        public ActionResult Index(SubjectMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                m.TypeList = DBHelper.QueryDicRows(QUERY_TYPE);
                m.PageInfo.Count = (int)DBHelper.QueryOne(QUERY_COUNT);
                m.SubjectList = DBHelper.QueryDicRows(string.Format(QUERY, m.PageInfo.PageSize, m.PageInfo.Skip));
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Add(SubjectMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(ADD, m.Sname, m.Sinfo, m.Tid);
                m.Success = true;
            }
            catch (Exception ex)
            {
                m.Fail(ex);
            }
            return Json(m);
        }

        public ActionResult Modify(SubjectMode m)
        {
            try
            {
                bool check = DataAdminController.CheckUser(Session, m);
                if (check)
                {
                    return Json(m);
                }
                DBHelper.Update(MODIFY, m.Sname, m.Sinfo, m.IsEnable, m.Tid, m.Sid);
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
