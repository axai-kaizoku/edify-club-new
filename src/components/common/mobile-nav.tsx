import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HamBurger } from "./icons"
import { Button } from "../ui/button"
import {
  BookOpen,
  BriefcaseBusiness,
  Handshake,
  LaptopMinimal,
  LogOut,
  User,
  ShoppingBasket,
} from "lucide-react"
import Link from "next/link"

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="block lg:hidden">
          <HamBurger />
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="w-full h-full p-2 relative font-gilroyMedium">
          <ul className="space-y-4">
            <li>
              <Link className="flex items-center gap-1" href="/b2b">
                <BriefcaseBusiness /> Business
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href="/about-us">
                <Handshake />
                About us
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-1"
                href="https://deviceflow.ai/"
                target="_blank"
              >
                <LaptopMinimal /> Startups
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href="#">
                <BookOpen /> Blogs
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ShoppingBasket /> Cart
            </li>
            <li className="flex items-center gap-1">
              <User /> Profile
            </li>
          </ul>
          <Button className="w-full absolute bottom-0 left-0">
            <LogOut /> Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
