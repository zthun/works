import { IZErrorHandler, ZErrorHandler, ZErrorMessageHandlerComposite } from '@zthun/works.error';
import { ZLoggerConsole } from '@zthun/works.logger';
import { ZAlertService } from '@zthun/works.message';
import { createContext, useContext } from 'react';
import { ZErrorMessageHandlerAlert } from './error-message-handler-alert';
import { ZErrorMessageHandlerLogger } from './error-message-handler-logger';

/**
 * The error recovery context.
 */
export const ZErrorHandlerContext = createContext<IZErrorHandler>(new ZErrorHandler(new ZErrorMessageHandlerComposite([new ZErrorMessageHandlerAlert(new ZAlertService()), new ZErrorMessageHandlerLogger(new ZLoggerConsole(console))])));

/**
 * Gets the current error handler implementation.
 *
 * @returns The current error handler implementation service.
 */
export function useErrorHandler(): IZErrorHandler {
  return useContext(ZErrorHandlerContext);
}
