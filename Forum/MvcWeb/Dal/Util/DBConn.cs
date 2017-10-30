using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcWeb.Dal.Util
{
    public class DBConn
    {
        private static string strConn
            = @"Data Source=127.0.0.1;Initial Catalog=MvcWeb;Persist Security Info=True;User ID=sa;Password=abc123";

        public static SqlConnection GetConn()
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            return conn;
        }

    }
}