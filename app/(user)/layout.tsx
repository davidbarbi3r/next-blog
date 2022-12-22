import "../../styles/globals.css"
import Header from "../../components/Header"
import Banner from "../../components/Banner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Header/>
        <Banner/>
        {children}
      </body>
    </html>
  )
}
