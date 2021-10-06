export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

// 英雄结构
export interface Hero {
  id: number
  name: string // 英雄名称
  icon: string // 英雄头像图标
  classify: string[] // 英雄类型
}

// 玩家数据结构
export interface Player {
  id: number
  accountname: string // 账号名
  nickname: string // 昵称
  avatar: string // 头像
  level: number // 等级
  exp: number // 经验值
  rank: number // 段位
  bravepoints: number // 勇者积分
  winningstreak: number // 连胜场次
  wanttoplay: Hero [] // 想着玩的英雄
}
