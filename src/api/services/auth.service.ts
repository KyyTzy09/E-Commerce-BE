import { HttpException } from "../../common/error/exception.js";
import * as bcrypt from "bcryptjs";
import prisma from "../../common/utils/prisma.js";
import * as Jwt from "jsonwebtoken";
import { authType, tokenType } from "../../common/types/auth.js";

export class AuthService {
  public async signUp(data: authType) {
    if (!data.email || !data.password) {
      throw new HttpException(400, "All fields are required");
    }

    const name = data.email.split("@")[0];
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        profile: {
          create: {
            name,
          },
        },
      },
    });

    return createUser;
  }
  public async signIn(data: authType) {
    if (!data.email || !data.password) {
      throw new HttpException(400, "All fields are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      throw new HttpException(404, "User tidak ditemukan");
    }

    const checkPassword = await bcrypt.compare(
      data.password,
      existingUser.password as string
    );

    if (!checkPassword) {
      throw new HttpException(401, "Password salah");
    }

    const token = await this.generateToken({ id: existingUser.id });

    return token;
  }

  public async generateToken(data: tokenType) {
    const token = await Jwt.sign(
      { id: data.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    return token;
  }
}
