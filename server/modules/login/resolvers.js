import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolver = {
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: "There is no user with such an email"
        };
      }

      if (!user.confirmed) {
        return {
          ok: false,
          error: "You need to confirm your email"
        };
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return {
          ok: false,
          error: "Your email and password don't match"
        };
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
            userId: user._id
          },
          process.env.JWTKEY
        );
        return {
          ok: true,
          error: "",
          token
        };
      }
    }
  }
};

module.exports = resolver;
