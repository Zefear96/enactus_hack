//?asdas
//! asdasd
// TODO fix this

export type User = {
  id: number
  last_login: string | null;
  is_superuser: boolean
  first_name: string | null
  is_staff: boolean
  date_joined: string
  email: string
  password: string
  name: string | null;
  last_name: string | null;
  date_birth: string | null;
  city: string | null //TODO
  profile_image: string | null;
  phone_number: string
  is_active: boolean
  activation_code: string;
  groups: any[]
  user_permissions: any[]
}
