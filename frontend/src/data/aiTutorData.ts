export interface TutorKnowledgeItem {
  question: string;
  answer: string;
  keywords: string[];
}

export const AI_TUTOR_KB: TutorKnowledgeItem[] = [
  {
    question: 'red triangle sign',
    answer: 'A red triangle sign is a warning sign. It alerts drivers to potential hazards ahead, such as curves, junctions, or pedestrian crossings. Slow down and prepare to react safely.',
    keywords: ['red triangle', 'triangle sign', 'warning sign'],
  },
  {
    question: 'right of way roundabout',
    answer: 'At a roundabout, vehicles inside the roundabout have priority over vehicles entering. Yield to traffic already circulating and only enter when it is safe.',
    keywords: ['roundabout', 'right of way', 'yield', 'give way'],
  },
  {
    question: 'stopping distance at 60km/h',
    answer: 'Stopping distance combines thinking distance and braking distance. At 60 km/h on dry roads, expect roughly 40–45 meters overall, depending on conditions and reaction time.',
    keywords: ['stopping distance', '60km/h', '60 km/h', 'stop distance'],
  },
  {
    question: 'hazard lights',
    answer: 'Use hazard lights when you are temporarily stopped in a dangerous place, such as after a breakdown, or to warn other road users of a hazard ahead if traffic is slowing unexpectedly.',
    keywords: ['hazard lights', 'emergency flashers', 'hazard warning'],
  },
  {
    question: 'school zone',
    answer: 'In a school zone, reduce speed, watch for children crossing, obey crossing guards, and follow any posted times or speed limits. Extra caution is required during arrival and dismissal.',
    keywords: ['school zone', 'school area', 'children crossing'],
  },
  {
    question: 'seat belt',
    answer: 'Seat belts must be worn by all occupants. They help keep you secure in the seat, reduce injury during a collision, and are legally required in most countries.',
    keywords: ['seat belt', 'seatbelt', 'belt'],
  },
  {
    question: 'overtaking',
    answer: 'Overtake only when it is safe: check mirrors, signal, ensure clear visibility, and avoid overtaking on bends, at pedestrian crossings, or where road markings forbid it.',
    keywords: ['overtake', 'passing', 'overtaking'],
  },
  {
    question: 'weather driving',
    answer: 'In bad weather, slow down, increase following distance, use lights when required, and brake gently. Wet or icy roads need extra caution and smooth steering.',
    keywords: ['weather', 'rain', 'fog', 'ice', 'snow', 'wet road'],
  },
  {
    question: 'vehicle controls',
    answer: 'Know the function of pedals, mirrors, indicators, headlights and hazard switches. Good control means smooth steering, correct gear use, and constant awareness of the vehicle’s responses.',
    keywords: ['vehicle controls', 'controls', 'pedals', 'mirrors', 'indicators'],
  },
  {
    question: 'lesson route',
    answer: 'The lesson route shows the planned driving route from the school to the lesson site. It helps you understand where the practical lesson will take place and what roads you may learn on.',
    keywords: ['route', 'lesson route', 'map', 'practical lesson route'],
  },
];

export function answerTutorQuestion(query: string): string {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return 'Please ask a driving theory question. I can help with road signs, traffic laws, driving safety, and vehicle controls.';
  }

  const exactMatch = AI_TUTOR_KB.find(item => item.keywords.some(keyword => normalized.includes(keyword)));
  if (exactMatch) {
    return exactMatch.answer;
  }

  const words = normalized.split(/\W+/).filter(Boolean);
  const fallbackMatch = AI_TUTOR_KB.find(item => item.keywords.some(keyword => words.includes(keyword)));
  if (fallbackMatch) {
    return fallbackMatch.answer;
  }

  return 'I do not have a specific answer for that yet, but I can help with road signs, right-of-way, hazard awareness, vehicle controls, and practical lesson routes. Try asking one of those topics.';
}
