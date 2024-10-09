import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import insta from "../../public/Icon/instagram.png";
import kakao from "../../public/Icon/kakao.png";
import youtube from "../../public/Icon/youtube.png";


const Footer: React.FC = () => {
  const companyName = "GoiiGoii_Seoul";
  const presidentName = "김수영";
  const companyRegNo = "123-45-67890";
  const networkRegNo = "Network Registration Number";
  const bizNoLink = <a href="#none">Biz No Link</a>;
  const phone = "123-456-7890";
  const fax = "123-456-7891";
  const mallZipcode = "12345";
  const mallAddr1 = "Address Line 1";
  const mallAddr2 = "Address Line 2";
  const cpoEmail = "wjdgns9799@gmail.com";
  const cpoName = "CPO Name";
  const email = "info@designbug.co.kr";
  const runtime = "Mon-Fri 9am-6pm";
  const mallName = "wjdgns9799@gmail.com";

  return (
    <footer className="bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto text-black">
        <div className="flex justify-around">
          <div className='flex space-x-8'>
            <a href="https://www.instagram.com/goiigoii_seoul/">
              <Image src={insta} alt="instagram" className='w-8' ></Image>
            </a>
            <a href="https://www.youtube.com">
              <Image src={youtube} alt="instagram" className='w-8' ></Image>
            </a>
            <a href="#none">
              <Image src={kakao} alt="instagram" className='w-8' ></Image>
            </a>
          </div>
        </div>
        <div className="info mt-4">
          <div className="info__address mb-4">
            <h3 className="title font-bold">Company info</h3>
            <span>법인명(상호) : {companyName} </span>
            <span>대표자(성명) : {presidentName}</span>
            <span>사업자 등록번호 안내 : [{companyRegNo}]</span>
            <span>통신판매업 신고 {networkRegNo}</span>
            <span>{bizNoLink}</span>
            <br />
            <span>전화 : {phone}</span>
            <span>팩스 : {fax}</span>
            <span>주소 : {mallZipcode} {mallAddr1} {mallAddr2}</span>
            <br />
            <span className="inline-block">
              개인정보보호책임자 : <a href={`mailto:${cpoEmail}`}>{cpoName}({cpoEmail})</a>
            </span>
            <br />
            <span>Contact <a href={`mailto:${email}`}>{email}</a> for more information.</span>
          </div>
          <div className="info__customer mb-4">
            <div className="heading">
              <h3 className="title font-bold">Customer</h3>
              <button type="button" className="toggle">
                <i aria-hidden="true" className="icon icoArrowBottom"></i>open
              </button>
            </div>
            <ul className="content">
              <li className="tel">{phone}</li>
              <li className="runtime">{runtime}</li>
            </ul>
          </div>
          <div className="info__community">
            <h3 className="title font-bold">Community</h3>
            <ul>
              <li>
                <Link href="/board/free/list.html?board_no=1">Notice</Link>
              </li>
              <li>
                <Link href="/board/product/list.html?board_no=4">Review</Link>
              </li>
              <li>
                <Link href="/board/product/list.html?board_no=6">Q&amp;A</Link>
              </li>
              <li>
                <Link href="/board/free/list.html?board_no=3">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="copyright text-center mt-4">
          Copyright &copy; <strong>{mallName}</strong>. All rights reserved. Hosting by <span className="hosting">JungHoon</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;