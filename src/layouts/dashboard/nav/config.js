// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Gallery',
    path: '/dashboard/gallery',
    icon: icon('ic_user'),
  },
  {
    title: 'Upcoming Events',
    path: '/dashboard/upcoming_events',
    icon: icon('ic_package'),
  },
  {
    title: 'Breakfast Menu',
    path: '/dashboard/breakfast_menu',
    icon: icon('ic_package'),
  }, {
    title: 'Dinner Menu',
    path: '/dashboard/dinner_menu',
    icon: icon('ic_package'),
  }, {
    title: 'Daily Specials',
    path: '/dashboard/daily_specials',
    icon: icon('ic_package'),
  },
];

export default navConfig;
