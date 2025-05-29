import { HttpException } from "../../common/error/exception";
import { updateProfileType, userByIdType } from "../../common/types/user";

export class UserService {
  public async getAllUsers() {
    const getAllUsers = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    return getAllUsers;
  }

  public async getProfileById(data: userByIdType) {
    const profile = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
      include: {
        profile: true,
        order : true,
      },
    });

    if (!profile) {
      throw new HttpException(404, "User not found");
    }
    return profile;
  }

  public async updateUser(data: updateProfileType) {
    if (!data.id || !data.name || !data.image || !data.bio) {
      throw new HttpException(400, "All fields are required");
    }
    const updateUser = await prisma.profile.update({
      where: {
        userId: data.id,
      },
      data: {
        name: data.name,
        image: data.image,
        bio: data.bio,
      },
    });

    return updateUser;
  }
}
