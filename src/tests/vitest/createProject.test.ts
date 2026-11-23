import { neon } from "@neondatabase/serverless"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { createProject } from "@/lib/actions/createProject"
import { getProjects } from "@/lib/actions/getProjects"
import { getUser } from "@/lib/actions/getUser"

vi.mock("@/lib/actions/getProjects", () => ({
  getProjects: vi.fn(),
}))

vi.mock("@/lib/actions/getUser", () => ({
  getUser: vi.fn(),
}))

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(),
}))

describe("Create Project", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.DATABASE_URL = "postgres://fake-url"
  })

  it("should create project successfully", async () => {
    vi.mocked(getUser).mockResolvedValue({
      error: false,
      user: { id: "user-1" },
    } as any)

    vi.mocked(getProjects).mockResolvedValue({
      error: false,
      response: [],
    } as any)

    const sqlMock = vi.fn().mockResolvedValue([
      {
        id: "project-1",
        title: "Meu projeto",
      },
    ])

    vi.mocked(neon).mockReturnValue(sqlMock as any)

    const formData = new FormData()

    formData.set("name", "Meu projeto")
    formData.set("date", "2026-12-01")

    const result = await createProject(formData)

    expect(result).toEqual({
      error: false,
      message: "Projeto criado com sucesso",
      projectId: "project-1",
    })

    expect(getUser).toHaveBeenCalledTimes(1)
    expect(getProjects).toHaveBeenCalledOnce()
    expect(neon).toHaveBeenCalledWith("postgres://fake-url")
    expect(sqlMock).toHaveBeenCalledTimes(1)
  })
})
