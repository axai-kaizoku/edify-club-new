import { SlugMain } from "./_components/slug-main"

export default function Page({ params }: { params: { slug: string } }) {
  return <SlugMain title={params.slug} />
}
