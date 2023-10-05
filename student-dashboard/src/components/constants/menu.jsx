import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { PiProjectorScreenChartLight } from 'react-icons/pi';
import { BiMedal } from 'react-icons/bi';
export const MenuConstants = [
  {
    item: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/home/dashboard/',
        icon: <BiMedal />,
      },
      {
        id: 'thesis',
        name: 'Thesis',
        path: '/home/thesis/list',
        icon: <HiOutlineClipboardDocumentList />,
      },
      {
        id: 'classproject',
        name: 'Class project',
        path: '/home/project/list',
        icon: <PiProjectorScreenChartLight />,
      },
    ],
  },
 
];
