using MvcWeb.Dal.Entity;
using MvcWeb.Dal.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWeb.Dal.DAO
{
    public class TbMenuDAO
    {
        public const string QueryAllMenu = @"select * from TbMenu where isEnable='y'";
        public const string AddMenu = @"insert into TbMenu(title,url,info) values(@p0,@p1,@p2)";

        public static IList<TbMenu> QueryAll()
        {
            return DBHelper.QueryRows(new TbMenu(), QueryAllMenu);
        }

        public static int Add(TbMenu menu)
        {
            return DBHelper.Update(AddMenu, menu.Title, menu.Url, menu.Info);
        }

    }
}