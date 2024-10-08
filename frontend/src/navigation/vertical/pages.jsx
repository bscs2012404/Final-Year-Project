import { ShopAdd, Profile, Bill, User, AddCircle, UserAdd, Graph, Setting, Book, Briefcase, KyberNetwork, Airdrop, ProfileCircle} from 'iconsax-react';

import { Award,Home } from 'iconsax-react';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import IntlMessages from "../../layout/components/lang/IntlMessages";

const user = JSON.parse(localStorage.getItem('userData'));

const pages = user?.user?.role === 'admin' ? [
    {
        id: "user-feed",
        title: "News feed",
        icon: <User size={18} />,
        navLink: "/pages/workspace",
    },  
    {
        id: "user-experience",
        title: "Experience",
        icon: <Profile size={18} />,
        navLink: "/pages/experience",
        // isCompany: false,
        // show: "user"

    },
    {
        id: "user-recommendations",
        title: "Recommendations",
        icon: <Profile size={18} />,
        navLink: "/pages/recommendations",

    },
    {
        id: "admin-users",
        title: "Users",
        icon: <User size={18} />,
        navLink: "/admin/users",
    },
    {
        id: "admin-feedback-users",
        title: "Feedbacks",
        icon: <User size={18} />,
        navLink: "/admin/feedback",
    },
    {
        id: "profile-personel-information",
        title: "Profile Settings",
        icon: <ProfileCircle size={18} />,
        navLink: "/pages/profile/personel-information",
    },
] : [
    
    {
        id: "user-feed",
        title: "News feed",
        icon: <KyberNetwork size={18} />,
        navLink: "/pages/workspace",
    },
    {
        id: "user-graph",
        title: "Similarity Graph",
        icon: <Graph size={18} />,
        navLink: "/pages/graph",

    },
    
    {
        id: "your-profile",
        title: "Your Profile",
        icon: <User size={18} />,
        navLink: `/pages/profile/social/${user?.user?.id}`,
    },
    {
        id: "add-friends",
        title: "Add Friends",
        icon: <UserAdd size={18} />,
        navLink: `/pages/addFriends`,
    },
    {
        id: "profile-personel-information",
        title: "Profile Settings",
        icon: <Setting size={18} />,
        navLink: "/pages/profile/personel-information",
    },
    {
        id: "user-experience",
        title: "Experience",
        icon: <Briefcase size={18} />,
        navLink: "/pages/experience"
    },
    {
        id: "user-education",
        title: "Education",
        icon: <Book size={18} />,
        navLink: "/pages/education"
    },
    {
        id: "user-recommendations",
        title: "Recommendations",
        icon: <Airdrop size={18} />,
        navLink: "/pages/recommendations",

    },
]

export default pages









































