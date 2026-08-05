import { localizedText as text } from "./localized-content"
import type {
  AssetReference,
  PortfolioData,
  Technology,
} from "./portfolio.types"

const projectPlaceholder = {
  src: "/placeholder.png",
  alt: text("Project preview placeholder", "صورة افتراضية لمعاينة المشروع"),
  width: 1672,
  height: 941,
} satisfies AssetReference

const technologies = (...names: string[]): readonly Technology[] =>
  names.map((name) => ({ name }))

export const portfolioData = {
  personal: {
    fullName: "Samir Ajaj",
    professionalTitle: text(
      "Full-Stack Developer · ASP.NET Core, Next.js & React",
      "مطوّر تطبيقات متكاملة · ASP.NET Core وNext.js وReact"
    ),
    marketingStatement: text(
      "I turn product requirements and interface designs into secure, bilingual web applications.",
      "أحوّل متطلبات المنتجات وتصاميم الواجهات إلى تطبيقات ويب آمنة وثنائية اللغة."
    ),
    shortIntroduction: text(
      "I combine maintainable frontend architecture with backend development, authentication, authorization, and data access to deliver complete digital products.",
      "أجمع بين بنية واجهات قابلة للصيانة وتطوير الأنظمة الخلفية والمصادقة والصلاحيات والوصول إلى البيانات لبناء منتجات رقمية متكاملة."
    ),
    location: text("Damascus, Syria", "دمشق، سوريا"),
    email: "samirajaj.official@gmail.com",
    phone: "+963 985 215 130",
    logo: {
      src: "/media/brand/logo.svg",
      alt: text("Samir Ajaj logo", "شعار سمير عجاج"),
      width: 1225,
      height: 1225,
    },
    avatar: {
      src: "/media/brand/avatar.png",
      alt: text("Portrait of Samir Ajaj", "صورة شخصية لسمير عجاج"),
      width: 1254,
      height: 1254,
    },
  },
  availability: {
    status: "limited",
    label: text("Open to the right opportunity", "متاح للفرصة المناسبة"),
    description: text(
      "Currently a Frontend Developer Intern at DIGIT Innovation Hub.",
      "أعمل حالياً متدرب تطوير واجهات أمامية في DIGIT Innovation Hub."
    ),
  },
  socialLinks: {
    github: {
      href: "https://github.com/samirajaj",
      ariaLabel: text("Open Samir's GitHub", "فتح حساب سمير على GitHub"),
    },
    linkedin: {
      href: "https://www.linkedin.com/in/sameerajaj",
      ariaLabel: text("Open Samir's LinkedIn", "فتح حساب سمير على LinkedIn"),
    },
    email: {
      href: "mailto:samirajaj.official@gmail.com",
      ariaLabel: text(
        "Email Samir Ajaj",
        "مراسلة سمير عجاج بالبريد الإلكتروني"
      ),
    },
    phone: {
      href: "tel:+963985215130",
      ariaLabel: text("Call Samir Ajaj", "الاتصال بسمير عجاج"),
    },
    portfolio: {
      href: "https://samirajaj.vercel.app",
      ariaLabel: text("Open Samir's portfolio", "فتح معرض أعمال سمير"),
    },
  },
  resume: {
    file: "/media/cv.pdf",
    downloadName: "Samir-Ajaj-CV.pdf",
  },
  capabilities: [
    {
      id: "product-frontend",
      title: text("Product Frontend", "واجهات المنتجات"),
      description: text(
        "Responsive React and Next.js interfaces shaped around real workflows.",
        "واجهات متجاوبة باستخدام React وNext.js مبنية حول مسارات عمل حقيقية."
      ),
    },
    {
      id: "backend-systems",
      title: text("Backend Systems", "الأنظمة الخلفية"),
      description: text(
        "REST APIs, authorization, business logic, and reliable data access.",
        "واجهات REST وصلاحيات ومنطق أعمال ووصول موثوق إلى البيانات."
      ),
    },
    {
      id: "bilingual-products",
      title: text("Bilingual Products", "منتجات ثنائية اللغة"),
      description: text(
        "One deliberate experience for English, Arabic, LTR, and RTL.",
        "تجربة واحدة مدروسة للعربية والإنجليزية واتجاهي LTR وRTL."
      ),
    },
    {
      id: "delivery-quality",
      title: text("Delivery Quality", "جودة التسليم"),
      description: text(
        "Typed boundaries, validation, testing, code review, and Agile teamwork.",
        "حدود مطبوعة وتحقق واختبارات ومراجعة كود وعمل جماعي رشيق."
      ),
    },
  ],
  experience: [
    {
      id: "digit-internship",
      organization: {
        name: "DIGIT Innovation Hub",
        logo: {
          src: "/media/experiences/Digit-logo.jpg",
          alt: text("DIGIT Innovation Hub logo", "شعار DIGIT Innovation Hub"),
          width: 843,
          height: 843,
        },
      },
      role: text("Frontend Developer Intern", "متدرب تطوير واجهات أمامية"),
      employmentType: text("Internship", "تدريب"),
      location: text("Damascus, Syria", "دمشق، سوريا"),
      workMode: "hybrid",
      period: { start: "2026-07", isCurrent: true },
      summary: text(
        "I own frontend delivery for Digit Management System within a cross-functional product team.",
        "أتولى تنفيذ الواجهة الأمامية لنظام Digit Management System ضمن فريق منتجات متعدد التخصصات."
      ),
      highlights: [
        text(
          "Translated Figma designs into responsive, role-aware workflows for events, rooms, bookings, calendars, and administration.",
          "حوّلت تصاميم Figma إلى مسارات متجاوبة ومرتبطة بالأدوار لإدارة الفعاليات والغرف والحجوزات والتقويم والعمليات الإدارية."
        ),
        text(
          "Applied feature-based architecture and a Backend-for-Frontend pattern for maintainable NestJS API integration.",
          "طبّقت بنية قائمة على الميزات ونمط Backend-for-Frontend لتكامل قابل للصيانة مع واجهة NestJS."
        ),
        text(
          "Collaborated through Agile sprints with product, design, backend, and QA to refine and validate features.",
          "تعاونت عبر دورات Agile مع إدارة المنتج والتصميم والخلفية وضمان الجودة لصقل الميزات والتحقق منها."
        ),
      ],
      workflow: {
        steps: [
          text("Product requirement", "متطلب المنتج"),
          text("Interface design", "تصميم الواجهة"),
          text("Frontend delivery", "تنفيذ الواجهة"),
          text("API integration", "تكامل الواجهة البرمجية"),
          text("QA validation", "تحقق الجودة"),
        ],
      },
      relatedProjectId: "digit-management",
    },
  ],
  education: [
    {
      id: "svu-bachelor",
      institution: {
        name: text("Syrian Virtual University", "الجامعة الافتراضية السورية"),
        logo: {
          src: "/media/educations/Syrian-Virtual-University-logo.png",
          alt: text(
            "Syrian Virtual University logo",
            "شعار الجامعة الافتراضية السورية"
          ),
          width: 317,
          height: 251,
        },
      },
      degree: text("Bachelor of Engineering", "بكالوريوس هندسة"),
      field: text("Information Technology", "تكنولوجيا المعلومات"),
      period: { start: "2023-10", end: "2029-10" },
      description: text(
        "Expected graduation in October 2029.",
        "التخرج المتوقع في أكتوبر 2029."
      ),
    },
    {
      id: "damascus-associate",
      institution: {
        name: text("Damascus University", "جامعة دمشق"),
        logo: {
          src: "/media/educations/Damascuse-University-logo.jpg",
          alt: text("Damascus University logo", "شعار جامعة دمشق"),
          width: 422,
          height: 384,
        },
      },
      degree: text("Associate Degree", "إجازة تقانية"),
      field: text("Computer Software Engineering", "هندسة البرمجيات الحاسوبية"),
      period: { start: "2023-10", end: "2027-02" },
      description: text(
        "Coursework spans software engineering, databases, algorithms, systems analysis, and web development.",
        "تشمل الدراسة هندسة البرمجيات وقواعد البيانات والخوارزميات وتحليل النظم وتطوير الويب."
      ),
      achievements: [
        {
          title: text("AutoNest graduation project", "مشروع التخرج AutoNest"),
          description: text(
            "Highest graduation-project grade in the cohort.",
            "أعلى علامة لمشروع تخرج في الدفعة."
          ),
          score: "97/100",
        },
      ],
    },
  ],
  projects: [
    {
      id: "autonest-dotnet",
      slug: "autonest-vehicle-platform",
      title: text(
        "AutoNest — Vehicle Marketplace and Management Platform",
        "AutoNest — منصة سوق وإدارة المركبات"
      ),
      shortTitle: text("AutoNest .NET", "AutoNest .NET"),
      category: text(
        "Graduation project · Full-stack",
        "مشروع تخرج · تطبيق متكامل"
      ),
      description: text(
        "A role-based marketplace where customers discover, rent, and purchase vehicles while companies and administrators manage inventory, requests, plans, and platform rules.",
        "سوق قائم على الأدوار يتيح للعملاء استكشاف المركبات واستئجارها وشرائها، وللشركات والمديرين إدارة المخزون والطلبات والخطط وقواعد المنصة."
      ),
      contribution: text(
        "Co-developed layered APIs, JWT authorization, scheduled Hangfire workflows, persistence, and automated verification.",
        "شاركت في تطوير واجهات متعددة الطبقات وصلاحيات JWT ومهام Hangfire المجدولة والتخزين والتحقق الآلي."
      ),
      keyResult: text("Graduation grade: 97/100", "علامة التخرج: 97/100"),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "ASP.NET Core",
        "React",
        "TypeScript",
        "SQL Server",
        "Entity Framework Core"
      ),
      links: {},
      visibilityNote: text("Private academic repository", "مستودع أكاديمي خاص"),
      accent: "violet",
      featured: true,
      order: 1,
    },
    {
      id: "ecommerce-marketplace",
      slug: "ecommerce-marketplace",
      title: text("E-commerce Marketplace", "سوق تجارة إلكترونية"),
      category: text("Full-stack marketplace MVP", "نموذج سوق إلكتروني متكامل"),
      description: text(
        "A production-minded marketplace for administrators, sellers, and customers across catalog, checkout, orders, accounts, and audit workflows.",
        "سوق مهيأ للإنتاج للمديرين والبائعين والعملاء يغطي الكتالوج والدفع والطلبات والحسابات ومسارات التدقيق."
      ),
      contribution: text(
        "Built secure sessions, ownership authorization, transactional stock updates, bilingual UX, seller analytics, and administrative controls.",
        "بنيت جلسات آمنة وصلاحيات ملكية وتحديثات ذرية للمخزون وتجربة ثنائية اللغة وتحليلات للبائعين وأدوات إدارية."
      ),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Better Auth",
        "Tailwind CSS",
        "shadcn/ui"
      ),
      links: {
        source: {
          href: "https://github.com/samirajaj/e-commerce",
          ariaLabel: text(
            "View E-commerce Marketplace source",
            "عرض مصدر مشروع السوق الإلكتروني"
          ),
        },
      },
      accent: "teal",
      featured: true,
      order: 2,
    },
    {
      id: "digit-management",
      slug: "digit-management-system",
      title: text("Digit Management System", "نظام إدارة Digit"),
      category: text("Professional team project", "مشروع فريق احترافي"),
      description: text(
        "A bilingual management system for events, rooms, bookings, calendars, attendees, and administrative operations.",
        "نظام إدارة ثنائي اللغة للفعاليات والغرف والحجوزات والتقويم والحضور والعمليات الإدارية."
      ),
      contribution: text(
        "Owned frontend delivery in a cross-functional team using feature-based architecture, a BFF layer, protected routes, and server-state management.",
        "توليت تنفيذ الواجهة ضمن فريق متعدد التخصصات باستخدام بنية قائمة على الميزات وطبقة BFF ومسارات محمية وإدارة حالة الخادم."
      ),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "Next.js",
        "TypeScript",
        "TanStack Query",
        "Tailwind CSS",
        "shadcn/ui"
      ),
      links: {},
      visibilityNote: text("Professional private project", "مشروع مهني خاص"),
      accent: "amber",
      featured: true,
      order: 3,
      relatedExperienceId: "digit-internship",
    },
    {
      id: "autonest-next",
      slug: "autonest-nextjs",
      title: text("AutoNest — Next.js Edition", "AutoNest — إصدار Next.js"),
      category: text(
        "Full-stack domain reimplementation",
        "إعادة تنفيذ متكاملة لنطاق العمل"
      ),
      description: text(
        "A TypeScript and MongoDB reimplementation of the vehicle marketplace domain with role-aware access, image management, email, and bilingual forms.",
        "إعادة تنفيذ لنطاق سوق المركبات باستخدام TypeScript وMongoDB مع وصول مرتبط بالأدوار وإدارة الصور والبريد ونماذج ثنائية اللغة."
      ),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Mongoose",
        "Better Auth",
        "Cloudinary",
        "Resend"
      ),
      links: {
        source: {
          href: "https://github.com/samirajaj/autonest-next.js",
          ariaLabel: text(
            "View AutoNest Next.js source",
            "عرض مصدر AutoNest بإصدار Next.js"
          ),
        },
      },
      accent: "violet",
      featured: true,
      order: 4,
    },
    {
      id: "dar-alfajr",
      slug: "dar-alfajr-publishing",
      title: text("Dar Al-Fajr Publishing Platform", "منصة دار الفجر للنشر"),
      category: text("Frontend prototype", "نموذج أولي للواجهة"),
      description: text(
        "A responsive, content-focused prototype for a Quran and Islamic-books publisher, structured for an existing Laravel API.",
        "نموذج أولي متجاوب يركز على المحتوى لناشر مصاحف وكتب إسلامية ومهيأ للتكامل مع واجهة Laravel قائمة."
      ),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "Next.js",
        "TypeScript",
        "Material UI",
        "Laravel API"
      ),
      links: {},
      visibilityNote: text(
        "Prototype without a public link",
        "نموذج أولي دون رابط عام"
      ),
      accent: "teal",
      featured: true,
      order: 5,
    },
    {
      id: "personal-portfolio",
      slug: "personal-portfolio",
      title: text("Personal Portfolio", "معرض الأعمال الشخصي"),
      category: text(
        "Bilingual interactive portfolio",
        "معرض أعمال تفاعلي ثنائي اللغة"
      ),
      description: text(
        "This locale-aware portfolio presents professional experience, education, and selected projects through a focused one-page narrative.",
        "يعرض معرض الأعمال هذا الخبرة المهنية والتعليم والمشاريع المختارة ضمن سرد مركّز في صفحة واحدة ومتوافق مع اللغة."
      ),
      media: { placeholder: projectPlaceholder },
      technologies: technologies(
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "GSAP",
        "i18next"
      ),
      links: {
        demo: {
          href: "https://samirajaj.vercel.app",
          ariaLabel: text(
            "Open the live portfolio",
            "فتح معرض الأعمال المباشر"
          ),
        },
      },
      accent: "amber",
      featured: true,
      order: 6,
    },
  ],
  seo: {
    siteUrl: "https://samirajaj.vercel.app",
    title: text(
      "Samir Ajaj — Full-Stack Developer",
      "سمير عجاج — مطوّر تطبيقات متكاملة"
    ),
    description: text(
      "Portfolio of Samir Ajaj, a full-stack developer specializing in ASP.NET Core, Next.js, React, and bilingual web products.",
      "معرض أعمال سمير عجاج، مطوّر تطبيقات متكاملة متخصص في ASP.NET Core وNext.js وReact ومنتجات الويب ثنائية اللغة."
    ),
    previewImage: projectPlaceholder,
  },
} satisfies PortfolioData
