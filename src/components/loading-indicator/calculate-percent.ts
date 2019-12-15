const calculatePercent = (percent: number): number => {
  let scopedPercent = percent || 0
  let random = 0

  if (scopedPercent >= 0 && scopedPercent < 0.25) {
    random = (Math.random() * (5 - 3 + 1) + 10) / 100
  } else if (scopedPercent >= 0.25 && scopedPercent < 0.65) {
    random = (Math.random() * 3) / 100
  } else if (scopedPercent >= 0.65 && scopedPercent < 0.9) {
    random = (Math.random() * 2) / 100
  } else if (scopedPercent >= 0.9 && scopedPercent < 0.99) {
    random = 0.005
  } else {
    random = 0
  }

  scopedPercent += random
  return scopedPercent
}

export default calculatePercent
