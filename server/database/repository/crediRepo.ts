import { prisma } from "..";

export const createCredit = (Credit: any) => {
  return prisma.credit.create({
    data: {
      client: {
        connect: {
          id: 1,
        },
      },
      price: 20,
    },
  });
};

export const updateCredit = (id: number, Credit: any) => {
  return prisma.credit.update({
    where: {
      id: 1,
    },
    data: {
      price: 30,
    },
  });
};

export const getCredits = () => {
  return prisma.credit.findMany({
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const deleteCredit = (id: number) => {
  return prisma.credit.delete({
    where: {
      id,
    },
  });
};
