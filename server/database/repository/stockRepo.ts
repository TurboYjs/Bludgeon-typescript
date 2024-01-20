import { prisma } from "..";
import { newStockT } from "../models";

export const createStockMovement = (data: newStockT) => {
  return prisma.stockMovement.create({
    data: {
      quantity: data.quantity,
      model: data.model,
      product: {
        connect: {
          id: data.productId,
        },
      },
    },
  });
};

export const getStockMovement = (id: number) => {
  return prisma.stockMovement.findUnique({
    where: { id },
    select: {
      commandItem: {
        select: {
          quantity: true,
        },
      },
    },
  });
};

export const getStockMovements = () => {
  return prisma.stockMovement.findMany({
    include: {
      product: {
        select: {
          price: true,
          name: true,
        },
      },
      commandItem: {
        select: {
          quantity: true,
          commandId: true,
        },
      },
      invoiceItem: {
        select: {
          quantity: true,
          invoiceId: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};
