import { twMerge } from 'tailwind-merge';

interface ListProps<T> extends React.ComponentPropsWithoutRef<'ul'> {
  renderItem: (item: T) => JSX.Element;
  getKey?: (item: T) => React.Key;
  emptyItemsMessage: string;
  emptyItemsMessageClass?: string;
  itemClassName?: string;
  items: T[] | undefined;
}

export function List<T>({
  renderItem,
  getKey,
  emptyItemsMessage,
  emptyItemsMessageClass,
  itemClassName,
  items,
  className,
  ...props
}: ListProps<T>) {
  return items?.length ? (
    <ul className={className} {...props}>
      {items.map((item, index) => (
        <li key={getKey ? getKey(item) : index} className={itemClassName}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  ) : (
    <p className={twMerge('py-4', emptyItemsMessageClass)}>{emptyItemsMessage}</p>
  );
}
