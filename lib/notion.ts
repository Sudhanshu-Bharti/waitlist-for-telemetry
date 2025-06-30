import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DB_ID

export type WaitlistEntry = {
  email: string
  name?: string
}

export async function addWaitlistEntry({ email, name }: WaitlistEntry) {
  if (!databaseId) throw new Error("NOTION_DB_ID is not set")
  if (!email) throw new Error("Email is required")
  if (!name) throw new Error("Name is required")

  const properties: any = {
    Name: {
        title: [
          {
            type: "text",
            text: { content: name || email },
          },
        ],
      },
    Email: {
      email: email,
    },
    
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties,
    })
    return response
  } catch (error) {
    console.error("Failed to add entry to Notion:", error)
    throw error
  }
}

export async function getWaitlistEntryByEmail(email: string) {
  if (!databaseId) throw new Error("NOTION_DB_ID is not set")

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Email",
        email: {
          equals: email,
        },
      },
    })

    return response.results[0]
  } catch (error) {
    console.error("Failed to query Notion database:", error)
    throw error
  }
}