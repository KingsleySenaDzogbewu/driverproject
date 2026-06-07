import { useEffect, useRef, useState } from 'react';
import { PRACTICAL_LESSONS, SCHOOL_LOCATION } from '../data/mockData';
import { locationService, InstructorLocation } from '../services/locationService';
import TrackInstructorMap from './TrackInstructorMap';

interface UserProfile {
  id: string | number;
  name: string;
  role: 'student' | 'instructor' | 'admin';
}

interface PracticalLessonsDetailsProps {
  user: UserProfile;
  lessonId: number | null;
  setPage: (page: string) => void;
}

export default function PracticalLessonsDetails({ user, lessonId, setPage }: PracticalLessonsDetailsProps) {
  const lesson = PRACTICAL_LESSONS.find((item) => item.id === lessonId);
  const [instructorLocation, setInstructorLocation] = useState<InstructorLocation | null>(null);
  const [statusMessage, setStatusMessage] = useState('Tap the button to start tracking or sharing location.');
  const [active, setActive] = useState(false);
  const watchId = useRef<number | null>(null);
  const isStudent = user.role === 'student';
  const lessonSiteCenter: [number, number] = lesson ? [lesson.siteLat ?? 5.6492, lesson.siteLng ?? -0.1546] : [5.6492, -0.1546];
  const schoolCenter: [number, number] = [SCHOOL_LOCATION.lat, SCHOOL_LOCATION.lng];
  const route: [number, number][] = lesson?.route ?? [schoolCenter, lessonSiteCenter];
  const mapCenter: [number, number] = route.length
    ? [route.reduce((acc, item) => acc + item[0], 0) / route.length, route.reduce((acc, item) => acc + item[1], 0) / route.length]
    : [(schoolCenter[0] + lessonSiteCenter[0]) / 2, (schoolCenter[1] + lessonSiteCenter[1]) / 2];

  useEffect(() => {
    if (!lessonId || !active) {
      return undefined;
    }
    const latest = locationService.getLocation(lessonId);
    setInstructorLocation(latest);
    if (isStudent) {
      setStatusMessage(latest ? 'Instructor is on the way to the lesson site.' : 'Waiting for the instructor to share arrival status...');
    } else {
      setStatusMessage(latest ? 'Location is now being shared live.' : 'Waiting for the instructor to share their location...');
    }

    const interval = window.setInterval(() => {
      const updated = locationService.getLocation(lessonId);
      setInstructorLocation(updated);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [lessonId, active, isStudent]);

  useEffect(() => {
    return () => {
      if (watchId.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  if (!lesson) {
    return (
      <div style={{ padding: '24px' }}>
        <div className="card card-p" style={{ maxWidth: '620px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Practical Lesson Details</div>
          <div style={{ color: 'var(--text3)' }}>No lesson selected. Please go back and choose an upcoming session.</div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: '18px' }} onClick={() => setPage('practical-lessons')}>
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  const isInstructor = user.role === 'instructor';
  const isUpcoming = lesson.status === 'upcoming';
  const buttonLabel = isInstructor
    ? active
      ? 'Sharing My Location'
      : 'Share My Location'
    : active
      ? 'Showing Lesson Status'
      : 'Show Lesson Status';

  const lessonTimingMessage = isStudent
    ? isUpcoming
      ? 'Lesson status and site location are available for students.'
      : lesson.status === 'completed'
      ? 'Review the training site and completed session details.'
      : 'This session is not active right now.'
    : isUpcoming
    ? 'Instructor will share location when the lesson begins.'
    : lesson.status === 'completed'
    ? 'Review the last known instructor location for this completed lesson.'
    : 'Tracking is available for scheduled or completed lessons.';

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not available in this browser.');
      return;
    }

    if (isInstructor) {
      if (active) {
        setActive(false);
        setStatusMessage('Location sharing stopped.');
        if (watchId.current !== null) {
          navigator.geolocation.clearWatch(watchId.current);
          watchId.current = null;
        }
        return;
      }

      setStatusMessage('Starting location sharing...');
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const payload: InstructorLocation = {
            lessonId: lesson.id,
            lat: latitude,
            lng: longitude,
            updatedAt: new Date().toISOString(),
          };
          locationService.saveLocation(payload);
          setInstructorLocation(payload);
          setStatusMessage('Location is now being shared live.');
          setActive(true);
        },
        () => {
          setStatusMessage('Unable to access your location. Please allow permission.');
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
      watchId.current = id;
      return;
    }

    setActive(true);
    const latest = locationService.getLocation(lesson.id);
    setInstructorLocation(latest);
    setStatusMessage(latest ? 'Instructor status loaded.' : 'Waiting for the instructor to share arrival status...');
  };

  const schoolMarker = {
    lat: schoolCenter[0],
    lng: schoolCenter[1],
    title: SCHOOL_LOCATION.name,
    description: 'Starting point for this lesson route',
  };

  const destinationMarker = {
    lat: lesson.siteLat ?? lessonSiteCenter[0],
    lng: lesson.siteLng ?? lessonSiteCenter[1],
    title: lesson.siteName ?? lesson.pickupLocation,
    description: `${lesson.pickupLocation} training area`,
  };

  const instructorMarkers = instructorLocation
    ? [
        {
          lat: instructorLocation.lat,
          lng: instructorLocation.lng,
          title: 'Instructor Location',
          description: `Updated ${new Date(instructorLocation.updatedAt).toLocaleTimeString()}`,
        },
      ]
    : [];

  const markers = isStudent
    ? [schoolMarker, destinationMarker]
    : [schoolMarker, destinationMarker, ...instructorMarkers];

  return (
    <div style={{ padding: '24px' }}>
      <div className="ph anim-fadeup">
        <div className="ph-title">Practical Lesson Details</div>
        <div className="ph-sub">Instructor, vehicle and session information</div>
      </div>

      <div className="card card-p anim-fadeup" style={{ maxWidth: '900px', marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <DetailRow label="Instructor" value={lesson.instructorName} />
            <DetailRow label="Vehicle" value={lesson.vehicleName} />
            <DetailRow label="Date" value={lesson.date} />
            <DetailRow label="Time" value={lesson.time} />
            <DetailRow label="Pickup Location" value={lesson.pickupLocation} />
            <DetailRow label="Duration" value={lesson.duration} />
            <DetailRow label="Status" value={lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '18px', borderRadius: '16px', background: 'var(--bluebg)', border: '1px solid var(--gray2)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Track Instructor</div>
              <div style={{ color: 'var(--text3)', fontSize: '13px', lineHeight: '1.6' }}>
                {active ? statusMessage : lessonTimingMessage}
              </div>
            </div>

            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={handleShareLocation}>
              {buttonLabel}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>
            {isStudent ? 'Lesson Route Map' : 'Instructor Route Map'}
          </h3>
          <div style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '10px' }}>
            Route from {SCHOOL_LOCATION.name} to {lesson.siteName} via the planned lesson route.
          </div>
          {markers.length ? (
            <TrackInstructorMap center={mapCenter} markers={markers} route={route} />
          ) : (
            <div style={{ padding: '32px', borderRadius: '18px', background: 'var(--gray1)', color: 'var(--text3)', textAlign: 'center' }}>
              {active ? 'Waiting for status updates...' : 'Tap the button to begin.'}
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setPage('practical-lessons')}>
            Back to Lessons
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text3)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>{value}</div>
    </div>
  );
}
