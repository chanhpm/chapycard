USE [chapycard]
GO
/****** Object:  Table [dbo].[Domain]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Domain](
	[DomainId] [int] IDENTITY(1,1) NOT NULL,
	[DomainName] [varchar](100) NOT NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_Domain] PRIMARY KEY CLUSTERED 
(
	[DomainId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SystemLookupType]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SystemLookupType](
	[LookupTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_SystemLookupType] PRIMARY KEY CLUSTERED 
(
	[LookupTypeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[SystemLookupType] ON
INSERT [dbo].[SystemLookupType] ([LookupTypeId], [Description]) VALUES (1, N'User Status Codes')
INSERT [dbo].[SystemLookupType] ([LookupTypeId], [Description]) VALUES (2, N'Contact Titles')
INSERT [dbo].[SystemLookupType] ([LookupTypeId], [Description]) VALUES (3, N'Marital Statuses')
INSERT [dbo].[SystemLookupType] ([LookupTypeId], [Description]) VALUES (4, N'Sex')
INSERT [dbo].[SystemLookupType] ([LookupTypeId], [Description]) VALUES (5, N'Gender')
SET IDENTITY_INSERT [dbo].[SystemLookupType] OFF
/****** Object:  Table [dbo].[SecurityUser]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SecurityUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[FullName] [varchar](100) NOT NULL,
	[DomainId] [int] NOT NULL,
	[EmailAddress] [varchar](50) NULL,
	[ContactNumber] [varchar](20) NULL,
	[AutoLogin] [bit] NOT NULL,
	[LoginFailedAttempt] [int] NOT NULL,
	[Password] [varchar](128) NULL,
	[PasswordSalt] [varchar](20) NULL,
	[PasswordDate] [datetime] NULL,
	[Photo] [varbinary](max) NULL,
	[StatusId] [int] NOT NULL,
	[StatusDate] [datetime] NOT NULL,
	[EffectiveFromDate] [datetime] NULL,
	[EffectiveToDate] [datetime] NULL,
	[UserSignature] [varbinary](max) NULL,
	[TotalFreeServices] [int] NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_SecurityUser] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system lookup type 1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SecurityUser', @level2type=N'COLUMN',@level2name=N'StatusId'
GO
/****** Object:  Table [dbo].[SystemLookup]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SystemLookup](
	[LookupId] [int] IDENTITY(1,1) NOT NULL,
	[LookupTypeId] [int] NOT NULL,
	[LookupReference] [int] NOT NULL,
	[Description] [varchar](100) NOT NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_SystemLookup] PRIMARY KEY CLUSTERED 
(
	[LookupId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[SystemLookup] ON
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (2, 1, 1, N'Enabled')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (3, 1, 2, N'Disabled')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (4, 1, 3, N'Locked')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (5, 1, 4, N'Password Reset')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (6, 2, 1, N'Mr')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (7, 2, 2, N'Mrs')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (8, 2, 3, N'Miss')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (9, 3, 1, N'Married')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (10, 3, 2, N'Single')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (11, 4, 1, N'Male')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (12, 4, 2, N'Female')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (13, 5, 1, N'Man')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (14, 5, 2, N'Woman')
INSERT [dbo].[SystemLookup] ([LookupId], [LookupTypeId], [LookupReference], [Description]) VALUES (15, 5, 3, N'Sex Reassignment')
SET IDENTITY_INSERT [dbo].[SystemLookup] OFF
/****** Object:  Table [dbo].[UserDetail]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserDetail](
	[UserDetailId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TitleId] [int] NOT NULL,
	[Forename] [varchar](50) NOT NULL,
	[Middlename] [varchar](50) NULL,
	[Surname] [varchar](50) NOT NULL,
	[NINumber] [varchar](20) NULL,
	[Alias] [varchar](100) NULL,
	[MaritalStatusId] [int] NULL,
	[SexId] [int] NULL,
	[GenderId] [int] NULL,
	[FormattedName] [varchar](200) NOT NULL,
	[Comments] [varchar](max) NULL,
	[EffectiveFromDate] [datetime] NOT NULL,
	[EffectiveToDate] [datetime] NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_ContactDetail] PRIMARY KEY CLUSTERED 
(
	[UserDetailId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system lookup type 2' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'TitleId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system lookup type 3' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'MaritalStatusId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system lookup type 4' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'SexId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'system lookup type 5' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserDetail', @level2type=N'COLUMN',@level2name=N'GenderId'
GO
/****** Object:  Table [dbo].[SocialNetwork]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SocialNetwork](
	[SocialNetworkId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Facebook] [varchar](100) NULL,
	[IsFacebookLinked] [bit] NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_SocialNetwork] PRIMARY KEY CLUSTERED 
(
	[SocialNetworkId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SecurityUserPreference]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SecurityUserPreference](
	[UserPreferenceId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Index.html] [text] NULL,
	[Setting.json] [text] NULL,
	[PreferenceName] [varchar](100) NULL,
	[PreferenceValue] [varchar](50) NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_SecurityUserPreference] PRIMARY KEY CLUSTERED 
(
	[UserPreferenceId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Licence]    Script Date: 11/10/2013 08:39:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Licence](
	[LicenceId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[EffectiveFromDate] [datetime] NOT NULL,
	[EffectiveToDate] [datetime] NULL,
	[Timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_Licence] PRIMARY KEY CLUSTERED 
(
	[LicenceId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  ForeignKey [FK_Licence_SecurityUser]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[Licence]  WITH CHECK ADD  CONSTRAINT [FK_Licence_SecurityUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[SecurityUser] ([UserId])
GO
ALTER TABLE [dbo].[Licence] CHECK CONSTRAINT [FK_Licence_SecurityUser]
GO
/****** Object:  ForeignKey [FK_SecurityUser_Domain]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[SecurityUser]  WITH CHECK ADD  CONSTRAINT [FK_SecurityUser_Domain] FOREIGN KEY([DomainId])
REFERENCES [dbo].[Domain] ([DomainId])
GO
ALTER TABLE [dbo].[SecurityUser] CHECK CONSTRAINT [FK_SecurityUser_Domain]
GO
/****** Object:  ForeignKey [FK_SecurityUserPreference_SecurityUser]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[SecurityUserPreference]  WITH CHECK ADD  CONSTRAINT [FK_SecurityUserPreference_SecurityUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[SecurityUser] ([UserId])
GO
ALTER TABLE [dbo].[SecurityUserPreference] CHECK CONSTRAINT [FK_SecurityUserPreference_SecurityUser]
GO
/****** Object:  ForeignKey [FK_SocialNetwork_SecurityUser]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[SocialNetwork]  WITH CHECK ADD  CONSTRAINT [FK_SocialNetwork_SecurityUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[SecurityUser] ([UserId])
GO
ALTER TABLE [dbo].[SocialNetwork] CHECK CONSTRAINT [FK_SocialNetwork_SecurityUser]
GO
/****** Object:  ForeignKey [FK_SystemLookup_SystemLookupType]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[SystemLookup]  WITH CHECK ADD  CONSTRAINT [FK_SystemLookup_SystemLookupType] FOREIGN KEY([LookupTypeId])
REFERENCES [dbo].[SystemLookupType] ([LookupTypeId])
GO
ALTER TABLE [dbo].[SystemLookup] CHECK CONSTRAINT [FK_SystemLookup_SystemLookupType]
GO
/****** Object:  ForeignKey [FK_ContactDetail_SecurityUser]    Script Date: 11/10/2013 08:39:00 ******/
ALTER TABLE [dbo].[UserDetail]  WITH CHECK ADD  CONSTRAINT [FK_ContactDetail_SecurityUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[SecurityUser] ([UserId])
GO
ALTER TABLE [dbo].[UserDetail] CHECK CONSTRAINT [FK_ContactDetail_SecurityUser]
GO
