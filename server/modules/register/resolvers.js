import { User, validate } from "../../models/User";
import uniqid from "uniqid";
import { createConfirmationLink } from "../../utils/createConfirmationLink";
import bcrypt from "bcrypt";
import { sendConfirmationEmail } from "../../utils/sendConfirmationEmail";

const resolver = {
  Mutation: {
    register: async (parent, { name, email, password, url }) => {
      try {
        const result = await validate({ username: name, email, password });
        if (result.error) {
          return { ok: false, error: result.error.details[0].message };
        }

        const hash = await bcrypt.hash(password, 10);

        const confirmationId = uniqid();

        const user = new User({
          email,
          password: hash,
          username: name,
          confirmationId
        });

        const existantEmail = await User.findOne({ email: email });

        if (existantEmail) {
          return {
            ok: false,
            error: "Email already in use"
          };
        }

        await user.save();
        const confirmationLink = createConfirmationLink(url, confirmationId);
        console.log(confirmationLink);

        //sendConfirmationEmail(email, confirmationLink);

        //Send email with confirmationLink

        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          error: "You need to provide good information"
        };
      }
    }
  }
};

module.exports = resolver;
