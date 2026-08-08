export const motionTokens = {
  duration: {
    fast: 0.16,
    base: 0.4,
    reveal: 0.72,
    system: 1.1,
  },
  distance: {
    small: 12,
    medium: 24,
    large: 40,
    pointer: 12,
  },
  stagger: {
    tight: 0.06,
    standard: 0.1,
  },
  ease: {
    enter: "power3.out",
    exit: "power2.inOut",
    system: "power1.inOut",
  },
  pointerRotation: 2.5,
  avatar: {
    floatDuration: 3.8,
    floatDistance: 9,
    impulseDistance: 10,
    impulseRotation: 1.25,
    depthDistance: 3.5,
    depthRotation: 0.55,
  },
  orb: {
    followDuration: 0.2,
    captureDuration: 0.42,
    releaseDuration: 0.36,
    idleDelayMs: 170,
    respawnDistance: 18,
  },
} as const
