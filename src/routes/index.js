import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// Home
const Home = React.lazy(() => import('../pages/home'));

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const CryptoCurrencies = React.lazy(() => import('../pages/cryptocurrencies'));
const GiftCards = React.lazy(() => import('../pages/giftCards'));
const Rates = React.lazy(() => import('../pages/rates'));
const CompleteTransactions = React.lazy(() => import('../pages/completeTransaction'));
const TransactionHistory = React.lazy(() => import('../pages/transactionHistory'));
const Settings = React.lazy(() => import('../pages/settings'));
const Admin = React.lazy(() => import('../pages/admin'));
const AdminTransactions = React.lazy(() => import('../pages/admin_transactions'));
const AdminCrypto = React.lazy(() => import('../pages/adminCrypto'));
const AdminGiftCard = React.lazy(() => import('../pages/adminGiftCards'));
const Customers = React.lazy(() => import('../pages/customers'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role.toUpperCase()) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: Home,
    route: Route,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Dashboard,
    roles: ['USER', 'ADMIN', 'SUPER-ADMIN'],
    route: PrivateRoute,
};

const transactionRoutes = {
    path: '/transactions',
    name: 'Transaction History',
    icon: FeatherIcon.Layers,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: TransactionHistory,
    roles: ['USER'],
    route: PrivateRoute,
};

const giftCardRoutes = {
    path: '/gift-cards',
    name: 'Gift Cards',
    icon: FeatherIcon.Gift,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: GiftCards,
    roles: ['USER'],
    route: PrivateRoute,
};

const cryptoCurrencyRoutes = {
    path: '/cryptocurrencies',
    name: 'Cryptocurrency',
    icon: FeatherIcon.DollarSign,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: CryptoCurrencies,
    roles: ['USER'],
    route: PrivateRoute,
};
const ratesRoutes = {
    path: '/transfer',
    name: 'Transfer',
    icon: FeatherIcon.TrendingUp,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Rates,
    roles: ['USER'],
    route: PrivateRoute,
};

const settingsRoutes = {
    path: '/settings',
    name: 'Settings',
    icon: FeatherIcon.Settings,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Settings,
    roles: ['USER'],
    route: PrivateRoute,
};

const adminRoutes = {
    path: '/admin',
    name: 'Admin',
    icon: FeatherIcon.Settings,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Admin,
    roles: ['ADMIN'],
    route: PrivateRoute,
};

const adminTransactionsRoutes = {
    path: '/transactions-admin',
    name: 'Transactions',
    icon: FeatherIcon.Layers,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: AdminTransactions,
    roles: ['ADMIN'],
    route: PrivateRoute,
};

const adminGiftCard = {
    path: '/giftcard/admin',
    name: 'GiftCard',
    icon: FeatherIcon.CreditCard,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: AdminGiftCard,
    roles: ['ADMIN'],
    route: PrivateRoute,
};

const adminCrypto = {
    path: '/crypto/admin',
    name: 'Cryptocurrencies',
    icon: FeatherIcon.DollarSign,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: AdminCrypto,
    roles: ['ADMIN'],
    route: PrivateRoute,
};

const customerRoutes = {
    path: '/customers',
    name: 'Customers',
    icon: FeatherIcon.Users,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Customers,
    roles: ['ADMIN'],
    route: PrivateRoute,
};

const logout = {
    path: '/logout',
    name: 'Logout',
    icon: FeatherIcon.Power,
    // header: 'Navigation',
    // badge: {
    //     variant: 'success',
    //     text: '1',
    // },
    component: Logout,
    roles: ['ADMIN', 'USER'],
    route: PrivateRoute,
};

// apps

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    header: 'Apps',
    icon: FeatherIcon.Calendar,
    component: CalendarApp,
    route: PrivateRoute,
    roles: ['ADMIN', 'USER'], // disable later
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: EmailInbox,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/apps/email/details',
            name: 'Details',
            component: EmailDetail,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/apps/email/compose',
            name: 'Compose',
            component: EmailCompose,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: ProjectList,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/apps/projects/detail',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
    ],
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    icon: FeatherIcon.Bookmark,
    children: [
        {
            path: '/apps/tasks/list',
            name: 'List',
            component: TaskList,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/apps/tasks/board',
            name: 'Board',
            component: TaskBoard,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
    ],
};

const appRoutes = [calendarAppRoutes, emailAppRoutes, projectAppRoutes, taskAppRoutes];

// pages
const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    roles: ['ADMIN', 'USER'], // disable later
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/pages/error-404',
            name: 'Error 404',
            component: Error404,
            route: Route,
        },
        {
            path: '/pages/error-500',
            name: 'Error 500',
            component: Error500,
            route: Route,
        },
    ],
};

// components
const componentsRoutes = {
    path: '/ui',
    name: 'UI Elements',
    header: 'Components',
    icon: FeatherIcon.Package,
    roles: ['ADMIN', 'USER'], // disable later
    children: [
        {
            path: '/ui/bscomponents',
            name: 'Bootstrap UI',
            component: BSComponents,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                    roles: ['ADMIN', 'USER'], // disable later
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons Icons',
                    component: UniconsIcons,
                    route: PrivateRoute,
                    roles: ['ADMIN', 'USER'], // disable later
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
            roles: ['ADMIN', 'USER'], // disable later
        },
    ],
};

// charts
const chartRoutes = {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    icon: FeatherIcon.PieChart,
    roles: ['ADMIN', 'USER'], // disable later
    route: PrivateRoute,
};

// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/editor',
            name: 'Editor',
            component: Editor,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        },
    ],
};

const tableRoutes = {
    path: '/tables',
    name: 'Tables',
    icon: FeatherIcon.Grid,
    children: [
        {
            path: '/tables/basic',
            name: 'Basic',
            component: BasicTables,
            route: PrivateRoute,
        },
        {
            path: '/tables/advanced',
            name: 'Advanced',
            component: AdvancedTables,
            route: PrivateRoute,
        },
    ],
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

const completeTransactionRoutes = {
    path: '/complete-transaction',
    name: 'Complete Transaction',
    component: CompleteTransactions,
    route: Route,
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    transactionRoutes,
    giftCardRoutes,
    cryptoCurrencyRoutes,
    ratesRoutes,
    settingsRoutes,
    completeTransactionRoutes,
    adminRoutes,
    adminTransactionsRoutes,
    adminCrypto,
    adminGiftCard,
    customerRoutes,
    ...appRoutes,
    pagesRoutes,
    componentsRoutes,
    chartRoutes,
    formsRoutes,
    tableRoutes,
    authRoutes,
    logout,
];

const authProtectedRoutes = [
    dashboardRoutes,
    transactionRoutes,
    giftCardRoutes,
    cryptoCurrencyRoutes,
    ratesRoutes,
    settingsRoutes,
    // Admin protected Routes
    adminRoutes,
    adminTransactionsRoutes,
    adminCrypto,
    adminGiftCard,
    customerRoutes,
    logout,
    // ...appRoutes,
    // pagesRoutes,
    // componentsRoutes,
    // chartRoutes,
    // formsRoutes,
    // tableRoutes,
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
