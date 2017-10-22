using Forum.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class InfoModel : BaseModel
    {
        public int Iid { get; set; }
        public int Uid { get; set; }
        public int Sid { get; set; }
        public string Title { get; set; }
        public string Info { get; set; }

        public Page PageInfo { get; set; }
        public IDictionary<string, object> InfoData { get; set; }
        public IList<IDictionary<string, object>> ReturnList { get; set; }

        public InfoModel()
        {
            PageInfo = new Page();
        }
    }
}