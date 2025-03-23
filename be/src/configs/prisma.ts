import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// prisma.user.create({
//   data: {
//     email: "fdfsnglng",
//     password: "dfsddfds"
//   }
// })

export { prisma };