// const pages = [
//     // {
//     //     header: <IntlMessages id="sidebar-pages" />,
//     // },
//     // {
//     //     id: "user-interface-typography",
//     //     title: <IntlMessages id="sidebar-user-interface-typography" />,
//     //     icon: <Grid5 size={18} />,
//     //     navLink: "/components/general/style-guide",
//     // },
//     // {
//     //     id: "authentication",
//     //     title: <IntlMessages id="sidebar-pages-authentication" />,
//     //     icon: <Award size={18} />,
//     //     children: [
//     //         {
//     //             id: "login-v1-page",
//     //             title: <IntlMessages id="sidebar-pages-login-v1" />,
//     //             navLink: "/pages/authentication/login",
//     //         },
//     //         {
//     //             id: "login-v2-page",
//     //             title: <IntlMessages id="sidebar-pages-login-v2" />,
//     //             navLink: "/pages/authentication-modern/login",
//     //         },
//     //         {
//     //             id: "register-v1-page",
//     //             title: <IntlMessages id="sidebar-pages-register-v1" />,
//     //             navLink: "/pages/authentication/register",
//     //         },
//     //         {
//     //             id: "register-v2-page",
//     //             title: <IntlMessages id="sidebar-pages-register-v2" />,
//     //             navLink: "/pages/authentication-modern/register",
//     //         },
//     //         {
//     //             id: "recover-v1-password",
//     //             title: <IntlMessages id="sidebar-pages-recover-password-v1" />,
//     //             navLink: "/pages/authentication/recover-password",
//     //         },
//     //         {
//     //             id: "recover-v2-password",
//     //             title: <IntlMessages id="sidebar-pages-recover-password-v2" />,
//     //             navLink: "/pages/authentication-modern/recover-password",
//     //         },
//     //         {
//     //             id: "reset-v1-password",
//     //             title: <IntlMessages id="sidebar-pages-reset-password-v1" />,
//     //             navLink: "/pages/authentication/reset-password",
//     //         },
//     //         {
//     //             id: "reset-v2-password",
//     //             title: <IntlMessages id="sidebar-pages-reset-password-v2" />,
//     //             navLink: "/pages/authentication-modern/reset-password",
//     //         },
//     //     ],
//     // },
//     // {
//     //     id: "errors",
//     //     title: <IntlMessages id="sidebar-pages-error" />,
//     //     icon: <Award size={18} />,
//     //     children: [
//     //         {
//     //             id: "error-404",
//     //             title: "404",
//     //             navLink: "/pages/error-404",
//     //         },
//     //         {
//     //             id: "error-403",
//     //             title: "403",
//     //             navLink: "/pages/error-403",
//     //         },
//     //         {
//     //             id: "error-500",
//     //             title: "500",
//     //             navLink: "/pages/error-500",
//     //         },
//     //         {
//     //             id: "error-503",
//     //             title: "503",
//     //             navLink: "/pages/error-503",
//     //         },
//     //         {
//     //             id: "error-502",
//     //             title: "502",
//     //             navLink: "/pages/error-502",
//     //         },
//     //         {
//     //             id: "maintenance",
//     //             title: <IntlMessages id="sidebar-pages-error-maintenance" />,
//     //             navLink: "/pages/maintenance",
//     //         },
//     //         {
//     //             id: "comming-soon",
//     //             title: <IntlMessages id="sidebar-pages-error-coming-soon" />,
//     //             navLink: "/pages/coming-soon",
//     //         },
//     //     ],
//     // },
//     // {
//     //     id: "profile",
//     //     title: <IntlMessages id="sidebar-pages-profile" />,
//     //     icon: <Award size={18} />,
//     //     children: [
//     //         {
//     //             id: "profile-personel-information",
//     //             title: <IntlMessages id="sidebar-pages-profile-personel-information" />,
//     //             navLink: "/pages/profile/personel-information",
//     //         },
//     //         {
//     //             id: "profile-notifications",
//     //             title: <IntlMessages id="sidebar-pages-profile-notifications" />,
//     //             navLink: "/pages/profile/notifications",
//     //         },
//     //         {
//     //             id: "profile-activity",
//     //             title: <IntlMessages id="sidebar-pages-profile-activity-monitor" />,
//     //             navLink: "/pages/profile/activity",
//     //         },
//     //         {
//     //             id: "profile-security",
//     //             title: <IntlMessages id="sidebar-pages-profile-security-settings" />,
//     //             navLink: "/pages/profile/security",
//     //         },
//     //         {
//     //             id: "profile-password-change",
//     //             title: <IntlMessages id="sidebar-pages-profile-password-change" />,
//     //             navLink: "/pages/profile/password-change",
//     //         },
//     //         {
//     //             id: "profile-connect-with-social",
//     //             title: <IntlMessages id="sidebar-pages-profile-connect-with-social" />,
//     //             navLink: "/pages/profile/connect-with-social",
//     //         },
//     //     ],
//     // },
//     // {
//     //     id: "email",
//     //     title: <IntlMessages id="sidebar-pages-email-templates" />,
//     //     icon: <Award size={18} />,
//     //     children: [
//     //         {
//     //             id: "email-hello",
//     //             title: <IntlMessages id="sidebar-pages-email-hello" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/hello.html",
//     //         },
//     //         {
//     //             id: "email-promotional",
//     //             title: <IntlMessages id="sidebar-pages-email-promotional" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/promotional.html",
//     //         },
//     //         {
//     //             id: "email-verify",
//     //             title: <IntlMessages id="sidebar-pages-email-verify" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/verify.html",
//     //         },
//     //         {
//     //             id: "email-reset-password",
//     //             title: <IntlMessages id="sidebar-pages-email-reset-password" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/reset-password.html",
//     //         },
//     //         {
//     //             id: "email-term",
//     //             title: <IntlMessages id="sidebar-pages-email-term" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/term.html",
//     //         },
//     //         {
//     //             id: "email-deactive-account",
//     //             title: <IntlMessages id="sidebar-pages-email-deactive-account" />,
//     //             navLink: "https://yoda.Linkhub Fyp.studio/yoda-email-template/deactive-account.html",
//     //         },
//     //     ],
//     // },
//     // {
//     //     id: "lock-page",
//     //     title: <IntlMessages id="sidebar-pages-lock-screen" />,
//     //     icon: <Award size={18} />,
//     //     children: [
//     //         {
//     //             id: "welcome",
//     //             title: <IntlMessages id="sidebar-pages-welcome" />,
//     //             navLink: "/pages/welcome",
//     //         },
//     //         {
//     //             id: "password-is-changed",
//     //             title: <IntlMessages id="sidebar-pages-password-is-changed" />,
//     //             navLink: "/pages/password-is-changed",
//     //         },
//     //         {
//     //             id: "deactivated",
//     //             title: <IntlMessages id="sidebar-pages-deactivated" />,
//     //             navLink: "/pages/deactivated",
//     //         },
//     //         {
//     //             id: "lock",
//     //             title: <IntlMessages id="sidebar-pages-lock" />,
//     //             navLink: "/pages/lock",
//     //         },
//     //     ],
//     // },
//     // {
//     //     id: "landing",
//     //     title: <IntlMessages id="sidebar-pages-landing" />,
//     //     icon: <Award size={18} />,
//     //     navLink: "/pages/landing",
//     // },
//     {
//         id: "user-feed",
//         title: "News feed",
//         icon: <User size={18} />,
//         navLink: "/pages/workspace",
//     },
    
