import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { getUser } from "@/lib/actions/getUser"
import { updateList } from "@/lib/actions/updateList"

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

    const result = await updateList(
      {
        editListName: "Minha lista",
        editListPriority: "high",
      } as any,
      {
        id: "project-1",
        title: "Lista antiga",
        priority: "low",
      } as any,
    )

    expect(result).toEqual({
      error: false,
      message: "Lista atualizada com sucesso",
    })

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(neon).toHaveBeenCalledWith("postgres://fake-url")
    expect(sqlMock).toHaveBeenCalledTimes(1)
  })
})
