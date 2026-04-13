export const educationLevels = ['1-5', '6-8', '9-12', 'undergraduate', 'post-graduation', 'phd']

export function getEducationLevels(): string[] {
  return educationLevels
}

export function getEducationLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    '1-5': 'Class 1-5',
    '6-8': 'Class 6-8',
    '9-12': 'Class 9-12',
    'undergraduate': 'Undergraduate',
    'post-graduation': 'Post-Graduation',
    'phd': 'PhD',
  }
  return labels[level] || level
}

export function isDeadlinePassed(deadline: string): boolean {
  return new Date(deadline) < new Date()
}

export function formatDeadline(deadline: string): string {
  return new Date(deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
