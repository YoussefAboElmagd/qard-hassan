import { redirect } from 'next/navigation'

export default function UserProfile() {
  // Redirect to personal-info page by default
  redirect('/ar/user-profile/personal-info')
}

