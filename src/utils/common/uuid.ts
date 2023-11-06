import { nanoid } from 'nanoid';
/**
 * @description 生成nanoid
 * @date 10/29/2023
 */
export const uuid = () => {
  return nanoid();
};

/**
 * @description 生成随机四位数
 * @date 10/25/2023
 */
export const generateRandomCode = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};
