import { beforeEach, describe, expect, it, vi } from "vitest"
import { createAccount } from "@/lib/actions/createAccount"
import { auth } from "@/lib/auth/server"

vi.mock("@/lib/auth/server", () => ({
  auth: {
    signUp: {
      email: vi.fn(),
    },
  },
}))

describe("Create Account", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should create account successfully", async () => {
    vi.mocked(auth.signUp.email).mockResolvedValue({
      error: null,
    })

    const result = await createAccount({
      name: "Rafael",
      email: "rafael@gmail.com",
      password: "(Rafa1234",
    })

    expect(result).toEqual({
      error: false,
      message: "Conta criada com sucesso",
    })
  })

  it("should return email already exists", async () => {
    vi.mocked(auth.signUp.email).mockResolvedValue({
      error: {
        message: "Email already exists",
      },
    })

    const result = await createAccount({
      name: "Rafael",
      email: "rafael@gmail.com",
      password: "(Rafa1234",
    })

    expect(result).toEqual({
      error: true,
      message: "Email já cadastrado",
    })
  })

  it("should return generic error", async () => {
    vi.mocked(auth.signUp.email).mockResolvedValue({
      error: {
        message: "server error",
      },
    })

    const result = await createAccount({
      name: "Rafael",
      email: "rafael@gmail.com",
      password: "(Rafa1234",
    })

    expect(result).toEqual({
      error: true,
      message: "Algo deu errado na criação da conta",
    })
  })
})
