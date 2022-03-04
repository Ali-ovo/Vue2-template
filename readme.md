# 配置api

通过读取本地的app.config.json文件，获取ip和端口配置

具体配置文件为api.config.js、api-start.js、man.js

![image-20210310103014696](https://gitee.com/tanrenxuan/personal-image-storage-service/raw/master/img/image-20210310103014696.png)

# 生产环境访问路径

生产环境的根路径不是'/'而是配置的'/simudata/'

![image-20210310103235703](https://gitee.com/tanrenxuan/personal-image-storage-service/raw/master/img/image-20210310103235703.png)

所以，如果是生产环境api-start.js的访问本地json的路径也加上'/simudata/'

![image-20210310103455771](https://gitee.com/tanrenxuan/personal-image-storage-service/raw/master/img/image-20210310103455771.png)