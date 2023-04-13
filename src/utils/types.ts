/*
[
  {
    "id": 8,
    "last_login": null,
    "is_superuser": false,
    "first_name": "",
    "is_staff": false,
    "date_joined": "2023-04-12T13:43:03.123981Z",
    "email": "jika1995@gmail.com",
    "password": "pbkdf2_sha256$390000$AXyMIIBD3h9qbJinQpzzbe$2LdZ5EsIZFjb5OCkLdDwsvmzObN6955Xi+ZGDKO04Lg=",
    "name": null,
    "last_name": null,
    "date_birth": null,
    "city": null,
    "profile_image": null,
    "phone_number": "996701234567",
    "is_active": true,
    "activation_code": "",
    "groups": [],
    "user_permissions": []
  }
]
*/

//?asdas
//! asdasd
// TODO fix this

export type User = {
    id: number
    last_login: string | null;
    is_superuser: boolean
    first_name: string
    is_staff: boolean
    date_joined: string
    email: string
    password: string
    name: string | null;
    last_name: string | null;
    date_birth: string | null;
    city: any; //TODO
    profile_image: string | null;
    phone_number: string
    is_active: boolean
    activation_code: string;
    groups: any[]
    user_permissions: any[]
}
