export const secToTime = (sec: number) => new Date(sec * 1000).toISOString().substring(11, 19)
