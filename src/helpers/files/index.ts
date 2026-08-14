export const sameFile = (a: File, b: File) =>
  a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

export const mergeFiles = (
  current: File[],
  incoming: File[],
  multiple = true,
) => {
  if (!multiple) {
    return incoming.slice(0, 1);
  }

  const next = [...current];
  incoming.forEach((file) => {
    if (!next.some((item) => sameFile(item, file))) {
      next.push(file);
    }
  });
  return next;
};

export const formatFileSize = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1,
  );
  const size = value / 1024 ** index;
  return `${size >= 10 || index === 0 ? Math.round(size) : size.toFixed(1)} ${units[index]}`;
};
