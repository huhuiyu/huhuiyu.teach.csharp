use master
go
if(DB_ID('Forum') is not null)
	drop database Forum
go
create database Forum
go
use Forum
go
/*分类*/
create table TbType
(
	tid int identity primary key not null,
	tname nvarchar(50) unique not null,
	tinfo nvarchar(500) not null,
	isEnable char(1) check(isEnable in ('y','n')) default 'y' not null,
	createDate datetime default getdate() not null
)
go

select * from TbType
go

/*主题*/
create table TbSubject
(
	sid int identity primary key not null,
	tid int foreign key references TbType(tid) not null,
	sname nvarchar(50) unique not null,
	sinfo nvarchar(500) not null,
	isEnable char(1) check(isEnable in ('y','n')) default 'y' not null,
	createDate datetime default getdate() not null
)
go

select * from TbSubject
go

/*用户信息*/
create table TbUser
(
	uid int identity primary key not null,
	username nvarchar(20) unique not null,
	password nvarchar(20) not null,
	nickname nvarchar(50) not null,
	isAdmin char(1) check(isAdmin in ('y','n')) default 'n' not null,
	isEnable char(1) check(isEnable in ('y','n')) default 'y' not null,
	createDate datetime default getdate() not null
)
go

insert into TbUser(username,password,nickname,isAdmin) values('admin','manager','内置管理员','y')
go

select * from TbUser
go


create table TbInfo
(
	iid int identity primary key not null,
	uid int foreign key references TbUser(uid) not null,
	title nvarchar(50) not null,
	info  nvarchar(500) not null,
	isDelete char(1) check(isDelete in ('y','n')) default 'n' not null,
	createDate datetime default getdate() not null
)
go

select * from TbInfo
go

create table TbReturns
(
	rid int identity primary key not null,
	uid int foreign key references TbUser(uid) not null,
	iid int foreign key references TbInfo(iid) not null,
	content nvarchar(500) not null,
	isDelete char(1) check(isDelete in ('y','n')) default 'n' not null,
	createDate datetime default getdate() not null
)
go

select * from TbReturns
go