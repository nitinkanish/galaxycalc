import { redirect } from "next/navigation"
import { getBody } from "@/lib/api"
import { getBodySlug } from "@/lib/utils"

interface LegacyBodyPageProps {
  params: {
    id: string
  }
}

export default async function LegacyBodyPage({ params }: LegacyBodyPageProps) {
  try {
    const body = await getBody(params.id)
    const slug = getBodySlug(body)
    redirect(`/celestial-bodies/${slug}`)
  } catch {
    redirect("/browse")
  }
}
