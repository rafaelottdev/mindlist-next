import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { getTasks } from "@/lib/actions/getTasks"
import { getUser } from "@/lib/actions/getUser"

vi.mock("@/lib/actions/getUser", () => ({
  getUser: vi.fn(),
}))

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(),
}))

describe("Get tasks successfully", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.DATABASE_URL = "postgres://fake-url"
  })

  it("should get tasks successfully", async () => {
    vi.mocked(getUser).mockResolvedValue({
      error: false,
      user: { id: "user-1" },
    } as any)

    const sqlMock = vi.fn().mockResolvedValue([])

    vi.mocked(neon).mockReturnValue(sqlMock as any)

    const result = await getTasks(1)

    expect(result).toEqual({
      error: false,
      message: "Sucesso ao buscar as tarefas da lista",
      response: [],
    })

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(neon).toHaveBeenCalledWith("postgres://fake-url")
    expect(sqlMock).toHaveBeenCalledTimes(1)
  })
})
