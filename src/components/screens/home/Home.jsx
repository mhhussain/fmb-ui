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
    getWeeklyMenus(DateTime.now())
      .then(v => {
        setState({
          memberData: state.memberData,
          menus: v
        })
        //state.menus = v;
      });
  }, [state]);

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <Timeline>
        {state.menus
          ?.map(menu => (
          <TimelineItem key={menu.DailyMenuID}>
            <TimelineOppositeContent>
              <Typography>Filling on { menu.fillDate.toFormat('cccc') }</Typography>
              <Typography>{ menu.date.toLocaleString() }</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            CC
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
            <TimelineContent>
              {menu.items.map(item => (
                <Typography key={`${menu.DailyMenuID}_${item}`}>{ item }</Typography>
              ))}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <div className="font-black">
        <p>Logged in as {memberData.FirstName} {memberData.LastName}</p>
      </div>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
