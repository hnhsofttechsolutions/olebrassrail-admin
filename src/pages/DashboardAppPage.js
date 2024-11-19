import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { instance } from '../config/Http';
// components
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [LenderCount, setLenderCount] = useState([]);
  const [, setLoader] = useState(false);
  const token = localStorage.getItem('accessToken');

  const user = useCallback(() => {
    setLoader(true);
    instance
      .get('admin/dashboard_counts')
      .then((response) => {
        setLoader(false);
        setLenderCount(response?.data);
        console.log(response.data, 'user api');
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
    console.log(token);
  }, [token]);


  useEffect(() => {
    user();
  }, [user]);
  return (
    <>
      <Helmet>
        <title> Dashboard | Ole brass rail </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}> 
            <AppWidgetSummary title="Upcoming Events " total={LenderCount?.upcoming_event_count} icon={'material-symbols:event-upcoming-outline'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}> 
            <AppWidgetSummary title="Break Fast Menu" total={LenderCount?.breakfast_event_count} icon="fluent-mdl2:breakfast" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Dinner Menu"
              total={LenderCount.lunch_event_count}
              color="info"
              icon="cil:dinner"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Daily Specials"
              total={LenderCount.special_event_count}
              color="info"
              icon="hugeicons:task-daily-01"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
