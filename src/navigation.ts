// =========================================================================
// 🌐 英文版导航配置 (精准指向 /aio 目录)
// =========================================================================
export const headerData = {
  links: [
    { text: 'Our Service', href: '/aio/services' }, 
    { text: 'Case Study', href: '/aio/cases' },    
    { text: 'Blog', href: '/blog' },
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
        { text: 'FAQs', href: '/aio/faqs' },      
        { text: 'Contact', href: '/aio/contact' },
        { text: 'Case Study', href: '/aio/cases' },    
        { text: 'Our Service', href: '/aio/services' }, 
        { text: 'About Us', href: '/aio/about' },
        { text: 'Privacy Policy', href: '/aio/privacy' },
      ],
    },
  ],
  secondaryLinks: [], 
  linksByColumn: false,
};

// =========================================================================
// 🇨🇳 ✨ 汉化版导航配置 (完美对齐你的 /aio/zh 路由标准)
// =========================================================================
export const headerDataZh = {
  links: [
    { text: '核心服务', href: '/aio/zh/services' }, // ✨ 修正：对齐 /aio/zh
    { text: '客户案例', href: '/aio/zh/cases' },    // ✨ 修正：对齐 /aio/zh
    { text: '技术博客', href: '/blog' }, 
    { text: 'English', href: '/aio' },
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
        { text: '常见问题', href: '/aio/zh/faqs' },      // ✨ 修正：补全 /aio
        { text: '联系我们', href: '/aio/zh/contact' },   // ✨ 修正：补全 /aio
        { text: '客户案例', href: '/aio/zh/cases' },     // ✨ 修正：补全 /aio
        { text: '核心服务', href: '/aio/zh/services' },  // ✨ 修正：补全 /aio
        { text: '关于我们', href: '/aio/zh/about' },     // ✨ 修正：补全 /aio
        { text: '隐私政策', href: '/aio/zh/privacy' },   // ✨ 修正：补全 /aio
      ],
    },
  ],
  secondaryLinks: [], 
  linksByColumn: false,
};