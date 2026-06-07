export interface LessonQuestion {
  text: string;
  createdAt: string;
  status: 'pending' | 'answered';
}

const NOTES_KEY = 'lesson-notes-storage';
const QUESTIONS_KEY = 'lesson-question-storage';

function readStorage<T>(key: string): T {
  if (typeof window === 'undefined') return {} as T;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

function writeStorage(key: string, value: any) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function getLessonNotes(lessonId: number): string {
  const storage = readStorage<Record<number, string>>(NOTES_KEY);
  return storage[lessonId] || '';
}

export function saveLessonNotes(lessonId: number, notes: string) {
  const storage = readStorage<Record<number, string>>(NOTES_KEY);
  storage[lessonId] = notes;
  writeStorage(NOTES_KEY, storage);
}

export function getLessonQuestions(lessonId: number): LessonQuestion[] {
  const storage = readStorage<Record<number, LessonQuestion[]>>(QUESTIONS_KEY);
  return storage[lessonId] || [];
}

export function getLessonQuestionCount(lessonId: number): number {
  const storage = readStorage<Record<number, LessonQuestion[]>>(QUESTIONS_KEY);
  return (storage[lessonId] || []).length;
}

export function getAllLessonQuestions(): Record<number, LessonQuestion[]> {
  return readStorage<Record<number, LessonQuestion[]>>(QUESTIONS_KEY);
}

export function addLessonQuestion(lessonId: number, questionText: string): LessonQuestion[] {
  const storage = readStorage<Record<number, LessonQuestion[]>>(QUESTIONS_KEY);
  const existing = storage[lessonId] || [];
  const next = [
    {
      text: questionText,
      createdAt: new Date().toISOString(),
      status: 'pending' as const,
    },
    ...existing,
  ];
  storage[lessonId] = next;
  writeStorage(QUESTIONS_KEY, storage);
  return next;
}

export function updateLessonQuestionStatus(
  lessonId: number,
  questionIndex: number,
  status: LessonQuestion['status']
): LessonQuestion[] {
  const storage = readStorage<Record<number, LessonQuestion[]>>(QUESTIONS_KEY);
  const existing = storage[lessonId] || [];
  if (questionIndex < 0 || questionIndex >= existing.length) {
    return existing;
  }

  const updated = existing.map((question, index) =>
    index === questionIndex ? { ...question, status } : question
  );
  storage[lessonId] = updated;
  writeStorage(QUESTIONS_KEY, storage);
  return updated;
}
