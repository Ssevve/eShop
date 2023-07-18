interface ListProps<T> extends React.ComponentPropsWithoutRef<'ul'> {
  renderItem: (item: T) => JSX.Element;
  getKey?: (item: T) => React.Key;
  noItemsMessage: string;
  items: T[] | undefined;
}

function List<T>({ renderItem, getKey, noItemsMessage, items, className, ...props }: ListProps<T>) {
  return items?.length ? (
    <ul className={className} {...props}>
      {items.map((item, index) => (
        <li key={getKey ? getKey(item) : index}>{renderItem(item)}</li>
      ))}
    </ul>
  ) : (
    <p className="py-6">{noItemsMessage}</p>
  );
}

export default List;
