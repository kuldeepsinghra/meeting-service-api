function generateTimeSlots(start, end) {
    const slots = [];
    let [sh, sm] = start.split(':').map(Number);
    let [eh, em] = end.split(':').map(Number);
  
    while (sh < eh || (sh === eh && sm < em)) {
      let startSlot = `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`;
      sm += 30;
      if (sm >= 60) {
        sm = 0;
        sh += 1;
      }
      let endSlot = `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`;
      slots.push({ starttime: startSlot, endtime: endSlot });
    }
  
    return slots;
  }
  
  function generatedSlots(date, meetings, option) {
    const ranges = {
      '9-12,2-5': [['09:00', '12:00'], ['14:00', '17:00']],
      '9-6': [['09:00', '18:00']]
    };
  
    const timeBlocks = option === '9-6' ? ranges['9-6'] : ranges['9-12,2-5'];
    let allSlots = [];
  
    timeBlocks.forEach(([start, end]) => {
      allSlots = allSlots.concat(generateTimeSlots(start, end));
    });
  
    const booked = meetings.map(m => ({ starttime: m.starttime, endtime: m.endtime }));
  
    const available = allSlots.filter(slot => {
      return !booked.some(b => b.starttime === slot.starttime && b.endtime === slot.endtime);
    });
  
    return available;
  }
  
  module.exports = { generatedSlots };
  