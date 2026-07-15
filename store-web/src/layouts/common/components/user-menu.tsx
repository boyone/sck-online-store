'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/16/solid'
// ---------------------------------------------------

const UserMenu = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onClickAdmin = () => {
    setOpen(false)
    router.push('/admin/product')
  }

  return (
    <div className="relative">
      <button
        id="header-menu-user-btn"
        type="button"
        className="flex justify-center items-center gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserCircleIcon className="h-7 w-7 text-gray-800" />
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 menu bg-base-100 rounded-box z-50 w-40 p-2 shadow">
          <li>
            <a id="admin-action-list" onClick={onClickAdmin}>admin</a>
          </li>
          <li>
            <a>settings</a>
          </li>
          <li>
            <a>sign out</a>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserMenu
