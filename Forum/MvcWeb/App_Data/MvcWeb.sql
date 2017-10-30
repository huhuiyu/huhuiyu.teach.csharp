use master
go
if(DB_ID('MvcWeb') is not null)
	drop database MvcWeb
go
create database MvcWeb
go
use MvcWeb
go

--菜单表
create table TbMenu
(
	mid int identity primary key not null,
	title nvarchar(50) not null,
	url varchar(255) unique not null,
	info nvarchar(500) not null,
	isEnable char(1) check(isEnable in ('y','n')) 
		default 'y' not null,
	created datetime default getdate() not null
)
go

insert into TbMenu(title,url,info) values('首页','/static/html/index.html','首页')
insert into TbMenu(title,url,info) values('用户管理','/static/html/user.html','用户管理')
insert into TbMenu(title,url,info) values('菜单管理','/static/html/menu.html','菜单管理')
insert into TbMenu(title,url,info) values('权限管理','/static/html/rolemenu.html','权限管理')

select * from TbMenu
go
