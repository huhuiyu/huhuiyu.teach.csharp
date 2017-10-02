using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VipManage.Dal.Entity;

namespace VipManage.Models
{
    public class VipCardModel : BaseModel
    {
        public int Vcid { get; set; }
        public string Username { get; set; }
        public string Phone { get; set; }
        public string Cardno { get; set; }
        public string Isenable { get; set; }
        public Decimal Balance { get; set; }
        public DateTime CreateDate { get; set; }

        public Page PageInfo { get; set; }

        public IList<IDictionary<string, object>>
            VipCardList { get; set; }

        public VipCardModel()
        {
VipCardList = new List<IDictionary<string, object>>();
PageInfo = new Page();
        }

    }
}