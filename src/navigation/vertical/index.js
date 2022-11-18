// ** Icon imports
import Login from 'mdi-material-ui/Login';
import Table from 'mdi-material-ui/Table';
import CubeOutline from 'mdi-material-ui/CubeOutline';
import HomeOutline from 'mdi-material-ui/HomeOutline';
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase';
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline';
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended';
import {
  CogBox,
  PackageVariant,
  Pencil,
  Plus,
  TableAccount,
} from 'mdi-material-ui';

const navigation = () => {
  return [
    {
      title: 'Show Products',
      icon: PackageVariant,
      path: '/product',
    },
    {
      title: 'Add Product',
      icon: Plus,
      path: '/product/add',
    },
    {
      title: 'Show Tables',
      icon: TableAccount,
      path: '/table',
    },
    {
      title: 'Update Product',
      icon: Pencil,
      path: '/product/update',
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings',
    // },
    // {
    //   sectionTitle: 'Pages',
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true,
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true,
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true,
    // },
    // {
    //   sectionTitle: 'User Interface',
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography',
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended,
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards',
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables',
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts',
    // },
  ];
};

export default navigation;
