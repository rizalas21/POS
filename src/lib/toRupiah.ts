export default function toRupiah(value: number) {
return Intl.NumberFormat('id-ID', {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2
}).format(value)
}