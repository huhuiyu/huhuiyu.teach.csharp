using Forum.Dal.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class SubjectMode : BaseModel
    {
        public int Tid { get; set; }
        public int Sid { get; set; }
        public string Sname { get; set; }
        public string Sinfo { get; set; }
        public string IsEnable { get; set; }

        public IList<IDictionary<string, object>> TypeList { get; set; }
        public IList<IDictionary<string, object>> SubjectList { get; set; }

        public Page PageInfo { get; set; }

        public SubjectMode()
        {
            PageInfo = new Page();
        }
    }
}