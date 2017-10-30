using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWeb.Dal.Entity
{
    public class Page
    {
        private int count = 0; //记录总数
        private int pageSize = 5; //分页大小
        private int pageNumber = 0; //当前页码

        private int pageCount = 0;//分页总数
        private int skip = 0; //分页查询跳过的记录数

        //只读属性
        public int PageCount
        {
            get
            {
                Compute();
                return pageCount;
            }
        }
        public int Skip
        {
            get
            {
                Compute();
                return skip;
            }
        }

        //读写属性
        public int Count {
            get { return count; }
            set { count = value; }
        }
        public int PageSize {
            get {
                Compute();
                return pageSize;
            }
            set { pageSize = value; }
        }
        public int PageNumber {
            get { 
                Compute();
                return pageNumber;
            }
            set { pageNumber = value; }
        }


        //计算和检验分页相关信息
        public void Compute()
        {
            if (count <= 0) //记录不存在的情况
            {
                count = 0;
                skip = 0;
                pageCount = 0;
                return;
            }
            if (pageSize < 1) //分页大小校验
            {
                pageSize = 5;
            }
            //计算分页总数
            //11,5 ==>3
            //10,5 ==>2
            pageCount = count / pageSize;
            if (count % pageSize > 0)
            {
                pageCount++;
            }
            //校验当前页码
            if (pageNumber < 1)
            {
                pageNumber = 1;
            }
            if (pageNumber > pageCount)
            {
                pageNumber = pageCount;
            }
            //分页查询跳过的记录数
            skip = pageSize * (pageNumber - 1);
        }

    }
}