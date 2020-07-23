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
    const myEventsList = [];
    
    activity_periods.map((item, index) =>{
        const start = moment(item.start_time).format('MMMM Do YYYY, h:mm a');
        const end = moment(item.end_time).format('MMMM Do YYYY, h:mm a');
        console.log(start, end);
        myEventsList.push({
            title: `Activity ${index+1}`,
            start: item.start_time,
            end : item.endTime,
            allDay: false,
        })
        return null;
    });
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