using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VipManage.Models
{
    //测试用的Model,都要继承BaseModel
    public class TestModel : BaseModel
    {
        //回声服务的参数值
        public string Echo { get; set; }

        public IList<IDictionary<string, object>>
            TestDataList { get; set; }

        public string Tinfo { get; set; }

    }
}