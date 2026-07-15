'use client'

import CommonLayout from '@/layouts/common'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function ProductManagementLayout({ children }: Props) {
  return <CommonLayout>{children}</CommonLayout>
}
