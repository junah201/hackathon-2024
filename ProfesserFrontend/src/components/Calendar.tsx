import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import dayjs from 'dayjs';
import uniqolor from 'uniqolor';

import { Schedule } from '@/types';

interface CalenderProps {
  schedules: Schedule[];
}

const Calender = ({ schedules }: CalenderProps) => {
  const Colors: Record<number, string> = {};

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={schedules.map((s) => {
        if (!Colors[s.student_id]) {
          Colors[s.student_id] = uniqolor(
            `${s.student.name}/${s.student_id}`
          ).color;
        }

        const start_time = dayjs(s.start_time).format('HH:mm');
        const end_time = dayjs(s.end_time).format('HH:mm');

        return {
          title: `${s.student.name}`,
          start: s.start_time,
          end: s.end_time,
          color: Colors[s.student_id],
        };
      })}
      eventClick={(info) => {
        console.log(info);
        return;
      }}
    />
  );
};

export default Calender;
