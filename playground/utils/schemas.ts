import * as v from 'valibot'

export const MessageSchema = v.object({
  type: v.literal('message'),
  data: v.string(),
})

export const serverSchemas = [
  MessageSchema,
]
export const ServerSchemas = v.union(serverSchemas)
