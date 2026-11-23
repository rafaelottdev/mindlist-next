import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { createTask } from "@/lib/actions/createTask"
import { getUser } from "@/lib/actions/getUser"

vi.mock("@/lib/actions/getUser", () => ({
  getUser: vi.fn(),
}))

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(),
}))

describe("Create Task", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.DATABASE_URL = "postgres://fake-url"
  })

  it("should create task successfully", async () => {
    vi.mocked(getUser).mockResolvedValue({
      error: false,
      user: { id: "user-1" },
    } as any)

    const sqlMock = vi.fn().mockResolvedValue([])

    vi.mocked(neon).mockReturnValue(sqlMock as any)

    const result = await createTask(
      {
        taskName: "task",
        taskPriority: "high",
      } as any,
      1,
    )

    expect(result).toEqual({
      error: false,
      message: "Tarefa criada com sucesso",
    })
  })
})
