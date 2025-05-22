import { HttpException } from "../../common/error/exception";
import { categoryByIdType, categoryByNameType , categoryWithProductIdType, deleteFromCategoryType, productToCategoryType, updateCategoryType } from "../../common/types/category";

export class categoryService {
  async getAllCategory() {
    const getAllCategory = await prisma.category.findMany({
      include: {
        Product: true,
      },
    });

    return getAllCategory;
  }
  async getCategoryById(data: categoryByIdType) {
    const getCategoryById = await prisma.category.findUnique({
      where: {
        id: data.id,
      },
      include: { Product: true },
    });

    if (!getCategoryById) {
      throw new HttpException(404, "Category tidak ditemukan");
    }
    return getCategoryById;
  }

  async createCategory(data: categoryByNameType) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        category_name: data.name,
      },
    });

    if (existingCategory) {
      throw new HttpException(400, "Category sudah ada");
    }
    const create = await prisma.category.create({
      data: {
        category_name: data.name,
      },
    });

    return create;
  }

  async updateCategory(data: updateCategoryType) {
    const checkCategory = await prisma.category.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!checkCategory) {
      throw new HttpException(404, "Category tidak ditemukan");
    }

    const update = await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        category_name: data.name,
      },
    });

    return update;
  }

  async deleteCategory(data : categoryByIdType) {
    const checkCategory = await prisma.category.findUnique({
      where: {
        id : data.id,
      },
    });

    if (!checkCategory) {
      throw new HttpException(404, "Category tidak ditemukan");
    }

    const deleteCategory = await prisma.category.delete({
      where: {
        id: data.id,
      },
    })
    return deleteCategory;
  }

  async getCategoryByProductId (data : categoryWithProductIdType) {
    const product = await prisma.product.findUnique({
      where : {
        id : data.product_Id
      }, include : {
        category : true
      }
    })

    const category_Id = product?.category.map((item) => item.category_Id);

    const category = await prisma.category.findMany({
      where : {
        id : {
          in : category_Id
        }
      }
    })

    return category;
  }

  async getProductByCategory(data: categoryByNameType) {
    const getProductByCategory = await prisma.product.findMany({
      where: {
        category: {
          some: {
            category: {
              category_name: data.name,
            },
          },
        },
      },
    });

    if (getProductByCategory.length === 0) {
      throw new HttpException(404, "Product tidak ditemukan");
    }

    return getProductByCategory;
  }

  async addProductToCategory(data: productToCategoryType) {
    if (!data.name || !data.product_Id) {
      throw new HttpException(400, "All fields are required");
    }
    const checkProduct = await prisma.product.findUnique({
      where: {
        id: data.product_Id,
      },
    })

    if (!checkProduct) {
      throw new HttpException(404, "Product tidak ditemukan");
    }
    
    const checkCategory = await prisma.category.findMany({
      where: {
        category_name: {
          in: data.name,
        },
      },
    });

    if (checkCategory.length === 0) {
      throw new HttpException(404, "Category tidak ditemukan");
    }
    const existingCategory = await prisma.categories.findMany({
      where: {
        product_id: data.product_Id,
      },
    });

    const addToCategory = await prisma.categories.createMany({
      data: checkCategory.map((cat) => ({
        category_Id: cat.id,
        product_id: data.product_Id,
      })),
      skipDuplicates: true,
    });

    return addToCategory;
  }

  async removeProductFromCategory(data: deleteFromCategoryType) {
    const checkCategory = await prisma.categories.findFirst({
      where: {
        category_Id: data.id,
        product_id: data.product_Id,
      },
    });

    if (!checkCategory) {
      throw new HttpException(404, "Category tidak ditemukan");
    }

    const removeFromCategory = await prisma.categories.delete({
      where: {
        category_Id_product_id: {
          category_Id: checkCategory.category_Id,
          product_id: checkCategory.product_id,
        },
      },
    });

    return removeFromCategory;
  }
}
