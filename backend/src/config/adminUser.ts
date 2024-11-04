import "dotenv/config";
import userModel from "../model/user.model";
import { hashPassword } from "../utils/bcrypt.handle";
import Roles from "../enum/roles.enum";

export const createDefaultAdmin = async () => {
  try {
    // Check if an admin user already exists
    const adminUser = await userModel.findOne({ role: Roles.admin });
    if (adminUser) {
      console.log(">>> Admin user already exists");
      return;
    }

    // If no admin user exists, create one
    const hashedPassword = await hashPassword(
      process.env.ADMIN_PASSWORD || "YOUR_SUPER_SECURE_ADMIN_PASSWORD"
    );
    const admin = new userModel({
      name:
        process.env.ADMIN_NAME || "admin_name" /*YOUR_SUPER_SECURE_ADMIN_NAME*/,
      userName:
        process.env.ADMIN_USERNAME ||
        "admin_User_Name" /*YOUR_SUPER_SECURE_ADMIN_USERNAME*/,
      email:
        process.env.ADMIN_EMAIL ||
        "adminEmail@gmail.com" /*YOUR_SUPER_SECURE_ADMIN_EMAIL*/,
      password:
        hashedPassword ||
        "pls_hash_your_password" /*YOUR_SUPER_SECURE_ADMIN_NAME*/,
      isActive:
        process.env.ADMIN_ISACTIVE || true /*USER ADMIN MUST BE ACTIVE*/,
      role: process.env.ADMIN_ROLE || Roles.admin,
    });

    await admin.save();
    console.log(">>> Default admin user created");
  } catch (error) {
    console.error(">>> Error creating admin user:", error);
  }
};
