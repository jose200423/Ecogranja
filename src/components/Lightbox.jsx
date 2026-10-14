import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import useDialog from './useDialog';
import './Lightbox.css';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const dialogRef = useDialog();
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => setVideoFailed(false), [currentIndex]);

  const item = images[currentIndex];

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={item?.alt || 'Visor de imágenes'}
      tabIndex={-1}
      ref={dialogRef}
      onClick={onClose}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
        <X size={28} />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={36} />
          </button>
        </>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {item?.type === 'video' ? (
          videoFailed ? (
            <div className="lightbox-fallback" role="alert">
              {item.poster && <img src={item.poster} alt="" className="lightbox-fallback-img" />}
              <p>No pudimos cargar el video en este momento.</p>
              <a
                href="https://wa.me/573125755037?text=%C2%A1Hola!%20Quisiera%20ver%20el%20video%20del%20proceso%20de%20construcci%C3%B3n%20en%20guadua."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} /> Pídenos el video por WhatsApp
              </a>
            </div>
          ) : (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="lightbox-media"
              onError={() => setVideoFailed(true)}
            />
          )
        ) : (
          <img src={item?.src || item} alt={item?.alt || ''} className="lightbox-media" />
        )}
        {item?.alt && !videoFailed && <p className="lightbox-caption">{item.alt}</p>}
      </div>

      {images.length > 1 && (
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
