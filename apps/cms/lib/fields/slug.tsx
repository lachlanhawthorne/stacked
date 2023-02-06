import { text } from "@keystone-6/core/fields"
import slugify from 'slugify'

export function slug(fieldName: string) {
  return text({
    isIndexed: "unique",
    ui: {
      itemView: { fieldMode: "read" },
      createView: { fieldMode: "hidden" },
      listView: { fieldMode: "read"}       
    },
    hooks: {
      resolveInput: ({ inputData, resolvedData }) => {
        return inputData[fieldName]
          ? slugify(inputData[fieldName], { lower: true })
          : resolvedData[fieldName]
      },
    },
  })
}