using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWeb.Dal.Entity
{
    public class TbMenu
    {
        public int Mid { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Info { get; set; }
        public string IsEnable { get; set; }
        public DateTime Created { get; set; }
    }
}