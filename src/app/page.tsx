import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Interactive Web Application
        </h1>

        <p className="text-center mb-8">Next.js Interactive Web Application</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link
            href="/search"
            className="group p-6 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold mb-3">
              ค้นหาข้อมูล API
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                <ArrowRightIcon />
              </span>
            </h2>
            <p className="text-center">
              ระบบค้นหาข้อมูลจาก API ภายนอกและแสดงผลในรูปแบบ Card
            </p>
          </Link>

          <Link
            href="/todo"
            className="group p-6 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold mb-3">
              บันทึกรายการ
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                <ArrowRightIcon />
              </span>
            </h2>
            <p className="text-center">
              ระบบบันทึกรายการ (Todo List) พร้อมฟังก์ชันเพิ่ม ลบ และแก้ไขรายการ
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
