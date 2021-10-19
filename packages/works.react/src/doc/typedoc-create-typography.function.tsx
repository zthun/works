import { Typography, TypographyVariant } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';

/**
 * Creates the typography for text based elements in a typedoc component
 *
 * @param children The child node to put in the typography.  Use a react fragment for multiple nodes. *
 * @param component The component type for the typography.  Defaults to span.
 * @param variant The typography variant.  Defaults to body2.
 * @param clasz The optional class to put on the typography.
 * @param id The optional data-entity attribute value.
 * @param onClick Optional callback for what to do when the typography element is clicked.
 *
 * @returns The typography jsx.  Returns null if children is falsy.
 */
export function createTypedocTypography(children: ReactNode, component: ElementType<any> = 'span', variant: TypographyVariant = 'body2', clasz?: string, id?: any, onClick?: (e: any) => void) {
  return children ? (
    <Typography className={clasz} variant={variant} component={component} data-entity={id} onClick={onClick}>
      {children}
    </Typography>
  ) : null;
}
