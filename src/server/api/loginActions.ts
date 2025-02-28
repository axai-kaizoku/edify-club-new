export type AddressDetails = {
  _id: string
  userId: string
  orgId?: string | null
  deleted_at?: string | null
  city?: string
  address?: string
  isPrimary: boolean
  createdAt?: string
  updatedAt?: string
  __v: number
}

export type User = {
  _id: string
  name:string
  first_name: string
  last_name: string
  gender: string
  password: string
  email: string
  phone: string
  role: number
  designation?: string | null
  image: string
  addressDetails: AddressDetails[]
}

export type LoginResponse = {
  message: string
  token: string
  user: User[]
}
