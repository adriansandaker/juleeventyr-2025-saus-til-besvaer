import React, { useState, useEffect, useRef } from 'react';

const Ror = () => {
  const [circles, setCircles] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const totalRotation = useRef(0);
  const lastAngle = useRef<number | null>(null);

  const handleMotion = (event: DeviceMotionEvent) => {
    if (!event.accelerationIncludingGravity) {
      return;
    }

    const { x, y } = event.accelerationIncludingGravity;

    // We need a minimum amount of movement to avoid noise
    if (x === null || y === null || Math.sqrt(x * x + y * y) < 1.5) {
      return;
    }

    const currentAngle = Math.atan2(y, x);

    if (lastAngle.current !== null) {
      let angleDifference = currentAngle - lastAngle.current;

      // Handle wrap-around from -PI to PI
      if (angleDifference > Math.PI) {
        angleDifference -= 2 * Math.PI;
      } else if (angleDifference < -Math.PI) {
        angleDifference += 2 * Math.PI;
      }

      totalRotation.current += angleDifference;

      // Check if a full circle has been completed
      if (Math.abs(totalRotation.current) >= 2 * Math.PI) {
        setCircles((prevCircles) => prevCircles + 1);
        totalRotation.current = 0; // Reset for the next circle
      }
    }

    lastAngle.current = currentAngle;
  };

  const requestDeviceMotionPermission = () => {
    // Feature detection for iOS 13+
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((permissionState: 'granted' | 'denied') => {
          if (permissionState === 'granted') {
            setPermissionGranted(true);
          } else {
            alert('Permission to access device motion was denied.');
          }
        })
        .catch(console.error);
    } else {
      // Handle non-iOS 13+ devices
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [permissionGranted]);

  if (!permissionGranted) {
    return (
      <div>
        <p>Please enable motion sensors to stir the sauce.</p>
        <button onClick={requestDeviceMotionPermission}>
          Enable Motion Sensors
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Stir the Sauce!</h2>
      <p>Move your phone in a circular motion to stir.</p>
      <p>
        Stirred circles: <strong>{circles}</strong>
      </p>
    </div>
  );
};

export default Ror;