// src/data/mockData.js
export const USERS = {
  'student@demo.com':  {id:'s1',name:'Kwame Asante',email:'student@demo.com',password:'demo123',role:'student'},
  'instructor@demo.com':{id:'i1',name:'Kofi Mensah',email:'instructor@demo.com',password:'demo123',role:'instructor'},
  'admin@demo.com':    {id:'a1',name:'Admin User',email:'admin@demo.com',password:'demo123',role:'admin'},
};

export const INITIAL_LESSONS = [
  {id:1,title:'Understanding Road Signs',cat:'Road Signs',desc:'Master mandatory, warning and informational signs used on public roads.',dur:'12 min',done:true,instructor:'Kofi Mensah'},
  {id:2,title:'Right of Way Rules',cat:'Traffic Laws',desc:'Who goes first at intersections, roundabouts and pedestrian crossings.',dur:'15 min',done:true,instructor:'Kofi Mensah'},
  {id:3,title:'Speed Limits & Zones',cat:'Traffic Laws',desc:'Default limits for road types and special zones like schools and hospitals.',dur:'10 min',done:false,instructor:'Ama Owusu'},
  {id:4,title:'Defensive Driving Techniques',cat:'Driving Safety',desc:'Anticipate hazards, maintain safe following distances, prevent collisions.',dur:'18 min',done:false,instructor:'Kofi Mensah'},
  {id:5,title:'Vehicle Controls Mastery',cat:'Vehicle Controls',desc:'Dashboard instruments, mirrors, indicators and all primary controls.',dur:'14 min',done:false,instructor:'Ama Owusu'},
  {id:6,title:'Parking & Manoeuvres',cat:'Driving Safety',desc:'Parallel parking, bay parking, reversing and three-point turns.',dur:'20 min',done:false,instructor:'Kofi Mensah'},
  {id:7,title:'Night & Weather Driving',cat:'Driving Safety',desc:'Rain, fog, snow and low-visibility driving adjustments.',dur:'16 min',done:false,instructor:'Ama Owusu'},
  {id:8,title:'Highway & Motorway Rules',cat:'Traffic Laws',desc:'Merging, lane discipline, overtaking and emergency procedures.',dur:'13 min',done:false,instructor:'Kofi Mensah'}
];




// Export the rest of your arrays (QUIZZES, SCHEDULES, AUDIT_LOG, etc.) using "export const"

export const SCHEDULES = [
  {id:1,title:'Live Q&A: Road Signs Deep Dive',instructor:'Kofi Mensah',date:'2026-05-18',time:'10:00 AM',link:'https://zoom.us/j/123456789',type:'zoom'},
  {id:2,title:'Hazard Perception Practice',instructor:'Ama Owusu',date:'2026-05-21',time:'2:00 PM',link:'https://meet.google.com/abc-defg-hij',type:'meet'},
  {id:3,title:'Mock Theory Test Session',instructor:'Kofi Mensah',date:'2026-05-25',time:'9:00 AM',link:'https://zoom.us/j/987654321',type:'zoom'},
];

export const QUIZZES = {
  1:[{q:'What does a red octagonal sign mean?',opts:['Speed limit 30','Give way','Stop','No entry'],ans:2},
     {q:'What colour are warning signs?',opts:['Blue','Red','Yellow/amber','Green'],ans:2},
     {q:'A blue circular sign indicates?',opts:['Warning','Prohibition','Mandatory instruction','Information'],ans:2}],
  2:[{q:'At an uncontrolled intersection, who has priority?',opts:['Driver on the left','Driver on the right','Faster vehicle','Larger vehicle'],ans:1},
     {q:'When must you yield to pedestrians at marked crossings?',opts:['Never','Only at lights','Always at marked crossings','Weekdays only'],ans:2}],
  3:[{q:'Default speed limit in a residential area?',opts:['40 km/h','50 km/h','60 km/h','70 km/h'],ans:1},
     {q:'School zone limits apply during?',opts:['All day every day','School hours on school days','Weekdays 8am–5pm','Weekends only'],ans:1}],
  4:[{q:'Safe following distance in dry conditions?',opts:['1 second','2 seconds','3 seconds','5 seconds'],ans:1},
     {q:'What is the "commentary driving" technique?',opts:['Singing while driving','Narrating hazards aloud','Talking to passengers','Using GPS'],ans:1}],
};

export const STUDENTS_DATA = [
  {id:'s1',name:'Kwame Asante',email:'student@demo.com',progress:72,quizAvg:81},
  {id:'s2',name:'Abena Osei',email:'abena@example.com',progress:45,quizAvg:63},
  {id:'s3',name:'Yaw Darko',email:'yaw@example.com',progress:90,quizAvg:94},
  {id:'s4',name:'Efua Mensah',email:'efua@example.com',progress:28,quizAvg:55},
];

export const AUDIT_LOG = [
  {action:'User logged in',user:'Kwame Asante',time:'2 min ago',type:'auth'},
  {action:'Lesson completed',user:'Abena Osei',time:'15 min ago',type:'lesson'},
  {action:'Quiz submitted (90%)',user:'Yaw Darko',time:'1 hr ago',type:'quiz'},
  {action:'Session created',user:'Kofi Mensah',time:'2 hr ago',type:'schedule'},
  {action:'User registered',user:'Efua Mensah',time:'3 hr ago',type:'auth'},
  {action:'Lesson uploaded',user:'Ama Owusu',time:'5 hr ago',type:'lesson'},
  {action:'Failed login attempt',user:'unknown@x.com',time:'6 hr ago',type:'security'},
];

export const QUIZ_HISTORY = [
  {lesson:'Road Signs',score:90,date:'2 days ago'},
  {lesson:'Traffic Laws',score:75,date:'4 days ago'},
  {lesson:'Driving Safety',score:68,date:'1 week ago'},
];

export const CATS = {
  'Road Signs':     {color:'#2563eb',bg:'#eff6ff',emoji:'🚦'},
  'Traffic Laws':   {color:'#16a34a',bg:'#f0fdf4',emoji:'⚖️'},
  'Driving Safety': {color:'#d97706',bg:'#fffbeb',emoji:'🛡️'},
  'Vehicle Controls':{color:'#7c3aed',bg:'#f5f3ff',emoji:'🎛️'},
};