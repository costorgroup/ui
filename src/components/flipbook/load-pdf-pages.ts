export type TLoadPdfPagesOptions = {
  workerSrc?: string;
  scale?: number;
  signal?: AbortSignal;
};

const ensurePdfJs = async () => {
  try {
    return await import('pdfjs-dist');
  } catch {
    throw new Error(
      'Flipbook PDF mode requires the optional peer dependency "pdfjs-dist". Install it with: npm install pdfjs-dist',
    );
  }
};

export const loadPdfPages = async (
  src: string,
  options: TLoadPdfPagesOptions = {},
): Promise<string[]> => {
  const pdfjs = await ensurePdfJs();
  const { GlobalWorkerOptions, getDocument } = pdfjs;

  if (options.workerSrc) {
    GlobalWorkerOptions.workerSrc = options.workerSrc;
  } else if (!GlobalWorkerOptions.workerSrc) {
    GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }

  const loadingTask = getDocument({ url: src });
  const abort = () => {
    void loadingTask.destroy();
  };

  options.signal?.addEventListener('abort', abort, { once: true });

  try {
    const doc = await loadingTask.promise;
    const images: string[] = [];

    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
      if (options.signal?.aborted) {
        throw new DOMException('The operation was aborted.', 'AbortError');
      }

      const page = await doc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: options.scale ?? 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Unable to create canvas context for PDF rendering.');
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise;

      images.push(canvas.toDataURL('image/jpeg', 0.92));
      page.cleanup();
    }

    await loadingTask.destroy();
    return images;
  } finally {
    options.signal?.removeEventListener('abort', abort);
  }
};
