import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { getUser } from "@/lib/actions/getUser"
import { updateListStatus } from "@/lib/actions/updateListStatus"

vi.mock("@/lib/actions/getUser", () => ({
  getUser: vi.fn(),
}))

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(),
}))

describe("", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.DATABASE_URL = "postgres://fake-url"
  })

  it("", async () => {
    vi.mocked(getUser).mockResolvedValue({
      error: false,
      user: { id: "user-1" },
    } as any)

    const sqlMock = vi.fn().mockResolvedValue([])

    vi.mocked(neon).mockReturnValue(sqlMock as any)

    const result = await updateListStatus(true, 1, 1)

    expect(result).toEqual({
      error: false,
      message: "Tarefa Pendente",
    })

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(neon).toHaveBeenCalledWith("postgres://fake-url")
    expect(sqlMock).toHaveBeenCalledTimes(1)
  })
})
