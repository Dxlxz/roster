import { type BreadcrumbItem } from 'roster-ui/primitives/navigation';

export type BreadcrumbProps = {
  links: Pick<BreadcrumbItem, 'children' | 'href'>[];
};
