using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class ReturnsModel : BaseModel
    {
        public int Iid { get; set; }
        public int Uid { get; set; }
        public string Content { get; set; }

    }
}