import { useState, useRef, useEffect } from 'react'
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
  SCANNING: 'scanning',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
}

function qrScannerSupported() {
  return typeof window !== 'undefined' && 'BarcodeDetector' in window
}

export default function ValidationCard({ onSuccess }) {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [distance, setDistance] = useState(null)
  const [scannedCode, setScannedCode] = useState(null)

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const detectorRef = useRef(null)
  const rafRef = useRef(null)

  function cleanupCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  useEffect(() => cleanupCamera, [])

  function startCamera() {
    setErrorMessage('')
    if (!qrScannerSupported()) {
      setStatus(STATUS.ERROR)
      setErrorMessage(
        'Pemindai QR tidak didukung di peramban ini. Gunakan Chrome/Edge terbaru atau izinkan akses lokasi untuk verifikasi tanpa QR.',
      )
      return
    }
    setStatus(STATUS.SCANNING)
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(async (stream) => {
        streamRef.current = stream
        const video = videoRef.current
        video.srcObject = stream
        await video.play()
        detectorRef.current = new window.BarcodeDetector({
          formats: ['qr_code'],
        })
        detectLoop()
      })
      .catch((err) => {
        setStatus(STATUS.ERROR)
        if (err && err.name === 'NotAllowedError') {
          setErrorMessage('Akses kamera ditolak. Izinkan kamera untuk memindai QR.')
        } else if (err && err.name === 'NotFoundError') {
          setErrorMessage('Tidak ada kamera yang tersedia pada perangkat ini.')
        } else {
          setErrorMessage('Tidak dapat membuka kamera: ' + (err?.message || err))
        }
      })
  }

  function detectLoop() {
    const video = videoRef.current
    if (!video || !detectorRef.current) return
    const tick = async () => {
      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      try {
        const codes = await detectorRef.current.detect(video)
        if (codes.length > 0) {
          const code = codes[0].rawValue
          cleanupCamera()
          setScannedCode(code)
          verifyLocation()
          return
        }
      } catch {
        // ignore transient detection errors
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function verifyLocation() {
    setStatus(STATUS.LOADING)
    if (!('geolocation' in navigator)) {
      setStatus(STATUS.ERROR)
      setErrorMessage('Geolokasi tidak didukung di peramban ini.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const dist = distanceToTarget(latitude, longitude)
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
      },
      (err) => {
        setStatus(STATUS.ERROR)
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage('Akses lokasi GPS ditolak. Izinkan lokasi untuk verifikasi.')
        } else if (err.code === err.TIMEOUT) {
          setErrorMessage('Waktu mendapatkan lokasi habis. Coba lagi.')
        } else {
          setErrorMessage('Tidak dapat membaca lokasi GPS: ' + err.message)
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    )
  }

  function handleValidate() {
    setScannedCode(null)
    startCamera()
  }

  function handleSkipQr() {
    cleanupCamera()
    verifyLocation()
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
        {status === STATUS.IDLE && (
          <button
            onClick={handleValidate}
            className="w-full py-4 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Icon name="near_me" />
            Scan QR &amp; Cek Lokasi
          </button>
        )}

        {status === STATUS.SCANNING && (
          <div className="w-full flex flex-col items-center gap-3 py-2">
            <div className="relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              <div className="absolute inset-0 border-4 border-dashed border-primary/80 rounded-lg pointer-events-none m-6"></div>
            </div>
            <p className="text-on-surface-variant font-label-sm animate-pulse">
              Arahkan kamera ke QR Titik Baca...
            </p>
            <div className="flex w-full gap-2">
              <button
                onClick={() => {
                  cleanupCamera()
                  setStatus(STATUS.IDLE)
                }}
                className="flex-1 py-3 bg-surface-container text-on-surface font-label-md rounded-xl hover:bg-surface-container-high transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSkipQr}
                className="flex-1 py-3 bg-secondary-container text-on-secondary-container font-label-md rounded-xl hover:bg-secondary transition-all"
              >
                Lewati QR
              </button>
            </div>
          </div>
        )}

        {status === STATUS.LOADING && (
          <div className="w-full flex flex-col items-center gap-3 py-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-on-surface-variant animate-pulse font-label-sm">
              Memverifikasi lokasi GPS...
            </p>
          </div>
        )}

        {status === STATUS.SUCCESS && (
          <div className="w-full p-4 bg-primary-container text-on-primary-container rounded-lg border border-primary flex items-start gap-3 text-left">
            <Icon name="check_circle" className="mt-0.5" />
            <div>
              <p className="font-bold text-label-md">Verifikasi Berhasil</p>
              <p className="text-sm">
                {scannedCode ? 'QR terdeteksi. ' : ''}Jarak Anda {distance}m dari titik baca.
              </p>
            </div>
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