//     {
//         id: "your-profile",
//         title: "Profile Information",
//         icon: <User size={18} />,
//         navLink: `/pages/profile/social/${user?.user?.id}`,
//     },
//     {
//         id: "add-friends",
//         title: "Add Friends",
//         icon: <UserAdd size={18} />,
//         navLink: `/pages/addFriends`,
//     },
//     {
//         id: "admin-users",
//         title: "Users",
//         icon: <User size={18} />,
//         navLink: "/admin/users",
//     },
//     {
//         id: "admin-feedback-users",
//         title: "Feedbacks",
//         icon: <User size={18} />,
//         navLink: "/admin/feedback",
//     },
//     // {
//     //     id: "workspace",
//     //     title: <IntlMessages id="sidebar-pages-workspace" />,
//     //     icon: <ShopAdd size={18} />,
//     //     children: [
//     //         {
//     //             id: "create-workspace",
//     //             title: <IntlMessages id="sidebar-pages-generate-workspace" />,
//     //             navLink: "/pages/workspace",
//     //         },
//     //         {
//     //             id: "workspace-history",
//     //             title: <IntlMessages id="sidebar-pages-workspace-history" />,
//     //             icon: <HistoryToggleOffIcon sx={{fontSize:'5px'}} />,
//     //             navLink: "/pages/workspace-history",
//     //         }
//     //     ]
//     // },
//     // {
//     //     id: "credits",
//     //     title: <IntlMessages id="sidebar-pages-credits" />,
//     //     icon: <ShopAdd size={18} />,
//     //     children: [
//     //         {
//     //             id: "purchases-token",
//     //             title: <IntlMessages id="sidebar-pages-purchases-token" />,
//     //             navLink: "/pages/pricing",
//     //         },
//     //     ]
//     // },
//     // {
//     //     id: "purchases-token",
//     //     title: <IntlMessages id="sidebar-pages-purchases-token" />,
//     //     icon: <Bill size={18} />,
//     //     navLink: "/pages/pricing",
//     // },
//     {
//         id: "profile-personel-information",
//         title: "Personal Information",
//         icon: <Profile size={18} />,
//         navLink: "/admin/profile/personel-information",
//     },
//     // {
//     //     id: "invoice",
//     //     title: <IntlMessages id="sidebar-pages-invoice" />,
//     //     icon: <Award size={18} />,
//     //     navLink: "/pages/invoice",
//     // },
//     // {
//     //     id: "faq",
//     //     title: <IntlMessages id="sidebar-pages-faq" />,
//     //     icon: <Award size={18} />,
//     //     navLink: "/pages/faq",
//     // },
//     // {
//     //     id: "blank-page",
//     //     title: <IntlMessages id="sidebar-pages-blank-page" />,
//     //     icon: <Award size={18} />,
//     //     navLink: "/pages/blank-page",
//     // },
// ];

// export default pages