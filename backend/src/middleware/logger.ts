import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress || 'unknown';

  console.log(`📥 [${timestamp}] ${req.method} ${req.originalUrl} - ${ip}`);

  // Log response when it finishes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    const statusEmoji = res.statusCode >= 400 ? '❌' : res.statusCode >= 300 ? '⚠️' : '✅';
    console.log(
      `📤 ${statusEmoji} ${req.method} ${req.originalUrl} - ${res.statusCode} - ${responseTime}ms`
    );
  });

  next();
};

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`🚨 Error in ${req.method} ${req.originalUrl}:`, {
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
  });

  next(error);
};
