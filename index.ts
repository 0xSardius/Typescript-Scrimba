type UserRole = "user" | "admin" | "superadmin" | "moderator";

type User = {
  id: number;
  username: string;
  role: UserRole;
};

type UpdatedUser = Partial<User>;

let userRole: UserRole = "admin";

const users: User[] = [
  {
    id: 1,
    username: "John Doe",
    role: "admin",
  },
  {
    id: 2,
    username: "Jane Doe",
    role: "user",
  },
  {
    id: 3,
    username: "John Smith",
    role: "superadmin",
  },
  {
    id: 4,
    username: "Jane Smith",
    role: "moderator",
  },
];

function updateUser(id: number, updates: Partial<User>) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    console.error("User not found");
    return;
  }
  Object.assign(user, updates);
}

function addNewUser(newUser: User): User {
  const newId = users.length + 1;
  const newUserWithId = { ...newUser, id: newId };
  users.push(newUserWithId);
  return newUserWithId;
}
