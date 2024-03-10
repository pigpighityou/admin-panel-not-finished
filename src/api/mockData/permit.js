import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          
          menu: [
  
            {
              key: "1",
              icon: () => h(DesktopOutlined),
              label: "用户管理",
              title: "用户管理",
            },
            {
              key: "2",
              icon: () => h(PieChartOutlined),
              label: "Option 2",
              title: "Option 2",
            },
            {
              key: "3",
              icon: () => h(InboxOutlined),
              label: "Option 3",
              title: "Option 3",
            },
            {
              key: "Navigation One",
              icon: () => h(MailOutlined),
              label: "Navigation One",
              title: "Navigation One",
              children: [
                {
                  key: "4",
                  label: "Option 4",
                  title: "Option 4",
                },
                {
                  key: "5",
                  label: "Option 5",
                  title: "Option 5",
                },
                {
                  key: "6",
                  label: "Option 6",
                  title: "Option 6",
                },
                {
                  key: "7",
                  label: "Option 7",
                  title: "Option 7",
                },
              ],
            },
            {
              key: "Setting",
              icon: () => h(ToolFilled),
              label: "Setting",
              title: "Setting",
              children: [
                {
                  key: "8",
                  label: "商品管理",
                  title: "page1",
                },
                {
                  key: "9",
                  label: "其他配置",
                  title: "page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          menu: [
  
            {
              key: "1",
              icon: () => h(DesktopOutlined),
              label: "用户管理",
              title: "用户管理",
            },
           
         
            {
              key: "Setting",
              icon: () => h(ToolFilled),
              label: "Setting",
              title: "Setting",
              children: [
                {
                  key: "2",
                  label: "商品管理",
                  title: "page1",
                },
                {
                  key: "3",
                  label: "其他配置",
                  title: "page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: 400,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}