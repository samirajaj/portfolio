import { localizedText } from "./localized-content"
import { portfolioMedia } from "./portfolio-media"
import type { PortfolioData } from "./portfolio.types"

const text = localizedText

export const portfolioData = {
  identity: {
    name: "Samir Ajaj",
    initials: "SA",
    professionalTitle: text(
      "Freelance Full-Stack Developer",
      "مطوّر تطبيقات متكاملة مستقل"
    ),
    shortIntroduction: text(
      "I design and build maintainable web products across modern JavaScript and .NET ecosystems.",
      "أصمّم وأبني منتجات ويب قابلة للصيانة ضمن منظومتي JavaScript الحديثة و.NET."
    ),
  },
  hero: {
    eyebrow: text("Full-Stack Developer", "مطوّر تطبيقات متكاملة"),
    headline: text(
      "I build complete digital products, from interface to system design.",
      "أبني منتجات رقمية متكاملة، من الواجهة إلى تصميم النظام."
    ),
    description: text(
      "I work across React, TypeScript, Next.js, C#, and .NET to create multilingual interfaces and maintainable application backends with clear technical boundaries.",
      "أعمل باستخدام React وTypeScript وNext.js وC# و.NET لبناء واجهات متعددة اللغات وأنظمة خلفية قابلة للصيانة بحدود تقنية واضحة."
    ),
    availability: text(
      "Freelance full-stack development · 2024—Present",
      "تطوير تطبيقات متكاملة بشكل مستقل · 2024—الآن"
    ),
    stackHighlights: ["React", "TypeScript", "Next.js", "C#", ".NET"],
    proofPoints: [
      text(
        "Frontend and backend implementation",
        "تنفيذ الواجهات والأنظمة الخلفية"
      ),
      text(
        "English and Arabic product experiences",
        "تجارب منتجات باللغتين العربية والإنجليزية"
      ),
      text(
        "Explicit architecture and authorization decisions",
        "قرارات واضحة للمعمارية والصلاحيات"
      ),
    ],
  },
  about: {
    introduction: text(
      "I am a full-stack developer focused on turning product requirements into clear interfaces and structured application systems.",
      "أنا مطوّر تطبيقات متكاملة أركّز على تحويل متطلبات المنتجات إلى واجهات واضحة وأنظمة تطبيقات منظّمة."
    ),
    paragraphs: [
      text(
        "My public work spans bilingual marketplaces, role-aware workflows, authentication and authorization, data modeling, and reusable .NET infrastructure.",
        "تشمل أعمالي العامة منصات ثنائية اللغة، ومسارات عمل مرتبطة بالأدوار، والمصادقة والصلاحيات، ونمذجة البيانات، وبنية .NET قابلة لإعادة الاستخدام."
      ),
      text(
        "I favor explicit system boundaries, server-side validation, maintainable feature ownership, and interfaces designed deliberately for both LTR and RTL reading directions.",
        "أفضّل الحدود الواضحة بين أجزاء النظام، والتحقق على الخادم، وملكية الميزات القابلة للصيانة، وواجهات مصممة بعناية لاتجاهي القراءة من اليسار ومن اليمين."
      ),
    ],
    currentFocus: text(
      "Current focus: production-minded full-stack architecture, secure application workflows, and multilingual product quality.",
      "التركيز الحالي: معمارية تطبيقات متكاملة مهيأة للإنتاج، ومسارات تطبيق آمنة، وجودة المنتجات متعددة اللغات."
    ),
    principles: [
      {
        title: text("Clarity before complexity", "الوضوح قبل التعقيد"),
        description: text(
          "Make responsibilities, data ownership, and state changes understandable before adding abstraction.",
          "جعل المسؤوليات وملكية البيانات وتغيّر الحالات مفهومة قبل إضافة التجريدات."
        ),
      },
      {
        title: text("Authority at the boundary", "فرض الصلاحيات عند الحدود"),
        description: text(
          "Validate identity, permissions, ownership, and current resource state where mutations occur.",
          "التحقق من الهوية والصلاحيات والملكية والحالة الحالية للموارد عند تنفيذ عمليات التغيير."
        ),
      },
      {
        title: text(
          "One product, both directions",
          "منتج واحد لاتجاهي القراءة"
        ),
        description: text(
          "Treat English, Arabic, LTR, and RTL behavior as parts of the same product rather than separate implementations.",
          "التعامل مع العربية والإنجليزية واتجاهي القراءة كأجزاء من منتج واحد بدلاً من تنفيذات منفصلة."
        ),
      },
    ],
  },
  contact: {
    email: "samirajaj.official@gmail.com",
    phone: "+963 985 215 130",
    links: [
      { id: "linkedin", url: "https://linkedin.com/in/samirajaj" },
      { id: "github", url: "https://github.com/samirajaj" },
      { id: "website", url: "https://samirajaj.vercel.app" },
    ],
    headline: text(
      "Have a product to build or a role to discuss? Let’s examine the problem.",
      "لديك منتج تريد بناءه أو فرصة ترغب في مناقشتها؟ لنبدأ بفهم المشكلة."
    ),
    introduction: text(
      "Reach me directly to discuss full-stack product work, application architecture, or a development role.",
      "تواصل معي مباشرة لمناقشة تطوير منتج متكامل أو معمارية تطبيق أو فرصة عمل برمجية."
    ),
    workTypes: [
      text("Full-stack web applications", "تطبيقات ويب متكاملة"),
      text("Product MVPs", "النسخ الأولية للمنتجات"),
      text(
        "Frontend and backend implementation",
        "تنفيذ الواجهات والأنظمة الخلفية"
      ),
      text("Multilingual and RTL products", "منتجات متعددة اللغات وتدعم RTL"),
    ],
  },
  cv: {
    available: false,
    filePath: null,
    fileName: null,
  },
  services: [
    {
      id: "full-stack-applications",
      title: text(
        "Custom web application development",
        "تطوير تطبيقات ويب مخصصة"
      ),
      description: text(
        "End-to-end implementation that connects a polished interface to clear application logic, authorization, and persistence.",
        "تنفيذ متكامل يربط واجهة مصقولة بمنطق تطبيق واضح وصلاحيات وطبقة حفظ بيانات."
      ),
    },
    {
      id: "product-mvps",
      title: text("Product MVP development", "تطوير النسخ الأولية للمنتجات"),
      description: text(
        "A focused first release built around the essential user journeys and the technical boundaries needed to keep evolving it.",
        "إصدار أول مركّز على رحلات المستخدم الأساسية والحدود التقنية اللازمة لتطويره لاحقاً."
      ),
    },
    {
      id: "frontend-engineering",
      title: text(
        "Responsive frontend implementation",
        "تنفيذ واجهات أمامية متجاوبة"
      ),
      description: text(
        "Accessible React and TypeScript interfaces with deliberate responsive behavior, component structure, and interaction states.",
        "واجهات باستخدام React وTypeScript تراعي الوصول والاستجابة وبنية المكونات وحالات التفاعل."
      ),
    },
    {
      id: "backend-systems",
      title: text("Backend systems and APIs", "الأنظمة الخلفية وواجهات API"),
      description: text(
        "Application services, data access, validation, and API boundaries designed for understandable ownership and change.",
        "خدمات تطبيق ووصول إلى البيانات وتحقق وحدود API مصممة لملكية واضحة وقابلية للتغيير."
      ),
    },
    {
      id: "auth-permissions",
      title: text(
        "Authentication and permission workflows",
        "مسارات المصادقة والصلاحيات"
      ),
      description: text(
        "Role, capability, ownership, session, and resource-state checks integrated into application workflows.",
        "دمج التحقق من الدور والقدرة والملكية والجلسة وحالة المورد ضمن مسارات التطبيق."
      ),
    },
    {
      id: "localization-rtl",
      title: text(
        "Multilingual and RTL applications",
        "تطبيقات متعددة اللغات وتدعم RTL"
      ),
      description: text(
        "English and Arabic experiences with locale-aware routing, translated content, and direction-aware layouts.",
        "تجارب بالعربية والإنجليزية مع توجيه مرتبط باللغة ومحتوى مترجم وتخطيطات تراعي اتجاه القراءة."
      ),
    },
  ],
  skillGroups: [
    {
      id: "interface-engineering",
      title: text("Interface Engineering", "هندسة الواجهات"),
      description: text(
        "Typed, responsive interfaces with reusable components and purposeful interaction behavior.",
        "واجهات مكتوبة بأنواع واضحة ومتجاوبة، مع مكونات قابلة لإعادة الاستخدام وتفاعلات هادفة."
      ),
      skills: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Base UI",
        "Radix UI",
        "GSAP",
      ],
    },
    {
      id: "frontend-architecture",
      title: text("Frontend Architecture", "معمارية الواجهات الأمامية"),
      description: text(
        "Feature ownership, route composition, forms, client state, and clear server-client boundaries.",
        "ملكية الميزات وتركيب المسارات والنماذج وحالة العميل وحدود واضحة بين الخادم والعميل."
      ),
      skills: ["Next.js", "React Router", "React Hook Form", "Zod", "Zustand"],
    },
    {
      id: "backend-systems",
      title: text("Backend Systems", "الأنظمة الخلفية"),
      description: text(
        "Service boundaries, dependency injection, REST endpoints, and server-side application workflows.",
        "حدود الخدمات وحقن الاعتماديات ونقاط REST ومسارات التطبيقات المنفذة على الخادم."
      ),
      skills: ["C#", ".NET", "ASP.NET Core MVC", "Dependency Injection"],
    },
    {
      id: "authentication-authorization",
      title: text("Authentication and Authorization", "المصادقة والتفويض"),
      description: text(
        "Session, role, capability, ownership, and state checks enforced beyond interface visibility.",
        "فرض التحقق من الجلسات والأدوار والقدرات والملكية والحالة بعيداً عن مجرد إظهار عناصر الواجهة."
      ),
      skills: ["Better Auth", "RBAC", "Session Management", "Argon2id"],
    },
    {
      id: "data-persistence",
      title: text("Data and Persistence", "البيانات والاستمرارية"),
      description: text(
        "Structured data access, transactional workflows, indexes, and provider-aware persistence.",
        "وصول منظّم إلى البيانات ومسارات معاملاتيّة وفهارس واستمرارية تراعي مزوّد الخدمة."
      ),
      skills: [
        "MongoDB",
        "Mongoose",
        "Entity Framework Core",
        "SQL Server",
        "Cloudinary",
      ],
    },
    {
      id: "localization-quality",
      title: text(
        "Localization and Engineering Quality",
        "التوطين وجودة الهندسة"
      ),
      description: text(
        "Bilingual content, RTL behavior, validation, static analysis, and production-build discipline.",
        "محتوى ثنائي اللغة وسلوك RTL والتحقق والتحليل الساكن والانضباط في بناء إصدارات الإنتاج."
      ),
      skills: ["next-intl", "i18next", "RTL", "Vitest", "ESLint"],
    },
  ],
  experience: [
    {
      id: "freelance-full-stack-developer",
      role: text(
        "Freelance Full-Stack Developer",
        "مطوّر تطبيقات متكاملة مستقل"
      ),
      organization: text("Independent", "عمل مستقل"),
      engagement: "freelance",
      period: {
        start: "2024",
        end: null,
        current: true,
      },
      description: text(
        "Building independent full-stack web applications across React, TypeScript, Next.js, C#, and .NET, with an emphasis on clean boundaries and multilingual product experiences.",
        "بناء تطبيقات ويب متكاملة بشكل مستقل باستخدام React وTypeScript وNext.js وC# و.NET، مع التركيز على الحدود الواضحة وتجارب المنتجات متعددة اللغات."
      ),
      responsibilities: [
        text(
          "Translate product workflows into interface, service, and persistence boundaries.",
          "تحويل مسارات المنتجات إلى حدود واضحة للواجهة والخدمات وحفظ البيانات."
        ),
        text(
          "Implement authentication, role-aware authorization, and data validation.",
          "تنفيذ المصادقة والصلاحيات المرتبطة بالأدوار والتحقق من البيانات."
        ),
        text(
          "Build English and Arabic experiences with direction-aware layouts.",
          "بناء تجارب بالعربية والإنجليزية مع تخطيطات تراعي اتجاه القراءة."
        ),
      ],
    },
  ],
  education: [
    {
      id: "software-engineering-diploma",
      credential: text(
        "Diploma in Software Engineering",
        "دبلوم في هندسة البرمجيات"
      ),
      institution: text("TCC", "TCC"),
      period: {
        start: "2023",
        end: "2026",
        current: false,
      },
      description: text(
        "Formal diploma studies in software engineering completed across the 2023–2026 program period.",
        "دراسة دبلوم أكاديمية في هندسة البرمجيات ضمن البرنامج الممتد من 2023 إلى 2026."
      ),
    },
    {
      id: "information-technology-engineering-bsc",
      credential: text(
        "BSc in Information Technology Engineering",
        "بكالوريوس في هندسة تقانة المعلومات"
      ),
      institution: text(
        "Syrian Virtual University (SVU)",
        "الجامعة الافتراضية السورية (SVU)"
      ),
      period: {
        start: "2023",
        end: null,
        current: true,
      },
      description: text(
        "Ongoing undergraduate study in information technology engineering.",
        "دراسة جامعية مستمرة في هندسة تقانة المعلومات."
      ),
    },
  ],
  process: [
    {
      id: "understand",
      number: "01",
      title: text("Understand the problem", "فهم المشكلة"),
      description: text(
        "Clarify the people, workflows, constraints, and evidence that define a useful outcome.",
        "توضيح المستخدمين ومسارات العمل والقيود والأدلة التي تحدد نتيجة مفيدة."
      ),
    },
    {
      id: "boundaries",
      number: "02",
      title: text("Define clear system boundaries", "تحديد حدود واضحة للنظام"),
      description: text(
        "Assign ownership to interface, domain, authorization, and persistence concerns before implementation expands.",
        "تحديد ملكية الواجهة والمجال والصلاحيات وحفظ البيانات قبل توسّع التنفيذ."
      ),
    },
    {
      id: "build",
      number: "03",
      title: text("Build the core experience", "بناء التجربة الأساسية"),
      description: text(
        "Implement the primary journey end to end so the interface and backend evolve together.",
        "تنفيذ الرحلة الأساسية بشكل متكامل كي تتطور الواجهة والنظام الخلفي معاً."
      ),
    },
    {
      id: "validate",
      number: "04",
      title: text("Validate and refine", "التحقق والتحسين"),
      description: text(
        "Review behavior, accessibility, localization, failure states, and production constraints before polishing details.",
        "مراجعة السلوك والوصول والتوطين وحالات الفشل وقيود الإنتاج قبل صقل التفاصيل."
      ),
    },
  ],
  projects: [
    {
      slug: "autonest",
      status: "in-progress",
      featured: true,
      year: 2026,
      order: 1,
      title: text("AutoNest", "AutoNest"),
      descriptor: text(
        "Bilingual automotive marketplace",
        "منصة سيارات ثنائية اللغة"
      ),
      summary: text(
        "A bilingual automotive marketplace that combines public vehicle discovery with customer, approved-dealer, and administrator workflows for sales and rentals.",
        "منصة سيارات ثنائية اللغة تجمع بين استكشاف المركبات ومسارات البيع والتأجير المخصصة للعملاء والتجار المعتمدين والمشرفين."
      ),
      context: text(
        "The project is being developed as a full-stack product exercise around marketplace boundaries: identity, inventory, requests, media, moderation, and feedback.",
        "يُطوّر المشروع كتطبيق متكامل يستكشف حدود أنظمة السوق: الهوية والمخزون والطلبات والوسائط والإشراف والتقييمات."
      ),
      problem: text(
        "A vehicle marketplace needs more than listings. Available actions must change with the user’s role, dealer approval, record ownership, and the current state of each rental or purchase request.",
        "لا يكفي أن تعرض منصة المركبات قوائم السيارات؛ إذ يجب أن تتغير العمليات بحسب دور المستخدم وحالة اعتماد التاجر وملكية السجل والحالة الحالية لكل طلب شراء أو تأجير."
      ),
      scope: text(
        "Localized public inventory, authentication and account recovery, favorites, dealer inventory management, rental and purchase requests, notifications, ratings, administration, and role-specific analytics.",
        "مخزون عام مترجم، ومصادقة واستعادة للحساب، ومفضلة، وإدارة لمخزون التجار، وطلبات شراء وتأجير، وإشعارات، وتقييمات، وإدارة، وتحليلات مخصصة بحسب الدور."
      ),
      solution: text(
        "A feature-focused Next.js application with MongoDB repositories and services, explicit request state rules, and server-side authorization repeated at each mutation boundary.",
        "تطبيق Next.js منظّم بحسب الميزات، مع مستودعات وخدمات MongoDB وقواعد واضحة لحالات الطلبات وصلاحيات تُفرض على الخادم عند كل عملية تغيير."
      ),
      role: text(
        "Repository owner and full-stack implementer",
        "مالك المستودع ومنفّذ التطبيق المتكامل"
      ),
      responsibilities: [
        text(
          "Structure localized public pages and role-specific dashboards.",
          "هيكلة الصفحات العامة المترجمة ولوحات التحكم المخصصة بحسب الدور."
        ),
        text(
          "Model vehicle inventory, favorites, ratings, notifications, and purchase or rental requests.",
          "نمذجة مخزون المركبات والمفضلة والتقييمات والإشعارات وطلبات الشراء أو التأجير."
        ),
        text(
          "Enforce identity, approval, ownership, role, and state checks on the server.",
          "فرض التحقق من الهوية والاعتماد والملكية والدور والحالة على الخادم."
        ),
        text(
          "Integrate MongoDB persistence, Better Auth, and Cloudinary media handling.",
          "دمج حفظ البيانات في MongoDB والمصادقة عبر Better Auth وإدارة الوسائط عبر Cloudinary."
        ),
      ],
      interfaceWork: text(
        "The interface separates public vehicle discovery from customer, dealer, and administrator workspaces. Locale-prefixed routes and document-level direction support English and Arabic without separate component trees.",
        "تفصل الواجهة بين استكشاف المركبات العام ومساحات عمل العملاء والتجار والمشرفين. وتدعم المسارات المرتبطة باللغة واتجاه المستند العربية والإنجليزية من دون أشجار مكونات منفصلة."
      ),
      responsiveBehavior: text(
        "Catalog and dashboard views use responsive component composition; final live-device verification remains part of the project’s in-progress work.",
        "تعتمد واجهات الكتالوج ولوحات التحكم على تركيب مكونات متجاوب، بينما يبقى التحقق النهائي على الأجهزة الحقيقية جزءاً من العمل المستمر على المشروع."
      ),
      architecture: text(
        "Next.js App Router composes localized pages and route handlers. Feature modules separate components, schemas, services, and repositories; Better Auth owns identity, MongoDB with Mongoose stores domain data, and Cloudinary handles inventory media.",
        "يؤلف Next.js App Router الصفحات المترجمة ومسارات API. وتفصل وحدات الميزات بين المكونات والمخططات والخدمات والمستودعات؛ بينما يدير Better Auth الهوية، وتحفظ MongoDB مع Mongoose بيانات المجال، ويتولى Cloudinary وسائط المخزون."
      ),
      decisions: [
        {
          title: text(
            "Explicit request state transitions",
            "انتقالات صريحة لحالات الطلبات"
          ),
          context: text(
            "Rental and purchase actions depend on role, assignment, approval, ownership, and current request state.",
            "تعتمد عمليات التأجير والشراء على الدور والإسناد والاعتماد والملكية والحالة الحالية للطلب."
          ),
          decision: text(
            "Keep transition rules on the server and recheck every relevant condition at the mutation boundary.",
            "إبقاء قواعد انتقال الحالات على الخادم وإعادة التحقق من كل شرط ذي صلة عند حدود عملية التغيير."
          ),
          alternatives: text(
            "Allow each interface action to write a new status directly or rely on hidden controls as the permission boundary.",
            "السماح لكل إجراء في الواجهة بكتابة حالة جديدة مباشرة أو الاعتماد على إخفاء عناصر التحكم كحد للصلاحيات."
          ),
          tradeOff: text(
            "The server layer contains more policy code, but permitted transitions are explicit and independent of the client.",
            "تحتوي طبقة الخادم على قواعد أكثر، لكن الانتقالات المسموحة تصبح واضحة ومستقلة عن العميل."
          ),
        },
        {
          title: text(
            "Feature-level repositories and services",
            "مستودعات وخدمات على مستوى الميزات"
          ),
          context: text(
            "Inventory, requests, favorites, ratings, notifications, and administration have different data and authorization concerns.",
            "للمخزون والطلبات والمفضلة والتقييمات والإشعارات والإدارة احتياجات مختلفة للبيانات والصلاحيات."
          ),
          decision: text(
            "Keep data access and application logic inside the feature that owns each workflow.",
            "إبقاء الوصول إلى البيانات ومنطق التطبيق ضمن الميزة المالكة لكل مسار عمل."
          ),
          alternatives: text(
            "Use route handlers as the only layer or collect all database access in one generic repository.",
            "استخدام مسارات API كطبقة وحيدة أو جمع كل الوصول إلى قاعدة البيانات في مستودع عام واحد."
          ),
          tradeOff: text(
            "There are more modules to navigate, but responsibilities and policy boundaries stay visible.",
            "يزداد عدد الوحدات التي يجب التنقل بينها، لكن المسؤوليات وحدود القواعد تبقى واضحة."
          ),
        },
      ],
      tradeOffs: [
        text(
          "Supporting customer, dealer, and administrator workflows increases the authorization and testing surface.",
          "يؤدي دعم مسارات العملاء والتجار والمشرفين إلى توسيع نطاق الصلاحيات والاختبار."
        ),
        text(
          "The public repository documents the implementation, but no live deployment is currently listed for this full-stack version.",
          "يوثق المستودع العام التنفيذ، لكن لا يوجد حالياً رابط نشر حي مدرج لهذه النسخة المتكاملة."
        ),
      ],
      challenges: [
        text(
          "Keep authorization correct as the same request moves between several roles and states.",
          "الحفاظ على صحة الصلاحيات أثناء انتقال الطلب نفسه بين عدة أدوار وحالات."
        ),
        text(
          "Make route, copy, and document direction changes coherent across public and dashboard experiences.",
          "توحيد تغيّر المسار والمحتوى واتجاه المستند عبر التجارب العامة ولوحات التحكم."
        ),
        text(
          "Keep uploaded inventory media tied to an authorized owner and lifecycle.",
          "ربط وسائط المخزون المرفوعة بمالك مخوّل ودورة حياة واضحة."
        ),
      ],
      outcomes: [
        text(
          "The public codebase includes inventory discovery, authentication, favorites, request workflows, notifications, ratings, and role-specific dashboards.",
          "تتضمن الشيفرة العامة استكشاف المخزون والمصادقة والمفضلة ومسارات الطلبات والإشعارات والتقييمات ولوحات تحكم مخصصة بحسب الدور."
        ),
        text(
          "Architecture documentation records the application boundaries, authorization strategy, and request state machines for continued development.",
          "توثّق مستندات المعمارية حدود التطبيق واستراتيجية الصلاحيات وآلات حالات الطلبات لمواصلة التطوير."
        ),
      ],
      capabilities: [
        text("Bilingual vehicle discovery", "استكشاف مركبات ثنائي اللغة"),
        text("Role-specific dashboards", "لوحات تحكم مخصصة بحسب الدور"),
        text("Purchase and rental workflows", "مسارات شراء وتأجير"),
        text("Inventory media management", "إدارة وسائط المخزون"),
        text("Administration and moderation", "الإدارة والإشراف"),
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "MongoDB",
        "Mongoose",
        "Better Auth",
        "Cloudinary",
        "next-intl",
        "Zod",
        "React Hook Form",
      ],
      images: [
        {
          ...portfolioMedia.projects.autonest.systemMap,
          kind: "system-map",
          alt: text(
            "AutoNest system map connecting localized interfaces, role checks, feature services, MongoDB, and Cloudinary.",
            "مخطط نظام AutoNest يربط الواجهات المترجمة بالتحقق من الأدوار وخدمات الميزات وMongoDB وCloudinary."
          ),
          caption: text(
            "Current application boundaries and request flow.",
            "حدود التطبيق الحالية ومسار الطلب."
          ),
        },
      ],
      links: {
        repository: "https://github.com/samirajaj/autonest-next.js",
      },
    },
    {
      slug: "marketplace",
      status: "in-progress",
      featured: true,
      year: 2026,
      order: 2,
      title: text(
        "E-commerce Marketplace MVP",
        "نسخة أولية لمنصة تجارة إلكترونية"
      ),
      descriptor: text(
        "Bilingual multi-vendor commerce system",
        "نظام تجارة متعدد البائعين وثنائي اللغة"
      ),
      summary: text(
        "A production-minded marketplace MVP with customer, seller, and administrator workflows, transactional simulated checkout, inventory control, and auditable security boundaries.",
        "نسخة أولية لمنصة تجارة إلكترونية مهيأة للإنتاج، تتضمن مسارات للعملاء والبائعين والمشرفين، ودفعاً تجريبياً معاملاتيّاً، وضبطاً للمخزون، وحدوداً أمنية قابلة للتدقيق."
      ),
      context: text(
        "The project explores a multi-vendor commerce system where one storefront must support customer purchasing, seller operations, and platform administration without blurring their authority.",
        "يستكشف المشروع نظام تجارة متعدد البائعين، حيث يجب أن تدعم واجهة متجر واحدة شراء العملاء وعمليات البائعين وإدارة المنصة من دون خلط صلاحياتهم."
      ),
      problem: text(
        "Marketplace checkout and fulfilment can corrupt stock or expose another seller’s data when prices, ownership, authorization, and order changes are trusted to the interface or updated independently.",
        "قد تؤدي عمليات الدفع والتنفيذ في السوق إلى إفساد المخزون أو كشف بيانات بائع آخر عندما تُترك الأسعار والملكية والصلاحيات وتغيّرات الطلبات للواجهة أو تُحدّث بشكل منفصل."
      ),
      scope: text(
        "Bilingual storefront discovery, search and filtering, product details, cart and wishlist, simulated checkout, customer orders, seller onboarding and catalog operations, sales analytics, and administrative user, catalog, order, session, and audit controls.",
        "استكشاف متجر ثنائي اللغة، وبحث وتصفية، وتفاصيل منتجات، وسلة ومفضلة، ودفع تجريبي، وطلبات العملاء، وتهيئة البائعين وعمليات الكتالوج، وتحليلات المبيعات، وضوابط إدارية للمستخدمين والكتالوج والطلبات والجلسات والتدقيق."
      ),
      solution: text(
        "A feature-based Next.js application that keeps prices and authorization server-authoritative, uses MongoDB transactions for checkout, stores immutable order snapshots, and repeats capability and ownership checks near database operations.",
        "تطبيق Next.js منظّم بحسب الميزات يجعل الأسعار والصلاحيات تحت سلطة الخادم، ويستخدم معاملات MongoDB للدفع، ويحفظ لقطات ثابتة للطلبات، ويعيد فحص القدرات والملكية قرب عمليات قاعدة البيانات."
      ),
      role: text(
        "Repository owner and full-stack implementer",
        "مالك المستودع ومنفّذ التطبيق المتكامل"
      ),
      responsibilities: [
        text(
          "Model customer, seller, and administrator capabilities and application routes.",
          "نمذجة قدرات العملاء والبائعين والمشرفين ومسارات التطبيق."
        ),
        text(
          "Implement transactional checkout, stock updates, order snapshots, and seller fulfilment workflows.",
          "تنفيذ دفع معاملاتي وتحديثات للمخزون ولقطات للطلبات ومسارات تنفيذ خاصة بالبائعين."
        ),
        text(
          "Build bilingual storefront and dashboard interfaces with responsive, direction-aware behavior.",
          "بناء واجهات متجر ولوحات تحكم ثنائية اللغة ومتجاوبة وتراعي اتجاه القراءة."
        ),
        text(
          "Document architecture, security boundaries, environment requirements, and deployment work still needed.",
          "توثيق المعمارية والحدود الأمنية ومتطلبات البيئة وأعمال النشر المتبقية."
        ),
      ],
      interfaceWork: text(
        "The product separates a public storefront and customer account from seller and administrator dashboards. Search, filters, cursor pagination, product states, cart, wishlist, forms, and order status views share localized UI foundations.",
        "يفصل المنتج بين المتجر العام وحساب العميل من جهة ولوحات البائع والمشرف من جهة أخرى. وتشترك واجهات البحث والتصفية والترقيم بالمؤشر وحالات المنتجات والسلة والمفضلة والنماذج وحالات الطلبات في أساس واجهة مترجم."
      ),
      responsiveBehavior: text(
        "Storefront and dashboard components are structured for responsive layouts and English or Arabic direction; final deployment and broad device verification remain in progress.",
        "تُبنى مكونات المتجر ولوحات التحكم لتخطيطات متجاوبة واتجاهي العربية والإنجليزية، بينما لا يزال النشر النهائي والتحقق على نطاق واسع من الأجهزة قيد العمل."
      ),
      architecture: text(
        "Next.js App Router composes locale-aware storefront, account, seller, and admin routes. Feature modules own actions, schemas, components, and server repositories; Better Auth manages sessions, MongoDB stores indexed application data, and signed Cloudinary flows isolate product media uploads.",
        "يؤلف Next.js App Router مسارات المتجر والحساب والبائع والإدارة المرتبطة باللغة. وتمتلك وحدات الميزات الإجراءات والمخططات والمكونات ومستودعات الخادم؛ ويدير Better Auth الجلسات، وتحفظ MongoDB بيانات التطبيق المفهرسة، وتعزل تدفقات Cloudinary الموقعة عمليات رفع صور المنتجات."
      ),
      decisions: [
        {
          title: text(
            "Atomic, server-authoritative checkout",
            "دفع ذري تحت سلطة الخادم"
          ),
          context: text(
            "A single customer cart can contain products from several sellers while stock and price may change before checkout completes.",
            "قد تحتوي سلة عميل واحدة على منتجات من عدة بائعين، بينما يمكن أن يتغير المخزون والسعر قبل اكتمال الدفع."
          ),
          decision: text(
            "Re-read authoritative prices, conditionally update stock, create immutable order snapshots, enforce idempotency, and write one order per seller inside a MongoDB transaction.",
            "إعادة قراءة الأسعار المعتمدة وتحديث المخزون بشروط وإنشاء لقطات ثابتة للطلبات وفرض عدم تكرار العملية وكتابة طلب لكل بائع ضمن معاملة MongoDB."
          ),
          alternatives: text(
            "Trust prices from the cart, update each product independently, or create one cross-seller order without transactional guarantees.",
            "الثقة بأسعار السلة أو تحديث كل منتج بشكل منفصل أو إنشاء طلب واحد عابر للبائعين من دون ضمانات معاملاتيّة."
          ),
          tradeOff: text(
            "Checkout requires a MongoDB replica set and more coordination code, but stock and order state change as one unit.",
            "يتطلب الدفع مجموعة نسخ متماثلة من MongoDB وشيفرة تنسيق إضافية، لكن المخزون وحالة الطلب يتغيران كوحدة واحدة."
          ),
        },
        {
          title: text(
            "Authorization close to data access",
            "الصلاحيات قريبة من الوصول إلى البيانات"
          ),
          context: text(
            "Hiding a control cannot prevent a forged request from targeting another seller’s store, product, or order.",
            "لا يمكن لإخفاء عنصر تحكم أن يمنع طلباً مزوراً من استهداف متجر أو منتج أو طلب تابع لبائع آخر."
          ),
          decision: text(
            "Repeat database-backed role, capability, account-state, and ownership checks inside sensitive actions and repositories.",
            "إعادة فحص الدور والقدرة وحالة الحساب والملكية اعتماداً على قاعدة البيانات داخل الإجراءات والمستودعات الحساسة."
          ),
          alternatives: text(
            "Rely on dashboard route guards, optimistic middleware cookies, or conditional interface rendering alone.",
            "الاعتماد فقط على حراسة مسارات لوحة التحكم أو ملفات الارتباط المتفائلة في الوسيط أو العرض الشرطي للواجهة."
          ),
          tradeOff: text(
            "Repeated checks add queries and policy code, but the security boundary does not depend on the client.",
            "تضيف عمليات التحقق المتكررة استعلامات وقواعد إضافية، لكن الحد الأمني لا يعتمد على العميل."
          ),
        },
        {
          title: text(
            "Signed, seller-scoped media uploads",
            "رفع وسائط موقّع ومقيّد بالبائع"
          ),
          context: text(
            "Direct browser uploads reduce server transfer cost but can become an unrestricted path into shared media storage.",
            "تقلل عمليات الرفع المباشر من المتصفح تكلفة النقل عبر الخادم، لكنها قد تصبح مساراً غير مقيّد إلى مخزن الوسائط المشترك."
          ),
          decision: text(
            "Issue short-lived signed grants for a random public ID inside the authenticated seller’s folder, then verify the signed upload response before saving product metadata.",
            "إصدار منح موقعة قصيرة العمر لمعرّف عشوائي داخل مجلد البائع المصادق عليه، ثم التحقق من استجابة الرفع الموقعة قبل حفظ بيانات المنتج."
          ),
          alternatives: text(
            "Proxy every upload through the application server or permit unsigned uploads to a shared preset.",
            "تمرير كل عملية رفع عبر خادم التطبيق أو السماح برفع غير موقّع إلى إعداد مشترك."
          ),
          tradeOff: text(
            "The upload handshake is more complex, but media ownership and allowed destinations remain constrained.",
            "تصبح مصافحة الرفع أكثر تعقيداً، لكن ملكية الوسائط والوجهات المسموحة تبقى مقيّدة."
          ),
        },
      ],
      tradeOffs: [
        text(
          "Checkout is intentionally simulated and never collects payment-card data; real payment processing remains out of scope.",
          "عملية الدفع تجريبية عمداً ولا تجمع بيانات البطاقات؛ وتبقى معالجة المدفوعات الحقيقية خارج النطاق."
        ),
        text(
          "Transactional checkout requires MongoDB Atlas or another replica-set deployment rather than a standalone database process.",
          "يتطلب الدفع المعاملاتي MongoDB Atlas أو بيئة أخرى تعتمد مجموعة نسخ متماثلة بدلاً من عملية قاعدة بيانات منفردة."
        ),
        text(
          "Production email, MFA, edge rate limiting, monitoring, backups, and reviewed legal policies remain deployment work rather than completed claims.",
          "يبقى بريد الإنتاج والمصادقة متعددة العوامل وتحديد المعدل عند الحافة والمراقبة والنسخ الاحتياطي والسياسات القانونية المراجعة أعمال نشر وليست إنجازات مكتملة."
        ),
      ],
      challenges: [
        text(
          "Keep stock, order snapshots, and seller-specific orders consistent when one cart spans several stores.",
          "الحفاظ على اتساق المخزون ولقطات الطلبات والطلبات المخصصة للبائعين عندما تمتد سلة واحدة عبر عدة متاجر."
        ),
        text(
          "Apply account status, role, capability, and ownership policies consistently across server actions, routes, and repositories.",
          "تطبيق سياسات حالة الحساب والدور والقدرة والملكية باستمرار عبر إجراءات الخادم والمسارات والمستودعات."
        ),
        text(
          "Keep a dense storefront and multiple dashboards coherent in English, Arabic, LTR, and RTL.",
          "الحفاظ على اتساق متجر غني ولوحات تحكم متعددة بالعربية والإنجليزية واتجاهي القراءة."
        ),
      ],
      outcomes: [
        text(
          "The public codebase delivers the planned MVP workflows for customers, sellers, and administrators with an explicitly simulated checkout.",
          "تقدم الشيفرة العامة مسارات النسخة الأولية المخطط لها للعملاء والبائعين والمشرفين مع دفع تجريبي معلن بوضوح."
        ),
        text(
          "Architecture and security documents record production assumptions, authorization boundaries, and remaining deployment work.",
          "توثّق مستندات المعمارية والأمن افتراضات الإنتاج وحدود الصلاحيات وأعمال النشر المتبقية."
        ),
        text(
          "The repository includes automated checks for feature schemas and selected authentication behavior alongside strict TypeScript, lint, and build commands.",
          "يتضمن المستودع فحوصاً آلية لمخططات الميزات وبعض سلوكيات المصادقة، إضافة إلى أوامر صارمة للأنواع والتحليل الساكن والبناء."
        ),
      ],
      capabilities: [
        text("Bilingual storefront", "متجر ثنائي اللغة"),
        text(
          "Customer, seller, and admin roles",
          "أدوار العميل والبائع والمشرف"
        ),
        text("Transactional simulated checkout", "دفع تجريبي معاملاتي"),
        text("Inventory and order workflows", "مسارات المخزون والطلبات"),
        text("Audit-focused administration", "إدارة تركّز على قابلية التدقيق"),
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Base UI",
        "MongoDB",
        "Better Auth",
        "Cloudinary",
        "next-intl",
        "Zod",
        "React Hook Form",
        "Vitest",
      ],
      images: [
        {
          ...portfolioMedia.projects.marketplace.systemMap,
          kind: "system-map",
          alt: text(
            "Marketplace system map connecting bilingual storefront and dashboards to authorization, transactional checkout, MongoDB, and Cloudinary.",
            "مخطط نظام المنصة يربط المتجر ولوحات التحكم ثنائية اللغة بالصلاحيات والدفع المعاملاتي وMongoDB وCloudinary."
          ),
          caption: text(
            "Role boundaries, checkout flow, and persistence responsibilities.",
            "حدود الأدوار ومسار الدفع ومسؤوليات حفظ البيانات."
          ),
        },
      ],
      links: {
        repository: "https://github.com/samirajaj/e-commerce",
      },
    },
    {
      slug: "media-storage",
      status: "in-progress",
      featured: true,
      year: 2026,
      order: 3,
      title: text("Media Storage", "Media Storage"),
      descriptor: text(
        "Cloudinary-first .NET storage library",
        "مكتبة تخزين .NET تبدأ بدعم Cloudinary"
      ),
      summary: text(
        "An early .NET library that separates media-storage contracts, a Cloudinary provider, and dependency-injection registration for upload, delete, and replace workflows.",
        "مكتبة .NET في مرحلة مبكرة تفصل عقود تخزين الوسائط عن مزوّد Cloudinary وتسجيل حقن الاعتماديات لمسارات الرفع والحذف والاستبدال."
      ),
      context: text(
        "Applications often let one storage SDK spread through controllers and services, making provider behavior, errors, and future replacement harder to contain.",
        "غالباً ما تسمح التطبيقات بانتشار SDK لمزوّد تخزين واحد داخل وحدات التحكم والخدمات، مما يصعّب احتواء سلوك المزوّد وأخطائه واستبداله لاحقاً."
      ),
      problem: text(
        "Consumers need a small, stable application contract for media operations without depending directly on Cloudinary-specific request and response types.",
        "يحتاج المستهلكون إلى عقد تطبيق صغير ومستقر لعمليات الوسائط من دون الاعتماد مباشرة على أنواع الطلبات والاستجابات الخاصة بـCloudinary."
      ),
      scope: text(
        "Upload, delete, and replace operations; provider-neutral requests and results; media-storage exceptions; Cloudinary options; and dependency-injection extensions.",
        "عمليات الرفع والحذف والاستبدال، وطلبات ونتائج محايدة تجاه المزوّد، واستثناءات تخزين الوسائط، وخيارات Cloudinary، وامتدادات حقن الاعتماديات."
      ),
      solution: text(
        "A multi-project solution divides abstractions, the Cloudinary adapter, and dependency-injection wiring so application code can depend on IMediaStorageService rather than the provider SDK.",
        "حل متعدد المشاريع يقسم العقود وموائم Cloudinary وربط حقن الاعتماديات، كي تعتمد شيفرة التطبيق على IMediaStorageService بدلاً من SDK المزوّد."
      ),
      role: text(
        "Repository owner and library implementer",
        "مالك المستودع ومنفّذ المكتبة"
      ),
      responsibilities: [
        text(
          "Define provider-neutral request, result, exception, and service contracts.",
          "تعريف عقود محايدة تجاه المزوّد للطلبات والنتائج والاستثناءات والخدمات."
        ),
        text(
          "Implement Cloudinary upload, delete, and replace behavior.",
          "تنفيذ سلوك الرفع والحذف والاستبدال عبر Cloudinary."
        ),
        text(
          "Expose scoped dependency-injection registration with typed options.",
          "إتاحة تسجيل محدود النطاق ضمن حقن الاعتماديات مع خيارات مكتوبة الأنواع."
        ),
      ],
      interfaceWork: text(
        "This project has no end-user interface. Its consumer-facing surface is the typed service contract, request and result models, exceptions, options, and registration extensions.",
        "لا يحتوي هذا المشروع على واجهة مستخدم نهائية؛ فسطحه الموجّه للمستهلك هو عقد الخدمة المكتوب بالأنواع ونماذج الطلب والنتيجة والاستثناءات والخيارات وامتدادات التسجيل."
      ),
      responsiveBehavior: text(
        "Not applicable: Media Storage is an application library rather than a visual interface.",
        "غير منطبق: Media Storage مكتبة تطبيق وليست واجهة بصرية."
      ),
      architecture: text(
        "MediaStorage.Abstractions owns IMediaStorageService and shared models, MediaStorage.Cloudinary adapts CloudinaryDotNet behind that contract, and MediaStorage.DependencyInjection owns Microsoft.Extensions.DependencyInjection registration.",
        "يمتلك MediaStorage.Abstractions واجهة IMediaStorageService والنماذج المشتركة، ويكيّف MediaStorage.Cloudinary مكتبة CloudinaryDotNet خلف ذلك العقد، بينما يتولى MediaStorage.DependencyInjection التسجيل ضمن Microsoft.Extensions.DependencyInjection."
      ),
      decisions: [
        {
          title: text(
            "Provider contract before provider implementation",
            "عقد المزوّد قبل تنفيذ المزوّد"
          ),
          context: text(
            "Calling CloudinaryDotNet directly from application features would couple their models, errors, and lifecycle operations to one vendor.",
            "سيؤدي استدعاء CloudinaryDotNet مباشرة من ميزات التطبيق إلى ربط نماذجها وأخطائها وعمليات دورة حياتها بمزوّد واحد."
          ),
          decision: text(
            "Place the application-facing interface and models in an abstractions project with no Cloudinary dependency.",
            "وضع الواجهة والنماذج الموجّهة للتطبيق في مشروع عقود لا يعتمد على Cloudinary."
          ),
          alternatives: text(
            "Expose the Cloudinary client directly or wrap calls independently inside every consuming application.",
            "إتاحة عميل Cloudinary مباشرة أو تغليف الاستدعاءات بشكل منفصل داخل كل تطبيق مستهلك."
          ),
          tradeOff: text(
            "The solution has more projects and mapping code, but provider-specific types stop at the adapter boundary.",
            "يحتوي الحل على مشاريع وشيفرة تحويل أكثر، لكن الأنواع الخاصة بالمزوّد تتوقف عند حدود الموائم."
          ),
        },
        {
          title: text(
            "Typed options through dependency injection",
            "خيارات مكتوبة الأنواع عبر حقن الاعتماديات"
          ),
          context: text(
            "Provider credentials and secure-delivery behavior belong to application configuration rather than call sites.",
            "تنتمي بيانات اعتماد المزوّد وسلوك التسليم الآمن إلى إعدادات التطبيق لا إلى مواقع الاستدعاء."
          ),
          decision: text(
            "Bind CloudinaryOptions during service registration and inject them into the provider implementation.",
            "ربط CloudinaryOptions أثناء تسجيل الخدمة وحقنها في تنفيذ المزوّد."
          ),
          alternatives: text(
            "Read environment variables inside every operation or construct the provider client in consuming features.",
            "قراءة متغيرات البيئة داخل كل عملية أو إنشاء عميل المزوّد ضمن الميزات المستهلكة."
          ),
          tradeOff: text(
            "Consumers must configure the options correctly at startup, while operational code remains free of configuration lookup.",
            "يجب على التطبيقات المستهلكة إعداد الخيارات بشكل صحيح عند التشغيل، بينما تبقى شيفرة العمليات خالية من البحث عن الإعدادات."
          ),
        },
      ],
      tradeOffs: [
        text(
          "Cloudinary is the only implemented provider, so provider portability is an architectural boundary rather than a demonstrated second integration.",
          "Cloudinary هو المزوّد الوحيد المنفّذ، لذا تبقى قابلية تبديل المزوّد حداً معمارياً وليست تكاملاً ثانياً مثبتاً."
        ),
        text(
          "The current upload implementation is image-specific even though the public model anticipates media types.",
          "تنفيذ الرفع الحالي مخصص للصور رغم أن النموذج العام يهيئ لدعم أنواع وسائط متعددة."
        ),
        text(
          "Replace currently deletes before uploading, so a failed upload can leave a gap; an atomic or rollback strategy remains future work.",
          "تحذف عملية الاستبدال الحالية الملف قبل الرفع، لذلك قد يترك فشل الرفع فجوة؛ وتبقى الاستراتيجية الذرية أو التراجع عملاً مستقبلياً."
        ),
        text(
          "The test project is scaffolded but does not yet provide meaningful coverage.",
          "تم إنشاء هيكل مشروع الاختبارات، لكنه لا يوفر بعد تغطية فعلية ذات معنى."
        ),
      ],
      challenges: [
        text(
          "Translate provider failures into a stable application exception without leaking SDK details.",
          "تحويل أخطاء المزوّد إلى استثناء تطبيق مستقر من دون تسريب تفاصيل SDK."
        ),
        text(
          "Preserve cancellation and asynchronous behavior across the abstraction boundary.",
          "الحفاظ على الإلغاء والسلوك غير المتزامن عبر حدود التجريد."
        ),
        text(
          "Define replacement semantics that remain safe when one of two remote operations fails.",
          "تعريف دلالات استبدال آمنة عند فشل إحدى عمليتين بعيدتين."
        ),
      ],
      outcomes: [
        text(
          "The public implementation exposes upload, delete, and replace through a small service contract and Cloudinary adapter.",
          "يتيح التنفيذ العام عمليات الرفع والحذف والاستبدال عبر عقد خدمة صغير وموائم Cloudinary."
        ),
        text(
          "Consuming .NET applications can register the provider through dependency injection without referencing Cloudinary types in feature code.",
          "يمكن لتطبيقات .NET المستهلكة تسجيل المزوّد عبر حقن الاعتماديات من دون الرجوع إلى أنواع Cloudinary داخل شيفرة الميزات."
        ),
      ],
      capabilities: [
        text("Media upload", "رفع الوسائط"),
        text("Media deletion", "حذف الوسائط"),
        text("Media replacement", "استبدال الوسائط"),
        text("Provider abstraction", "تجريد مزوّد التخزين"),
        text(
          "Dependency-injection registration",
          "التسجيل عبر حقن الاعتماديات"
        ),
      ],
      technologies: [
        "C#",
        ".NET",
        "CloudinaryDotNet",
        "Microsoft.Extensions.DependencyInjection",
        "Microsoft.Extensions.Options",
      ],
      images: [
        {
          ...portfolioMedia.projects["media-storage"].systemMap,
          kind: "system-map",
          alt: text(
            "Media Storage system map showing consuming applications, the abstraction contract, dependency injection, and the Cloudinary provider.",
            "مخطط نظام Media Storage يوضح التطبيقات المستهلكة وعقد التجريد وحقن الاعتماديات ومزوّد Cloudinary."
          ),
          caption: text(
            "Current library boundaries and provider flow.",
            "حدود المكتبة الحالية ومسار المزوّد."
          ),
        },
      ],
      links: {
        repository: "https://github.com/samirajaj/media-storage",
      },
    },
  ],
  seo: {
    siteUrl: "https://samirajaj.vercel.app",
    siteName: text("Samir Ajaj Portfolio", "معرض أعمال سمير عجاج"),
    defaultTitle: text(
      "Samir Ajaj — Freelance Full-Stack Developer",
      "سمير عجاج — مطوّر تطبيقات متكاملة مستقل"
    ),
    description: text(
      "Portfolio of Samir Ajaj, a freelance full-stack developer building multilingual React, TypeScript, Next.js, C#, and .NET applications.",
      "معرض أعمال سمير عجاج، مطوّر تطبيقات متكاملة مستقل يبني تطبيقات متعددة اللغات باستخدام React وTypeScript وNext.js وC# و.NET."
    ),
    keywords: [
      "Samir Ajaj",
      "Full-Stack Developer",
      "React",
      "TypeScript",
      "Next.js",
      "C#",
      ".NET",
      "Arabic RTL",
    ],
  },
} as const satisfies PortfolioData
