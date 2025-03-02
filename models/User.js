// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['team_member', 'manager', 'admin'], default: 'team_member' },
// });

// const User = mongoose.model('User', userSchema);

// export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['team_member', 'manager', 'admin'], default: 'team_member' },
});

const User = mongoose.model('User', userSchema);

// Example validation function (if needed)
export const validate = (user) => {
  if (!user.name || !user.email || !user.password) {
    return { error: "All fields are required" };
  }
  return { error: null };
};

export default User;
