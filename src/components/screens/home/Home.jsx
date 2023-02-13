import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation, Outlet } from "react-router-dom";
import Header from "@/atoms/navigators/Header";
import "@/styles/Home.css";

import { DateTime, Interval } from "luxon";

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import Filter1RoundedIcon from '@mui/icons-material/Filter1Rounded';
import Filter2RoundedIcon from '@mui/icons-material/Filter2Rounded';
import Filter4RoundedIcon from '@mui/icons-material/Filter4Rounded';
import Filter6RoundedIcon from '@mui/icons-material/Filter6Rounded';

import { getWeeklyMenus } from "@/api/services/Menu";

export default function Home() {
  // TODO: Move to using Redux for state management
  const [state, setState] = useState(useLocation().state);

  // If state and memberData does not exist - redirect to /login
  if (!state || !state.memberData) {
    return <Navigate to="/login" replace={true} />;
  }

  const { memberData } = state; // Read values passed on state

  // Week is a list of Menus, this function groups
  // together the daily menus based on their filling
  // dates.
  // I.e. Monday and Tuesday menu are grouped into
  // Monday for filling
  const weekToFillTimeline = (week) => {
    return week?.reduce((x, menu, i) => {
      if(!x[menu.fillDate.toFormat('cccc')]) {
        x[menu.fillDate.toFormat('cccc')] = [];
      }
      x[menu.fillDate.toFormat('cccc')].push(menu);
      return x;
    }, {});
  };

  // useEffect hook for fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      //const lastweek = await getWeeklyMenus(DateTime.now().minus({ weeks: 1 }));
      const thisweek = await getWeeklyMenus(DateTime.now());
      const nextweek = await getWeeklyMenus(DateTime.now().plus({ weeks: 1 }));

      setState({
        ...state,
        //weeks: [lastweek, thisweek],
        weeks: [thisweek, nextweek],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      {state.weeks?.map(week => (
        <div>
          {Interval.fromDateTimes(DateTime.fromISO(week[0].fillDate).startOf('week'), DateTime.fromISO(week[0].fillDate).endOf('week')).contains(DateTime.now())
            &&
            <Typography>This Week</Typography>
          }
          <Typography>{week[0].fillDate.startOf('week').toFormat('L/d')} - {week[0].fillDate.endOf('week').toFormat('L/d')}</Typography>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            {week && Object.values(weekToFillTimeline(week))
              ?.map(menus => (
                <TimelineItem key={menus[0].DailyMenuID}>
                    <TimelineOppositeContent
                      sx={{ m: 'auto 0' }}
                    >
                      <Typography><strong>{ menus[0].fillDate.toFormat('ccc') }</strong></Typography>
                      <Typography>{ menus[0].date.toFormat('L/d') }</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot variant="outlined">
                        <Filter4RoundedIcon
                          color="primary"
                          fontSize="large"
                        />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box sx={{ my: 2 }}>
                      {menus?.map(menu =>
                      (
                        <Box sx={{ mb: 1 }}>
                          <Typography key={menu.DailyMenuID}><strong>{menu.date.toFormat('cccc')}</strong></Typography>
                          {menu.items.map(item => (
                            <Typography key={`${menu.DailyMenuID}_${item}`}>{ item }</Typography>
                          ))}
                        </Box>
                      ))}
                      </Box>
                    </TimelineContent>
                </TimelineItem>
              )
            )}
          </Timeline>
        </div>
      ))}
      <div className="font-black">
        <p>Logged in as {memberData.FirstName} {memberData.LastName}</p>
        <p>© Anjuman-e-Najmi, Detroit 2023</p>
      </div>
    </div>
  );
}
