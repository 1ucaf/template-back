export enum Permission {
  USERS_GET = 'users.get',
  USERS_EDIT = 'users.edit',
  USERS_DELETE = 'users.delete',
  USERS_SET_ADMIN = 'users.set_admin',
  USERS_SET_PERMISSIONS = 'users.set_permissions',
  BOOKS_GET = 'books.get',
  BOOKS_CREATE = 'books.create',
  BOOKS_EDIT = 'books.edit',
  BOOKS_DELETE = 'books.delete',
}

export const AdminUserPermissionsMap: Partial<Record<Permission, string>> = {
  [Permission.USERS_GET]: 'See users',
  [Permission.USERS_EDIT]: 'Edit users',
  [Permission.USERS_DELETE]: 'Delete users',
  [Permission.USERS_SET_ADMIN]: 'Set admin',
  [Permission.USERS_SET_PERMISSIONS]: 'Set permissions',
}

export const RegularUserPermissionsMap: Partial<Record<Permission, string>> = {
  [Permission.BOOKS_GET]: 'See books',
  [Permission.BOOKS_CREATE]: 'Create books',
  [Permission.BOOKS_EDIT]: 'Edit books',
  [Permission.BOOKS_DELETE]: 'Delete books',
}

export const AllPermissions = {
  admin: AdminUserPermissionsMap,
  user: RegularUserPermissionsMap,
}

export const AllPermissionsKeys = [
  ...Object.keys(AllPermissions.admin),
  ...Object.keys(AllPermissions.user)
] as Permission[];
export const RegularUserPermissionsKeys = Object.keys(AllPermissions.user) as Permission[];
export const AdminUserPermissionsKeys = Object.keys(AllPermissions.admin) as Permission[];