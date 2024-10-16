document.addEventListener('DOMContentLoaded', function() {
    var elementCalendar = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(elementCalendar, {
        locale: 'es',
        initialView: 'timeGridWeek', // Vista de semana
        initialDate: '2024-11-04',   // Fecha inicial (4 de noviembre de 2024)
        headerToolbar: {
          left: '',
          center: 'title',
          right: ''
        },
        validRange: {
          start: '2024-11-03',
          end: '2024-11-10'
        },
        allDaySlot: false,
        dayHeaderFormat: { 
            weekday: 'long',  // Día completo (Lunes, Martes, etc.)
            day: '2-digit'    // Número del día (04, 05, etc.)
          },
      
          // Personalización del título (Nombre del mes centrado)
          titleFormat: { 
            year: 'numeric',  // Año numérico completo
            month: 'long'     // Nombre completo del mes
          },
        events: [
          {
            title: 'Evento 1',
            start: '2024-11-04T10:00:00',
            end: '2024-11-04T12:00:00'
          },
          {
            title: 'Evento 2',
            start: '2024-11-05T14:00:00',
            end: '2024-11-05T16:00:00'
          },
          {
            title: 'Evento 3',
            start: '2024-11-06T09:00:00',
            end: '2024-11-06T11:00:00'
          },
          {
            title: 'Evento 4',
            start: '2024-11-09T13:00:00',
            end: '2024-11-09T15:00:00'
          }
        ]
      });
      calendar.render()
})