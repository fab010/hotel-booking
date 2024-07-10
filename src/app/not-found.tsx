import Link from 'next/link';
import Container from '@/components/container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="font-bold text-2xl text-gray-500 tracking-tight">Page Not Found - 404</h1>
        <p className="text-lg">Could not find requested resource.{" "}
          <Link href="/" className='font-bold underline text-sm'>Return Home</Link>
        </p>
      </div>
    </Container>
  );
}