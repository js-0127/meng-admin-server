# Dockerfile
# 因为我们项目使用的是pnpm安装依赖，所以找了个支持pnpm的基础镜像，如果你们使用npm，这里可以替换成node镜像
# FROM nginx:alpine
FROM gplane/pnpm:8 as builder

# 设置时区
ENV TZ=Asia/Shanghai \
  DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*

# 创建工作目录
RUN mkdir -p /app

# 指定工作目录
WORKDIR /app

# 复制当前代码到/app工作目录
COPY . ./

RUN npm config set registry https://registry.npm.taobao.org/
# npm 安装依赖
COPY package.json /app/package.json

RUN rm -rf /app/package-lock.json
RUN cd /app && rm -rf /app/node_modules &&  pnpm install 

RUN cd /app pnpm run prisma migrate dev
RUN cd /app && rm -rf /app/dist && pnpm build


EXPOSE 3000
# 启动服务

CMD   pnpm run start:prod




