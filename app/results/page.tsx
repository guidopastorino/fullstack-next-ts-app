'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  return <div>
    <p>Search: {search}</p>
    <Link href={"/"}>Back</Link>
  </div>
}