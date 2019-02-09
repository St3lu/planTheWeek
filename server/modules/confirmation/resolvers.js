import { User } from "../../models/User";

const resolver = {
  Mutation: {
    confirmEmail: async (parent, { email, confirmId }) => {
      try {
        const user = await User.findOne({ email: email });
        if (user.confirmationId === confirmId) {
          await User.updateOne(
            { email: email },
            { $set: { confirmed: true, confirmationId: "" } }
          );
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  }
};

module.exports = resolver;
