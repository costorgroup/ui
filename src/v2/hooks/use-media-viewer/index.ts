import { useContext } from 'react';
import { MediaViewerContext } from '../../providers/media-viewer/context';
import { TMediaViewerContextValue } from '../../providers/media-viewer/types';

const useMediaViewer = (): TMediaViewerContextValue => {
  const context = useContext(MediaViewerContext);

  if (!context) {
    throw new Error('useMediaViewer must be used within a MediaViewerProvider');
  }

  return context;
};

export { useMediaViewer };
export default useMediaViewer;
