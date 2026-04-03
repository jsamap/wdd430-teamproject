import HhLogo from '@/app/ui/hh-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { roboto } from '@/app/ui/fonts';
import Image from 'next/image';
import CategoriesSection from '@/app/ui/CategoriesSection';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-25 shrink-0 items-end rounded-lg bg-black p-4">
        <HhLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row ">
        {/* <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20"> */}

          <p className={`${roboto.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Landing page under construction...</strong>
          </p>
        {/* </div> */}
        
      </div>
      <CategoriesSection />
    </main>
  );
}
