import Image from "next/image"
import Link from "next/link"

export default function Header () {
    return (
        <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <Image
                        className="rounded-full"
                        src="/../public/dumpling.jpg"
                        width={50}
                        height={50}
                        alt="logo"
                    />
                </Link>
                <h1>Gnark test blog</h1>
            </div>

            <div>
                <Link href="#">Let&apos;s subscribe to my newletter</Link>
            </div>
        </header>
    )

}