const STORAGE_KEY = 'practical-lesson-instructor-locations';

export interface InstructorLocation {
  lessonId: number;
  lat: number;
  lng: number;
  updatedAt: string;
}

function readLocations(): Record<number, InstructorLocation> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocations(locations: Record<number, InstructorLocation>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch {
    // ignore storage errors
  }
}

export const locationService = {
  getLocation(lessonId: number): InstructorLocation | null {
    const locations = readLocations();
    return locations[lessonId] || null;
  },

  saveLocation(location: InstructorLocation) {
    const locations = readLocations();
    locations[location.lessonId] = location;
    writeLocations(locations);
  },

  clearLocation(lessonId: number) {
    const locations = readLocations();
    delete locations[lessonId];
    writeLocations(locations);
  },
};
