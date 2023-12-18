import Swal from 'sweetalert2'
import { store } from '@/utils/store'

export default {
    success (title, message) {
        return Swal.fire({
            title: title || 'Berhasil !',
            text: message,
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
            background: store().theme == 'dark' ? '#212121' : '#fff',
            color: store().theme == 'dark' ? '#dfdfdf' : '#212121',
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]'
            }
          })
    },
    confirm(title, message) {
        return Swal.fire({
            title: title || 'Apakah anda yakin ?',
            text: message,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#5fa0cb',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal',
            background: store().theme == 'dark' ? '#212121' : '#fff',
            color: store().theme == 'dark' ? '#dfdfdf' : '#212121',
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]',
            }
          })
    },
    failed (title, message) {
        return Swal.fire({
            title: title || 'Gagal !',
            text: message,
            icon: 'error',
            showConfirmButton: false,
            background: store().theme == 'dark' ? '#212121' : '#fff',
            color: store().theme == 'dark' ? '#dfdfdf' : '#212121',
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]'
            }
          })
    },
    warning (title, message) {
        return Swal.fire({
            title: title || '',
            text: message,
            icon: 'warning',
            showConfirmButton: false,
            background: store().theme == 'dark' ? '#212121' : '#fff',
            color: store().theme == 'dark' ? '#dfdfdf' : '#212121',
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]'
            }
          })
    }
}