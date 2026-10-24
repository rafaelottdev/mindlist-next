export function moveLeftSlide(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
) {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1)
  }
}

export function moveRightSlide(
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
) {
  if (currentIndex < 5) {
    setCurrentIndex((prev) => prev + 1)
  }
}
