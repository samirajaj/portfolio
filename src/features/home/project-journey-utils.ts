export type JourneyPoint = { x: number; y: number }

export type ProjectCheckpoint = {
  projectId: string
  index: number
  pathProgress: number
  enterStart: number
  plateauStart: number
  plateauEnd: number
  exitEnd: number
}

export function createSerpentinePath(points: readonly JourneyPoint[]) {
  if (points.length === 0) return ""

  return points.slice(1).reduce(
    (path, point, index) => {
      const previous = points[index]
      if (!previous) return path
      const middleY = (previous.y + point.y) / 2
      return `${path} C ${previous.x} ${middleY}, ${point.x} ${middleY}, ${point.x} ${point.y}`
    },
    `M ${points[0]?.x ?? 0} ${points[0]?.y ?? 0}`
  )
}

function findPathProgress(path: SVGPathElement, point: JourneyPoint) {
  const length = path.getTotalLength()
  const samples = 240
  let nearestProgress = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  for (let index = 0; index <= samples; index += 1) {
    const progress = index / samples
    const sample = path.getPointAtLength(length * progress)
    const distance = Math.hypot(sample.x - point.x, sample.y - point.y)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestProgress = progress
    }
  }

  return nearestProgress
}

export function createProjectCheckpoints(
  path: SVGPathElement,
  projectIds: readonly string[],
  anchorPoints: readonly JourneyPoint[]
): readonly ProjectCheckpoint[] {
  const positions = anchorPoints.map((point) => findPathProgress(path, point))

  return positions.map((pathProgress, index) => {
    const previous = positions[index - 1] ?? 0
    const next = positions[index + 1] ?? 1
    const enterStart = index === 0 ? 0 : (previous + pathProgress) / 2
    const exitEnd =
      index === positions.length - 1 ? 1 : (pathProgress + next) / 2

    return {
      projectId: projectIds[index] ?? String(index),
      index,
      pathProgress,
      enterStart,
      plateauStart: enterStart + (pathProgress - enterStart) * 0.68,
      plateauEnd: pathProgress + (exitEnd - pathProgress) * 0.62,
      exitEnd,
    }
  })
}
