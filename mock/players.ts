import { Response, Request } from 'express'
import { Hero, Player } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'
faker.locale = 'zh_CN'

let playerList: Player[] = []
const playerCount = 100
const OK_CODE = 20000
const NOT_FOUND_CODE = 90000

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    nickname: faker.name.findName(), // 昵称
    avatar: faker.image.avatar(), // 头像
    level: faker.datatype.number(30), // 等级
    exp: faker.datatype.number({ min: 3000, max: 9999999 }), // 经验值
    rank: faker.datatype.number(200), // 段位
    bravepoints: faker.datatype.number(990), // 勇者积分
    winningstreak: faker.datatype.number(10), // 连胜场次
    wanttoplay: generateHeros() // 想着玩的英雄
  })
}

// 随机生成3个不重复英雄
function generateHeros() {
  const wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.datatype.number(9)])
  }

  return Array.from(wanttoplay)
}

/**
 * 获取玩家列表
 * @param req
 * @param res
 * @returns
 */
export const getPlayers = (req: Request, res: Response) => {
  let { accountname, page = 1, limit = 10 } = req.query
  const mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(accountname as string) < 0) {
      return false
    }
    return true
  })
  page = +page
  limit = +limit

  const total = mockList.length

  const startIndex = (page - 1) * limit
  const endIndex = (startIndex + limit) > total ? total : (startIndex + limit)
  const pageList = mockList.slice(startIndex, endIndex)
  return res.json({
    code: OK_CODE,
    data: {
      total,
      players: pageList
    }
  })
}

/**
 * 获取用户信息
 * @param req
 * @param res
 * @returns player
 */
export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: OK_CODE,
        player
      })
    }
  }

  return res.json({
    code: NOT_FOUND_CODE,
    message: '没有找到该玩家用户'
  })
}

/**
 * 创建玩家
 * @param req
 * @param res
 * @returns
 */
export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body

  return res.json({
    code: OK_CODE,
    message: player
  })
}

/**
 * 更新玩家信息
 * @param req
 * @param res
 * @returns
 */
export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body

  let p = playerList.find(item => item.id.toString() === id)
  if (p) {
    p = { ...p, ...player }
  }

  return res.json({
    code: OK_CODE,
    message: player
  })
}

/**
 * 删除玩家信息
 * @param req
 * @param res
 * @returns
 */
export const deletePlayer = (req: Request, res: Response) => {
  const { id } = req.params

  playerList = playerList.filter(item => item.id.toString() !== id)

  return res.json({
    code: OK_CODE,
    message: 'delete success'
  })
}
