using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class DefaultModel : BaseModel
    {
        public int Tid { get; set; }

        public IList<IDictionary<string, object>> TypeList { get; set; }
    }
}