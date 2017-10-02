use master
go
if(DB_ID('VipManage') is not null)
	drop database VipManage
go
create database VipManage
go
use VipManage
go

/*会员卡信息*/
create table TblVipCard
(
	vcid int identity primary key not null,
	/*会员姓名*/
	username nvarchar(50) default '' not null,
	/*会员电话*/
	phone nvarchar(20) unique,
	/*卡面号*/
	cardno varchar(50) not null,
	/*是否启用*/
	isenable char(1) default 'y' not null,
	/*余额*/
	balance decimal(8,2) check(balance>=0) not null,
	/*开卡的时间*/
	createDate datetime default getdate() not null
)
go

select * from TblVipCard
go


