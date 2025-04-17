import Link from 'next/link';
export default function Header() {
    return (
      <header className="text-[calc(10px+2vh)] bg-[#213555] text-white p-[4vh] flex mx-[2vw] my-[2vh] border-b-4 border-[#D8C4B6] rounded-2xl">
        <nav>
            <Link href="/" className="text-bold">CS391 URL Shortener</Link>
        </nav>
      </header>
    );
  }