import type { Request, Response } from 'express';
import { z } from 'zod';
import catchErrors from '../utils/catch-errors';
import { BAD_REQUEST, OK } from '../configs/http-status-codes';
import appAssert from '../utils/app-assert';
import { prisma } from '../configs/prisma';

const CreateSessionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  details: z.record(z.any()).optional(),
  organizationId: z.string().min(1, 'Organization ID is required'),
});

const createSessionHandler = catchErrors(
  async (req: Request, res: Response) => {
    const request = CreateSessionSchema.parse(req.body);
    const { title, description, details, organizationId } = request;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    appAssert(organization, BAD_REQUEST, 'Organization does not exist');

    const recruitmentSession = await prisma.recruitmentSession.create({
      data: {
        title,
        description,
        details,
        organizationId,
      },
    });

    return res.status(OK).json(recruitmentSession);
  },
);

const getOrganizationSessionsHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { organizationId } = req.query;
    appAssert(organizationId, BAD_REQUEST, 'Organization ID is required');

    const sessions = await prisma.recruitmentSession.findMany({
      where: {
        organizationId: organizationId as string,
      },
      include: {
        rounds: true,
      },
    });

    return res.status(OK).json(sessions);
  },
);

const getSessionByIdHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { organizationId } = req.query;

    appAssert(id, BAD_REQUEST, 'Session ID is required');
    appAssert(organizationId, BAD_REQUEST, 'Organization ID is required');

    const session = await prisma.recruitmentSession.findFirst({
      where: {
        id: id,
        organizationId: organizationId as string,
      },
      include: {
        rounds: true,
      },
    });

    appAssert(session, BAD_REQUEST, 'Session not found');

    return res.status(OK).json(session);
  },
);

export {
  createSessionHandler,
  getOrganizationSessionsHandler,
  getSessionByIdHandler,
};
