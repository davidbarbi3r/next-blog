import Image from "next/image"

export default function Logo (props:any) {
 const {renderDefault, title} = props
 
 return <div className="flex items-center space-x-2">
    <Image
        className="rounded-full object-cover"
        height={50}
        width={50}
        src="/vercel.svg"
        alt="logo next"
    />
    {renderDefault && <>{renderDefault(props)}</>}
 </div>
}