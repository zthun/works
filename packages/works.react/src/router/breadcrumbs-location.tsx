import { Breadcrumbs } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React, { useMemo } from 'react';
import { IZBreadcrumbs } from './breadcrumbs';
import { ZLink } from './link';
import { useLocation } from './router-dom';

/**
 * Represents a breadcrumbs component that uses the current location pathname.
 *
 * This supports the full pathname of the location.  If you are using
 * a disjoint sitemap where your site does not have a clear path and
 * route structure, then it would be recommended to avoid using this
 * component.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX that renders this component.
 */
export function ZBreadcrumbsLocation(props: IZBreadcrumbs) {
  const { className, onClick } = props;
  const location = useLocation();
  const clasz = cssClass('ZBreadcrumbs-root', 'ZBreadcrumbs-location', className);

  const sections = useMemo(() => {
    const all = location.pathname.split('/').filter((p) => !!p.trim());
    const _sections: { name: string; path: string }[] = [];

    for (let i = 0; i < all.length; ++i) {
      const previous = _sections[i - 1]?.path || '';
      const name = all[i];
      const subPath = `${previous}/${name}`;
      _sections.push({ name, path: subPath });
    }

    return _sections;
  }, [location]);

  const renderSection = (s: { name: string; path: string }) => (
    <ZLink
      className='ZBreadcrumbs-item'
      key={s.path}
      href={`#${s.path}`}
      name={s.path}
      label={s.name}
      onClick={onClick}
    />
  );

  return <Breadcrumbs className={clasz}>{sections.map(renderSection)}</Breadcrumbs>;
}
