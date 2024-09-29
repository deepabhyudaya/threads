import Image from 'next/image';
import { SignInButton } from './sign-in-button';

export default function SignInPage() {
  return (
    <div className="container h-full grid grid-rows-[1fr_min-content] py-8">
      <div className="flex flex-col justify-center items-center">
        <Image src={'/logo.png'} width={135} height={135} alt="" />
        <p className="mt-4 text-2xl font-semibold">Welcome!</p>
      </div>
      <SignInButton />
    </div>
  );
}
