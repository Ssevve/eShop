interface ListProps<T> extends React.ComponentPropsWithoutRef<'ul'> {
  renderItem: (item: T) => JSX.Element;
  getKey?: (item: T) => React.Key;
  emptyItemsMessage: string;
  emptyItemsMessageClass?: string;
  items: T[] | undefined;
}

function List<T>({
  renderItem,
  getKey,
  emptyItemsMessage,
  emptyItemsMessageClass,
  items,
  className,
  ...props
}: ListProps<T>) {
  return items?.length ? (
    <ul className={className} {...props}>
      {items.map((item, index) => (
        <li key={getKey ? getKey(item) : index}>{renderItem(item)}</li>
      ))}
    </ul>
  ) : (
    <p className={emptyItemsMessageClass || 'py-6'}>{emptyItemsMessage}</p>
  );
}

export default List;
