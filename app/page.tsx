import Link from 'next/link';
import Image from 'next/image'; // Optimized image component from Next.js

export default function Index() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {/* Profile Picture */}
      <Image
        src="/profile.jpg" // Path to your profile picture
        alt="Profile Picture"
        width={150} // Set width
        height={150} // Set height
        className="rounded-full mb-6" // Round image with margin below
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        บริษัท พีเอสซี กรุ๊ป จำกัด (สำนักงานใหญ่)
      </h1>

      {/* Login Button */}
      <Link href="/login">
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
          Go to Login
        </button>
      </Link>
    </main>
  );
}

