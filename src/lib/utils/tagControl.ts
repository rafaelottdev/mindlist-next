import type { TagType } from "@/types/TagType"

export function addTag(
  append: any,
  timeoutRef: React.RefObject<ReturnType<typeof setTimeout> | null>,
  selectedTags: TagType[],
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>,
  setTagError: React.Dispatch<
    React.SetStateAction<{ error: boolean; message: string }>
  >,
  id: number,
  name: string,
) {
  if (timeoutRef.current) clearTimeout(timeoutRef.current)

  if (selectedTags.length < 3) {
    if (!selectedTags.some((tag: TagType) => tag.id === id)) {
      setSelectedTags((prev: TagType[]) => [...prev, { id, name }])
      append({ id: id, name: name })
    } else {
      setTagError({ error: true, message: "Essa tag ja existe" })

      timeoutRef.current = setTimeout(
        () => setTagError({ error: false, message: "" }),
        1500,
      )
    }
  } else {
    setTagError({ error: true, message: "3 tags ja foram adicionadas" })

    timeoutRef.current = setTimeout(
      () => setTagError({ error: false, message: "" }),
      1500,
    )
  }
}

export function deleteTag(
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>,
  id: number,
) {
  setSelectedTags((prev: TagType[]) =>
    prev.filter((tag: TagType) => tag.id !== id),
  )
}
