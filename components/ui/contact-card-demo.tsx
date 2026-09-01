import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DefaultDemo() {
  return (
    <main className="contact-card-demo">
      <ContactCard
        title="Get in touch"
        contactInfo={[
          { icon: MailIcon, label: "Email", value: "sales@indianinfotech.org" },
          { icon: PhoneIcon, label: "Phone", value: "+91 76000 66770" },
          { icon: MapPinIcon, label: "Address", value: "Thaltej, Ahmedabad" },
        ]}
      >
        <form className="contact-form">
          <div><Label htmlFor="demo-name">Name</Label><Input id="demo-name" /></div>
          <div><Label htmlFor="demo-email">Email</Label><Input id="demo-email" type="email" /></div>
          <div><Label htmlFor="demo-phone">Phone</Label><Input id="demo-phone" type="tel" /></div>
          <div><Label htmlFor="demo-message">Message</Label><Textarea id="demo-message" /></div>
          <Button type="button">Submit</Button>
        </form>
      </ContactCard>
    </main>
  )
}
