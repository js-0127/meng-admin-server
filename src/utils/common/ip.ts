import { Request } from "express";
import IP2Region from "ip2region";
import * as useragent from 'useragent';


/**
 * @description 获取ip
 * @date 10/28/2023
 * @param req 
 * @returns 
 */
export const getIp = (req: Request) => {
    const ips = (req.headers['x-forwarded-for'] as string) ||
    (req.headers['X-Real-IP'] as string) ||
    (req.ip.replace('::ffff:', '') as string).replace(':ffff:', '')
    return ips.split(',')?.[0];
}

/**
 * @description 获取ip所在地区
 * @param ip 
 * @date 10/28/2023
 */
export const getAdressByIp = (ip:string):string => {
      if(!ip) return ''

      const query = new IP2Region()
      const res = query.search(ip)
      return [res.province, res.city].join(' ')
}

/**
 * @description 获取客户端信息
 * @date 10/28/2023
 * @param req 
 */
export const getUserAgent = (req:Request):useragent.Agent => {
       return useragent.parse(req.headers['user-agent'] as string)
}

/**
 * @description 获取不包含前缀的api
 * @date 10/28/2023
 * @param globalPrefix 前缀
 * @param url url
 * @returns url
 */
export const getExcludeGlobalPrefixUrl = (
    globalFix: string,
    url:string
) => {
    if(url.startsWith(globalFix)){
        return url.substring(globalFix.length)
    }

    return url
}