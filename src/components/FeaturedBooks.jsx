const BOOKS = [
  {
    title: 'Sejarah Palembang',
    author: 'Dinas Arsip',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5h3PS9IimnHwMaRx_oFtuJbZsQ5sq1gWxWslEq9BenhB0ocljkpzrqKIAXfRwHN1C6BM0aQlLxfytJvlt50l2OSc-kQbQ1JasXj4eCX9EzH_zI6V-8GvuxJM2yeYflpBwnPiYhT17Q1UG6eskZGfFf1PmRsWB8dAyE1EpYmE_2KMGtlQvLAdQgErs-5EDj0to0z5zEu_SsX6MNpOBdS0FFiRI8dVI6SPpWJd9KE766vItW10SZUwS',
  },
  {
    title: 'Teknologi Masa Depan',
    author: 'Prof. Wiryawan',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkqIuCxGuuAA_ePSCsvS5hKEaF6cefS-IXvsCepBi3lu8e0Eu0cahos9gCD-14SBpvr8deMLPuXQ1GLwmqH23OX-ocJtuaj621nFTR07p2M2OU0YOuKIqg0n0ViSYervRqzF3YWUA-tBHtxuaB-f8pIs3SM_tgpsjHcACLo0DI9hMbu55Sl_qfhMofqFahycVVqXBdsoyQ3ufV12gg8lT8p3PsCdf17ZQm0nDYCIqpVx6kAgAV-5wp',
  },
  {
    title: 'Kuliner Palembang',
    author: 'Tim Kuliner',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKz2hlu9EmzxFtWcQsFPQLpKY2qSY7-lZs21H0Su9V6T4f_75hAKjQU4Orb0Vtsksxh3u6DvW3y78IEEIK0RQ5YXRGHUhgZTe9Y3EJDAhG8llSvDrBx1IazaBFyScmPm_01v-1mcdkca1HOA8UjRt-msFA83ugM0lUma-kRH-jVDXBdjPtIBG_wr70n-yky2DlIF_f8UTUAwJWxzBFJMyFJibSMtW1THV1g7SRytcSuXAKpe7Ofsbj',
  },
  {
    title: 'Sajak Musi',
    author: 'R.A. Kartini',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIPJMpRET2Z3SQj7xY89tTvokrXQir51uz7M4r0L7P82n_5HcSYo09_xmXAoQWatFkhXFnu_CcQ8Dyebo38wJuo32gCBYcmS6NSg3SMXSo8UBWenTg4-EVy10WHUKjJDSZqi8cqNoTM93YKtz5l60pbfRYZoYH9_d5JBSMVe7xukI6xpbWd3i-UHULuqYZcvvZW5MpY6dc0H9SF9sms5lJ9a0bHPrVvMqcT-BzRcz5EeBg5epHN4Js',
  },
]

export default function FeaturedBooks() {
  return (
    <div className="w-full max-w-container-max mt-3xl space-y-md">
      <div className="flex justify-between items-end">
        <h4 className="font-headline-md text-headline-md border-l-4 border-primary pl-md">
          Buku Terpopuler
        </h4>
        <a className="text-primary text-label-md font-bold" href="#">
          Lihat Semua
        </a>
      </div>
      <div className="flex gap-md overflow-x-auto pb-4 scroll-smooth no-scrollbar">
        {BOOKS.map((book) => (
          <div key={book.title} className="flex-shrink-0 w-44 space-y-sm">
            <div className="aspect-[3/4] rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:scale-[1.02] transition-transform bg-surface-container-high">
              <img
                className="w-full h-full object-cover"
                src={book.img}
                alt={book.title}
                loading="lazy"
              />
            </div>
            <div className="space-y-1">
              <p className="font-label-md text-on-surface truncate">
                {book.title}
              </p>
              <p className="text-on-surface-variant text-label-sm">
                {book.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
