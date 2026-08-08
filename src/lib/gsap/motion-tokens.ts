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
    floatSegmentDuration: 2.85,
    floatDistance: 22,
    driftDistance: 6,
    impulseDistance: 15,
    impulseRotation: 1.35,
    fluidPushDuration: 0.24,
    fluidWaveDuration: 0.44,
    fluidSettleDuration: 0.52,
    depthDistance: 9,
    depthRotation: 1,
  },
  orb: {
    followDuration: 0.2,
    captureDuration: 0.42,
    releaseDuration: 0.36,
    idleDelayMs: 210,
    respawnDistance: 18,
  },
} as const
