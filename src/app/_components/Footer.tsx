"use client";
import { MailSvg } from "./assets/MailSvg";
import { MovieLogo } from "./assets/MovieLogo";
import { Phone } from "./assets/Phone";

export const Footer = () => {
  return (
    <div className="w-[1440px] h-[280px] bg-[#4338CA] p-20 pt-10 pb-10 flex ">
      <div className="w-fit h-full flex flex-col gap-3">
        <div className="flex gap-3 text-white items-center font-bold">
          <MovieLogo stroke={"#FAFAFA"} width={17} height={17} /> Movie Z
        </div>
        <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex w-full justify-end gap-30">
        <div className="w-fit h-full text-white flex flex-col gap-2">
          Contact information
          <div className="flex items-center gap-4">
            <MailSvg />
            <div className="flex flex-col gap-1">
              <p>Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone />
            <div className="flex flex-col gap-1">
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="w-fit h-full text-white flex flex-col gap-2">
          Follow us
          <div className="flex gap-2">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
