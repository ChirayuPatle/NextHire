import type { Request, Response } from 'express';
import { z } from 'zod';
import catchErrors from '../utils/catch-errors';
import { BAD_REQUEST, OK } from '../configs/http-status-codes';
import appAssert from '../utils/app-assert';
import { prisma } from '../configs/prisma';

const CreateRoundSchema = z
  .object({
    type: z.enum([
      'RESUME_SCREENING',
      'APTITUDE_TEST',
      'TECHNICAL_INTERVIEW',
      'CODING_CHALLENGE',
      'GROUP_DISCUSSION',
      'HR_INTERVIEW',
      'FINAL_INTERVIEW',
    ]),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    details: z.record(z.any()).optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    status: z
      .enum(['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED'])
      .optional(),
    sessionId: z.string().min(1, 'Session ID is required'),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

const createRoundHandler = catchErrors(async (req: Request, res: Response) => {
  const request = CreateRoundSchema.parse(req.body);

  const session = await prisma.recruitmentSession.findUnique({
    where: { id: request.sessionId },
  });

  appAssert(session, BAD_REQUEST, 'Session does not exist');

  const round = await prisma.round.create({
    data: {
      type: request.type,
      title: request.title,
      description: request.description,
      details: request.details,
      startDate: new Date(request.startDate),
      endDate: new Date(request.endDate),
      status: request.status,
      sessionId: request.sessionId,
    },
  });

  return res.status(OK).json(round);
});

export { createRoundHandler };
