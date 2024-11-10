export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Menu',
    title: 'Menu',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: 'analytics',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'entities',
    title: 'Entities',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: 'users',
        icon: 'feather icon-users',
      },
      {
        id: 'attendance',
        title: 'Attendances',
        type: 'item',
        url: 'attendances',
        icon: 'feather icon-user-check',
      },
      {
        id: 'announcement',
        title: 'Announcements',
        type: 'item',
        url: 'announcements',
        icon: 'feather icon-info',
      },
      {
        id: 'complaint',
        title: 'Complaints',
        type: 'item',
        url: 'complaints',
        icon: 'feather icon-thumbs-down',
      },
      {
        id: 'holidays',
        title: 'Holidays',
        type: 'item',
        url: 'holidays',
        icon: 'feather icon-calendar',
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'item',
        url: 'projects',
        icon: 'feather icon-package',
      },
      {
        id: 'tasks',
        title: 'Tasks',
        type: 'item',
        url: 'tasks',
        icon: 'feather icon-clipboard',
      },
      {
        id: 'salaryhistory',
        title: 'Salary History',
        type: 'item',
        url: 'salaryhistory',
        icon: 'feather icon-dollar-sign',
      },
      {
        id: 'leaverequests',
        title: 'Leave Requests',
        type: 'item',
        url: 'leaves',
        icon: 'feather icon-briefcase',
      },
      {
        id: 'files',
        title: 'Files',
        type: 'item',
        url: 'files',
        icon: 'feather icon-file',
      },
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        url: '/profile',
        icon: 'feather icon-user',
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        url: '/settings',
        icon: 'feather icon-settings',
      },
      {
        id: 'logout',
        title: 'Logout',
        type: 'item',
        url: '/logout',
        icon: 'feather icon-log-out',
      },
    ]
  },
];


