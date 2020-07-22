import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import React from 'react';
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css';
const moment = require('moment');
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const MyCalendar = (props) => {
    const { activity_periods } = props;
    console.log('props', props);
    const myEventsList = [{
        title: 'Website Re-Design Plan',
        startDate: new Date(2020, 5, 25, 9, 35),
        endDate: new Date(2020, 5, 25, 11, 30),
        id: 0
    }];
    return (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)};
export default MyCalendar;