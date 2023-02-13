import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation, Outlet } from "react-router-dom";
import Header from "@/atoms/navigators/Header";
import "@/styles/Home.css";

import { DateTime } from "luxon";

import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineContent from '@mui/lab/TimelineContent';
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

  useEffect(() => {
    const fetchData = async () => {
      const lastweek = await getWeeklyMenus(DateTime.now().minus({ weeks: 1 }));
      const thisweek = await getWeeklyMenus(DateTime.now());

      setState({
        ...state,
        weeks: [lastweek, thisweek],
      });
    };

    fetchData();
  }, []);

  const weekToFillTimeline = (week) => {
    return week?.reduce((x, menu, i) => {
      if(!x[menu.fillDate.toFormat('cccc')]) {
        x[menu.fillDate.toFormat('cccc')] = [];
      }
      x[menu.fillDate.toFormat('cccc')].push(menu);
      return x;
    }, {})
  }

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      {state.weeks?.map(week => (
        <div>
          <Typography>Week of {week[0].fillDate.startOf('week').toLocaleString()}</Typography>
          <Timeline>
            {week && Object.values(weekToFillTimeline(week))
              ?.map(menus => (
                <TimelineItem key={menus[0].DailyMenuID}>
                    <TimelineOppositeContent
                      sx={{ m: 'auto 0' }}
                    >
                      <Typography><strong>{ menus[0].fillDate.toFormat('cccc') }</strong></Typography>
                      <Typography>{ menus[0].date.toLocaleString() }</Typography>
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
                      {menus?.map(menu =>
                      (
                        <div>
                          <Typography key={menu.DailyMenuID}><strong>{menu.date.toFormat('cccc')}</strong></Typography>
                          {menu.items.map(item => (
                            <Typography key={`${menu.DailyMenuID}_${item}`}>{ item }</Typography>
                          ))}
                        </div>
                      ))}
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
