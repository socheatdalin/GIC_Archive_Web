import { BiMedal, BiDoorOpen, BiBookBookmark, BiDetail } from 'react-icons/bi';
import { PiProjectorScreenChartLight } from 'react-icons/pi';
export const MenuConstants = [
  {
    // name: 'LIST',
    item: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/home/dashboard',
        icon: <BiMedal />,
      },
      {
        id: 'course',
        name: 'Courses',
        path: '/home/course/list',
        icon: <BiDetail />,
      },
      {
        id: 'thesis',
        name: 'Thesis',
        path: '/home/thesis/list',
        icon: <BiDoorOpen />,
      },
      {
        id: 'classproject',
        name: 'Class project',
        path: '/home/project/list',
        icon: <BiBookBookmark />,
      },
      {
        id: 'profile',
        name: 'Profile',
        path: '/home/profile/list',
        icon: <PiProjectorScreenChartLight />,
      },
    ],
  },
];
