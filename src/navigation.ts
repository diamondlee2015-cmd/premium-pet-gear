// =========================================================================
// 🌐 英文版导航配置 (完美指向根目录核心大首页)
// =========================================================================
export const WHATSAPP_NUMBER = '+6590234708';
export const headerData = {
  links: [
    { text: 'Our Service', href: '/services' }, // ✨ 砍掉 /aio
    { text: 'Case Study', href: '/cases' },    // ✨ 砍掉 /aio
    { text: 'Blog', href: '/blog' },            // ✨ 保持标准的博客路由
  ],
  actions: [
    { text: 'Login', href: '/login', variant: 'link' },
    { text: 'Sign Up', href: '/signup', variant: 'primary' }
  ],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'FAQs', href: '/faqs' },       // ✨ 干净清爽
        { text: 'Contact', href: '/contact' },
        { text: 'Case Study', href: '/cases' },    
        { text: 'Our Service', href: '/services' }, 
        { text: 'About Us', href: '/about' },
        { text: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ],
  secondaryLinks: [], 
  linksByColumn: false,
};

// =========================================================================
// 🇨🇳 ✨ 汉化版导航配置 (完美对齐独立 /zh 文件夹路由体系)
// =========================================================================
export const headerDataZh = {
  links: [
    { text: '核心服务', href: '/zh/services' }, // ✨ 砍掉 /aio，直达 /zh/services
    { text: '客户案例', href: '/zh/cases' },    // ✨ 砍掉 /aio，直达 /zh/cases
    { text: '技术博客', href: '/blog' },        // 指向全站公用博客（或改为你的中文博客路由）
    { text: 'English', href: '/' },             // ✨ 切换回英文版大首页
  ],
  actions: [
    { text: '登录', href: '/login', variant: 'link' },
    { text: '注册', href: '/signup', variant: 'primary' }
  ],
};

export const footerDataZh = {
  links: [
    {
      title: '公司信息', 
      links: [
        { text: '常见问题', href: '/zh/faqs' },      // ✨ 清理干净
        { text: '联系我们', href: '/zh/contact' },   
        { text: '客户案例', href: '/zh/cases' },     
        { text: '核心服务', href: '/zh/services' },  
        { text: '关于我们', href: '/zh/about' },     
        { text: '隐私政策', href: '/zh/privacy' },   
      ],
    },
  ],
  secondaryLinks: [], 
  linksByColumn: false,
};