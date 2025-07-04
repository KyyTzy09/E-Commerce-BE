import { HttpException } from "../../common/error/exception.js";
import {
  createKomentarTypes,
  deleteByIdTypes,
  getKomentarByIdTypes,
  getKomentarByProductIdTypes,
  getKomentarByUserIdTypes,
} from "../../common/types/komentar.js";

export class CommentService {
  public async getAllComment() {
    const allKomen = await prisma.komentar.findMany();
    if (allKomen.length === 0) {
      throw new HttpException(404, "Komentar kosong");
    }
    return allKomen;
  }
  public async getAllCommentByUserId(data: getKomentarByUserIdTypes) {
    const komentar = await prisma.komentar.findMany({
      where: {
        user_id: data.userId,
      },
    });

    if (komentar.length === 0) {
      throw new HttpException(404, "Komentar tidak ditemukan");
    }

    return komentar;
  }
  public async getAllCommentByProductId(data: getKomentarByProductIdTypes) {
    const komentar = await prisma.komentar.findMany({
      where: {
        product_id: data.productId,
      },include : {
        user : {
          include : {
            profile : true
          }
        },
        product : true
      }
    });
    if (komentar.length === 0) {
      throw new HttpException(404, "Komentar tidak ditemukan");
    }

    return komentar;
  }
  public async getCommentById(data: getKomentarByIdTypes) {
    const komentar = await prisma.komentar.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!komentar) {
      throw new HttpException(404, "Komentar Tidak Ditemukan");
    }

    return komentar;
  }
  public async createComment(data: createKomentarTypes) {
    const createKomen = await prisma.komentar.create({
      data: {
        user_id: data.userId,
        product_id: data.productId,
        komentar: data.komentar,
      },
    });

    return createKomen;
  }
  public async deleteAllComment() {
    const deleteAl = await prisma.komentar.deleteMany({}); // Method untuk mereset
    return deleteAl;
  }
  public async deleteCommentById(data: deleteByIdTypes) {
    const existingComment = await this.getCommentById({id : data.id})
    
    if (!existingComment) {
      throw new HttpException(404, "Komentar tidak ditemukan");
    }

    const deleted = await prisma.komentar.delete({
      where: {
        id: data.id,
      },
    });
    return deleted;
  }
}
