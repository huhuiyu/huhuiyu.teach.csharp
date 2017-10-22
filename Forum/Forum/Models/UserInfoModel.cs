using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forum.Models
{
    public class UserInfoModel : BaseModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Nickname { get; set; }
    }
}