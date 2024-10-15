document.addEventListener('DOMContentLoaded', function() {
    var elementCalendar = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(elementCalendar, {
        buttonText: {today: 'Hoy'},
        initialView: 'dayGridMonth',
        events: 'js/data.json'
    });
    calendar.setOption('locale', 'es');
    
    calendar.render();

})