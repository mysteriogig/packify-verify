
export function cn(...classNames: (string | undefined | null | false | Record<string, boolean>)[]) {
  return classNames
    .flatMap((className) => {
      if (typeof className === 'object' && className !== null) {
        return Object.entries(className)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key as string);
      }
      return className ? [className as string] : [];
    })
    .filter(Boolean)
    .join(" ");
}
