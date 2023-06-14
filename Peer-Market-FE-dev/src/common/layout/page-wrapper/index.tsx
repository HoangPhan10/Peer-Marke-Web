import { IPage } from '@app/types/page.type';
import React from 'react';
import PageContext from '@app/context/page-context';

interface PageWrapperProps {
  pageContext?: IPage;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode | React.ReactPortal | null | undefined;
}

export function PageWrapper(props: PageWrapperProps) {
  return (
    <PageContext.Provider value={props.pageContext}>
      <div className='main-container'>
        { props.children }
      </div>
    </PageContext.Provider>
  )
}
