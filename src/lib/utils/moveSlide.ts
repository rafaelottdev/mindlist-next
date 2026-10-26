import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function moveLeftSlide(
  urlList: string[],
  currentIndex: number,
  router: AppRouterInstance,
) {
  if (currentIndex > 0) {
    router.push(urlList[currentIndex - 1])
  }
}

export function moveRightSlide(
  urlList: string[],
  currentIndex: number,
  router: AppRouterInstance,
) {
  if (currentIndex < 5) {
    router.push(urlList[currentIndex + 1])
  }
}
