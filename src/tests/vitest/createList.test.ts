import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { createList } from "@/lib/actions/createList"
import { getLists } from "@/lib/actions/getLists"
import { getUser } from "@/lib/actions/getUser"

vi.mock("@/lib/actions/getLists", () => ({
  getLists: vi.fn(),
}))

vi.mock("@/lib/actions/getUser", () => ({
  getUser: vi.fn(),
}))

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(),
}))

describe("Create List", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.DATABASE_URL = "postgres://fake-url"
  })

  it("should create list successfully", async () => {
    vi.mocked(getUser).mockResolvedValue({
      error: false,
      user: { id: "user-1" },
    } as any)

    vi.mocked(getLists).mockResolvedValue({
      error: false,
      response: [],
    } as any)

    const sqlMock = vi.fn().mockResolvedValue([
      {
        id: "list-1",
        title: "Minha lista",
      },
    ])

    vi.mocked(neon).mockReturnValue(sqlMock as any)

    const result = await createList(
      {
        listName: "Minha lista",
        listPriority: "high",
      } as any,
      {
        id: "project-1",
      } as any,
    )

    expect(result).toEqual({
      error: false,
      message: "Lista criada com sucesso",
      response: [
        {
          id: "list-1",
          title: "Minha lista",
        },
      ],
    })

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(getLists).toHaveBeenCalledWith("project-1")
    expect(neon).toHaveBeenCalledWith("postgres://fake-url")
    expect(sqlMock).toHaveBeenCalledTimes(1)
  })
})
