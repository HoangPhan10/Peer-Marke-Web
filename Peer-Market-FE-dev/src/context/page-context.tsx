import { createContext, useContext } from 'react';
import { IPage } from '@app/types/page.type';

const PageContext = createContext<IPage | null | undefined>(null)
PageContext.displayName = 'PageContext';

export const usePageContext = () => useContext(PageContext);

export default PageContext;