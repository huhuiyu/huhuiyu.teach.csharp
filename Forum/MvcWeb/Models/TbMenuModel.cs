using MvcWeb.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWeb.Models
{
    public class TbMenuModel : BaseModel
    {
        public TbMenu Menu { get; set; }
        public IList<TbMenu> MenuList { get; set; }
    }
}