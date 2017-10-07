using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class TypeMode : BaseModel
    {
        public int Tid { get; set; }
        public string Tname { get; set; }
        public string Tinfo { get; set; }
        public string IsEnable { get; set; }
        public IList<IDictionary<string, object>> TypeList { get; set; }
    }
}