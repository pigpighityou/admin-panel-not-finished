/* 
*       环境配置(开发：dev，测试：test，线上：prod)
* */

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
   development: {
        baseApi: '/api',
      //   接口根地址
        mockApi:'https://www.fastmock.site/mock/420b24ce510b8fc96e2276cdf3fe35e5/api'
     },
   test: {
        baseApi: '/test-api', /* 未启用 */
        mockApi:'https://www.fastmock.site/mock/420b24ce510b8fc96e2276cdf3fe35e5/api'
     },
   pro: {
        baseApi: '/prod-api', /* 未启用 */
        mockApi:'https://www.fastmock.site/mock/420b24ce510b8fc96e2276cdf3fe35e5/api'
     },
   }


export default {
    env,
    // mock的开关
    mock:true,
    // Env对象里的属性解构
    ...EnvConfig[env]
}
