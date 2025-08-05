import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import {GlobalStyle, Page, Title, ShowDate, ShowTime} from './CurrentTime.styled.js'

const pageThemes = {
  morning : {background: 'papayawhip', color: '#27212e', borderColor: '#27212e'},
  day: {background: '#b3dbe7', color: '#27212e', borderColor: '#27212e'},
  evening: {background: '#27212e', color: 'papayawhip', borderColor: 'papayawhip'}
}

function CurrentTime() {
  const [theme, setTheme] = useState(null);
  const [today, setToday] = useState(null);
  const [hours, setHours] = useState(null);

  useEffect(() => {
    const today = new Date();
    const hours = today.getHours();
    setToday(today.toLocaleDateString());
    setHours(hours);

    if (hours >= 6 && hours < 12) {
      setTheme(pageThemes.morning);
    }
    else if (hours >= 12 && hours < 18) {
      setTheme(pageThemes.day);
    }
    else {
      setTheme(pageThemes.evening);
    }
  }, []);

  if (!theme || !today || !hours) return null;

  // let titleText;
  // if (theme === pageThemes.morning) {titleText = 'Good Morning!'}
  // else if (theme === pageThemes.day) {titleText = 'Good Afternoon!'}
  // else {titleText = 'Good Evening!'}

  return(
    <>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Page>
          <Title>
            {theme === pageThemes.morning && 'Good Morning!'}
            {theme === pageThemes.day && 'Good Afternoon!'}
            {theme === pageThemes.evening && 'Good Evening!'}
          </Title> 
          <ShowDate>{hours < 12 ? 'Its morning' : 'Its day or evening'} <br/>
          Today: {today}
          </ShowDate> 
          <ShowTime>{hours && `Now: ${hours}:00 h`}</ShowTime>
        </Page>
      </ThemeProvider>
     </>
   
  )
}

export default CurrentTime;