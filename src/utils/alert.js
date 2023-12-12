import Swal from 'sweetalert2'

export default {
    success (title, message) {
        return Swal.fire({
            title: title || 'Berhasil !',
            text: message,
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
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
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]'
            }
          })
    },
    failed (title, message) {
        return Swal.fire({
            title: title || 'Gagal !',
            text: message,
            icon: 'error',
            showConfirmButton: false,
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
            customClass: {
                icon: 'text-xs',
                title: 'text-lg',
                text: 'text-sm',
                popup: 'w-full md:w-[25%] min-w-[350px]'
            }
          })
    }
}