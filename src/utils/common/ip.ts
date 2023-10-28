import { Request } from "express";
import IP2Region from "ip2region";
import * as useragent  from 'useragent'
export const getIp = (req: Request) => {

    const ips = (req.headers['x-forwarded-for'] as string) ||
    (req.headers['X-Real-IP'] as string) ||
    (req.ip.replace('::ffff:', '') as string).replace(':ffff:', '')

    console.log(ips.split(',')?.[0], 'ip');
    
    return ips.split(',')?.[0];
    
}

export const getAdressByIp = (ip:string):string => {
      if(!ip) return ''

      const query = new IP2Region()
      const res = query.search(ip)
      return [res.province, res.city].join(' ')
}

export const getUserAgent = (req:Request):useragent.Agent => {
       return useragent.parse(req.headers['user-agent'] as string)
}

/**
 * 获取不包含前缀的api
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