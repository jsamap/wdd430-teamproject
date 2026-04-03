import { merriweather } from '@/app/ui/fonts';

export default function HhLogo() {
  return (
    <div
      className={`${merriweather.className} flex flex-row items-center gap-4 leading-none text-white`}
    >
      <img className="h-20 w-20" src='/hh-logo.png'/>
      <p className="text-[32px]">Handcrafted Haven</p>
    </div>
  );
}
