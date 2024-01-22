import { prisma } from "..";
import { updateData } from "../models";

export const createVendor = (data: updateData<any>) => {
  // @ts-ignore
  return prisma.vendor.create({ data });
};

export const updateVendor = (vendor: updateData<any>) => {
  return prisma.vendor.update({
    where: { id: vendor.id },
    data: vendor.data,
  });
};

export const getVendor = (id: number) => {
  return prisma.vendor.findUnique({ where: { id } });
};

export const getAllVendors = () => {
  return prisma.vendor.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

export const deleteVendor = (id: number) => {
  return prisma.vendor.delete({ where: { id } });
};
