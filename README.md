//for add slots or meeting
1.....http://localhost:5000/api/meetings
request.body -- post request
{
  "title": "Meeting for Interview",
  "starttime": "09:00",
  "endtime": "12:00",
  "date": "2025-04-15"
}
//for get all available slots
2....http://localhost:5000/api/meetings/slots?date=2025-04-15&option=9AM-12PM  
get request
//for update meeting of particular 
3....http://localhost:5000/api/meetings/:id
id took from response of first request
request.body
{
  "starttime": "10:00",
  "endtime": "12:00",
  "date": "2025-04-15"
}
4....http://localhost:5000/api/meetings/:id
delete request


