import { Icon } from './Icon'

export default function SuccessModal({ open, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-on-background/60 z-[100] flex items-center justify-center p-md transition-opacity ${
        open ? '' : 'hidden'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-surface-container-lowest rounded-2xl p-xl max-w-sm w-full text-center space-y-md shadow-2xl transition-transform duration-300 ${
          open ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="check_circle" style={{ fontSize: 48 }} />
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Lokasi Terverifikasi
        </h3>
        <p className="text-on-surface-variant">
          Anda berada di radius Titik Baca Digital. Mengalihkan Anda ke Katalog...
        </p>
      </div>
    </div>
  )
}
