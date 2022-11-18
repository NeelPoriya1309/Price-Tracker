// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline';
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline';

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/product');
  });

  return <></>;
};

export default Dashboard;
