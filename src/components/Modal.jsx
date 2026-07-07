import { useEffect } from 'react'
import { Icon } from './Icon'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-on-background/60 flex items-center justify-center p-md"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-2xl p-xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
