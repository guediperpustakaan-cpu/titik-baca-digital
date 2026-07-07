import { useState } from 'react'
import { Icon } from './Icon'
import {
  TARGET_COORDS,
  MAX_RADIUS_METERS,
  distanceToTarget,
} from '../lib/geo'

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQKb8IarJKlx2dygCcdHVRcOCsfnp0L6YYZjsaaRj9cpCJovZ6gsAtC0q3Qo6zQ4Kz8P-Pg9AaqOP1EtVToaJApNILRTJaZV-mRJylCt9__lVzMgnUTe8WnEcCSFkIoKbGMW6PjX1ovKtG1TpNb3NX_ixJHSszdJFQkCc2bZDG5vVAiCPz6S7djK0TZawekPOlLcHUrBHzJEHK_QDqYV5Rf8s1310WiuzwI4esZOFJV8TgIPefoF1h'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
}

export default function ValidationCard({ onSuccess }) {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [distance, setDistance] = useState(null)

  function handleValidate() {
    setStatus(STATUS.LOADING)
    setErrorMessage('')

    setTimeout(() => {
      const isFar = Math.random() > 0.5
      const mockLat = isFar ? -2.97 : -2.9902
      const mockLon = isFar ? 104.74 : 104.7568

      const dist = distanceToTarget(mockLat, mockLon)
      setDistance(Math.round(dist))

      if (dist > MAX_RADIUS_METERS) {
        setStatus(STATUS.ERROR)
        setErrorMessage(
          `Anda berada di luar jangkauan (${Math.round(dist)}m). Maksimal ${MAX_RADIUS_METERS}m dari titik baca.`,
        )
      } else {
        setStatus(STATUS.SUCCESS)
        onSuccess?.()
      }
    }, 1500)
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-md">
      <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-2">
        <Icon name="qr_code_scanner" style={{ fontSize: 32 }} />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface">
        Masuk ke Katalog
      </h3>
      <p className="text-on-surface-variant text-body-sm">
        Pastikan Anda berada di area Titik Baca Digital untuk mengakses koleksi.
      </p>

      <div className="w-full pt-md">
        {status !== STATUS.LOADING && status !== STATUS.ERROR && (
          <button
            onClick={handleValidate}
            className="w-full py-4 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Icon name="near_me" />
            Scan QR &amp; Cek Lokasi
          </button>
        )}

        {status === STATUS.LOADING && (
          <div className="w-full flex flex-col items-center gap-3 py-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-on-surface-variant animate-pulse font-label-sm">
              Memverifikasi lokasi GPS...
            </p>
          </div>
        )}

        {status === STATUS.ERROR && (
          <>
            <div className="w-full p-4 bg-error-container text-on-error-container rounded-lg border border-error flex items-start gap-3 text-left">
              <Icon name="error" className="mt-0.5" />
              <div>
                <p className="font-bold text-label-md">Gagal Memverifikasi</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={handleValidate}
              className="mt-md w-full py-4 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Icon name="near_me" />
              Coba Lagi
            </button>
          </>
        )}
      </div>
    </div>
  )
}
